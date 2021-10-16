import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import { useTheme } from "@mui/material/styles";
import { Box, Paper, Typography, Button } from "@mui/material";

import LoopIcon from "@mui/icons-material/Loop";
import ShuffleIcon from "@mui/icons-material/Shuffle";

import DragAndDrop from "../../dragAndDrop/dragAndDrop";

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
  queue,
  loop,
  shuffle,
  currentIndex,
  queuePos,
  onClear,
  onLoop,
  onShuffle,
  onQueueClick,
  onRemoveQueue,
  onReorderQueue,
}) => {
  const theme = useTheme();

  return (
    <Paper elevation={1} sx={{ height: "100%" }}>
      <Paper elevation={4} sx={{ height: 100 }}>
        <Box padding={1}>
          <Typography variant="h6">{statusReducer(queue, queuePos)}</Typography>
        </Box>
        <Box padding={1} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Button
              sx={{
                minWidth: "1em",
                padding: 1,
                marginRight: theme.spacing(1),
                ...(loop && { color: "#4caf50" }),
              }}
              onClick={onLoop}
            >
              <LoopIcon />
            </Button>
            <Button
              sx={{
                minWidth: "1em",
                padding: 1,
                marginRight: theme.spacing(1),
                ...(shuffle && { color: "#4caf50" }),
              }}
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
      <Box>
        <Paper elevation={5}>
          <SimpleBar
            style={{
              maxHeight: 600,
            }}
            autoHide={false}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <DragAndDrop
                items={queue}
                activeIndex={currentIndex}
                onItemClick={onQueueClick}
                onRemoveItem={onRemoveQueue}
                onReorderItem={onReorderQueue}
              />
            </Box>
          </SimpleBar>
        </Paper>
      </Box>
    </Paper>
  );
};

QueueManager.propTypes = {
  queue: PropTypes.array,
  loop: PropTypes.bool,
  shuffle: PropTypes.bool,
  currentIndex: PropTypes.number,
  queuePos: PropTypes.number,
  onClear: PropTypes.func,
  onLoop: PropTypes.func,
  onShuffle: PropTypes.func,
  onQueueClick: PropTypes.func,
  onRemoveQueue: PropTypes.func,
  onReorderQueue: PropTypes.func,
};

QueueManager.defaultProps = {
  queue: [],
  loop: false,
  shuffle: false,
  currentIndex: -1,
  queuePos: -1,
  onClear: () => {},
  onLoop: () => {},
  onShuffle: () => {},
  onQueueClick: () => {},
  onRemoveQueue: () => {},
  onReorderQueue: () => {},
};

export default QueueManager;
