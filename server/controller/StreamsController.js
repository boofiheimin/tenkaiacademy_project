import Stream from "../models/Stream.js";

export const getStreams = async (req, res) => {
  const { query, offset, limit, sort = "-publishedAt" } = req.query;

  const paginateOptions = {
    ...(offset && { offset }),
    ...(limit && { limit }),
    ...(sort && { sort }),
  };

  try {
    const streams = await Stream.paginate(JSON.parse(query), paginateOptions);
    res.status(200).json(streams);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStream = async (req, res) => {
  const stream = req.body;
  const newStream = new Stream(stream);

  try {
    await newStream.save();

    res.status(200).json(newStream);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
