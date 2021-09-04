import mongoose from "mongoose";
import Stream from "../models/stream.js";
import Clip from "../models/clip.js";
import Tag from "../models/tag.js";
import ErrorResponse from "../utils/errorResponse.js";

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

    const relatedStreams = await Stream.find({
      "relatedVideos.videoId": videoId,
    });

    for (const rStream of relatedStreams) {
      rStream.relatedVideos = rStream.relatedVideos.map((rVid) => {
        if (rVid.videoId === videoId) {
          return {
            existing: true,
            id: newStream.id.toString(),
            title: newStream.title,
            uploader: newStream.uploader,
            publishedAt: newStream.publishedAt,
            thumbnail: newStream.thumbnail,
            videoId,
          };
        }
        return rVid;
      });
      await rStream.save();
    }

    const relatedClips = await Clip.find({
      "srcVideos.videoId": videoId,
    });

    for (const rClip of relatedClips) {
      rClip.srcVideos = rClip.srcVideos.map((rVid) => {
        if (rVid.videoId === videoId) {
          return {
            existing: true,
            id: newStream.id.toString(),
            title: newStream.title,
            uploader: newStream.uploader,
            publishedAt: newStream.publishedAt,
            thumbnail: newStream.thumbnail,
            videoId,
          };
        }
        return rVid;
      });
      await rClip.save();
    }

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
                $in: ["$$videoId", "$srcVideos.videoId"],
              },
            },
          },
          { $sort: { publisedAt: -1 } },
        ],
        as: "clips",
      });

    if (!stream) {
      return next(new ErrorResponse("Stream not found", 404));
    }
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

    const currentStream = await Stream.findById(req.params.id);

    let rVideos = relatedVideos;

    rVideos = rVideos.filter(
      (elem, index) =>
        rVideos.findIndex((obj) => obj.videoId === elem.videoId) === index
    );

    for (const video of rVideos) {
      const existingVideo = await Stream.findOne({ videoId: video.videoId });
      if (existingVideo) {
        Object.assign(video, {
          existing: true,
          id: existingVideo.id.toString(),
          title: existingVideo.title,
          uploader: existingVideo.uploader,
          publishedAt: existingVideo.publishedAt,
          thumbnail: existingVideo.thumbnail,
        });

        existingVideo.relatedVideos = existingVideo.relatedVideos
          .concat({
            existing: true,
            videoId: currentStream.videoId,
            id: currentStream.id.toString(),
            title: currentStream.title,
            uploader: currentStream.uploader,
            publishedAt: currentStream.publishedAt,
            thumbnail: currentStream.thumbnail,
          })
          .sort((a, b) => a.publishedAt - b.publishedAt);
        existingVideo.relatedVideos = existingVideo.relatedVideos.filter(
          (elem, index) =>
            existingVideo.relatedVideos.findIndex(
              (obj) => obj.videoId === elem.videoId
            ) === index
        );

        await existingVideo.save();
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

    const stream = await Stream.findByIdAndUpdate(
      req.params.id,
      { ...formData, relatedVideos: rVideos },
      {
        new: true,
      }
    );
    await stream.save();

    res.status(200).json(stream);
  } catch (err) {
    next(error);
  }
};

export const deleteStream = async (req, res, next) => {
  try {
    const relatedStreams = await Stream.find({
      "relatedVideos.id": req.params.id,
    });

    for (const rStream of relatedStreams) {
      rStream.relatedVideos = rStream.relatedVideos.filter(
        (rVid) => rVid.id !== req.params.id
      );
      await rStream.save();
    }

    const relatedClips = await Clip.find({
      "srcVideos.id": req.params.id,
    });

    for (const rClip of relatedClips) {
      rClip.srcVideos = rClip.srcVideos.filter(
        (rVid) => rVid.id !== req.params.id
      );
      await rClip.save();
    }

    const stream = await Stream.findByIdAndDelete(req.params.id);
    if (!stream) {
      return next(new ErrorResponse("Stream not found", 404));
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
