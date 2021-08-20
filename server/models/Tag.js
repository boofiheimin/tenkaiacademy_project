import mongoose from "mongoose";

const tagSchema = mongoose.Schema(
  {
    tagId: {
      type: String,
      unique: true,
      required: [true, "Please provide a tagId"],
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
      type: String,
      required: [true, "Please provide a catId"],
    },
    isClip: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
