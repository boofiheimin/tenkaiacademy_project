import { useState, useEffect } from "react";
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

import TimestampCell from "./TimestampCell/TimestampCell";

import { hhmmssRegEx } from "../../../helper";

import useStyles from "./styles";

const Timestamp = ({
  timestamps: propTimestamps,
  onTimestampSave,
  onDeleteTimestamp,
  onAddTimeStamp,
}) => {
  const [timestamps, setTimestamps] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [description, setDesc] = useState("");
  const [errorValidate, setErrorValidate] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    setTimestamps(propTimestamps);
  }, [propTimestamps]);

  const handleTimeChange = (e) => {
    setTimestamp(e.target.value);
  };

  const handleDescChange = (e) => {
    setDesc(e.target.value);
  };

  const handleOnAddTimestamp = () => {
    const match = timestamp.match(hhmmssRegEx);

    if (match === null) {
      setErrorValidate(true);
    } else {
      setErrorValidate(false);
      setTimestamp("");
      setDesc("");

      onAddTimeStamp({
        timestamp: timestamp.trim(),
        description,
      });
    }
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
              error={errorValidate}
              helperText={errorValidate ? "Invalid Format" : null}
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
              {timestamps.map((row, index) => (
                <TableRow component="tr" scope="row">
                  <TimestampCell
                    row={row}
                    onSave={onTimestampSave}
                    onDelete={onDeleteTimestamp}
                    index={index}
                  />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

Timestamp.propTypes = {
  timestamps: PropTypes.array,
  onTimestampSave: PropTypes.func,
  onDeleteTimestamp: PropTypes.func,
  onAddTimeStamp: PropTypes.func,
};

Timestamp.defaultProps = {
  timestamps: [],
  onTimestampSave: () => {},
  onDeleteTimestamp: () => {},
  onAddTimeStamp: () => {},
};

export default Timestamp;
