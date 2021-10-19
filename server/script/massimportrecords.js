import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Papa from "papaparse";

import Youtube from "youtube-api";
import moment from "moment";

import MusicRecord from "../models/musicRecord.js";
import Song from "../models/song.js";
import Stream from "../models/stream.js";
import ErrorResponse from "../utils/errorResponse.js";

dotenv.config({ path: "../.env" });

const CONNECTION_URL = process.env.CONNECTION_URL;

const hhmmssToSeconds = (input = "") => {
  const nums = `${input}`.split(":").map((num) => parseInt(num, 10));
  if (nums.length > 3) {
    throw new Error("comon man");
  }
  if (nums.length === 1) {
    return nums[0];
  }

  return nums
    .map((num, index) => num * 60 ** (nums.length - 1 - index))
    .reduce((prev, curr) => prev + curr);
};

const createMusicRecord = async ({
  songId,
  videoId,
  proxyVideoId,
  songStart,
  songEnd,
  isScuffed,
  songIndex,
  featuring,
}) => {
  try {
    const song = await Song.findOne({ songId });
    const stream = await Stream.findOne({ videoId });

    let paramSongStart = hhmmssToSeconds(songStart);
    let paramSongEnd = hhmmssToSeconds(songEnd);

    if (paramSongStart && paramSongEnd) {
      if (paramSongStart >= paramSongEnd) {
        throw new ErrorResponse(`BadRequest: Invalid Song Range`, 400);
      }
    }

    if (!song) {
      throw new ErrorResponse(`Song ${songId} Not Found `, 404);
    }

    if (!stream) {
      throw new ErrorResponse(`Stream ${videoId} Not Found`, 404);
    }

    let proxyVideoDuration;
    if (proxyVideoId) {
      Youtube.authenticate({
        type: "key",
        key: process.env.YOUTUBE_API_KEY || null,
      });
      const results = await Youtube.videos.list({
        maxResults: 1,
        id: proxyVideoId,
        part: "snippet, contentDetails",
      });
      const video = results?.data?.items[0];
      if (!video) {
        return new ErrorResponse(`Invalid Proxy VideoId`, 400);
      } else {
        proxyVideoDuration = moment
          .duration(video?.contentDetails?.duration)
          .asSeconds();
      }
    }

    const { songNameEN, songNameJP, subSongNameEN, artists, duration } = song;
    const { publishedAt } = stream;

    if (paramSongStart && !paramSongEnd) {
      paramSongEnd = paramSongStart + parseInt(duration, 10);
    }

    if (!paramSongStart && !paramSongEnd) {
      paramSongStart = 0;
      paramSongEnd = proxyVideoId ? proxyVideoDuration : stream.duration;
    }

    const newMusicRecordParams = {
      songData: {
        songId,
        songNameEN,
        songNameJP,
        subSongNameEN,
        artists,
      },
      streamData: {
        videoId,
        proxyVideoId,
        publishedAt,
      },
      songStart: paramSongStart,
      songEnd: paramSongEnd,
      isScuffed,
      songIndex,
      featuring,
    };

    const newMusicRecord = new MusicRecord(newMusicRecordParams);

    await newMusicRecord.save();

    console.log(`IMPORTED: ${songIndex} ${songNameEN}`);
  } catch (error) {
    throw error;
  }
};

const main = () => {
  const input = fs.createReadStream("./input/input.csv");
  Papa.parse(input, {
    header: true,
    worker: true,
    complete: async (results) => {
      const { data } = results;
      const records = data.map(({ isScuffed, songIndex, ...rest }) => ({
        ...rest,
        isScuffed: parseInt(isScuffed, 10),
        songIndex: parseInt(songIndex, 10),
      }));

      try {
        for (const record of records) {
          await createMusicRecord(record);
        }
        console.log(`DONE`);
        process.exit(1);
      } catch (err) {
        console.log(`Logged Error: ${err.message}`);
        process.exit(1);
      }
    },
  });
};

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to DB");
    main();
  });
