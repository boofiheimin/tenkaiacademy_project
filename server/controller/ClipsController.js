import Stream from "../models/Stream.js";
import Clip from "../models/Clip.js";
import Tag from "../models/Tag.js";
import ErrorResponse from "../utils/ErrorResponse.js";

import Youtube from "youtube-api";
import moment from "moment";
import _ from "lodash";

export const getClips = async ({ query: reqQuery = {} }, res, next) => {
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
    const clips = await Clip.paginate(srchQuery, paginateOptions);
    res.status(200).json(clips);
  } catch (error) {
    next(error);
  }
};

export const createClip = async (req, res, next) => {
  try {
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    const { videoId, srcVideoIds, tag } = req.body;

    if (!srcVideoIds) {
      return next(
        new ErrorResponse(`Please provide at least 1 source videoId`, 400)
      );
    }

    if (!tag) {
      return next(new ErrorResponse(`Please provide language tag`, 400));
    }

    const splitVideoIds = [...new Set(srcVideoIds.split(","))];

    const streamsParam = [];
    let streamsTags = [];

    for (const srcVideoId of splitVideoIds) {
      const stream = await Stream.findOne({ videoId: srcVideoId });
      if (stream) {
        streamsParam.push({
          existing: true,
          videoId: stream.videoId,
          id: stream.id.toString(),
          title: stream.title,
          uploader: stream.uploader,
          thumbnail: stream.thumbnail,
        });

        streamsTags = [...streamsTags, ...stream.tags];
      } else {
        const results = await Youtube.videos.list({
          maxResults: 1,
          id: srcVideoId,
          part: "snippet",
        });
        const resultVideo = results?.data?.items[0];
        streamsParam.push({
          existing: false,
          videoId: srcVideoId,
          uploader: resultVideo?.snippet?.channelTitle,
          title: resultVideo?.snippet?.title,
        });
      }
    }
    // get rid of unique
    streamsTags = streamsTags.filter(
      (elem, index) =>
        streamsTags.findIndex((obj) => obj.tagId === elem.tagId) === index
    );

    //get rid of private tag
    streamsTags = streamsTags.filter((tag) => tag.tagNameEN !== "Private");

    const results = await Youtube.videos.list({
      maxResults: 1,
      id: videoId,
      part: "snippet, contentDetails",
    });
    const video = results?.data?.items[0];
    let videoParams;
    if (video) {
      videoParams = {
        srcVideos: streamsParam,
        videoId: video?.id,
        title: video?.snippet?.title,
        thumbnail: video?.snippet?.thumbnails?.high?.url,
        uploader: video?.snippet?.channelTitle,
        duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
        publishedAt: new Date(video?.snippet?.publishedAt),
        tags: [...streamsTags, tag],
      };
    } else {
      return next(new ErrorResponse(`${videoId} not found`, 404));
    }

    const newClip = new Clip(videoParams);
    await newClip.save();
    res.status(200).json(newClip);
  } catch (error) {
    next(error);
  }
};

export const getClip = async (req, res, next) => {
  const { id } = req.params;
  try {
    const clip = await Clip.findById(id);
    if (!clip) {
      return next(new ErrorResponse("Clip not found", 404));
    }
    res.status(200).json(clip);
  } catch (err) {
    next(err);
  }
};

export const editClip = async (req, res, next) => {
  try {
    const formData = req.body;

    const { relatedVideos, srcVideos, tags } = formData;

    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    const currentClip = await Clip.findById(req.params.id);
    if (!currentClip) {
      return next(new ErrorResponse("Clip not found", 404));
    }

    let sVideos = srcVideos;

    sVideos = sVideos.filter(
      (elem, index) =>
        sVideos.findIndex((obj) => obj.videoId === elem.videoId) === index
    );

    for (const src of sVideos) {
      const existingSrc = await Stream.findOne({ videoId: src.videoId });
      if (existingSrc) {
        Object.assign(src, {
          existing: true,
          id: existingSrc.id.toString(),
          title: existingSrc.title,
          uploader: existingSrc.uploader,
          publishedAt: existingSrc.publishedAt,
          thumbnail: existingSrc.thumbnail,
        });
      } else {
        const results = await Youtube.videos.list({
          maxResults: 1,
          id: src.videoId,
          part: "snippet",
        });
        const resultVideo = results?.data?.items[0];
        Object.assign(src, {
          existing: false,
          uploader: resultVideo?.snippet?.channelTitle,
          title: resultVideo?.snippet?.title,
        });
      }
    }

    let rVideos = relatedVideos;
    rVideos = rVideos.filter(
      (elem, index) =>
        rVideos.findIndex((obj) => obj.videoId === elem.videoId) === index
    );

    for (const video of rVideos) {
      const existingVideo = await Clip.findOne({ videoId: video.videoId });
      if (existingVideo) {
        Object.assign(video, {
          id: existingVideo.id.toString(),
          title: existingVideo.title,
          uploader: existingVideo.uploader,
          publishedAt: existingVideo.publishedAt,
          existing: true,
        });

        existingVideo.relatedVideos = existingVideo.relatedVideos
          .concat({
            existing: true,
            videoId: currentClip.videoId,
            id: currentClip.id.toString(),
            title: currentClip.title,
            uploader: currentClip.uploader,
            publishedAt: currentClip.publishedAt,
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

    const clip = await Clip.findByIdAndUpdate(
      req.params.id,
      {
        ...formData,
        srcVideos: sVideos,
        relatedVideos: rVideos,
      },
      {
        new: true,
      }
    );
    await clip.save();

    res.status(200).json(clip);
  } catch (error) {
    next(error);
  }
};

export const deleteClip = async (req, res, next) => {
  try {
    const relatedClips = await Clip.find({
      "relatedVideos.id": req.params.id,
    });

    for (const rClip of relatedClips) {
      rClip.relatedVideos = rClip.relatedVideos.filter(
        (rVid) => rVid.id !== req.params.id
      );
      await rClip.save();
    }

    const clip = await Clip.findByIdAndDelete(req.params.id);
    if (!clip) {
      return next(new ErrorResponse("Clip not found", 404));
    }
    res.status(200).json(clip);
  } catch (err) {
    next(error);
  }
};

export const refetchClip = async (req, res, next) => {
  try {
    const { id } = req.params;
    let clip = await Clip.findById(id);
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    const results = await Youtube.videos.list({
      maxResults: 1,
      id: clip.videoId,
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
      return next(new ErrorResponse("Clip not found", 404));
    }
    clip.title = videoParams.title;
    clip.thumbnail = videoParams.thumbnail;
    clip.uploader = videoParams.uploader;
    clip.duration = videoParams.duration;
    clip.publishedAt = videoParams.publishedAt;

    await clip.save();
    res.status(200).json(clip);
  } catch (error) {
    next(error);
  }
};
