import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    songId: {
      type: String,
      unique: true,
      required: [true, "Please provide a songId"],
    },
    songNameEN: {
      type: String,
      required: [true, "Please provide a songNameEN"],
    },
    songNameJP: {
      type: String,
    },
    artists: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
