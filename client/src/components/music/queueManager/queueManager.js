import PropTypes from "prop-types";
import { Box, Paper, Typography, Button } from "@mui/material";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import LoopIcon from "@mui/icons-material/Loop";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import SimpleBar from "simplebar-react";

import DragAndDrop from "../../dragAndDrop/dragAndDrop";

import useStyles from "./styles";

const statusReducer = (queue, queuePos) => {
  let status = "";
  if (queue.length === 0) {
    status = "Empty Queue";
  } else if (queuePos > queue.length) {
    status = `Queue ended`;
  } else {
    status = `Now playing : ${queuePos}/${queue.length}`;
  }
  return status;
};

const QueueManager = ({
  queue = [],
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
}) => {
  const classes = useStyles();
  return (
    <Paper elevation={1} className={classes.root}>
      <Paper elevation={4} className={classes.controller}>
        <Box padding={1}>
          <Typography variant="h6">{statusReducer(queue, queuePos)}</Typography>
        </Box>
        <Box padding={1} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Button
              className={classes.actionButton}
              onClick={onPrev}
              disabled={isStart || queue.length === 0}
            >
              <SkipPreviousIcon />
            </Button>
            <Button
              className={classes.actionButton}
              onClick={onNext}
              disabled={isEnd || queue.length === 0}
            >
              <SkipNextIcon />
            </Button>
            <Button
              className={`${classes.actionButton}${loop ? "_active" : ""}`}
              onClick={onLoop}
            >
              <LoopIcon />
            </Button>
            <Button
              className={`${classes.actionButton}${shuffle ? "_active" : ""}`}
              onClick={onShuffle}
            >
              <ShuffleIcon />
            </Button>
          </Box>
          <Button variant="outlined" color="secondary" onClick={onClear}>
            CLEAR
          </Button>
        </Box>
      </Paper>
      <SimpleBar className={classes.timestampContainer} autoHide={false}>
        <SimpleBar className={classes.timestampScroller} autoHide={false}>
          <DragAndDrop
            items={queue}
            activeIndex={currentIndex}
            onItemClick={onQueueClick}
            onRemoveItem={onRemoveQueue}
            onReorderItem={onReorderQueue}
          />
        </SimpleBar>
      </SimpleBar>
    </Paper>
  );
};

QueueManager.propTypes = {
  queue: PropTypes.array,
  isStart: PropTypes.bool,
  isEnd: PropTypes.bool,
  loop: PropTypes.bool,
  shuffle: PropTypes.bool,
  currentIndex: PropTypes.number,
  queuePos: PropTypes.number,
  onClear: PropTypes.func,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onLoop: PropTypes.func,
  onShuffle: PropTypes.func,
  onQueueClick: PropTypes.func,
  onRemoveQueue: PropTypes.func,
  onReorderQueue: PropTypes.func,
};

QueueManager.defaultProps = {
  queue: [],
  isStart: false,
  isEnd: false,
  loop: false,
  shuffle: false,
  currentIndex: -1,
  queuePos: -1,
  onClear: () => {},
  onNext: () => {},
  onPrev: () => {},
  onLoop: () => {},
  onShuffle: () => {},
  onQueueClick: () => {},
  onRemoveQueue: () => {},
  onReorderQueue: () => {},
};

export default QueueManager;
