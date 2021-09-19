import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  getMusicRecords,
  createMusicRecord,
  deleteMusicRecord,
  editMusicRecord,
} from "../../actions/musicRecords.actions";
import { getSongs } from "../../actions/songs.actions";

// import {
//   getSongs,
//   createSong,
//   deleteSong,
//   editSong,
// } from "../../actions/songs.actions";

import MusicEdit from "../../components/musicEdit/musicEdit";

const MusicEditContainer = () => {
  const dispatch = useDispatch();
  const musicRecords = useSelector((state) => state.musicRecords);
  const songs = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(getMusicRecords());
    dispatch(getSongs());
  }, [dispatch]);

  const handleAddMusicRecord = (recordParam) => {
    dispatch(createMusicRecord(recordParam));
  };
  const handleRemoveMusicRecord = (id) => {
    dispatch(deleteMusicRecord(id));
  };

  const handleMusicRecordSave = (id, data) => {
    dispatch(editMusicRecord(id, data));
  };

  return (
    <MusicEdit
      musicRecords={musicRecords}
      songs={songs}
      onAddMusicRecord={handleAddMusicRecord}
      onRemoveMusicRecord={handleRemoveMusicRecord}
      onMusicRecordSave={handleMusicRecordSave}
    />
  );
};

export default MusicEditContainer;
