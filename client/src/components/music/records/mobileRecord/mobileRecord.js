import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

const MobileRecord = ({ songs = [], onPlay, onAddToQueue }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const handleClick = (event, _song) => {
    setAnchorEl(event.currentTarget);
    setCurrentSong(_song);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlay = () => {
    onPlay(currentSong);
    setAnchorEl(null);
  };

  const handleAddToQueue = () => {
    onAddToQueue(currentSong);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {songs.map((song) => (
        <Paper
          key={song.id}
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            width: "100%",
            mb: "2px",
          }}
        >
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography sx={{ fontSize: "1rem" }} noWrap>
                <span> {`${song?.text}`}</span>
                {song?.featuring && (
                  <span
                    style={{
                      fontSize: "0.75rem",
                      marginLeft: theme.spacing(1),
                      fontStyle: "italic",
                      color: theme.palette.text.secondary,
                    }}
                  >{` ft. ${song?.featuring}`}</span>
                )}
              </Typography>
            </Box>
            <Typography
              sx={{ fontSize: "0.75rem" }}
              color="text.secondary"
              noWrap
            >
              {song?.artistsLabel}
            </Typography>
            <Typography
              sx={{ fontSize: "0.55rem" }}
              color="text.secondary"
              noWrap
            >
              {song?.date}
            </Typography>
          </Box>
          <IconButton
            onClick={(event) => handleClick(event, song)}
            sx={{ flexShrink: 0 }}
          >
            <MoreVertIcon sx={{ fontSize: "1.75rem" }} />
          </IconButton>
        </Paper>
      ))}
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handlePlay}>
              <ListItemIcon>
                <PlayArrowIcon />
              </ListItemIcon>
              <ListItemText primary="Play" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAddToQueue}>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary="Add to Queue" />
            </ListItemButton>
          </ListItem>
        </List>
      </Popover>
    </Box>
  );
};

MobileRecord.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      artistsLabel: PropTypes.string,
      date: PropTypes.string,
    })
  ),
  onPlay: PropTypes.func,
  onAddToQueue: PropTypes.func,
};

MobileRecord.defaultProps = {
  songs: [],
  onPlay: () => {},
  onAddToQueue: () => {},
};

export default MobileRecord;
