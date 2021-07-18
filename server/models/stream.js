import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const streamSchema = mongoose.Schema({
  videoId: {
    type: String,
    unique: true,
    equired: [true, "Please provide a videoIds"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  thumbnail: String,
  duration: Number,
  publishedAt: {
    type: Date,
    required: [true, "Please provide publish date"],
  },
  tags: {
    type: Array,
    default: [],
  },
  uploader: {
    type: String,
    required: [true, "Please provide uploader"],
  },
  source: {
    type: String,
    enum: ["admin", "youtube"],
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

streamSchema.plugin(mongoosePaginate);

const Stream = mongoose.model("Stream", streamSchema);

export default Stream;
