import PropTypes from "prop-types";
import { useTheme, styled } from "@mui/styles";
import { TableRow, TableCell, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const FixedCell = styled(TableCell)(() => ({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: 0,
}));

const Record = ({ song, onPlay, onAddToQueue }) => {
  const theme = useTheme();
  const { text, artistsLabel, date, featuring } = song;

  const handlePlay = () => {
    onPlay(song);
  };

  const handleAddToQueue = () => {
    onAddToQueue(song);
  };

  return (
    <TableRow>
      <FixedCell>
        <Typography noWrap>
          <span> {text}</span>
          {featuring && (
            <span
              style={{
                marginLeft: theme.spacing(1),
                fontStyle: "italic",
                color: theme.palette.text.secondary,
              }}
            >{` ft. ${featuring}`}</span>
          )}
        </Typography>
      </FixedCell>
      <FixedCell>{artistsLabel}</FixedCell>
      <FixedCell>{date}</FixedCell>
      <FixedCell>
        <IconButton onClick={handlePlay}>
          <PlayArrowIcon />
        </IconButton>
        <IconButton onClick={handleAddToQueue}>
          <PlaylistAddIcon />
        </IconButton>
      </FixedCell>
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
