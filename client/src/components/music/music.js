import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { shuffle as _shuffle } from "lodash";
import moment from "moment";

import {
  Container,
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import QueueIcon from "@mui/icons-material/Queue";
import Records from "./records/records";
import CustomPlayer from "./customPlayer/customPlayer";
import Loading from "../loading/loading";

const formatRecordToSong = (record) => {
  const {
    songStart,
    songEnd,
    songData: { songNameEN, artists },
    streamData: { publishedAt, videoId, proxyVideoId },
    isScuffed,
  } = record;

  const artistsLabel = artists
    .map(({ artistNameEN }) => artistNameEN)
    .join(", ");
  return {
    id: uuidv4(),
    start: songStart,
    end: songEnd,
    videoId: proxyVideoId || videoId,
    text: `${songNameEN}${isScuffed ? " (Scuffed)" : ""}`,
    artistsLabel,
    date: moment(publishedAt).format("DD/MM/yyyy"),
  };
};

const Music = ({
  loading,
  musicRecords,
  rowsPerPage,
  page,
  recordCount,
  onPageChange,
  onRowsPerPageChange,
  onSearch,
  onAddAllToQueue,
  queueList,
}) => {
  const youtubeRef = useRef();
  const [currentSong, setCurrentSong] = useState([]);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [orderedQueue, setOrderedQueue] = useState([]);
  const [pool, setPool] = useState([]);
  const [playedList, setPlayedList] = useState([]);
  const [search, setSearch] = useState("");
  const [playerReady, setPlayerReady] = useState(false);
  const [noScuff, setNoScuff] = useState(false);

  useEffect(() => {
    if (currentSong[0]) {
      const { videoId, start, end, text, artistsLabel, date } = currentSong[0];
      youtubeRef.current.loadVideo({
        id: videoId,
        start,
        end,
        name: text,
        artistsLabel,
        date,
      });
    } else {
      youtubeRef.current?.stopVideo();
    }
  }, [currentSong]);

  useEffect(() => {
    if (queueList.length > 0) {
      const formattedQueue = queueList.map((record) =>
        formatRecordToSong(record)
      );
      setOrderedQueue([...orderedQueue, ...formattedQueue]);
      if (currentSong.length === 0) {
        setCurrentSong([formattedQueue[0]]);
        formattedQueue.shift();
      }
      let newPool = [...pool, ...formattedQueue];
      if (shuffle) {
        newPool = _shuffle(newPool);
      }
      setPool(newPool);
    }
  }, [queueList]);

  const handleAddToQueue = (song) => {
    if (currentSong.length === 0) {
      setCurrentSong([song]);
    } else {
      let newPool = [...pool, song];
      if (shuffle) {
        newPool = _shuffle(newPool);
      }
      setPool(newPool);
    }

    setOrderedQueue([...orderedQueue, song]);
  };

  const handleNext = () => {
    let newPlayedList = [];
    let newPool = [];
    let nextSong = [];
    if (loop && pool.length === 0) {
      newPool = [...playedList, ...currentSong];
    } else {
      newPlayedList = [...playedList, ...currentSong];
      newPool = [...pool];
    }
    nextSong = newPool.shift();
    setCurrentSong(nextSong ? [nextSong] : []);
    setPool(newPool);
    setPlayedList(newPlayedList);
  };

  const handlePrev = () => {
    let newPlayedList = [];
    let newPool = [];
    let nextSong = [];
    if (loop && playedList.length === 0) {
      newPlayedList = [...currentSong, ...pool];
    } else {
      newPool = [...currentSong, ...pool];
      newPlayedList = [...playedList];
    }
    nextSong = newPlayedList.pop();
    setCurrentSong(nextSong ? [nextSong] : []);
    setPool(newPool);
    setPlayedList(newPlayedList);
  };

  const handleLoopToggle = () => {
    setLoop(!loop);
  };

  const currentIndex = orderedQueue.findIndex(
    ({ id }) => id === currentSong[0]?.id
  );

  const handleShuffleToggle = () => {
    if (!shuffle) {
      const newPool = [...playedList, ...pool];
      const newPlayedList = [];
      setPool(_shuffle(newPool));
      setPlayedList(newPlayedList);
    } else {
      const newPlayedList = orderedQueue.slice(0, currentIndex);
      const newPool = orderedQueue.slice(currentIndex + 1);

      setPool(newPool);
      setPlayedList(newPlayedList);
    }
    setShuffle(!shuffle);
  };

  const handleClearQueue = () => {
    setPool([]);
    setPlayedList([]);
    setOrderedQueue([]);
    setCurrentSong([]);
  };

  const handleQueueClick = (index) => {
    const nextSong = orderedQueue[index];
    let newPlayedList = [];
    let newPool = [];

    if (!shuffle) {
      newPlayedList = orderedQueue.slice(0, index);
      newPool = orderedQueue.slice(index + 1);
    } else {
      newPlayedList = [
        ...playedList.filter(({ id }) => id !== nextSong.id),
        ...currentSong,
      ];
      newPool = pool.filter(({ id }) => id !== nextSong.id);
    }
    setCurrentSong([nextSong]);
    setPlayedList(newPlayedList);
    setPool(newPool);
  };

  const handleRemoveQueue = (_id) => {
    setPlayedList(playedList.filter(({ id }) => id !== _id));
    setPool(pool.filter(({ id }) => id !== _id));
    setOrderedQueue(orderedQueue.filter(({ id }) => id !== _id));
  };

  const handleReorder = (reoderedItem) => {
    const playIndex = reoderedItem.findIndex(
      ({ id }) => id === currentSong[0]?.id
    );
    if (!shuffle) {
      setPlayedList(reoderedItem.slice(0, playIndex));
      setPool(reoderedItem.slice(playIndex + 1));
    }

    setOrderedQueue(reoderedItem);
  };

  const handlePlay = (song) => {
    if (orderedQueue.length === 0) {
      handleAddToQueue(song);
    } else {
      setCurrentSong([song]);
      const newPlayedList = [...playedList, ...currentSong];
      setPlayedList(newPlayedList);
      setOrderedQueue([...orderedQueue, song]);
    }
  };

  const handleOnSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      onSearch(search, noScuff);
    }
  };

  const handlePlayerReady = () => {
    setPlayerReady(true);
  };

  const handleNoScuffCheck = (event) => {
    setNoScuff(event.target.checked);
  };

  const handleAddAllToQueue = () => {
    onAddAllToQueue(search, noScuff);
  };

  const isEnd = loop ? false : pool.length === 0;
  const isStart = loop ? false : playedList.length === 0;

  const show = !loading && playerReady;

  return (
    <>
      <Container>
        <Box>
          <Box padding={1} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {localStorage.getItem("authToken") && (
              <Button variant="outlined" href="/music/edit">
                EDIT MUSIC RECORD
              </Button>
            )}
          </Box>
          <CustomPlayer
            ref={youtubeRef}
            playerReady={playerReady}
            onReady={handlePlayerReady}
            queue={orderedQueue}
            onClear={handleClearQueue}
            onNext={handleNext}
            onPrev={handlePrev}
            onLoop={handleLoopToggle}
            onShuffle={handleShuffleToggle}
            onQueueClick={handleQueueClick}
            onRemoveQueue={handleRemoveQueue}
            onReorderQueue={handleReorder}
            currentIndex={currentIndex}
            queuePos={playedList.length + 1}
            isEnd={isEnd}
            isStart={isStart}
            loop={loop}
            shuffle={shuffle}
          />

          <Box padding={1}>
            <TextField
              sx={{ width: "100%" }}
              placeholder="Search with Song name or Artist name (EN/JP) or videoId"
              onChange={handleOnSearchChange}
              value={search}
              onKeyPress={handleKeypress}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                py: 1,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={noScuff} onChange={handleNoScuffCheck} />
                }
                label="Exclude scuffed?"
              />
              <Button
                variant="outlined"
                startIcon={<QueueIcon />}
                onClick={handleAddAllToQueue}
              >
                Add all to queue
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: show ? "none" : "block", height: "100%" }}>
            <Loading />
          </Box>
          <Box sx={{ display: show ? "block" : "none", p: 1 }}>
            <Records
              musicRecords={musicRecords}
              rowsPerPage={rowsPerPage}
              page={page}
              recordCount={recordCount}
              onPlay={handlePlay}
              onAddToQueue={handleAddToQueue}
              onPageChange={onPageChange}
              onRowsPerPageChange={onRowsPerPageChange}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};

Music.propTypes = {
  musicRecords: PropTypes.arrayOf(
    PropTypes.shape({
      songStart: PropTypes.number,
      songEnd: PropTypes.number,
      songData: PropTypes.shape({
        songNameEN: PropTypes.string,
        artists: PropTypes.array,
      }),
      streamData: PropTypes.shape({
        publishedAt: PropTypes.string,
        videoId: PropTypes.string,
        proxyVideoId: PropTypes.string,
      }),
    })
  ),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  recordCount: PropTypes.number,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSearch: PropTypes.func,
  loading: PropTypes.bool,
  onAddAllToQueue: PropTypes.func,
  queueList: PropTypes.array,
};

Music.defaultProps = {
  musicRecords: [],
  rowsPerPage: 10,
  page: 0,
  recordCount: 0,
  loading: true,
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
  onSearch: () => {},
  onAddAllToQueue: () => {},
  queueList: [],
};

export default Music;
