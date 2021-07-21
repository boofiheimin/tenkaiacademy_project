import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Youtube from "youtube-api";
import moment from "moment";

import Stream from "./models/Stream.js";

import { KANATA_CHANNEL_ID } from "./constants/main.js";

const retrieves_all = async () => {
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
      })
    );

    const message = `Successfully Add: ${totalAdd} Streams`;
    console.log(message);
  } catch (err) {
    console.log(err);
  }
};

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;

await mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

console.log("CONNECT TO DB");

await retrieves_all();

process.exit(1);
