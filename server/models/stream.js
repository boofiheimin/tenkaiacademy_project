import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const streamSchema = mongoose.Schema(
  {
    videoId: {
      type: String,
      unique: true,
      required: [true, "Please provide a videoIds"],
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: String,
    thumbnail: String,
    duration: {
      type: Number,
      default: 0,
    },
    publishedAt: {
      type: Date,
      default: new Date(),
    },
    tags: {
      type: Array,
      default: [],
    },
    timestamps: {
      type: Array,
      default: [],
    },
    relatedTweets: {
      type: Array,
      default: [],
    },
    relatedVideos: {
      type: Array,
      default: [],
    },
    uploader: {
      type: String,
      default: "Kanata Ch. 天音かなた",
    },
    source: {
      type: String,
      enum: ["youtube-manual", "youtube", "manual"],
    },
    mirror: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

streamSchema.plugin(mongoosePaginate);

const Stream = mongoose.model("Stream", streamSchema);

export default Stream;
