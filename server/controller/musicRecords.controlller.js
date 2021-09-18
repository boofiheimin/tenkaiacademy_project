import Artist from "../models/artist.js";
import MusicRecord from "../models/musicRecord.js";
import Song from "../models/song.js";
import Stream from "../models/stream.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getMusicRecords = async (req, res, next) => {
  try {
    const songs = await MusicRecord.find({});
    res.status(200).json(songs);
  } catch (error) {
    return next(error);
  }
};

export const createMusicRecord = async (req, res, next) => {
  try {
    console.log("WHAT");
    const { songId, videoId, songStart, songEnd } = req.body;

    const song = await Song.findOne({ songId });
    const stream = await Stream.findOne({ videoId });

    if (!song || !stream) {
      return next(new ErrorResponse(`Song or Stream NotFound`, 404));
    }

    const { songNameEN, songNameJP, artists } = song;
    const { publishedAt } = stream;

    const newMusicRecordParams = {
      songData: {
        songId,
        songNameEN,
        songNameJP,
        artists,
      },
      streamData: {
        videoId,
        publishedAt,
      },
      songStart,
      songEnd,
    };

    console.log(newMusicRecordParams);

    const newMusicRecord = new MusicRecord(newMusicRecordParams);
    await newMusicRecord.save();

    res.status(200).json(newMusicRecord);
  } catch (error) {
    next(error);
  }
};

export const editMusicRecord = async (req, res, next) => {
  try {
    // res.status(200).json(song);
  } catch (err) {
    return next(error);
  }
};

export const deleteMusicRecord = async (req, res, next) => {
  try {
    //  res.status(200).json(song);
  } catch (err) {
    return next(error);
  }
};
