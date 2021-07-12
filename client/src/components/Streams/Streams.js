import { Typography, Box } from "@material-ui/core";

import VideoCards from "../VideoCards/VideoCards";

const Streams = (props) => (
  <div>
    <Box padding={3}>
      <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
        Search form
      </Typography>
    </Box>
    <VideoCards {...props} />
  </div>
);

export default Streams;
