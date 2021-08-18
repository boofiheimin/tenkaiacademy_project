import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const srcVideoSchema = mongoose.Schema(
  {
    id: mongoose.ObjectId,
    videoId: String,
    title: String,
    uploader: String,
  },
  { _id: false }
);

const clipSchema = mongoose.Schema({
  videoId: {
    type: String,
    unique: true,
    required: [true, "Please provide a videoIds"],
  },
  srcVideo: {
    type: srcVideoSchema,
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
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

clipSchema.plugin(mongoosePaginate);

const Clip = mongoose.model("Clip", clipSchema);

export default Clip;
