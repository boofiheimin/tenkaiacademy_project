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
import useStyles from "./styles";

import ConfirmationPopper from "../../confirmationPopper/confirmationPopper";

const Artist = ({ song, onSave, onRemove }) => {
  const [mode, setMode] = useState(false);
  const [songNameEN, setEN] = useState(song.songNameEN);
  const [songNameJP, setJP] = useState(song.songNameJP);
  const [catId, setCatId] = useState(song.catId);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setEN(song.songNameEN);
    setJP(song.songNameJP);
    setCatId(song.catId);
  }, [song]);

  const toggleState = () => {
    if (mode) {
      onSave(song._id, {
        songNameEN,
        songNameJP,
        catId,
        songId: song.songId,
      });
    }
    setMode(!mode);
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

  const { songId } = song;
  const classes = useStyles();
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
        <Typography>Kenshi Yonezu</Typography>
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
