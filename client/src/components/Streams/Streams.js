import { Typography } from "@material-ui/core";

import VideoCards from "../VideoCards/VideoCards";

const Streams = (props) => {
  return (
    <div>
      <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
        Streams Library
      </Typography>
      <Typography variant="h6" align="left" color="textSecondary" paragraph>
        At Tenkai Academy, We pride ourselves in our collection of adventures
        from our dear angel!
      </Typography>

      <VideoCards {...props} />
    </div>
  );
};

export default Streams;
