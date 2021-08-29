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

const Song = ({
  name,
  artist,
  date,
  onPlay,
  onAddQueue,
  start,
  end,
  videoId,
}) => {
  const classes = useStyles();
  const handlePlay = () => {
    onPlay(videoId, name, start, end);
  };

  const handleAddToQueue = () => {
    onAddQueue(videoId, name, start, end);
  };

  return (
    <TableRow>
      <TableCell>
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{artist}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{moment(date).format("DD/MM/yyyy")}</Typography>
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

export default Song;
