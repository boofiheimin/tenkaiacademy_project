import { Container, Grid, CssBaseline } from "@material-ui/core";
import VideoCard from "./VideoCard";

const VideoCards = ({ videos }) => {
  return (
    <div>
      <CssBaseline />
      <Container>
        <Grid container spacing={4}>
          {videos.map(
            ({ title, thumbnail, tags, type, publishedAt, duration }, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <VideoCard
                  title={title}
                  thumbnail={thumbnail}
                  tags={tags}
                  type={type}
                  publishedAt={publishedAt}
                  duration={duration}
                />
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default VideoCards;
