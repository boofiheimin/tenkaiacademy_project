import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
  Popper,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import useStyles from "./styles";

import ConfirmationPopper from "../../ConfirmationPopper/ConfirmationPopper";

const Tag = ({ tag, onSave, onRemove }) => {
  const [mode, setMode] = useState(false);
  const [tagNameEN, setEN] = useState(tag.tagNameEN);
  const [tagNameJP, setJP] = useState(tag.tagNameJP);
  const [catId, setCatId] = useState(tag.catId);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setEN(tag.tagNameEN);
    setJP(tag.tagNameJP);
    setCatId(tag.catId);
  }, [tag]);

  const toggleState = () => {
    if (mode) {
      onSave(tag._id, {
        tagNameEN,
        tagNameJP,
        catId,
        tagId: tag.tagId,
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
  const handleCatIdChange = (e) => {
    setCatId(e.target.value);
  };

  const handleRemove = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopperConfirm = () => {
    onRemove(tag._id);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const { tagId } = tag;
  const classes = useStyles();
  return (
    <TableRow key={tagId}>
      <TableCell component="th" scope="row">
        <Typography>{tagId}</Typography>
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={tagNameEN} onChange={handleENChange} />
        ) : (
          <Typography>{tagNameEN}</Typography>
        )}
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={tagNameJP} onChange={handleJPChange} />
        ) : (
          <Typography>{tagNameJP}</Typography>
        )}
      </TableCell>
      <TableCell>
        {mode ? (
          <TextField value={catId} onChange={handleCatIdChange} />
        ) : (
          <Typography>{catId}</Typography>
        )}
      </TableCell>
      <TableCell align="right">
        <Button
          className={classes.actionButton}
          onClick={toggleState}
          key={mode ? "fas fa-save" : "fas fa-edit"}
        >
          <i className={mode ? "fas fa-save" : "fas fa-edit"} />
        </Button>
        <Button className={classes.actionButton} onClick={handleRemove}>
          <i className="fas fa-minus-square" />
        </Button>
        <ConfirmationPopper
          popperId={tagId}
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

Tag.propTypes = {
  tag: PropTypes.shape({
    _id: PropTypes.string,
    tagId: PropTypes.number,
    tagNameEN: PropTypes.string,
    tagNameJP: PropTypes.string,
    catId: PropTypes.number,
  }),
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  tag: {
    _id: null,
    tagId: null,
    tagNameEN: "",
    tagNameJP: "",
    catId: null,
  },
  onSave: () => {},
  onRemove: () => {},
};

export default Tag;
