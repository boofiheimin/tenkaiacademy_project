import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  TextareaAutosize,
  Button,
  Divider,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useState } from "react";
import TimestampCell from "./TimestampCell/TimestampCell";

import useStyles from "./styles";

const Timestamp = ({
  rows,
  onTimestampSave,
  onTimestampDelete,
  onAddTimeStamp,
}) => {
  const [timestamp, setTimestamp] = useState("");
  const [description, setDesc] = useState("");
  const classes = useStyles();

  const handleTimeChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleOnAddTimestamp = () => {
    onAddTimeStamp({
      timestamp,
      description,
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputContainer}>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid container item xs={3} alignItems="center">
            <TextField
              placeholder="00:00:00"
              onChange={handleTimeChange}
              value={timestamp}
            />
          </Grid>
          <Grid container item xs={7} alignItems="center">
            <TextareaAutosize
              className={classes.textarea}
              onChange={handleDescChange}
              value={description}
            />
          </Grid>
          <Grid
            container
            item
            xs={2}
            alignItems="center"
            justifyContent="center"
          >
            <Button
              className={classes.addButton}
              onClick={handleOnAddTimestamp}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider />
      <div className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow component="tr" scope="row">
                {rows.map((row) => (
                  <TimestampCell
                    row={row}
                    onSave={onTimestampSave}
                    onDelete={onTimestampDelete}
                  />
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Timestamp.propTypes = {
  rows: PropTypes.array,
  onTimestampSave: PropTypes.func,
  onTimestampDelete: PropTypes.func,
  onAddTimeStamp: PropTypes.func,
};

Timestamp.defaultProps = {
  rows: [],
  onTimestampSave: () => {},
  onTimestampDelete: () => {},
  onAddTimeStamp: () => {},
};

export default Timestamp;
