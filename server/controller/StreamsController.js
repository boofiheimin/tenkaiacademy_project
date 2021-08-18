import mongoose from "mongoose";
import Stream from "../models/Stream.js";
import Clip from "../models/Clip.js";
import Tag from "../models/Tag.js";
import ErrorResponse from "../utils/ErrorResponse.js";

import Youtube from "youtube-api";
import moment from "moment";

import { KANATA_CHANNEL_ID } from "../constants/main.js";

export const getStreams = async ({ query: reqQuery = {} }, res, next) => {
  const { query = "{}", offset, limit } = reqQuery;

  const { title, tags = [], from, to, uploader, sort } = JSON.parse(query);

  const paginateOptions = {
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(sort && { sort: { publishedAt: sort } }),
  };

  const filter = [];

  let srchQuery = {};

  for (const tag of tags) {
    filter.push({ "tags.tagId": tag });
  }

  srchQuery = {
    ...(title && { title: new RegExp(title, "i") }),
    ...(uploader && { uploader: new RegExp(uploader, "i") }),
    ...((from || to) && {
      publishedAt: { ...(from && { $gte: from }), ...(to && { $lte: to }) },
    }),
    ...(filter.length > 0 && { $and: filter }),
  };

  try {
    const streams = await Stream.paginate(srchQuery, paginateOptions);
    res.status(200).json(streams);
  } catch (error) {
    next(error);
  }
};

export const createStream = async (req, res, next) => {
  try {
    const { videoId } = req.body;
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });
    const results = await Youtube.videos.list({
      maxResults: 1,
      id: videoId,
      part: "snippet, contentDetails",
    });
    const video = results?.data?.items[0];
    let videoParams;
    if (video) {
      videoParams = {
        videoId: video?.id,
        title: video?.snippet?.title,
        thumbnail: video?.snippet?.thumbnails?.high?.url,
        uploader: video?.snippet?.channelTitle,
        duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
        publishedAt: new Date(video?.snippet?.publishedAt),
        source: "youtube-manual",
      };
    } else {
      const tags = await Tag.findOne(
        { tagNameEN: "Private" },
        { _id: 1, catId: 1, tagId: 1, tagNameEN: 1, tagNameJP: 1 }
      );
      videoParams = {
        videoId,
        title: "NEW VIDEO",
        source: "manual",
        tags: [
          {
            tagId: tags.tagId,
            tagNameEN: tags.tagNameEN,
            tagNameJP: tags.tagNameJP,
          },
        ],
      };
    }

    const newStream = new Stream(videoParams);
    await newStream.save();
    res.status(200).json(newStream);
  } catch (error) {
    next(error);
  }
};

export const getStream = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [stream] = await Stream.aggregate()
      .match({
        _id: mongoose.Types.ObjectId(id),
      })
      .lookup({
        from: "clips",
        let: { videoId: "$videoId" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$srcVideo.videoId", "$$videoId"],
              },
            },
          },
          { $sort: { publisedAt: -1 } },
        ],
        as: "clips",
      });
    res.status(200).json(stream);
  } catch (err) {
    next(err);
  }
};

export const editStream = async (req, res, next) => {
  try {
    const formData = req.body;

    const { relatedVideos } = formData;

    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    for (const video of relatedVideos) {
      const existingVideo = await Stream.findOne({ videoId: video.videoId });
      if (existingVideo) {
        Object.assign(video, {
          existing: true,
          id: existingVideo.id.toString(),
          title: existingVideo.title,
          uploader: existingVideo.uploader,
        });
      } else {
        const results = await Youtube.videos.list({
          maxResults: 1,
          id: video.videoId,
          part: "snippet",
        });
        const resultVideo = results?.data?.items[0];
        Object.assign(video, {
          existing: false,
          uploader: resultVideo?.snippet?.channelTitle,
          title: resultVideo?.snippet?.title,
        });
      }
    }

    const stream = await Stream.findByIdAndUpdate(req.params.id, formData, {
      new: true,
    });
    await stream.save();

    res.status(200).json(stream);
  } catch (err) {
    next(error);
  }
};

export const deleteStream = async (req, res, next) => {
  try {
    const stream = await Stream.findByIdAndDelete(req.params.id);
    if (!stream) {
      return next(new ErrorResponse(("stream not found", 404)));
    }
    res.status(200).json(stream);
  } catch (err) {
    next(error);
  }
};

export const refetchAll = async (req, res, next) => {
  try {
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    let totalData = [];
    let fetchRound = 1;

    const channel = await Youtube.channels.list({
      part: "contentDetails",
      id: KANATA_CHANNEL_ID,
    });

    const uploadPlaylistID =
      channel?.data?.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    const firstSet = await Youtube.playlistItems.list({
      maxResults: 50,
      playlistId: uploadPlaylistID,
      part: "contentDetails",
      order: "date",
    });

    let videoIds = firstSet.data.items.map((item) => {
      return item.contentDetails.videoId;
    });

    let pageToken = firstSet.data.nextPageToken;

    while (true) {
      console.log(`${fetchRound} round of fetch`, pageToken);
      const { data } = await Youtube.playlistItems.list({
        maxResults: 50,
        playlistId: uploadPlaylistID,
        part: "contentDetails",
        order: "date",
        pageToken,
      });
      fetchRound += 1;

      const nextIds = data.items.map((item) => {
        return item.contentDetails.videoId;
      });

      videoIds = videoIds.concat(nextIds);
      if (!data.nextPageToken) {
        break;
      }
      pageToken = data.nextPageToken;
    }

    let totalAdd = 0;

    for (const videoId of videoIds) {
      const results = await Youtube.videos.list({
        maxResults: 1,
        id: videoId,
        part: "snippet, contentDetails",
      });
      const video = results?.data?.items[0];
      const videoParams = {
        videoId: video?.id,
        title: video?.snippet?.title,
        thumbnail: video?.snippet?.thumbnails?.high?.url,
        uploader: video?.snippet?.channelTitle,
        duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
        publishedAt: new Date(video?.snippet?.publishedAt),
        source: "youtube",
      };
      if (video?.snippet?.liveBroadcastContent === "none") {
        await Stream.updateMany({ videoId: videoParams.videoId }, videoParams, {
          upsert: true,
          setDefaultsOnInsert: true,
        });
        totalAdd += 1;
      }
    }

    const message = `Successfully Add/Update: ${totalAdd} videos`;
    console.log(message);
    res.status(200).json({
      message,
    });
  } catch (err) {
    next(error);
  }
};

export const refetchStream = async (req, res, next) => {
  try {
    const { id } = req.params;
    let stream = await Stream.findById(id);
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    const results = await Youtube.videos.list({
      maxResults: 1,
      id: stream.videoId,
      part: "snippet, contentDetails",
    });

    const video = results?.data?.items[0];
    let videoParams;
    if (video) {
      videoParams = {
        title: video?.snippet?.title,
        thumbnail: video?.snippet?.thumbnails?.high?.url,
        uploader: video?.snippet?.channelTitle,
        duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
        publishedAt: new Date(video?.snippet?.publishedAt),
      };
    } else {
      return next(new ErrorResponse("Stream not found", 404));
    }
    stream.title = videoParams.title;
    stream.thumbnail = videoParams.thumbnail;
    stream.uploader = videoParams.uploader;
    stream.duration = videoParams.duration;
    stream.publishedAt = videoParams.publishedAt;

    await stream.save();
    res.status(200).json(stream);
  } catch (error) {
    next(error);
  }
};
