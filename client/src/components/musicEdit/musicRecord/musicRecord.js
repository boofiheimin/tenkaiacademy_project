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

const MusicRecord = ({ record = {}, onSave, onRemove }) => {
  const [mode, setMode] = useState(false);
  //   const [songNameEN, setEN] = useState("");
  //   const [songNameJP, setJP] = useState("");
  //   const [artistNames, setArtist] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  //   const [artistsValue, setArtistValue] = useState([]);
  //   const [inputValue, setInputValue] = useState("");

  //   useEffect(() => {
  //     if (Array.isArray(artists)) {
  //       setEN(song.songNameEN);
  //       setJP(song.songNameJP);
  //       setArtist(song.artists.map((a) => a.artistNameEN));

  //       const initArtistValue = song.artists.map((sa) =>
  //         artists.find((artist) => artist.artistId === sa.artistId)
  //       );
  //       setArtistValue(initArtistValue);
  //     }
  //   }, [song, artists]);

  const toggleState = () => {
    //   const artistIds = artistsValue.map((a) => a.artistId);
    //   if (mode) {
    //     onSave(song._id, {
    //       songNameEN,
    //       songNameJP,
    //       songId: song.songId,
    //       artistIds,
    //     });
    //   }
    setMode(!mode);
  };

  //   const handleOnArtistChange = (e, v) => {
  //     setArtistValue(v);
  //   };

  //   const handleENChange = (e) => {
  //     setEN(e.target.value);
  //   };
  //   const handleJPChange = (e) => {
  //     setJP(e.target.value);
  //   };

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

  //   const handleInputChange = (e, v) => {
  //     setInputValue(v);
  //   };

  const classes = useStyles();

  const {
    songData,
    streamData,
    songStart,
    songEnd,
    isScuffed = false,
  } = record;
  const artistNames = songData.artists.map((artist) => artist.artistNameEN);

  return (
    <TableRow>
      <TableCell>{songData.songNameEN}</TableCell>
      <TableCell>
        {artistNames.map((name, index) => (
          <Typography>{`${name}${
            index !== artistNames.length - 1 ? "," : ""
          }`}</Typography>
        ))}
      </TableCell>
      <TableCell>
        <Typography>{streamData.videoId}</Typography>
      </TableCell>
      <TableCell>
        <Typography>
          {moment(streamData.publishedAt).format("DD/MM/yyyy")}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography>{songStart}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{songEnd}</Typography>
      </TableCell>
      <TableCell>
        <Checkbox checked={isScuffed} disabled />
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
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

export default MusicRecord;
