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
import useStyles from "./styles";

const Streams = ({ handleRefetchAll, refetching, ...props }) => {
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
          onClick={handleRefetchAll}
        >
          <i className={clsx("fas fa-sync-alt", classes.refetchIcon)} />
          Refetch All
        </Button>
      </Box>
      <VideoCards {...props} />
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
  handleRefetchAll: PropTypes.func,
  refetching: PropTypes.bool,
};

Streams.defaultProps = {
  handleRefetchAll: () => {},
  refetching: false,
};

export default Streams;
