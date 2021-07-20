import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  TableCell,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import ConfirmationPopper from "../../../ConfirmationPopper/ConfirmationPopper";

import useStyles from "./styles";

const TimestampCell = ({
  row: { timestamp: propTimestamp, description: propDesc },
  index,
  onSave,
  onDelete,
}) => {
  const [timestamp, setTimestamp] = useState(0);
  const [description, setDesc] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setTimestamp(moment.duration(propTimestamp, "seconds").format("hh:mm:ss"));
    setDesc(propDesc);
  }, [propTimestamp, propDesc]);

  const handleTimeChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleOnSave = () => {
    const regex = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/g;

    const match = timestamp.match(regex);

    console.log(match);

    onSave({ timestamp, description }, index);
  };

  const handleOnDelete = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopperConfirm = () => {
    onDelete(index);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <>
      <TableCell style={{ width: 138 }} className={classes.tableCell}>
        <TextField
          placeholder="00:00:00"
          value={timestamp}
          onChange={handleTimeChange}
        />
      </TableCell>
      <TableCell style={{ width: 322 }} className={classes.tableCell}>
        <TextareaAutosize
          className={classes.textarea}
          value={description}
          onChange={handleDescChange}
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <div className={classes.actionButtonContainer}>
          <Button className={classes.editButton} onClick={handleOnSave}>
            <SaveIcon />
          </Button>
          <Button className={classes.removeButton} onClick={handleOnDelete}>
            <DeleteIcon />
          </Button>
          <ConfirmationPopper
            popperId={index}
            onPopperConfirm={handlePopperConfirm}
            onPopperCancel={handlePopperCancel}
            anchorEl={anchorEl}
          />
        </div>
      </TableCell>
    </>
  );
};

TimestampCell.propTypes = {
  row: PropTypes.objectOf({
    timestamp: PropTypes.string,
    description: PropTypes.string,
  }),
  index: PropTypes.number,
  onSave: PropTypes.func,
  onDelete: PropTypes.func,
};

TimestampCell.defaultProps = {
  row: { timestamp: "", description: "" },
  index: 0,
  onSave: () => {},
  onDelete: () => {},
};

export default TimestampCell;
