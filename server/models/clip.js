import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const clipSchema = mongoose.Schema(
  {
    videoId: {
      type: String,
      unique: true,
      required: [true, "Please provide a videoIds"],
    },
    srcVideos: {
      type: Array,
      default: [],
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
    uploader: {
      type: String,
      default: "Kanata Ch. 天音かなた",
    },
    relatedVideos: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

clipSchema.plugin(mongoosePaginate);

const Clip = mongoose.model("Clip", clipSchema);

export default Clip;
