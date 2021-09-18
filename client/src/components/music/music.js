import { useRef, useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import _ from "lodash";

import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import LoopIcon from "@material-ui/icons/Loop";
import ShuffleIcon from "@material-ui/icons/Shuffle";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import ResponsiveYoutube from "../responsiveYoutube/responsiveYoutube";
import useStyles from "./styles";
import Song from "./song/song";

import DragAndDrop from "../dragAndDrop/dragAndDrop";

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
    id: uuidv4(),
    name: "秒針を噛む",
    artist: "ずっと真夜中でいいのに。",
    videoId: "_kT4a8IzM70",
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: "ヒバナ",
    artist: "DECO*27",
    videoId: "USrIMGRBA78",
    date: new Date(),
  },
  {
    id: uuidv4(),
    name: "Kaibutsu",
    artist: "YOASOBI",
    videoId: "o5NMoZGWkDY",
    start: 1199,
    // end: 1408,
    end: 1200,
    date: new Date(),
  },
];

const totalPages = 15;
const page = 1;

const Music = ({ musicRecords }) => {
  const classes = useStyles();
  const youtubeRef = useRef();
  const [queue, setQueue] = useState([]);
  const [playIndex, setPlayIndex] = useState(-1);
  const [shuffledList, setShuffledList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [shufflePool, setShufflePool] = useState([]);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [clearQModal, setClearQModal] = useState(false);

  useEffect(() => {
    if (currentSong) {
      const { videoId, start, end } = currentSong;
      youtubeRef.current.loadVideo(videoId, start, end);
    }
  }, [currentSong]);

  const handlePlay = (id, name, start, end) => {
    const newItem = {
      id: uuidv4(),
      text: name,
      videoId: id,
      start,
      end,
    };
    setCurrentSong(newItem);
    if (queue.length === 0) {
      setPlayIndex(0);
      setQueue([newItem]);
    } else {
      setClearQModal(true);
    }
  };

  const handleClearQPlay = () => {
    setPlayIndex(0);
    setQueue([currentSong]);
    setClearQModal(false);
  };

  const handleNotClearQPLay = () => {
    setPlayIndex(queue.length);
    setQueue([...queue, currentSong]);
    setClearQModal(false);
  };

  const handleCloseQModal = () => {
    setClearQModal(false);
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
      setPlayIndex(queue.length);
    } else if (currentSong && shuffle) {
      setShufflePool(_.shuffle([...shufflePool, newItem.id]));
    }
    const newQueue = [...queue, newItem];
    setQueue(newQueue);
  };

  const handleRemove = (id) => {
    const removedIndex = queue.findIndex((item) => item.id === id);
    if (removedIndex < playIndex) {
      setPlayIndex(playIndex - 1);
    }
    setQueue(queue.filter((item) => item.id !== id));
    setShuffledList(shuffledList.filter((item) => item !== id));
    setShufflePool(shufflePool.filter((item) => item !== id));
  };

  const handleReorder = (reoderedItem) => {
    const currrentIndex = reoderedItem.findIndex(
      (e) => e.id === currentSong?.id
    );
    setQueue(reoderedItem);
    setPlayIndex(currrentIndex);
  };

  const handleSkipNext = () => {
    if (shuffle) {
      const newShuffledList = [...shuffledList, currentSong.id];
      if (newShuffledList.length === queue.length) {
        if (loop) {
          const nextSongId = newShuffledList.shift();
          const nextSongIndex = queue.findIndex(
            (item) => item.id === nextSongId
          );
          setCurrentSong(queue[nextSongIndex]);
          setPlayIndex(nextSongIndex);
          setShuffledList([]);
          setShufflePool(newShuffledList);
        } else {
          setCurrentSong(null);
          setPlayIndex(queue.length);
          setShuffledList(newShuffledList);
        }
      } else {
        const newShuffledPool = [...shufflePool];
        const nextSongId = newShuffledPool.shift();
        const nextSongIndex = queue.findIndex((item) => item.id === nextSongId);
        setCurrentSong(queue[nextSongIndex]);
        setShufflePool(newShuffledPool);
        setPlayIndex(nextSongIndex);
        setShuffledList(newShuffledList);
      }
    } else {
      let nextIndex = playIndex + 1;
      if (nextIndex >= queue.length) {
        if (loop) {
          nextIndex = 0;
          const nextSong = queue[nextIndex];
          setCurrentSong(nextSong);
        } else setCurrentSong(null);
      } else {
        const nextSong = queue[nextIndex];
        setCurrentSong(nextSong);
      }
      setPlayIndex(nextIndex);
    }
  };

  const handleSkipPrev = () => {
    if (shuffle) {
      if (shuffledList.length === 0) {
        if (loop) {
          let newShuffledList = _.reverse(shufflePool);
          const prevSongId = newShuffledList.shift();
          const prevSongIndex = queue.findIndex(
            (item) => item.id === prevSongId
          );
          if (currentSong) {
            newShuffledList = [currentSong.id, ...newShuffledList];
          }

          setCurrentSong(queue[prevSongIndex]);
          setPlayIndex(prevSongIndex);
          setShuffledList(newShuffledList);
          setShufflePool([]);
        } else youtubeRef.current.seekTime(currentSong?.start || 0);
      } else {
        const newShuffledList = [...shuffledList];
        const prevSongId = newShuffledList.pop();
        const prevSongIndex = queue.findIndex((item) => item.id === prevSongId);
        setCurrentSong(queue[prevSongIndex]);
        setShuffledList(newShuffledList);
        setPlayIndex(prevSongIndex);
        if (currentSong) {
          setShufflePool([currentSong.id, ...shufflePool]);
        }
      }
    } else {
      let prevIndex = playIndex - 1;
      if (prevIndex < 0) {
        if (loop) {
          prevIndex = queue.length - 1;
          const prevSong = queue[prevIndex];
          setCurrentSong(prevSong);
          setPlayIndex(prevIndex);
        } else youtubeRef.current.seekTime(currentSong?.start || 0);
      } else {
        const prevSong = queue[prevIndex];
        setCurrentSong(prevSong);
        setPlayIndex(prevIndex);
      }
    }
  };

  const onQueueClick = (index) => {
    const nextSong = queue[index];
    if (shuffle) {
      setCurrentSong(nextSong);
      const newShuffledList = [...shuffledList, currentSong.id];
      setShuffledList(newShuffledList.filter((id) => id !== nextSong.id));
      setShufflePool(shufflePool.filter((id) => id !== nextSong.id));
    } else {
      setCurrentSong(nextSong);
      setPlayIndex(index);
    }
  };

  const toggleLoop = () => {
    setLoop(!loop);
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle);
    setShuffledList([]);
    if (!shuffle) {
      const pool = queue
        .filter((item) => item.id !== currentSong?.id)
        .map((item) => item.id);
      setShufflePool(_.shuffle(pool));
    }
  };

  return (
    <Container className={classes.root}>
      {localStorage.getItem("authToken") && (
        <Box display="flex" padding={3} justifyContent="flex-end" width="100%">
          <Button variant="outlined" href="/music/edit">
            Manage Songs
          </Button>
        </Box>
      )}
      <Box width="100%">
        <Grid container>
          <Grid item xs={9}>
            <ResponsiveYoutube
              ref={youtubeRef}
              onNext={handleSkipNext}
              showPlaceholder={
                queue.length === 0 || playIndex > queue.length - 1
              }
            />
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">
                  Queue
                  {!(queue.length === 0 || playIndex >= queue.length) &&
                    `: ${shuffle ? shuffledList.length + 1 : playIndex + 1}/${
                      queue.length
                    }`}
                </Typography>
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
                    disabled={queue.length === 0 || playIndex >= queue.length}
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
                  onItemClick={onQueueClick}
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
            {musicRecords.map((record) => (
              <Song
                record={record}
                onPlay={handlePlay}
                onAddQueue={handleAddToQueue}
                key={record._id}
              />
            ))}
          </TableBody>
        </Table>
        <div className={classes.tablePagination}>
          <Typography>{`Page ${page} of ${totalPages}`}</Typography>
          <Button className={classes.actionButton} disabled={page === 1}>
            <FirstPageIcon />
          </Button>
          <Button className={classes.actionButton} disabled={page === 1}>
            <KeyboardArrowLeft />
          </Button>
          <Button
            className={classes.actionButton}
            disabled={page === totalPages}
          >
            <KeyboardArrowRight />
          </Button>
          <Button
            className={classes.actionButton}
            disabled={page === totalPages}
          >
            <LastPageIcon />
          </Button>
        </div>
      </TableContainer>
      <Dialog open={clearQModal} onClose={handleCloseQModal}>
        <DialogContent dividers>
          <Typography>Do you wish to clear the queue?</Typography>
        </DialogContent>
        <DialogActions dividers>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClearQPlay}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNotClearQPLay}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

Music.propTypes = {};

export default Music;
