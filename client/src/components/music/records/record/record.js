import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { TableRow, TableCell, IconButton } from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const Record = ({ record, onPlay, onAddToQueue }) => {
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

  const song = {
    id: uuidv4(),
    start: songStart,
    end: songEnd,
    videoId: proxyVideoId || videoId,
    text: `${songNameEN}${isScuffed ? " (Scuffed)" : ""}`,
    artistsLabel,
    date: moment(publishedAt).format("DD/MM/yyyy"),
  };

  const handlePlay = () => {
    onPlay(song);
  };

  const handleAddToQueue = () => {
    onAddToQueue(song);
  };

  return (
    <TableRow>
      <TableCell>{`${songNameEN}${isScuffed ? " (Scuffed)" : ""}`}</TableCell>
      <TableCell>{artistsLabel}</TableCell>
      <TableCell>{moment(publishedAt).format("DD/MM/yyyy")}</TableCell>
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
  record: PropTypes.shape({
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
    isScuffed: PropTypes.bool,
  }).isRequired,
  onPlay: PropTypes.func,
  onAddToQueue: PropTypes.func,
};

Record.defaultProps = {
  onPlay: () => {},
  onAddToQueue: () => {},
};

export default Record;
