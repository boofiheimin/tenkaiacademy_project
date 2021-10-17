import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getArtists } from "../../actions/artists.actions";

import {
  getSongs,
  createSong,
  deleteSong,
  editSong,
} from "../../actions/songs.actions";

import CommonTable from "../../components/commonTable/commonTable";

import { hhmmssToSeconds } from "../../helper";

const SongsContainer = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists);
  const songs = useSelector((state) => state.songs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getArtists());
    dispatch(getSongs());
  }, [dispatch]);

  useEffect(() => {
    if (artists && songs) {
      setLoading(false);
    }
  }, [artists, songs]);

  const mappedInputToParameters = (input) => ({
    ...input,
    artistIds: input.artists.map(({ artistId }) => artistId),
  });

  const onAddSong = (song) => {
    dispatch(createSong(mappedInputToParameters(song)));
  };
  const onRemoveSong = (id) => {
    dispatch(deleteSong(id));
  };

  const onSongSave = (id, song) => {
    dispatch(editSong(id, mappedInputToParameters(song)));
  };

  const mappedSong = songs.map((song) => ({
    ...song,
    artistsLabel: song.artists.map(({ artistNameEN }) => artistNameEN),
  }));

  return (
    <CommonTable
      columnOptions={[
        { name: "id", width: "10%", value: "songId" },
        {
          name: "Song name EN",
          width: "30%",
          filter: true,
          value: "songNameEN",
          input: true,
          required: true,
        },
        {
          name: "Sub name EN",
          value: "subSongNameEN",
          input: true,
          hidden: true,
          placeholder: "For search",
        },
        {
          name: "Song name JP",
          width: "30%",
          filter: true,
          value: "songNameJP",
          input: true,
        },
        {
          name: "Artist EN",
          width: "20%",
          filter: true,
          value: "artists",
          displayValue: "artistsLabel",
          input: "multi",
          optionLabel: "artistNameEN",
          options: artists,
          required: true,
        },
        {
          name: "Duration",
          width: "5%",
          value: "duration",
          input: true,
          inputValidation: "number",
          required: true,
          inputTransform: hhmmssToSeconds,
        },
        { name: "Action", width: "25%" },
      ]}
      data={mappedSong}
      onRowSave={onSongSave}
      onRowRemove={onRemoveSong}
      onRowAdd={onAddSong}
      loading={loading}
    />
  );
};

export default SongsContainer;
