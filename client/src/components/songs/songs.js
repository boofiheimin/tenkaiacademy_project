import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Divider,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Song from "./song/song";

import useStyles from "./styles";

const Songs = ({
  songs: propSongs,
  artists,
  onSongSave,
  onRemoveSong,
  onAddSong,
}) => {
  const classes = useStyles();
  const [songNameEN, setEN] = useState("");
  const [artistValue, setArtistValue] = useState(null);
  const [songNameJP, setJP] = useState("");
  const [songs, setSongs] = useState(propSongs);
  const [enError, setENError] = useState(false);
  const [artistError, setArtistError] = useState(false);
  const [filterEN, setFilterEN] = useState("");
  const [filterJP, setFilterJP] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setSongs(propSongs);
  }, [propSongs]);

  const handleENChange = (e) => {
    setEN(e.target.value);
  };
  const handleJPChange = (e) => {
    setJP(e.target.value);
  };
  const handleOnArtistChange = (e, v) => {
    setArtistValue(v);
  };

  const handleAddSong = () => {
    if (songNameEN === "") {
      setENError(true);
    }
    if (artistValue === null) {
      setArtistError(true);
    }

    if (songNameEN !== "" && artistValue !== null) {
      onAddSong({
        songNameEN,
        songNameJP,
      });
      setEN("");
      setJP("");

      setENError(false);
      setArtistError(false);
    }
  };

  const handleENSearch = (e) => {
    const { value } = e.target;
    setFilterEN(value);
  };

  const handleJPSearch = (e) => {
    const { value } = e.target;
    setFilterJP(value);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  let filtered = songs;

  if (filterEN !== "") {
    filtered = filtered.filter((item) => item.songNameEN.includes(filterEN));
  }
  if (filterJP !== "") {
    filtered = filtered.filter((item) => item.songNameJP.includes(filterJP));
  }

  console.log(songs);

  return (
    <Container>
      <div className={classes.input}>
        <TextField
          label="Song name EN"
          value={songNameEN}
          error={enError}
          helperText={enError ? "Please provide song name" : null}
          onChange={handleENChange}
        />
        <TextField
          label="Song name JP"
          value={songNameJP}
          onChange={handleJPChange}
        />
        <Autocomplete
          options={artists}
          value={artistValue}
          onChange={handleOnArtistChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          getOptionSelected={(o, v) => o._id === v._id}
          getOptionLabel={(o) => (o.artistNameEN ? o.artistNameEN : "")}
          className={classes.artistsSelector}
          renderInput={(params) => (
            <TextField
              {...params}
              InputLabelProps={{
                shrink: true,
              }}
              error={artistError}
              helperText={artistError ? "Please select Artist" : null}
            />
          )}
        />
        <Button variant="contained" onClick={handleAddSong}>
          Add Song
        </Button>
      </div>
      <Divider />
      <div className={classes.songTable}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>id</TableCell>
                <TableCell style={{ width: "30%" }}>
                  <div>EN</div>
                  <input
                    type="text"
                    onChange={handleENSearch}
                    placeholder="search by en"
                  />
                </TableCell>
                <TableCell style={{ width: "30%" }}>
                  <div>JP</div>
                  <input
                    type="text"
                    onChange={handleJPSearch}
                    placeholder="search by jp"
                  />
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <div>Artist EN</div>
                  <input
                    type="text"
                    onChange={handleJPSearch}
                    placeholder="search by jp"
                  />
                </TableCell>
                <TableCell style={{ width: "20%" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((song) => (
                <Song
                  song={song}
                  onSave={onSongSave}
                  onRemove={onRemoveSong}
                  key={song._id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

Songs.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      songId: PropTypes.string,
      songNameEN: PropTypes.string,
      songNameJP: PropTypes.string,
      catId: PropTypes.string,
    })
  ),
  onSongSave: PropTypes.func,
  onRemoveSong: PropTypes.func,
  onAddSong: PropTypes.func,
};
Songs.defaultProps = {
  songs: [],
  onSongSave: () => {},
  onRemoveSong: () => {},
  onAddSong: () => {},
};

export default Songs;
