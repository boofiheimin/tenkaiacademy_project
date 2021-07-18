import clsx from "clsx";
import { Typography, Box, Button } from "@material-ui/core";

import VideoCards from "../VideoCards/VideoCards";
import useStyles from "./styles";

const Streams = ({ handleRefetchAll, ...props }) => {
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
    </div>
  );
};
export default Streams;
