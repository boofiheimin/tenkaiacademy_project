import { Typography, Box, Container } from "@material-ui/core";

import VideoCards from "../VideoCards/VideoCards";

import useStyles from "./styles";

const Streams = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Box padding={3}>
        <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
          Search form
        </Typography>
      </Box>
      <VideoCards {...props} />
    </div>
  );
};

export default Streams;
