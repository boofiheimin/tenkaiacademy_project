import mongoose from "mongoose";

const artistSchema = mongoose.Schema(
  {
    artistId: {
      type: String,
      unique: true,
      required: [true, "Please provide a artistId"],
    },
    artistNameEN: {
      type: String,
      unique: true,
      required: [true, "Please provide a artistNameEN"],
    },
    artistNameJP: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Artist = mongoose.model("Artist", artistSchema);

export default Artist;
