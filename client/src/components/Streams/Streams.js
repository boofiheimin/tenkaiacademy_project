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
  ...props
}) => {
  const classes = useStyles();
  return (
    <div>
      <Box display="flex" padding={3}>
        <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
          Search form
        </Typography>
        <Button
          className={classes.refetchButton}
          variant="contained"
          onClick={onRefetchAll}
        >
          <i className={clsx("fas fa-sync-alt", classes.refetchIcon)} />
          Refetch All
        </Button>
      </Box>
      <SearchForm tags={tags} onSubmit={onSubmit} searchFilter={searchFilter} />
      <VideoCards videos={streams} total={totalStreams} {...props} />
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
    </div>
  );
};

Streams.propTypes = {
  onRefetchAll: PropTypes.func,
  refetching: PropTypes.bool,
};

Streams.defaultProps = {
  onRefetchAll: () => {},
  refetching: false,
};

export default Streams;
