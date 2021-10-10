import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getArtists,
  createArtist,
  deleteArtist,
  editArtist,
} from "../../actions/artists.actions";

import CommonTable from "../../components/commonTable/commonTable";

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
    <CommonTable
      columnOptions={[
        {
          name: "id",
          width: "10%",
          value: "artistId",
        },
        {
          name: "Artist name EN",
          width: "35%",
          filter: true,
          value: "artistNameEN",
          input: true,
          required: true,
        },
        {
          name: "Artist name JP",
          width: "35%",
          filter: true,
          value: "artistNameJP",

          input: true,
        },
        { name: "Action", width: "20%" },
      ]}
      data={artists}
      onRowSave={onArtistSave}
      onRowRemove={onRemoveArtist}
      onRowAdd={onAddArtist}
    />
  );
};

export default ArtistsContainer;
