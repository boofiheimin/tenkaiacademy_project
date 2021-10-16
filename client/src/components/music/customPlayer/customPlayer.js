import PropTypes from "prop-types";
import { useState, useRef, useImperativeHandle, forwardRef } from "react";

import Youtube from "react-youtube";

import { useTheme, styled } from "@mui/material/styles";
import {
  Paper,
  Box,
  Typography,
  Slider,
  IconButton,
  Button,
} from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";

import QueueManager from "../queueManager/queueManager";

import { useInterval } from "../../../utils";

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
});

const CustomPlayer = forwardRef(
  (
    {
      queue,
      isStart,
      isEnd,
      loop,
      shuffle,
      currentIndex,
      queuePos,
      onClear,
      onNext,
      onPrev,
      onLoop,
      onShuffle,
      onQueueClick,
      onRemoveQueue,
      onReorderQueue,
    },
    ref
  ) => {
    const theme = useTheme();
    const [player, setPlayer] = useState(null);
    const [position, setPosition] = useState(0);
    const [play, setPlay] = useState(true);
    const [volume, setVolume] = useState(100);
    const [preMuteVolume, setPreMuteVolume] = useState(0);
    const [openQueue, setOpenQueue] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [playerState, setPlayerState] = useState(-1);
    const queueRef = useRef(null);

    useInterval(() => {
      if (player) {
        setPosition(Math.floor(player.getCurrentTime()) - currentSong?.start);
      }
    }, 500);

    const handleReady = async (e) => {
      setPlayer(e.target);
    };

    const formatDuration = (value) => {
      const minute = Math.floor(value / 60);
      const secondLeft = value - minute * 60;
      return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
    };

    const handlePlayToggle = () => {
      setPlay(!play);
      if (!play) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    };

    const handleSeek = (value) => {
      player.seekTo(value + currentSong.start);
      setPosition(value);
    };

    const handleChangeVolume = (value) => {
      if (preMuteVolume > 0) {
        setPreMuteVolume(0);
      }
      setVolume(value);
      player.setVolume(value);
    };

    const handleMute = () => {
      if (preMuteVolume === 0) {
        setPreMuteVolume(volume);
        handleChangeVolume(0);
      } else {
        handleChangeVolume(preMuteVolume);
        setPreMuteVolume(0);
      }
    };

    const handleToggleQueue = () => {
      setOpenQueue(!openQueue);
      const currPanel = queueRef.current;
      if (currPanel.style.maxHeight) {
        currPanel.style.maxHeight = null;
      } else {
        currPanel.style.maxHeight = `${currPanel.scrollHeight}px`;
      }
    };

    const renderVolume = () => {
      if (volume === 0) {
        return <VolumeMuteIcon />;
      }
      if (volume < 50) {
        return <VolumeDownRounded />;
      }
      return <VolumeUpRounded />;
    };

    useImperativeHandle(ref, () => ({
      seekTime(time) {
        player.seekTo(time);
      },
      loadVideo({ id, start, end, name, date, artistsLabel }) {
        if (player) {
          setCurrentSong({
            duration: end - start,
            name,
            date,
            artistsLabel,
            start,
          });

          if (start && end) {
            player.loadVideoById({
              videoId: id,
              startSeconds: start,
              endSeconds: end,
            });
          } else {
            player.loadVideoById(id);
          }
        }
      },
      stopVideo() {
        if (player) {
          setCurrentSong(null);
          player.stopVideo();
        }
      },
    }));

    const handleStateChange = () => {
      const state = player.getPlayerState();
      if (playerState === 1 && state === 0) {
        // Player will only trigger onNext when the state change from playing to end
        onNext();
      }
      setPlayerState(state);
    };

    return (
      <div>
        <Box sx={{ position: "relative" }}>
          <Paper sx={{ p: 1 }}>
            <Box sx={{ display: currentSong ? "block" : "none" }}>
              <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
                <Youtube
                  onReady={handleReady}
                  opts={{
                    width: "250",
                    height: "150",
                    playerVars: { autoplay: 1, controls: 0 },
                  }}
                  onStateChange={handleStateChange}
                />
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" noWrap>
                    {currentSong?.name}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {currentSong?.artistsLabel}
                    </Typography>
                    &nbsp;
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      sx={{ fontStyle: "italic" }}
                    >
                      {`- [${currentSong?.date}]`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ px: 2 }}>
                <Slider
                  size="small"
                  min={0}
                  step={1}
                  max={currentSong?.duration}
                  value={position}
                  onChange={(_, value) => handleSeek(value)}
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "rgba(0,0,0,0.87)",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,
                      "&:hover, &.Mui-focusVisible": {
                        boxShadow: `0px 0px 0px 8px ${
                          theme.palette.mode === "dark"
                            ? "rgb(255 255 255 / 16%)"
                            : "rgb(0 0 0 / 16%)"
                        }`,
                      },
                      "&.Mui-active": {
                        width: 20,
                        height: 20,
                      },
                    },
                    "& .MuiSlider-rail": {
                      opacity: 0.28,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: -2,
                  }}
                >
                  <TinyText>{formatDuration(position)}</TinyText>
                  <TinyText>{`-${formatDuration(
                    currentSong?.duration - position
                  )}`}</TinyText>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Box sx={{ display: "flex", width: 100, alignItems: "center" }}>
                <IconButton onClick={handleMute}>{renderVolume()}</IconButton>
                <Slider
                  size="small"
                  min={0}
                  step={1}
                  max={100}
                  value={volume}
                  onChange={(_, value) => handleChangeVolume(value)}
                  sx={{
                    color:
                      theme.palette.mode === "dark"
                        ? "#fff"
                        : "rgba(0,0,0,0.87)",
                    height: 4,
                    "& .MuiSlider-thumb": {
                      width: 8,
                      height: 8,
                    },
                    "& .MuiSlider-rail": {
                      opacity: 0.28,
                    },
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: currentSong ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IconButton
                  onClick={onPrev}
                  disabled={isStart || queue.length === 0}
                >
                  <SkipPreviousIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
                <IconButton onClick={handlePlayToggle}>
                  {play ? (
                    <PauseRounded sx={{ fontSize: "3rem" }} />
                  ) : (
                    <PlayArrowRounded sx={{ fontSize: "3rem" }} />
                  )}
                </IconButton>
                <IconButton
                  onClick={onNext}
                  disabled={isEnd || queue.length === 0}
                >
                  <SkipNextIcon sx={{ fontSize: "2rem" }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: 100,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleToggleQueue}
                  startIcon={<QueueMusicIcon />}
                >
                  Queue
                </Button>
              </Box>
            </Box>
          </Paper>
          <Box
            ref={queueRef}
            sx={{
              maxHeight: 0,
              overflow: "hidden",
              transition: "max-height 0.1s ease-out",
              position: "absolute",
              right: 0,
              width: "100%",
              maxWidth: 450,
              zIndex: 999,
            }}
          >
            <QueueManager
              queue={queue}
              onClear={onClear}
              onLoop={onLoop}
              onShuffle={onShuffle}
              onQueueClick={onQueueClick}
              onRemoveQueue={onRemoveQueue}
              onReorderQueue={onReorderQueue}
              currentIndex={currentIndex}
              queuePos={queuePos}
              loop={loop}
              shuffle={shuffle}
            />
          </Box>
        </Box>
      </div>
    );
  }
);

CustomPlayer.propTypes = {
  queue: PropTypes.array,
  loop: PropTypes.bool,
  shuffle: PropTypes.bool,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  currentIndex: PropTypes.number,
  queuePos: PropTypes.number,
  onClear: PropTypes.func,
  onLoop: PropTypes.func,
  onShuffle: PropTypes.func,
  onQueueClick: PropTypes.func,
  onRemoveQueue: PropTypes.func,
  onReorderQueue: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
};

CustomPlayer.defaultProps = {
  queue: [],
  loop: false,
  shuffle: false,
  currentIndex: -1,
  queuePos: -1,
  isStart: false,
  isEnd: false,
  onClear: () => {},
  onLoop: () => {},
  onShuffle: () => {},
  onQueueClick: () => {},
  onRemoveQueue: () => {},
  onReorderQueue: () => {},
  onNext: () => {},
  onPrev: () => {},
};

export default CustomPlayer;
