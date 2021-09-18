import mongoose from "mongoose";

const songSchema = mongoose.Schema(
  {
    songId: {
      type: String,
    },
    songNameEN: {
      type: String,
    },
    songNameJP: {
      type: String,
    },
    artists: {
      type: Array,
      default: [],
    },
  },
  { _id: false }
);

const videoSchema = mongoose.Schema(
  {
    videoId: {
      type: String,
      required: true,
    },
    publishedAt: {
      type: Date,
    },
  },
  { _id: false }
);

const musicRecordSchema = mongoose.Schema(
  {
    songData: {
      type: songSchema,
      required: [true, "Please provide a songId"],
    },
    streamData: {
      type: videoSchema,
      required: [true, "Please provide a videoId"],
    },
    songStart: {
      type: Number,
    },
    songEnd: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const MusicRecord = mongoose.model("MusicRecord", musicRecordSchema);

export default MusicRecord;
