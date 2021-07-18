import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tagId: {
    type: Number,
    unique: true,
    equired: [true, "Please provide a tagId"],
  },
  tagNameEN: {
    type: String,
    unique: true,
    required: [true, "Please provide a tagNameEN"],
  },
  tagNameJP: {
    type: String,
  },
  catId: {
    type: Number,
    required: [true, "Please provide a catId"],
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

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
