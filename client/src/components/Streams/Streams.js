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

import VideoCards from "../VideoCards/VideoCards";
import SearchForm from "../SearchForm/SearchForm";
import useStyles from "./styles";

const Streams = ({
  onRefetchAll,
  onSubmit,
  refetching,
  tags,
  streams,
  totalStreams,
  searchFilter,
  handleAddStream,
  ...props
}) => {
  const classes = useStyles();
  const [videoId, setVideoId] = useState("");
  const [addStreamOpen, setAddStreamOpen] = useState(false);

  const onVideoIdChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleOpenAddStream = () => {
    setAddStreamOpen(true);
  };

  const handleCloseAddStream = () => {
    setAddStreamOpen(false);
  };

  const onAddStream = () => {
    handleAddStream(videoId);
  };

  return (
    <div>
      {localStorage.getItem("authToken") && (
        <Box display="flex" padding={3} justifyContent="flex-end">
          <Button
            className={clsx(classes.add, classes.button)}
            variant="contained"
            onClick={handleOpenAddStream}
          >
            <i className={clsx("fas fa-plus", classes.refetchIcon)} />
            Add Stream
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            onClick={onRefetchAll}
          >
            <i className={clsx("fas fa-sync-alt", classes.refetchIcon)} />
            Refetch All
          </Button>
        </Box>
      )}
      <SearchForm tags={tags} onSubmit={onSubmit} searchFilter={searchFilter} />
      <VideoCards videos={streams} total={totalStreams} {...props} />
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
      <Dialog open={addStreamOpen} onClose={handleCloseAddStream}>
        <DialogContent dividers>
          <TextField label="Video Id" fullWidth onChange={onVideoIdChange} />
        </DialogContent>
        <DialogActions dividers>
          <Button variant="contained" color="primary" onClick={onAddStream}>
            Add Stream
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseAddStream}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

Streams.propTypes = {
  onRefetchAll: PropTypes.func,
  refetching: PropTypes.bool,
  onSubmit: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      tagNameEN: PropTypes.tagNameEN,
    })
  ),
  streams: PropTypes.arrayOf(
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
  totalStreams: PropTypes.number,
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
  handleAddStream: PropTypes.func,
};

Streams.defaultProps = {
  onRefetchAll: () => {},
  refetching: false,
  onSubmit: () => {},
  tags: [],
  streams: [],
  totalStreams: 0,
  searchFilter: {
    title: "",
    tags: [],
    uploader: "",
    from: null,
    to: null,
    sort: -1,
  },
  handleAddStream: () => {},
};

export default Streams;
