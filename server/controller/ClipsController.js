import Stream from "../models/Stream.js";
import Clip from "../models/Clip.js";
import Tag from "../models/Tag.js";
import ErrorResponse from "../utils/ErrorResponse.js";

import Youtube from "youtube-api";
import moment from "moment";

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
    const { videoId, srcVideoId } = req.body;

    const streams = await Stream.find({ videoId: srcVideoId });

    if (streams.length === 0) {
      return next(
        new ErrorResponse(
          `Stream with videoId ${srcVideoId} not found in library`,
          404
        )
      );
    }

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
        srcVideo: {
          id: streams[0]._id,
          videoId: streams[0].videoId,
          uploader: streams[0].uploader,
          title: streams[0].title,
        },
        videoId: video?.id,
        title: video?.snippet?.title,
        thumbnail: video?.snippet?.thumbnails?.high?.url,
        uploader: video?.snippet?.channelTitle,
        duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
        publishedAt: new Date(video?.snippet?.publishedAt),
        tags: streams[0].tags,
      };
    } else {
      return next(new ErrorResponse(`${videoId} not found`, 404));
    }

    const newClip = new Clip(videoParams);
    console.log(newClip);
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
    res.status(200).json(clip);
  } catch (err) {
    next(err);
  }
};

export const editClip = async (req, res, next) => {
  try {
    const formData = req.body;

    const { relatedVideos } = formData;

    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    const currentClip = await Clip.findById(req.params.id);

    for (const video of relatedVideos) {
      const existingVideo = await Clip.findOne({ videoId: video.videoId });
      if (existingVideo) {
        Object.assign(video, {
          id: existingVideo.id.toString(),
          title: existingVideo.title,
          uploader: existingVideo.uploader,
          publishedAt: existingVideo.publishedAt,
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

        await existingVideo.save();
      } else {
        return next(
          new ErrorResponse(`Related Clip ${video.videoId} not found`, 404)
        );
      }
    }

    const clip = await Clip.findByIdAndUpdate(req.params.id, formData, {
      new: true,
    });
    await clip.save();

    res.status(200).json(clip);
  } catch (err) {
    next(error);
  }
};

// export const deleteStream = async (req, res, next) => {
//   try {
//     const stream = await Stream.findByIdAndDelete(req.params.id);
//     if (!stream) {
//       return next(new ErrorResponse(("stream not found", 404)));
//     }
//     res.status(200).json(stream);
//   } catch (err) {
//     next(error);
//   }
// };

export const refetchClip = async (req, res, next) => {
  try {
    const { id } = req.params;
    let clip = await Clip.findById(id);
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    // for source vid

    const srcResults = await Youtube.videos.list({
      maxResults: 1,
      id: clip.srcVideo.videoId,
      part: "snippet",
    });
    const srcVidItem = srcResults?.data?.items[0];
    let srcVidParams;
    if (srcVidItem) {
      srcVidParams = {
        ...clip.srcVideo,
        title: srcVidItem?.snippet?.title,
        uploader: srcVidItem?.snippet?.channelTitle,
      };
    } else {
      return next(new ErrorResponse("Source not found", 404));
    }

    // for clip

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
    clip.srcVideo = srcVidParams;

    await clip.save();
    res.status(200).json(clip);
  } catch (error) {
    next(error);
  }
};
