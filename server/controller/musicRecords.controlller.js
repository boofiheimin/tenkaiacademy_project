import Youtube from "youtube-api";
import moment from "moment";

import MusicRecord from "../models/musicRecord.js";
import Song from "../models/song.js";
import Stream from "../models/stream.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getMusicRecords = async ({ query: reqQuery = {} }, res, next) => {
  try {
    const { textSearch, page, limit } = reqQuery;

    const paginateOptions = {
      ...(page && { page: parseInt(page, 10) + 1 }),
      ...(limit && { limit }),
      sort: {
        "streamData.publishedAt": -1,
        songIndex: 1,
      },
    };

    const srchQuery = {
      ...(textSearch && {
        $or: [
          { "songData.songNameEN": new RegExp(textSearch, "i") },
          { "songData.songNameJP": new RegExp(textSearch, "i") },
          { "songData.subSongNameEN": new RegExp(textSearch, "i") },
          { "songData.artists.artistNameEN": new RegExp(textSearch, "i") },
          { "songData.artists.artistNameJP": new RegExp(textSearch, "i") },
          { "streamData.videoId": new RegExp(textSearch, "i") },
        ],
      }),
    };

    let songs;

    if ((!limit, !page)) {
      const data = await MusicRecord.find(srchQuery);
      songs = {
        totalDocs: data.length,
        docs: data,
      };
    } else {
      songs = await MusicRecord.paginate(srchQuery, paginateOptions);
    }

    res.status(200).json(songs);
  } catch (error) {
    return next(error);
  }
};

export const createMusicRecord = async (req, res, next) => {
  try {
    const {
      songId,
      videoId,
      proxyVideoId,
      songStart,
      songEnd,
      isScuffed,
      songIndex,
    } = req.body;

    const song = await Song.findOne({ songId });
    const stream = await Stream.findOne({ videoId });

    let paramSongStart = parseInt(songStart, 10);
    let paramSongEnd = parseInt(songEnd, 10);

    if (paramSongStart && paramSongEnd) {
      if (paramSongStart >= paramSongEnd) {
        return next(new ErrorResponse(`BadRequest: Invalid Song Range`, 400));
      }
    }

    if (!song) {
      return next(new ErrorResponse(`Song Not Found`, 404));
    }

    if (!stream) {
      return next(new ErrorResponse(`Stream Not Found`, 404));
    }

    let proxyVideoDuration;
    if (proxyVideoId) {
      Youtube.authenticate({
        type: "key",
        key: process.env.YOUTUBE_API_KEY || null,
      });
      const results = await Youtube.videos.list({
        maxResults: 1,
        id: proxyVideoId,
        part: "snippet, contentDetails",
      });
      const video = results?.data?.items[0];
      if (!video) {
        return next(new ErrorResponse(`Invalid Proxy VideoId`, 400));
      } else {
        proxyVideoDuration = moment
          .duration(video?.contentDetails?.duration)
          .asSeconds();
      }
    }

    const { songNameEN, songNameJP, subSongNameEN, artists, duration } = song;
    const { publishedAt } = stream;

    if (paramSongStart && !paramSongEnd) {
      paramSongEnd = paramSongStart + parseInt(duration, 10);
    }

    if (!paramSongStart && !paramSongEnd) {
      paramSongStart = 0;
      paramSongEnd = proxyVideoId ? proxyVideoDuration : stream.duration;
    }

    const newMusicRecordParams = {
      songData: {
        songId,
        songNameEN,
        songNameJP,
        subSongNameEN,
        artists,
      },
      streamData: {
        videoId,
        proxyVideoId,
        publishedAt,
      },
      songStart: paramSongStart,
      songEnd: paramSongEnd,
      isScuffed,
      songIndex,
    };

    const newMusicRecord = new MusicRecord(newMusicRecordParams);
    await newMusicRecord.save();

    res.status(200).json(newMusicRecord);
  } catch (error) {
    next(error);
  }
};

export const editMusicRecord = async (req, res, next) => {
  try {
    const {
      songId,
      videoId,
      proxyVideoId,
      songStart,
      songEnd,
      isScuffed,
      songIndex,
    } = req.body;

    let paramSongStart = parseInt(songStart, 10);
    let paramSongEnd = parseInt(songEnd, 10);

    if (paramSongStart && paramSongEnd) {
      if (paramSongStart >= paramSongEnd) {
        return next(new ErrorResponse(`BadRequest: Invalid Song Range`, 400));
      }
    }

    const song = await Song.findOne({ songId });
    const stream = await Stream.findOne({ videoId });

    if (!song) {
      return next(new ErrorResponse(`Song Not Found`, 404));
    }

    if (!stream) {
      return next(new ErrorResponse(`Stream Not Found`, 404));
    }

    let proxyVideoDuration;
    if (proxyVideoId) {
      Youtube.authenticate({
        type: "key",
        key: process.env.YOUTUBE_API_KEY || null,
      });
      const results = await Youtube.videos.list({
        maxResults: 1,
        id: proxyVideoId,
        part: "snippet, contentDetails",
      });
      const video = results?.data?.items[0];
      if (!video) {
        return next(new ErrorResponse(`Invalid Proxy VideoId`, 400));
      } else {
        proxyVideoDuration = moment
          .duration(video?.contentDetails?.duration)
          .asSeconds();
      }
    }

    const { songNameEN, songNameJP, artists, subSongNameEN, duration } = song;
    const { publishedAt } = stream;

    if (paramSongStart && !paramSongEnd) {
      paramSongEnd = paramSongStart + parseInt(duration, 10);
    }

    if (!paramSongStart && !paramSongEnd) {
      paramSongStart = 0;
      paramSongEnd = proxyVideoId ? proxyVideoDuration : stream.duration;
    }

    const newMusicRecord = await MusicRecord.findByIdAndUpdate(
      req.params.id,
      {
        songData: {
          songId,
          songNameEN,
          songNameJP,
          subSongNameEN,
          artists,
        },
        streamData: {
          videoId,
          proxyVideoId,
          publishedAt,
        },
        songStart: paramSongStart,
        songEnd: paramSongEnd,
        isScuffed,
        songIndex,
      },
      {
        new: true,
      }
    );
    await newMusicRecord.save();
    res.status(200).json(newMusicRecord);
  } catch (err) {
    return next(err);
  }
};

export const deleteMusicRecord = async (req, res, next) => {
  try {
    const musicRecord = await MusicRecord.findByIdAndDelete(req.params.id);
    if (!musicRecord) {
      return next(new ErrorResponse("Music Record not found", 404));
    }

    res.status(200).json(musicRecord);
  } catch (err) {
    return next(error);
  }
};
