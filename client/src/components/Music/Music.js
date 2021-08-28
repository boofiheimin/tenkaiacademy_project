import { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  Button,
} from "@material-ui/core";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import LoopIcon from "@material-ui/icons/Loop";
import ShuffleIcon from "@material-ui/icons/Shuffle";

import Song from "./Song/Song";
import useStyles from "./styles";
import ResponsiveYoutube from "../ResponsiveYoutube/ResponsiveYoutube";

import DragAndDrop from "../DragAndDrop/DragAndDrop";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const mockSongs = [
  {
    name: "秒針を噛む",
    artist: "ずっと真夜中でいいのに。",
    videoId: "_kT4a8IzM70",
    date: new Date(),
  },
  {
    name: "ヒバナ",
    artist: "DECO*27",
    videoId: "USrIMGRBA78",
    date: new Date(),
  },
  {
    name: "Kaibutsu",
    artist: "YOASOBI",
    videoId: "o5NMoZGWkDY",
    start: 1199,
    // end: 1408,
    end: 1204,
    date: new Date(),
  },
];

const Music = () => {
  const classes = useStyles();
  const youtubeRef = useRef();
  const [queue, setQueue] = useState([]);
  const [playIndex, setPlayIndex] = useState(-1);
  const [shuffledList, setShuffledList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [shufflePool, setShufflePool] = useState([]);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    console.log("CURRENT SONG", currentSong);
    if (currentSong !== null) {
      const { videoId, start, end } = currentSong;
      youtubeRef.current.loadVideo(videoId, start, end);
    }
  }, [currentSong]);

  const handlePlay = (id, start, end) => {
    youtubeRef.current.loadVideo(id, start, end);
    setQueue([]);
    setShuffledList([]);
  };

  const handleAddToQueue = (id, name, start, end) => {
    const newItem = {
      id: uuidv4(),
      text: name,
      videoId: id,
      start,
      end,
    };

    if (!currentSong) {
      setCurrentSong(newItem);
    } else if (currentSong && shuffle) {
      setShufflePool([...shufflePool, newItem.id]);
    }

    const newQueue = [...queue, newItem];
    setQueue(newQueue);
  };
  const handleRemove = (id) => {
    setQueue(queue.filter((item) => item.id !== id));
  };

  const handleReorder = (reoderedItem) => {
    const currrentIndex = reoderedItem.findIndex(
      (e) => e.id === currentSong?.id
    );
    setQueue(reoderedItem);
    setPlayIndex(currrentIndex);
  };

  const handleSkipNext = () => {
    console.log("SKIPNEXT");
    let nextIndex = playIndex + 1;
    if (nextIndex >= queue.length && loop && !shuffle) {
      nextIndex = 0;
    } else if (nextIndex >= queue.length && !shuffle) {
      return setCurrentSong(null);
    }
    setForward(true);
    let nextSong;
    if (shuffle) {
      console.log(shuffledList.length, queue.length);
      if (shuffledList.length >= queue.length) {
        return setCurrentSong(null);
      }
      const nextSongId =
        shufflePool[Math.floor(Math.random() * shufflePool.length)];
      const next = queue.find((song) => song.id === nextSongId);
      console.log(next, nextSongId);

      nextSong = next ?? currentSong;
    } else {
      nextSong = queue[nextIndex];
    }

    return setCurrentSong(nextSong);
  };

  const handleOnPlayerPlay = () => {
    let nextIndex;
    if (forward) {
      nextIndex = playIndex + 1;
    } else {
      nextIndex = playIndex - 1;
    }
    if (nextIndex >= queue.length && loop && !shuffle) {
      setPlayIndex(0);
    } else if (shuffle) {
      setShufflePool(shufflePool.filter((id) => id !== currentSong?.id));
      setShuffledList([...shuffledList, currentSong?.id]);
      console.log(currentSong?.id, queue);
      console.log(queue.findIndex((song) => song.id === currentSong?.id));
      setPlayIndex(queue.findIndex((song) => song.id === currentSong?.id));
    } else {
      setPlayIndex(nextIndex);
    }
  };

  const handleSkipPrev = () => {
    const nextIndex = playIndex - 1;
    setForward(false);
    const nextSong = queue[nextIndex];
    const { videoId, start, end } = nextSong;
    youtubeRef.current.loadVideo(videoId, start, end);
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const toggleShuffle = () => {
    if (!shuffle) {
      setShuffledList([]);
      const pool = queue
        .filter((item) => item.id !== currentSong?.id)
        .map((item) => item.id);
      setShufflePool(pool);
    }
    setShuffle(!shuffle);
  };

  return (
    <Container className={classes.root}>
      <Box width="100%">
        <Grid container>
          <Grid item xs={9}>
            <ResponsiveYoutube
              ref={youtubeRef}
              onNext={handleSkipNext}
              onPlay={handleOnPlayerPlay}
            />
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">Queue</Typography>
                <div>
                  <Button
                    className={classes.actionButton}
                    disabled={queue.length === 0}
                    onClick={handleSkipPrev}
                  >
                    <SkipPreviousIcon />
                  </Button>
                  <Button
                    className={classes.actionButton}
                    disabled={queue.length === 0}
                    onClick={handleSkipNext}
                  >
                    <SkipNextIcon />
                  </Button>
                  <Button className={classes.actionButton} onClick={toggleLoop}>
                    <LoopIcon style={loop ? { color: "#4caf50" } : undefined} />
                  </Button>
                  <Button
                    className={classes.actionButton}
                    onClick={toggleShuffle}
                  >
                    <ShuffleIcon
                      style={shuffle ? { color: "#4caf50" } : undefined}
                    />
                  </Button>
                </div>
              </div>
            </Paper>
            <div className={classes.timestampContainer}>
              <div className={classes.timestampScroller}>
                <DragAndDrop
                  items={queue}
                  onReorderItem={handleReorder}
                  onRemoveItem={handleRemove}
                  activeIndex={playIndex}
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      <TextField
        variant="outlined"
        label="Search"
        className={classes.searchBox}
      />
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: "40%" }}>
                <Typography>Name</Typography>
              </StyledTableCell>
              <StyledTableCell style={{ width: "35%" }}>
                <Typography>Artist</Typography>
              </StyledTableCell>
              <StyledTableCell style={{ width: "5%" }}>
                <Typography>Date</Typography>
              </StyledTableCell>
              <StyledTableCell style={{ width: "20%" }} align="right">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockSongs.map((song) => (
              <Song
                {...song}
                onPlay={handlePlay}
                onAddQueue={handleAddToQueue}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

Music.propTypes = {};

export default Music;
