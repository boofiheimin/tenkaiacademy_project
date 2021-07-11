import { Box, Grid } from "@material-ui/core";

const Stream = ({
  videoId,
  title,
  thumbnail,
  tags,
  type,
  publishedAt,
  duration,
}) => {
  return (
    <Box>
      <Grid container>
        <Grid item>
          <Box>
            Video Info
            <img src={thumbnail} />
          </Box>
        </Grid>
      </Grid>
      <Box>Tags</Box>
      <Grid container>
        <Grid item xs={6}>
          <Box>Timestamp</Box>
        </Grid>
        <Grid item xs={6}>
          <Box>Detail</Box>
        </Grid>
      </Grid>
      <Box>Clip</Box>
    </Box>
  );
};

export default Stream;
