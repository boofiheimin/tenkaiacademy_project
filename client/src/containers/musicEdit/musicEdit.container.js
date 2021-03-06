import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import CommonTable from "../../components/commonTable/commonTable";

import {
  getMusicRecords,
  createMusicRecord,
  deleteMusicRecord,
  editMusicRecord,
} from "../../actions/musicRecords.actions";
import { getSongs } from "../../actions/songs.actions";

const MusicEditContainer = () => {
  const dispatch = useDispatch();
  const { data: musicRecords } = useSelector((state) => state.musicRecords);
  const songs = useSelector((state) => state.songs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getMusicRecords());
    dispatch(getSongs());
  }, [dispatch]);

  useEffect(() => {
    if (musicRecords && songs) {
      setLoading(false);
    }
  }, [songs, musicRecords]);

  const mappedInputToParameters = (input) => ({
    ...input,
    songId: input.songData.songId,
  });

  const handleAddMusicRecord = (recordParam) => {
    dispatch(createMusicRecord(mappedInputToParameters(recordParam)));
  };
  const handleRemoveMusicRecord = (id) => {
    dispatch(deleteMusicRecord(id));
  };

  const handleMusicRecordSave = (id, recordParam) => {
    dispatch(editMusicRecord(id, mappedInputToParameters(recordParam)));
  };

  musicRecords.sort((a, b) => {
    if (b.streamData.publishedAt === a.streamData.publishedAt) {
      return a.songIndex - b.songIndex;
    }
    return (
      new Date(b.streamData.publishedAt) - new Date(a.streamData.publishedAt)
    );
  });

  const mappedMusicRecords = musicRecords.map((musicRecord) => ({
    ...musicRecord,
    artistsLabel: musicRecord.songData.artists.map(
      ({ artistNameEN }) => artistNameEN
    ),
    dateLabel: moment(musicRecord.streamData.publishedAt).format("DD/MM/yyyy"),
  }));

  return (
    <CommonTable
      columnOptions={[
        {
          name: "Song",
          width: "30%",
          value: "songData",
          displayValue: "songData.songNameEN",
          input: "text",
          required: true,
          optionLabel: "songNameEN",
          options: songs,
          filter: true,
        },
        {
          name: "Artist",
          width: "25%",
          value: "artistsLabel",
          filter: true,
        },
        {
          name: "videoId",
          width: "10%",
          value: "videoId",
          displayValue: "streamData.videoId",
          input: "text",
          required: true,
          filter: true,
        },
        {
          name: "proxy videoId",
          value: "proxyVideoId",
          displayValue: "streamData.proxyVideoId",
          input: "text",
          hidden: true,
        },
        {
          name: "Date",
          width: "10%",
          value: "streamData.publishedAt",
          displayValue: "dateLabel",
        },
        {
          name: "Song Index",
          value: "songIndex",
          input: "text",
          inputValidation: "number",
          required: true,
          hidden: true,
        },
        {
          name: "Start",
          width: "5%",
          value: "songStart",
          input: "text",
          inputValidation: "number",
        },
        {
          name: "End",
          placeholder: "End - leave blank to use song duration + start",
          width: "5%",
          value: "songEnd",
          input: "text",
          inputValidation: "number",
        },
        {
          name: "isScuffed",
          width: "5%",
          value: "isScuffed",
          input: "boolean",
        },
        { name: "Action", width: "10%" },
      ]}
      data={mappedMusicRecords}
      onRowSave={handleMusicRecordSave}
      onRowRemove={handleRemoveMusicRecord}
      onRowAdd={handleAddMusicRecord}
      loading={loading}
    />
  );
};

export default MusicEditContainer;
