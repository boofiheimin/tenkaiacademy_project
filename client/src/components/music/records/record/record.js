import PropTypes from "prop-types";

import {
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const Record = ({ song, onPlay, onAddToQueue }) => {
  const { text, artistsLabel, date, featuring } = song;

  const handlePlay = () => {
    onPlay(song);
  };

  const handleAddToQueue = () => {
    onAddToQueue(song);
  };

  return (
    <TableRow>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "baseline" }}>
          <Typography>{text}</Typography>
          {featuring && (
            <Typography
              sx={{ ml: 1, fontStyle: "italic" }}
              color="text.secondary"
            >
              {`ft. ${featuring}`}
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>{artistsLabel}</TableCell>
      <TableCell>{date}</TableCell>
      <TableCell>
        <IconButton onClick={handlePlay}>
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={handleAddToQueue}>
          <PlaylistAddIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

Record.propTypes = {
  song: PropTypes.shape({
    text: PropTypes.string,
    date: PropTypes.string,
    artistsLabel: PropTypes.string,
    featuring: PropTypes.string,
  }).isRequired,
  onPlay: PropTypes.func,
  onAddToQueue: PropTypes.func,
};

Record.defaultProps = {
  onPlay: () => {},
  onAddToQueue: () => {},
};

export default Record;
