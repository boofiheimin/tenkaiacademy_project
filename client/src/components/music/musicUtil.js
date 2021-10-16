/* eslint-disable import/prefer-default-export */
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export const formatRecordToSong = (record) => {
  const {
    songStart,
    songEnd,
    songData: { songNameEN, artists, songNameJP },
    streamData: { publishedAt, videoId, proxyVideoId },
    isScuffed,
  } = record;

  const artistsLabel = artists
    .map(({ artistNameEN }) => artistNameEN)
    .join(", ");

  return {
    id: uuidv4(),
    start: songStart,
    end: songEnd,
    videoId: proxyVideoId || videoId,
    text: `${songNameEN}${isScuffed ? " (Scuffed)" : ""}`,
    jptext: songNameJP,
    artistsLabel,
    date: moment(publishedAt).format("DD/MM/yyyy"),
  };
};
