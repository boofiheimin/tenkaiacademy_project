import Youtube from "youtube-api";
import moment from "moment";

import Stream from "../models/Stream.js";

import { KANATA_CHANNEL_ID } from "../constants/main";

export const getStreams = async (req, res) => {
  const { query = {}, offset, limit } = req.body;

  const paginateOptions = {
    ...(offset && { offset }),
    ...(limit && { limit }),
  };

  try {
    const streams = await Stream.paginate(query, paginateOptions);
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

export const getAllKanata = async (req, res) => {
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
  try {
    for (let i = 0; i < totalData.length - 1; i += 1) {
      if (totalData[i]?.id?.videoId) {
        const results = await Youtube.videos.list({
          maxResults: 1,
          id: totalData[i].id.videoId,
          part: "snippet, contentDetails",
        });

        const video = results?.data?.items[0];
        const videoParams = {
          videoId: video?.id,
          title: video?.snippet?.title,
          thumbnail: video?.snippet?.thumbnails?.standard?.url,
          duration: moment
            .duration(video?.contentDetails?.duration)
            .asSeconds(),
          publishedAt: new Date(video?.snippet?.publishedAt),
        };

        if (video?.snippet?.liveBroadcastContent === "none") {
          const newStream = new Stream(videoParams);
          await newStream.save();
          totalAdd += 1;
        }
      }
    }

    const message = `Successfully Add: ${totalAdd} Streams`;
    console.log(message);
    res.status(200).json({ message });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
