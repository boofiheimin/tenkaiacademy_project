import PropTypes from "prop-types";
import {
  TableCell,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

import { useState } from "react";
import useStyles from "./styles";

const TimestampCell = ({
  row: { timestamp: propTimestamp, description: propDesc },
  index,
  onSave,
  onDelete,
}) => {
  const [timestamp, setTimestamp] = useState(propTimestamp);
  const [description, setDesc] = useState(propDesc);

  const handleTimeChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleOnSave = () => {
    onSave({ timestamp, description }, index);
  };

  const handleOnDelete = () => {
    onDelete(index);
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
