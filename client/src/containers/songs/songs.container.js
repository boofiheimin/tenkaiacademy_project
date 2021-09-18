import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArtists } from "../../actions/artists.actions";

import {
  getSongs,
  createSong,
  deleteSong,
  editSong,
} from "../../actions/songs.actions";

import Songs from "../../components/songs/songs";

const SongsContainer = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists);
  const songs = useSelector((state) => state.songs);

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getSongs());
  }, [dispatch]);

  const onAddSong = (song) => {
    dispatch(createSong(song));
  };
  const onRemoveSong = (id) => {
    dispatch(deleteSong(id));
  };

  const onSongSave = (id, song) => {
    dispatch(editSong(id, song));
  };

  return (
    <Songs
      songs={songs}
      artists={artists}
      onAddSong={onAddSong}
      onRemoveSong={onRemoveSong}
      onSongSave={onSongSave}
    />
  );
};

export default SongsContainer;
