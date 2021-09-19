import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import _ from "lodash";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import useStyles from "./styles";

import MusicRecord from "./musicRecord/musicRecord";

function isNumeric(n) {
  return !Number.isNaN(parseFloat(n)) && Number.isFinite(n);
}

const MusicEdit = ({
  musicRecords = [],
  songs,
  onAddMusicRecord,
  onRemoveMusicRecord,
  onMusicRecordSave,
}) => {
  const [songValue, setSongValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [songError, setSongError] = useState(false);
  const [isScuffed, setIsScuffed] = useState(false);

  const [videoId, setVideoId] = useState("");
  const [songStart, setSongStart] = useState("");
  const [songEnd, setSongEnd] = useState("");

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const handleOnSongChange = (e, v) => {
    setSongValue(v);
  };

  const handleOnVideoIDchange = (e) => {
    setVideoId(e.target.value);
  };

  const handleSongStartChange = (e) => {
    if (!_.isNaN(_.toNumber(e.target.value))) {
      setSongStart(e.target.value);
    }
  };
  const handleSongEndChange = (e) => {
    if (!_.isNaN(_.toNumber(e.target.value))) {
      setSongEnd(e.target.value);
    }
  };

  const handleIsScuffedChange = (e) => {
    setIsScuffed(e.target.checked);
  };

  const handleSubmit = () => {
    if (songValue === null) {
      setSongError(true);
    } else {
      onAddMusicRecord({
        videoId,
        songId: songValue.songId,
        songStart,
        songEnd,
        isScuffed,
      });
      setSongError(false);
    }
  };

  const handleClear = () => {
    setVideoId("");
    setSongStart("");
    setSongEnd("");
    setSongValue(null);
    setIsScuffed(false);
  };

  const classes = useStyles();
  return (
    <Container>
      <Typography variant="h6">Song Record Manager</Typography>
      <Box marginTop={2} marginBottom={2}>
        <Paper elevation={3}>
          <Box padding={2}>
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
            <TextField
              label="Video ID"
              value={videoId}
              onChange={handleOnVideoIDchange}
              style={{ width: "80%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Timestamp start"
              value={songStart}
              onChange={handleSongStartChange}
              style={{ width: "80%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Timestamp end"
              value={songEnd}
              onChange={handleSongEndChange}
              style={{ width: "80%" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isScuffed}
                    onChange={handleIsScuffedChange}
                  />
                }
                label="isScuffed?"
              />
            </Box>

            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" onClick={handleClear}>
                Clear
              </Button>
              <Button variant="outlined" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <div className={classes.songTable}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "30%" }}>
                  <Typography>Song</Typography>
                </TableCell>
                <TableCell style={{ width: "25%" }}>
                  <Typography>Artist</Typography>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <Typography>videoId</Typography>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <Typography>Date</Typography>
                </TableCell>
                <TableCell style={{ width: "5%" }}>Start</TableCell>
                <TableCell style={{ width: "5%" }}>End</TableCell>
                <TableCell style={{ width: "5%" }}>isScuffed</TableCell>
                <TableCell style={{ width: "10%" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musicRecords.map((musicRecord) => (
                <MusicRecord
                  record={musicRecord}
                  onRemove={onRemoveMusicRecord}
                  onSave={onMusicRecordSave}
                  songs={songs}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

MusicEdit.propTypes = {};

export default MusicEdit;
