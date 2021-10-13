import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { shuffle as _shuffle, reverse } from "lodash";
import { Box, Grid, Button } from "@mui/material";

import ResponsiveIframe from "../responsiveYoutube/responsiveYoutube";

import QueueManager from "./queueManager/queueManager";

const Discography = () => {
  const youtubeRef = useRef();
  const [queue, setQueue] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isEnd, setIsEnd] = useState(true);
  const [isStart, setIsStart] = useState(true);
  const [loop, setLoop] = useState(false);
  const [shuffle, setShuffle] = useState(false);

  const [shufflePool, setShufflePool] = useState([]);
  const [shuffledList, setShuffledList] = useState([]);

  useEffect(() => {
    if (currentSong) {
      const { videoId, start, end } = currentSong;
      youtubeRef.current.loadVideo(videoId, start, end);
    }
  }, [currentSong]);

  const handleAddToQueue = () => {
    const dummy = { id: uuidv4(), text: "Madorami", videoId: "yP8Wn3rqYck" };

    if (queue.length === 0) {
      setCurrentSong(dummy);
      setCurrentIndex(0);
      if (!loop) {
        setIsEnd(true);
        setIsStart(true);
      }
    } else if (!currentSong) {
      setCurrentSong(dummy);
    } else {
      if (!loop) {
        setIsEnd(false);
      }
      if (shuffle) {
        setShufflePool(_shuffle([...shufflePool, dummy.id]));
      }
    }

    setQueue([...queue, dummy]);
  };

  const handleClearQueue = () => {
    setQueue([]);
    setIsEnd(true);
    setCurrentIndex(-1);
  };

  const handleNext = () => {
    if (shuffle) {
      const newShuffledList = [...shuffledList, currentSong.id];
      if (newShuffledList.length === queue.length) {
        if (loop) {
          const nextSongId = newShuffledList.shift();
          const nextSongIndex = queue.findIndex(
            (item) => item.id === nextSongId
          );
          setCurrentSong(queue[nextSongIndex]);
          setCurrentIndex(nextSongIndex);
          setShuffledList([]);
          setShufflePool(newShuffledList);
        } else {
          setCurrentSong(null);
          setCurrentIndex(queue.length);
          setShuffledList(newShuffledList);
        }
      } else {
        const newShuffledPool = [...shufflePool];
        const nextSongId = newShuffledPool.shift();
        const nextSongIndex = queue.findIndex((item) => item.id === nextSongId);
        setCurrentSong(queue[nextSongIndex]);
        setShufflePool(newShuffledPool);
        setCurrentIndex(nextSongIndex);
        setShuffledList(newShuffledList);
        if (!loop) {
          if (isStart) {
            setIsStart(false);
          }
          if (newShuffledList.length === queue.length - 1) {
            setIsEnd(true);
          }
        }
      }
    } else {
      let nextIndex = currentIndex + 1;
      if (loop) {
        if (nextIndex > queue.length - 1) {
          nextIndex = 0;
        }
      } else {
        if (isStart) {
          setIsStart(false);
        }
        if (nextIndex === queue.length - 1) {
          setIsEnd(true);
        }
      }
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (shuffle) {
      if (shuffledList.length === 0) {
        if (loop) {
          let newShuffledList = reverse(shufflePool);
          const prevSongId = newShuffledList.shift();
          const prevSongIndex = queue.findIndex(
            (item) => item.id === prevSongId
          );
          if (currentSong) {
            newShuffledList = [currentSong.id, ...newShuffledList];
          }
          setCurrentSong(queue[prevSongIndex]);
          setCurrentIndex(prevSongIndex);
          setShuffledList(newShuffledList);
          setShufflePool([]);
        }
      } else {
        const newShuffledList = [...shuffledList];
        const prevSongId = newShuffledList.pop();
        const prevSongIndex = queue.findIndex((item) => item.id === prevSongId);
        setCurrentSong(queue[prevSongIndex]);
        setShuffledList(newShuffledList);
        setCurrentIndex(prevSongIndex);
        if (currentSong) {
          setShufflePool([currentSong.id, ...shufflePool]);
        }
        if (!loop) {
          if (shuffledList.length === 1) {
            setIsStart(true);
          }
          if (isEnd) {
            setIsEnd(false);
          }
        }
      }
    } else {
      let prevIndex = currentIndex - 1;
      if (loop) {
        if (prevIndex < 0) {
          prevIndex = queue.length - 1;
        }
      } else {
        if (prevIndex === 0) {
          setIsStart(true);
        }
        if (isEnd) {
          setIsEnd(false);
        }
      }

      if (prevIndex >= 0) {
        setCurrentIndex(prevIndex);
        setCurrentSong(queue[prevIndex]);
      }
    }
  };

  const handleLoopToggle = () => {
    if (!loop) {
      setIsStart(false);
      setIsEnd(false);
    } else if (currentIndex === 0) {
      setIsStart(true);
    } else if (currentIndex === queue.length - 1) {
      setIsEnd(true);
    }
    setLoop(!loop);
  };

  const handleShuffleToggle = () => {
    if (!shuffle) {
      const pool = queue
        .filter((item) => item.id !== currentSong?.id)
        .map((item) => item.id);
      setShufflePool(_shuffle(pool));
    } else {
      setShufflePool([]);
    }
    setShuffle(!shuffle);
    setShuffledList([]);
  };

  const handleQueueClick = (index) => {
    const nextSong = queue[index];
    if (shuffle) {
      const newShuffledList = [...shuffledList, currentSong.id].filter(
        (id) => id !== nextSong.id
      );
      const newPool = shufflePool.filter((id) => id !== nextSong.id);
      setShuffledList(newShuffledList);
      setShufflePool(newPool);

      if (newShuffledList.length === queue.length - 1) {
        setIsStart(false);
        setIsEnd(true);
      } else {
        setIsStart(false);
        setIsEnd(false);
      }
    } else if (index === 0) {
      setIsStart(true);
      setIsEnd(false);
    } else if (index === queue.length - 1) {
      setIsStart(false);
      setIsEnd(true);
    } else {
      setIsStart(false);
      setIsEnd(false);
    }
    setCurrentSong(nextSong);
    setCurrentIndex(index);
  };

  return (
    <Box paddingLeft={8} paddingRight={8}>
      <Grid container>
        <Grid item xs={9}>
          <ResponsiveIframe ref={youtubeRef} onNext={handleNext} />
        </Grid>
        <Grid item xs={3}>
          <QueueManager
            queue={queue}
            onClear={handleClearQueue}
            onNext={handleNext}
            onPrev={handlePrev}
            onLoop={handleLoopToggle}
            onShuffle={handleShuffleToggle}
            onQueueClick={handleQueueClick}
            currentIndex={currentIndex}
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
    </Box>
  );
};

export default Discography;
