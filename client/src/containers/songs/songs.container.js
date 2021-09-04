import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getArtists,
  createArtist,
  deleteArtist,
  editArtist,
} from "../../actions/artists.actions";

import Songs from "../../components/songs/songs";

const ArtistsContainer = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(getArtists());
  }, [dispatch]);

  const onAddArtist = (artist) => {
    dispatch(createArtist(artist));
  };
  const onRemoveArtist = (id) => {
    dispatch(deleteArtist(id));
  };

  const onArtistSave = (id, artist) => {
    dispatch(editArtist(id, artist));
  };

  return (
    <Songs
      artists={artists}
      onAddArtist={onAddArtist}
      onRemoveArtist={onRemoveArtist}
      onArtistSave={onArtistSave}
    />
  );
};

export default ArtistsContainer;
