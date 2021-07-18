import Stream from "../models/Stream.js";
import ErrorResponse from "../utils/ErrorResponse.js";

import Youtube from "youtube-api";
import moment from "moment";

import { KANATA_CHANNEL_ID } from "../constants/main.js";

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

export const refetch_all = async (req, res, next) => {
  try {
    Youtube.authenticate({
      type: "key",
      key: process.env.YOUTUBE_API_KEY || null,
    });

    let totalData = [];
    let fetchRound = 1;

    const firstSet = await Youtube.search.list({
      maxResults: 50,
      channelId: KANATA_CHANNEL_ID,
      part: "id",
      order: "date",
    });

    console.log(`${fetchRound} round of fetch`);

    fetchRound += 1;

    totalData = [...firstSet.data.items];
    let pageToken = firstSet.data.nextPageToken;

    while (true) {
      console.log(`${fetchRound} round of fetch`, pageToken);
      const { data } = await Youtube.search.list({
        maxResults: 50,
        channelId: KANATA_CHANNEL_ID,
        part: "id",
        order: "date",
        pageToken,
      });
      fetchRound += 1;

      totalData = totalData.concat(data.items);
      if (!data.nextPageToken) {
        break;
      }
      pageToken = data.nextPageToken;
    }

    let totalAdd = 0;

    await Promise.all(
      totalData.map(async (data) => {
        if (data?.id?.videoId) {
          const results = await Youtube.videos.list({
            maxResults: 1,
            id: data.id.videoId,
            part: "snippet, contentDetails",
          });

          const video = results?.data?.items[0];

          const videoParams = {
            videoId: video?.id,
            title: video?.snippet?.title,
            thumbnail: video?.snippet?.thumbnails?.high?.url,
            uploader: video?.snippet?.channelTitle,
            duration: moment
              .duration(video?.contentDetails?.duration)
              .asSeconds(),
            publishedAt: new Date(video?.snippet?.publishedAt),
            source: "youtube",
          };

          if (video?.snippet?.liveBroadcastContent === "none") {
            await Stream.updateMany(
              { videoId: videoParams.videoId },
              videoParams,
              {
                upsert: true,
                setDefaultsOnInsert: true,
              }
            );
            totalAdd += 1;
          }
        } else {
          console.log(data);
        }
      })
    );

    const message = `Successfully Add: ${totalAdd} Streams`;
    console.log(message);
    res.status(200).json({
      message,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};
