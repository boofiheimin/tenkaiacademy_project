import Tag from "../models/Tag.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    return next(new ErrorResponse(err.message, 500));
  }
};

export const createTag = async (req, res, next) => {
  try {
    const tag = req.body;
    const latestTag = await Tag.find().sort({ tagId: -1 }).limit(1);
    let index;
    if (latestTag.length === 0) {
      index = 1;
    } else {
      index = latestTag[0].tagId + 1;
    }
    const newtag = new Tag({ ...tag, tagId: index });
    await newtag.save();
    res.status(200).json(newtag);
  } catch (error) {
    next(error);
  }
};

export const editTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body);
    await tag.save();

    res.status(200).json(tag);
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return next(new ErrorResponse(("tag not found", 404)));
    }
    res.status(200).json(tag);
  } catch (err) {
    return next(new ErrorResponse((err.message, 500)));
  }
};
