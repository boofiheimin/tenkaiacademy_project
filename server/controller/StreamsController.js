import Stream from "../models/Stream.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export const getStreams = async ({ query: reqQuery = {} }, res, next) => {
  const { query = null, offset, limit, sort = "-publishedAt" } = reqQuery;

  const paginateOptions = {
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(sort && { sort }),
  };
  try {
    const streams = await Stream.paginate(JSON.parse(query), paginateOptions);
    res.status(200).json(streams);
  } catch (error) {
    next(error);
  }
};

export const createStream = async (req, res, next) => {
  const stream = req.body;
  const newStream = new Stream(stream);

  try {
    await newStream.save();

    res.status(200).json(newStream);
  } catch (error) {
    next(error);
  }
};

export const getStream = async (req, res, next) => {
  const { id } = req.params;
  try {
    const stream = await Stream.findById(id);
    res.status(200).json(stream);
  } catch (err) {
    return next(new ErrorResponse("Stream not found", 404));
  }
};
