import PropTypes from "prop-types";
import moment from "moment";
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Tooltip,
} from "@material-ui/core";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import useStyles from "./styles";

const Song = ({ record, onPlay, onAddQueue }) => {
  const { streamData, songData, songStart, songEnd, isScuffed } = record;

  const videoId = streamData.proxyVideoId || streamData.videoId;

  const classes = useStyles();
  const handlePlay = () => {
    onPlay(videoId, songData.songNameEN, songStart, songEnd);
  };

  const handleAddToQueue = () => {
    onAddQueue(videoId, songData.songNameEN, songStart, songEnd);
  };

  const artistNames = songData.artists.map((artist) => artist.artistNameEN);

  return (
    <TableRow>
      <TableCell>
        <Typography>{`${songData.songNameEN}${
          isScuffed ? " (scuffed)" : ""
        }`}</Typography>
      </TableCell>
      <TableCell>
        {artistNames.map((name, index) => (
          <Typography>{`${name}${
            index !== artistNames.length - 1 ? "," : ""
          }`}</Typography>
        ))}
      </TableCell>
      <TableCell>
        <Typography>
          {moment(streamData.publishedAt).format("DD/MM/yyyy")}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography>
          <Tooltip title="Play latest version" placement="top">
            <Button className={classes.actionButton} onClick={handlePlay}>
              <PlayArrowIcon />
            </Button>
          </Tooltip>
          <Tooltip title="Add to queue" placement="top">
            <Button className={classes.actionButton} onClick={handleAddToQueue}>
              <PlaylistAddIcon />
            </Button>
          </Tooltip>
        </Typography>
      </TableCell>
    </TableRow>
  );
};

Song.propTypes = {
  onPlay: PropTypes.func,
  onAddQueue: PropTypes.func,
};

Song.defaultProps = {
  onPlay: () => {},
  onAddQueue: () => {},
};

export default Song;
