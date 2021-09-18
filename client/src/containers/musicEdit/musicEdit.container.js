import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// import { getArtists } from "../../actions/artists.actions";

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

  useEffect(() => {
    // dispatch(getSongs());
  }, [dispatch]);

  const onAddSong = (song) => {
    //  dispatch(createSong(song));
  };
  const onRemoveSong = (id) => {
    //    dispatch(deleteSong(id));
  };

  const onSongSave = (id, song) => {
    //     dispatch(editSong(id, song));
  };

  return (
    <MusicEdit
      musicRecords={[
        {
          _id: "1",
          songNameEN: "Byoushin wo Kamu",
          artistNameEN: "ZUTOMAYO",
          streamedAt: new Date(),
        },
      ]}
    />
  );
};

export default MusicEditContainer;
