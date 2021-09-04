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
import Artist from "./Artist/artist";

import useStyles from "./styles";

const Artists = ({
  artists: propArtists,
  onArtistSave,
  onRemoveArtist,
  onAddArtist,
}) => {
  const classes = useStyles();
  const [artistNameEN, setEN] = useState("");
  const [artistNameJP, setJP] = useState("");
  const [artists, setArtists] = useState(propArtists);
  const [enError, setENError] = useState(false);
  const [filterEN, setFilterEN] = useState("");
  const [filterJP, setFilterJP] = useState("");

  useEffect(() => {
    setArtists(propArtists);
  }, [propArtists]);

  const handleENChange = (e) => {
    setEN(e.target.value);
  };
  const handleJPChange = (e) => {
    setJP(e.target.value);
  };

  const handleAddArtist = () => {
    if (artistNameEN === "") {
      setENError(artistNameEN === "");
    } else {
      onAddArtist({
        artistNameEN,
        artistNameJP,
      });
      setEN("");
      setJP("");

      setENError(false);
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

  let filtered = artists;

  if (filterEN !== "") {
    filtered = filtered.filter((item) => item.artistNameEN.includes(filterEN));
  }
  if (filterJP !== "") {
    filtered = filtered.filter((item) => item.artistNameJP.includes(filterJP));
  }

  console.log(artists);

  return (
    <Container>
      <div className={classes.input}>
        <TextField
          label="Artist name EN"
          value={artistNameEN}
          error={enError}
          helperText={enError ? "Please provide artist name" : null}
          onChange={handleENChange}
        />
        <TextField
          label="Artist name JP"
          value={artistNameJP}
          onChange={handleJPChange}
        />
        <Button variant="contained" onClick={handleAddArtist}>
          Add Artist
        </Button>
      </div>
      <Divider />
      <div className={classes.artistTable}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>id</TableCell>
                <TableCell style={{ width: "35%" }}>
                  <div>EN</div>
                  <input
                    type="text"
                    onChange={handleENSearch}
                    placeholder="search by en"
                  />
                </TableCell>
                <TableCell style={{ width: "35%" }}>
                  <div>JP</div>
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
              {filtered.map((artist) => (
                <Artist
                  artist={artist}
                  onSave={onArtistSave}
                  onRemove={onRemoveArtist}
                  key={artist._id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

Artists.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      artistId: PropTypes.string,
      artistNameEN: PropTypes.string,
      artistNameJP: PropTypes.string,
      catId: PropTypes.string,
    })
  ),
  onArtistSave: PropTypes.func,
  onRemoveArtist: PropTypes.func,
  onAddArtist: PropTypes.func,
};
Artists.defaultProps = {
  artists: [],
  onArtistSave: () => {},
  onRemoveArtist: () => {},
  onAddArtist: () => {},
};

export default Artists;
