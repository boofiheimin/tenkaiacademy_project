import Tag from "../models/tag.js";
import Stream from "../models/stream.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getTags = async (req, res, next) => {
  try {
    const { clip } = req.query;
    const tags = await Tag.find(
      clip ? { tagNameEN: { $ne: "Private" } } : { isClip: false },
      {
        _id: 1,
        catId: 1,
        tagId: 1,
        tagNameEN: 1,
        tagNameJP: 1,
        isClip: 1,
      }
    );
    res.status(200).json(tags);
  } catch (error) {
    return next(error);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const tag = req.body;
    const latestTag = await Tag.find({
      isClip: tag.isClip,
    })
      .sort({ tagId: -1 })
      .collation({ locale: "en_US", numericOrdering: true })
      .limit(1);
    let index;

    if (latestTag.length === 0) {
      index = tag.isClip ? "C1" : 1;
    } else {
      index = tag.isClip
        ? `C${parseInt(latestTag[0].tagId.substring(1), 10) + 1}`
        : `${parseInt(latestTag[0].tagId, 10) + 1}`;
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
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    await tag.save();

    //cascasde update
    await Stream.updateMany(
      { "tags.tagId": req.body.tagId },
      {
        $set: {
          "tags.$.tagNameEN": req.body.tagNameEN,
          "tags.$.tagNameJP": req.body.tagNameJP,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json(tag);
  } catch (error) {
    return next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return next(new ErrorResponse("Tag not found", 404));
    }

    //cascade delete

    await Stream.updateMany(
      { "tags.tagId": tag.tagId },
      {
        $pull: {
          tags: { tagId: tag.tagId },
        },
      },
      {
        new: true,
      }
    );
    res.status(200).json(tag);
  } catch (error) {
    return next(error);
  }
};
