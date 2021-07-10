import {
  Container,
  Grid,
  makeStyles,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import VideoCard from "./VideoCard";

const useStyles = makeStyles((theme) => ({
  cardGrid: {},
}));

const VideoCards = ({ videos }) => {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <Container className={classes.cardGrid}>
        <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
          Streams Library
        </Typography>
        <Typography variant="h6" align="left" color="textSecondary" paragraph>
          At Tenkai Academy, We pride ourselves in our collection of adventures
          from our dear angel!
        </Typography>
      </Container>
      <Container className={classes.cardGrid}>
        <Grid container spacing={4}>
          {videos.map(({ title, thumbnail, tags, type, publishedAt }, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <VideoCard
                title={title}
                thumbnail={thumbnail}
                tags={tags}
                type={type}
                publishedAt={publishedAt}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default VideoCards;
