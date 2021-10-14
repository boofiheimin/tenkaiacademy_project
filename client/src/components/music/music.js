import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle as _shuffle } from "lodash";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

import ResponsiveIframe from "../responsiveYoutube/responsiveYoutube";

import QueueManager from "./queueManager/queueManager";

const Music = () => {
  const youtubeRef = useRef();
  const [currentSong, setCurrentSong] = useState([]);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [orderedQueue, setOrderedQueue] = useState([]);
  const [pool, setPool] = useState([]);
  const [playedList, setPlayedList] = useState([]);
  const [clearQModal, setClearQModal] = useState(false);

  const [pendingSong, setPendingSong] = useState(null);

  useEffect(() => {
    if (currentSong[0]) {
      const { videoId, start, end } = currentSong[0];
      youtubeRef.current.loadVideo(videoId, start, end);
    } else {
      youtubeRef.current.stopVideo();
    }
  }, [currentSong]);

  const handleAddToQueue = () => {
    const dummy = { id: uuidv4(), text: "Madorami", videoId: "yP8Wn3rqYck" };

    if (currentSong.length === 0) {
      setCurrentSong([dummy]);
    } else {
      let newPool = [...pool, dummy];
      if (shuffle) {
        newPool = _shuffle(newPool);
      }
      setPool(newPool);
    }

    setOrderedQueue([...orderedQueue, dummy]);
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

  const handlePlay = () => {
    if (orderedQueue.length === 0) {
      handleAddToQueue();
    } else {
      const dummy = { id: uuidv4(), text: "Madorami", videoId: "yP8Wn3rqYck" };
      setPendingSong(dummy);
      setClearQModal(true);
    }
  };

  const handleClearQPlay = () => {
    setPool([]);
    setPlayedList([]);
    setOrderedQueue([pendingSong]);
    setCurrentSong([pendingSong]);
    setClearQModal(false);
  };

  const handleNotClearQPLay = () => {
    handleAddToQueue();
    setClearQModal(false);
  };

  const handleCloseQModal = () => {
    setClearQModal(false);
  };

  const isEnd = loop ? false : pool.length === 0;
  const isStart = loop ? false : playedList.length === 0;

  return (
    <>
      <Box paddingLeft={8} paddingRight={8}>
        <Grid container>
          <Grid item xs={9}>
            <ResponsiveIframe
              ref={youtubeRef}
              onNext={handleNext}
              showPlaceholder={!currentSong[0]}
            />
          </Grid>
          <Grid item xs={3}>
            <QueueManager
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
          </Grid>
        </Grid>
        <Box padding={1}>
          <Button variant="outlined" onClick={handleAddToQueue}>
            Add to queue
          </Button>
        </Box>
        <Box padding={1}>
          <Button variant="outlined" onClick={handlePlay}>
            Play
          </Button>
        </Box>
      </Box>
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
    </>
  );
};

export default Music;
