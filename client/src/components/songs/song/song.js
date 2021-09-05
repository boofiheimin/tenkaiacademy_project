import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faSave,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";

import ConfirmationPopper from "../../confirmationPopper/confirmationPopper";

const Artist = ({ song, onSave, onRemove, artists }) => {
  const [mode, setMode] = useState(false);
  const [songNameEN, setEN] = useState("");
  const [songNameJP, setJP] = useState("");
  const [artistNames, setArtist] = useState([]);
  const [catId, setCatId] = useState(song.catId);
  const [anchorEl, setAnchorEl] = useState(null);
  const [artistsValue, setArtistValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    console.log(song);
    if (artists.length > 0) {
      setEN(song.songNameEN);
      setJP(song.songNameJP);
      setArtist(song.artists.map((a) => a.artistNameEN));

      const initArtistValue = song.artists.map((sa) =>
        artists.find((artist) => artist.artistId === sa.artistId)
      );
      console.log(initArtistValue);
      setArtistValue(initArtistValue);
      setCatId(song.catId);
    }
  }, [song, artists]);

  const toggleState = () => {
    const artistIds = artistsValue.map((a) => a.artistId);
    if (mode) {
      onSave(song._id, {
        songNameEN,
        songNameJP,
        songId: song.songId,
        artistIds,
      });
    }
    setMode(!mode);
  };

  const handleOnArtistChange = (e, v) => {
    setArtistValue(v);
  };

  const handleENChange = (e) => {
    setEN(e.target.value);
  };
  const handleJPChange = (e) => {
    setJP(e.target.value);
  };

  const handleRemove = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopperConfirm = () => {
    onRemove(song._id);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const { songId } = song;
  const classes = useStyles();

  console.log(artistsValue);

  return (
    <TableRow key={songId}>
      <TableCell component="th" scope="row">
        <Typography>{songId}</Typography>
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={songNameEN} onChange={handleENChange} />
        ) : (
          <Typography>{songNameEN}</Typography>
        )}
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={songNameJP} onChange={handleJPChange} />
        ) : (
          <Typography>{songNameJP}</Typography>
        )}
      </TableCell>
      <TableCell>
        {mode ? (
          <Autocomplete
            multiple
            options={artists}
            value={artistsValue}
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
              />
            )}
          />
        ) : (
          artistNames.map((name, index) => (
            <Typography>{`${name}${
              index !== artistNames.length - 1 ? "," : ""
            }`}</Typography>
          ))
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          className={classes.actionButton}
          onClick={toggleState}
          key={mode ? "fas fa-save" : "fas fa-edit"}
        >
          <FontAwesomeIcon icon={mode ? faSave : faEdit} />
        </Button>
        <Button className={classes.actionButton} onClick={handleRemove}>
          <FontAwesomeIcon icon={faMinusSquare} />
        </Button>
        <ConfirmationPopper
          popperId={songId}
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

Artist.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string,
    songId: PropTypes.string,
    songNameEN: PropTypes.string,
    songNameJP: PropTypes.string,
    catId: PropTypes.string,
  }),
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
};

Artist.defaultProps = {
  song: {
    _id: null,
    songId: null,
    songNameEN: "",
    songNameJP: "",
    catId: null,
  },
  onSave: () => {},
  onRemove: () => {},
};

export default Artist;
