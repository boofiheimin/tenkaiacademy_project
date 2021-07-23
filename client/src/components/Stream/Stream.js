import Proptypes from "prop-types";
import moment from "moment";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Divider,
  Chip,
  Paper,
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import { TwitterTweetEmbed } from "react-twitter-embed";

import ResponsiveYoutube from "../ResponsiveYoutube/ResponsiveYoutube";

import useStyles from "./styles";

import Timestamp from "./Timestamp/Timestamp";
import HorizontalVideoCard from "../HorizontalVideoCard/HorizontalVideoCard";

const Stream = ({
  stream = {},
  isLogin,
  goEdit,
  videoPos,
  onVideoSeek,
  onRelatedVideoClick,
}) => {
  const classes = useStyles();
  const {
    videoId,
    title,
    publishedAt,
    tags = [],
    description,
    timestamps = [],
    uploader,
    clips = [],
    relatedVideos = [],
    relatedTweets = [],
  } = stream;

  return (
    <Container className={classes.root} maxWidth="xl">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        paddingTop={4}
        paddingLeft={8}
        paddingRight={8}
      >
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <ResponsiveYoutube videoId={videoId} videoPos={videoPos} />
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">Timestamp</Typography>
              </div>
            </Paper>
            <div className={classes.timestampContainer}>
              <div className={classes.timestampScroller}>
                <Timestamp timestamps={timestamps} onVideoSeek={onVideoSeek} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.secondGrid}>
          <Grid item xs={9}>
            <Paper>
              <Box display="flex" padding={2} alignItems="center">
                <Typography variant="h6" className={classes.videoTitle}>
                  {title}
                </Typography>
                {isLogin && (
                  <Button
                    className={classes.editButton}
                    variant="contained"
                    onClick={goEdit}
                  >
                    <EditIcon />
                  </Button>
                )}
              </Box>
              <Typography
                className={classes.publishedAt}
              >{`Published at ${moment(publishedAt).format(
                "MMM d, YYYY HH:mm:ss"
              )}`}</Typography>
              <Divider />
              <Box padding={2}>
                <Typography variant="h6">{`Channel: ${uploader}`}</Typography>
                <Box paddingTop={1}>
                  <Typography>{description}</Typography>
                </Box>
              </Box>
              <Box padding={2}>
                {tags.map((tag) => (
                  <Chip label={tag.tagNameEN} className={classes.chip} />
                ))}
              </Box>
            </Paper>
            <Grid item container spacing={2} className={classes.thirdGrid}>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.sectionHeader}>
                    <Typography variant="h6">Related Tweets</Typography>
                  </div>
                </Paper>
                <Box padding={2}>
                  {relatedTweets.length === 0 && (
                    <Typography align="center">None</Typography>
                  )}
                  <div className={classes.embedContainer}>
                    {relatedTweets.map((tweet) => (
                      <TwitterTweetEmbed
                        key={Date.now() + Math.random()}
                        tweetId={tweet}
                      />
                    ))}
                  </div>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Paper>
                  <div className={classes.sectionHeader}>
                    <Typography variant="h6">Related Videos</Typography>
                  </div>
                </Paper>
                <Box padding={2}>
                  {relatedVideos.length === 0 && (
                    <Typography align="center">None</Typography>
                  )}
                  <div className={classes.relatedVidContainer}>
                    {relatedVideos.map(
                      ({
                        id: relatedVId,
                        title: relatedVTitle,
                        videoId: relatedVVideoId,
                        uploader: relatedVUploader,
                        existing,
                      }) => (
                        <HorizontalVideoCard
                          title={relatedVTitle}
                          videoId={relatedVVideoId}
                          uploader={relatedVUploader}
                          onCardClick={() =>
                            onRelatedVideoClick(
                              relatedVId,
                              relatedVVideoId,
                              existing
                            )
                          }
                        />
                      )
                    )}
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Paper>
                <div className={classes.sectionHeader}>
                  <Typography variant="h6">Clips</Typography>
                </div>
              </Paper>
              <Box padding={2}>
                {clips.length === 0 && (
                  <Typography align="center">No clips :(</Typography>
                )}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

Stream.propTypes = {
  stream: Proptypes.object,
  isLogin: Proptypes.string.isRequired,
  goEdit: Proptypes.func.isRequired,
  videoPos: Proptypes.number,
  onVideoSeek: Proptypes.func,
  onRelatedVideoClick: Proptypes.func,
};

Stream.defaultProps = {
  stream: {},
  videoPos: null,
  onVideoSeek: () => {},
  onRelatedVideoClick: () => {},
};

export default Stream;
