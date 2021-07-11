import { Container, Typography } from "@material-ui/core";

import VideoCards from "../VideoCards/VideoCards";

const Streams = ({ videos }) => {
  return (
    <div>
      <Container>
        <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
          Streams Library
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          At Tenkai Academy, We pride ourselves in our collection of adventures
          from our dear angel!
        </Typography>
      </Container>
      <VideoCards videos={videos} />
    </div>
  );
};

export default Streams;
