import { useState } from "react";
import { PropTypes } from "prop-types";
import clsx from "clsx";
import {
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import VideoCards from "../VideoCards/VideoCards";
import SearchForm from "../SearchForm/SearchForm";
import useStyles from "./styles";

import { VIDEO_TYPE_CLIP, VIDEO_TYPE_STREAM } from "../../constants/main";

const Videos = ({
  type,
  onRefetchAll,
  onSubmit,
  refetching,
  tags,
  videos,
  totalVideos,
  searchFilter,
  handleAddVideo,
  handleRemoveVideo,
  ...props
}) => {
  const classes = useStyles();
  const [videoId, setVideoId] = useState("");
  const [srcVideoIds, setSrcVideoId] = useState("");
  const [addVideoOpen, setAddVideoOpen] = useState(false);

  const onVideoIdChange = (e) => {
    setVideoId(e.target.value);
  };

  const onSrcVideoIdChange = (e) => {
    setSrcVideoId(e.target.value);
  };

  const handleOpenAddVideo = () => {
    setAddVideoOpen(true);
  };

  const handleCloseAddVideo = () => {
    setAddVideoOpen(false);
  };

  const onAddVideo = () => {
    handleAddVideo(videoId, srcVideoIds);
  };

  return (
    <div>
      {localStorage.getItem("authToken") && (
        <Box display="flex" padding={3} justifyContent="flex-end">
          <Button
            className={clsx(classes.add, classes.button)}
            variant="contained"
            onClick={handleOpenAddVideo}
          >
            <FontAwesomeIcon icon={faPlus} className={classes.refetchIcon} />
            Add Video
          </Button>
          {type === VIDEO_TYPE_STREAM && (
            <Button
              className={classes.button}
              variant="contained"
              onClick={onRefetchAll}
            >
              <FontAwesomeIcon
                icon={faSyncAlt}
                className={classes.refetchIcon}
              />
              Refetch All
            </Button>
          )}
        </Box>
      )}
      <SearchForm tags={tags} onSubmit={onSubmit} searchFilter={searchFilter} />
      <VideoCards
        videos={videos}
        total={totalVideos}
        onRemoveVideo={handleRemoveVideo}
        type={type}
        {...props}
      />
      {/* refetch dialog */}
      <Dialog open={refetching}>
        <DialogTitle>
          <Typography variant="h5">Refetching</Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding={2}
          >
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
      {/* add stream dialog */}
      <Dialog open={addVideoOpen} onClose={handleCloseAddVideo}>
        <DialogContent dividers>
          <TextField
            value={videoId}
            label="Video Id"
            fullWidth
            onChange={onVideoIdChange}
          />
          {type === VIDEO_TYPE_CLIP && (
            <>
              <TextField
                value={srcVideoIds}
                label="Source Video Ids"
                fullWidth
                onChange={onSrcVideoIdChange}
              />
              <Typography> separated by comma eg. 12345,23456</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions dividers>
          <Button variant="contained" color="primary" onClick={onAddVideo}>
            Add Video
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseAddVideo}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Videos.propTypes = {
  onRefetchAll: PropTypes.func,
  refetching: PropTypes.bool,
  onSubmit: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      tagNameEN: PropTypes.tagNameEN,
    })
  ),
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      thumbnail: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string,
          tagNameEN: PropTypes.tagNameEN,
        })
      ),
      publishedAt: PropTypes.string,
      duration: PropTypes.number,
    })
  ),
  totalVideos: PropTypes.number,
  searchFilter: PropTypes.shape({
    title: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        tagNameEN: PropTypes.tagNameEN,
      })
    ),
    uploader: PropTypes.string,
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    sort: PropTypes.number,
  }),
  handleAddVideo: PropTypes.func,
  handleRemoveVideo: PropTypes.func,
};

Videos.defaultProps = {
  onRefetchAll: () => {},
  refetching: false,
  onSubmit: () => {},
  tags: [],
  videos: [],
  totalVideos: 0,
  searchFilter: {
    title: "",
    tags: [],
    uploader: "",
    from: null,
    to: null,
    sort: -1,
  },
  handleAddVideo: () => {},
  handleRemoveVideo: () => {},
};

export default Videos;
