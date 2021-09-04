import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faEdit,
  faMinusSquare,
} from "@fortawesome/free-solid-svg-icons";

import ConfirmationPopper from "../../../confirmationPopper/confirmationPopper";
import { secondsTohhmmss, hhmmssRegEx } from "../../../../helper";

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
  const [mode, setMode] = useState(false);
  const [errorValidate, setErrorValidate] = useState(false);

  useEffect(() => {
    setTimestamp(secondsTohhmmss(propTimestamp));
    setDesc(propDesc);
  }, [propTimestamp, propDesc]);

  const toggleState = () => {
    if (mode) {
      const match = timestamp.match(hhmmssRegEx);
      if (match === null) {
        setErrorValidate(true);
      } else {
        setErrorValidate(false);
        onSave({ timestamp, description }, index);
        setMode(!mode);
      }
    } else {
      setMode(!mode);
    }
  };
  const handleTimeChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
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
          disabled={!mode}
          error={errorValidate}
          helperText={errorValidate ? "Invalid Format" : null}
        />
      </TableCell>
      <TableCell style={{ width: 322 }} className={classes.tableCell}>
        <TextareaAutosize
          className={classes.textarea}
          value={description}
          onChange={handleDescChange}
          disabled={!mode}
        />
      </TableCell>
      <TableCell className={classes.tableCell}>
        <div className={classes.actionButtonContainer}>
          <Button
            className={classes.actionButton}
            onClick={toggleState}
            key={mode ? "fas fa-save" : "fas fa-edit"}
          >
            <FontAwesomeIcon icon={mode ? faSave : faEdit} />
          </Button>
          <Button className={classes.actionButton} onClick={handleOnDelete}>
            <FontAwesomeIcon icon={faMinusSquare} />
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
