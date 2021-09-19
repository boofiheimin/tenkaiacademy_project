import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
  Checkbox,
  Box,
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

const MusicRecord = ({ record = {}, onSave, onRemove, songs }) => {
  const {
    songData,
    streamData,
    songStart: propSongStart,
    songEnd: propSongEnd,
    isScuffed: propIsScuffed,
  } = record;
  const [mode, setMode] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [songStart, setSongStart] = useState("");
  const [songEnd, setSongEnd] = useState("");
  const [isScuffed, setIsScuffed] = useState(false);
  const [publishedAt, setPublishedAt] = useState("");
  const [songError, setSongError] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [songValue, setSongValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (record) {
      setVideoId(streamData.videoId);
      setSongStart(propSongStart);
      setSongEnd(propSongEnd);
      setIsScuffed(propIsScuffed);
      setPublishedAt(streamData.publishedAt);
      setSongValue(songs.find((song) => song.songId === songData.songId));
    }
  }, [record]);

  const toggleState = () => {
    if (mode) {
      onSave(record._id, {
        videoId,
        songId: songValue.songId,
        songStart,
        songEnd,
        isScuffed,
      });
    }
    setMode(!mode);
  };

  const handleVideoIdChange = (e) => {
    setVideoId(e.target.value);
    setPublishedAt(null);
  };
  const handleSongStartChange = (e) => {
    setSongStart(e.target.value);
  };
  const handleSongEndChange = (e) => {
    setSongEnd(e.target.value);
  };

  const handleRemove = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopperConfirm = () => {
    onRemove(record._id);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const handleIsScuffedChange = (e) => {
    setIsScuffed(e.target.checked);
  };

  const handleOnSongChange = (e, v) => {
    setSongValue(v);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const classes = useStyles();

  const artistNames = songData.artists.map((artist) => artist.artistNameEN);

  return (
    <TableRow>
      <TableCell>
        {mode ? (
          <Autocomplete
            options={songs}
            value={songValue}
            onChange={handleOnSongChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            getOptionSelected={(o, v) => o._id === v._id}
            getOptionLabel={(o) => (o.songNameEN ? o.songNameEN : "")}
            className={classes.songSelector}
            renderInput={(params) => (
              <TextField
                {...params}
                InputLabelProps={{
                  shrink: true,
                }}
                label="Song"
                error={songError}
                style={{ width: "80%" }}
                helperText={songError ? "Please select Song" : null}
              />
            )}
          />
        ) : (
          songData.songNameEN
        )}
      </TableCell>
      <TableCell>
        {artistNames.map((name, index) => (
          <Typography>{`${name}${
            index !== artistNames.length - 1 ? "," : ""
          }`}</Typography>
        ))}
      </TableCell>
      <TableCell>
        <Box width="110px">
          {mode ? (
            <TextField value={videoId} onChange={handleVideoIdChange} />
          ) : (
            <Typography>{videoId}</Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Typography>
          {publishedAt ? moment(publishedAt).format("DD/MM/yyyy") : "---"}
        </Typography>
      </TableCell>
      <TableCell>
        <Box width="38px">
          {mode ? (
            <TextField value={songStart} onChange={handleSongStartChange} />
          ) : (
            <Typography>{songStart}</Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box width="38px">
          {mode ? (
            <TextField value={songEnd} onChange={handleSongEndChange} />
          ) : (
            <Typography>{songEnd}</Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Checkbox
          checked={isScuffed}
          disabled={!mode}
          onChange={handleIsScuffedChange}
        />
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
          popperId={record._id}
          b
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

export default MusicRecord;
