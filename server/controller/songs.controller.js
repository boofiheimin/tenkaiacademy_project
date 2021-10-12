import Artist from "../models/artist.js";
import MusicRecord from "../models/musicRecord.js";
import Song from "../models/song.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find(
      {},
      {
        _id: 1,
        songId: 1,
        songNameEN: 1,
        songNameJP: 1,
        artists: 1,
      }
    );
    res.status(200).json(songs);
  } catch (error) {
    return next(error);
  }
};

export const createSong = async (req, res, next) => {
  try {
    const song = req.body;
    const latestSong = await Song.find()
      .sort({ songId: -1 })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(1);
    let index;
    if (latestSong.length === 0) {
      index = 1;
    } else {
      index = `${parseInt(latestSong[0].songId, 10) + 1}`;
    }

    // Bind Artist

    const artists = [];

    console.log(song);

    for (const artistId of song.artistIds) {
      const artist = await Artist.findOne({ artistId: artistId });
      if (!artist) {
        return next(
          new ErrorResponse(`Artist with Id ${artistIds} not found`, 404)
        );
      }

      const { artistNameEN, artistNameJP } = artist;
      artists.push({ artistNameEN, artistNameJP, artistId });
    }

    const newsong = new Song({
      ...song,
      songId: index,
      artists,
    });
    await newsong.save();
    res.status(200).json(newsong);
  } catch (error) {
    next(error);
  }
};

export const editSong = async (req, res, next) => {
  try {
    const songParams = req.body;

    // Bind Artist
    const artists = [];

    for (const artistId of songParams.artistIds) {
      const artist = await Artist.findOne({ artistId: artistId });
      if (!artist) {
        return next(
          new ErrorResponse(`Artist with Id ${artistIds} not found`, 404)
        );
      }
      const { artistNameEN, artistNameJP } = artist;
      artists.push({ artistNameEN, artistNameJP, artistId });
    }

    const song = await Song.findByIdAndUpdate(
      req.params.id,
      { ...songParams, artists },
      {
        new: true,
      }
    );
    await song.save();

    //cascasde update
    await MusicRecord.updateMany(
      { "songData.songId": song.songId },
      {
        $set: {
          "songData.artists": artists,
          "songData.songNameEN": songParams.songNameEN,
          "songData.songNameJP": songParams.songNameJP,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(song);
  } catch (error) {
    return next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      return next(new ErrorResponse("Song not found", 404));
    }

    // //cascade delete
    await MusicRecord.deleteMany({ "songData.songId": song.songId });

    res.status(200).json(song);
  } catch (error) {
    return next(error);
  }
};
