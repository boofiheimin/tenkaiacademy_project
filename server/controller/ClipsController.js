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
    res.status(200).json(clip);
  } catch (err) {
    return next(new ErrorResponse("Clip not found", 404));
  }
};

// export const editStream = async (req, res, next) => {
//   try {
//     const formData = req.body;

//     const { relatedVideos } = formData;

//     Youtube.authenticate({
//       type: "key",
//       key: process.env.YOUTUBE_API_KEY || null,
//     });

//     for (const video of relatedVideos) {
//       const existingVideo = await Stream.findOne({ videoId: video.videoId });
//       if (existingVideo) {
//         Object.assign(video, {
//           existing: true,
//           id: existingVideo.id.toString(),
//           title: existingVideo.title,
//           uploader: existingVideo.uploader,
//         });
//       } else {
//         const results = await Youtube.videos.list({
//           maxResults: 1,
//           id: video.videoId,
//           part: "snippet",
//         });
//         const resultVideo = results?.data?.items[0];
//         Object.assign(video, {
//           existing: false,
//           uploader: resultVideo?.snippet?.channelTitle,
//           title: resultVideo?.snippet?.title,
//         });
//       }
//     }

//     const stream = await Stream.findByIdAndUpdate(req.params.id, formData, {
//       new: true,
//     });
//     await stream.save();

//     res.status(200).json(stream);
//   } catch (err) {
//     next(error);
//   }
// };

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

// export const refetchStream = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     let stream = await Stream.findById(id);
//     Youtube.authenticate({
//       type: "key",
//       key: process.env.YOUTUBE_API_KEY || null,
//     });

//     const results = await Youtube.videos.list({
//       maxResults: 1,
//       id: stream.videoId,
//       part: "snippet, contentDetails",
//     });

//     const video = results?.data?.items[0];
//     let videoParams;
//     if (video) {
//       videoParams = {
//         title: video?.snippet?.title,
//         thumbnail: video?.snippet?.thumbnails?.high?.url,
//         uploader: video?.snippet?.channelTitle,
//         duration: moment.duration(video?.contentDetails?.duration).asSeconds(),
//         publishedAt: new Date(video?.snippet?.publishedAt),
//       };
//     } else {
//       return next(new ErrorResponse("Stream not found", 404));
//     }
//     stream.title = videoParams.title;
//     stream.thumbnail = videoParams.thumbnail;
//     stream.uploader = videoParams.uploader;
//     stream.duration = videoParams.duration;
//     stream.publishedAt = videoParams.publishedAt;

//     await stream.save();
//     res.status(200).json(stream);
//   } catch (error) {
//     next(error);
//   }
// };
