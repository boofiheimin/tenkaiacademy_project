import Artist from "../models/artist.js";
import Song from "../models/stream.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getArtists = async (req, res, next) => {
  try {
    const artists = await Artist.find(
      {},
      {
        _id: 1,
        artistId: 1,
        artistNameEN: 1,
        artistNameJP: 1,
      }
    );
    res.status(200).json(artists);
  } catch (error) {
    return next(error);
  }
};

export const createArtist = async (req, res, next) => {
  try {
    const artist = req.body;
    const latestArtist = await Artist.find()
      .sort({ artistId: -1 })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(1);
    let index;
    if (latestArtist.length === 0) {
      index = 1;
    } else {
      index = `${parseInt(latestArtist[0].artistId, 10) + 1}`;
    }
    const newartist = new Artist({ ...artist, artistId: index });
    await newartist.save();
    res.status(200).json(newartist);
  } catch (error) {
    next(error);
  }
};

export const editArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await artist.save();

    // //cascasde update
    // await Stream.updateMany(
    //   { "artists.artistId": req.body.artistId },
    //   {
    //     $set: {
    //       "artists.$.artistNameEN": req.body.artistNameEN,
    //       "artists.$.artistNameJP": req.body.artistNameJP,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    res.status(200).json(artist);
  } catch (err) {
    return next(error);
  }
};

export const deleteArtist = async (req, res, next) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      return next(new ErrorResponse("Artist not found", 404));
    }

    // //cascade delete

    // await Stream.updateMany(
    //   { "artists.artistId": artist.artistId },
    //   {
    //     $pull: {
    //       artists: { artistId: artist.artistId },
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );

    res.status(200).json(artist);
  } catch (err) {
    return next(error);
  }
};
