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

const Artist = ({ artist, onSave, onRemove }) => {
  const [mode, setMode] = useState(false);
  const [artistNameEN, setEN] = useState(artist.artistNameEN);
  const [artistNameJP, setJP] = useState(artist.artistNameJP);
  const [catId, setCatId] = useState(artist.catId);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setEN(artist.artistNameEN);
    setJP(artist.artistNameJP);
    setCatId(artist.catId);
  }, [artist]);

  const toggleState = () => {
    if (mode) {
      onSave(artist._id, {
        artistNameEN,
        artistNameJP,
        catId,
        artistId: artist.artistId,
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
    onRemove(artist._id);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const { artistId } = artist;
  const classes = useStyles();
  return (
    <TableRow key={artistId}>
      <TableCell component="th" scope="row">
        <Typography>{artistId}</Typography>
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={artistNameEN} onChange={handleENChange} />
        ) : (
          <Typography>{artistNameEN}</Typography>
        )}
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={artistNameJP} onChange={handleJPChange} />
        ) : (
          <Typography>{artistNameJP}</Typography>
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
          popperId={artistId}
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

Artist.propTypes = {
  artist: PropTypes.shape({
    _id: PropTypes.string,
    artistId: PropTypes.string,
    artistNameEN: PropTypes.string,
    artistNameJP: PropTypes.string,
    catId: PropTypes.string,
  }),
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
};

Artist.defaultProps = {
  artist: {
    _id: null,
    artistId: null,
    artistNameEN: "",
    artistNameJP: "",
    catId: null,
  },
  onSave: () => {},
  onRemove: () => {},
};

export default Artist;
