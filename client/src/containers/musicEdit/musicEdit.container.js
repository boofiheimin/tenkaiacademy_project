import { useEffect } from "react";
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
  const musicRecords = useSelector((state) => state.musicRecords);
  const songs = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(getMusicRecords());
    dispatch(getSongs());
  }, [dispatch]);

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
          name: "Date",
          width: "10%",
          value: "streamData.publishedAt",
          displayValue: "dateLabel",
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
    />
  );
};

export default MusicEditContainer;
