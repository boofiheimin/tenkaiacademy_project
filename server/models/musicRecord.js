import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const songSchema = mongoose.Schema(
  {
    songId: {
      type: String,
    },
    songNameEN: {
      type: String,
    },
    subSongNameEN: {
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
    proxyVideoId: {
      type: String,
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
    isScuffed: {
      type: Boolean,
      default: false,
    },
    songIndex: {
      type: Number,
      required: [true, "Please provide song index"],
    },
  },
  {
    timestamps: true,
  }
);

musicRecordSchema.plugin(mongoosePaginate);

const MusicRecord = mongoose.model("MusicRecord", musicRecordSchema);

export default MusicRecord;
