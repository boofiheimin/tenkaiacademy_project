import { useState } from "react";
import Proptypes from "prop-types";
import moment from "moment";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  Divider,
  Paper,
  Hidden,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
  IconButton,
  useMediaQuery,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import { TwitterTweetEmbed } from "react-twitter-embed";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import json2mq from "json2mq";

import ResponsiveYoutube from "../ResponsiveYoutube/ResponsiveYoutube";

import useStyles from "./styles";

import Timestamp from "./Timestamp/Timestamp";
import HorizontalVideoCard from "../HorizontalVideoCard/HorizontalVideoCard";

import TypeChip from "../TypeChip/TypeChip";

const Video = ({
  video = {},
  videoPos,
  onVideoSeek,
  onRelatedVideoClick,
  type,
}) => {
  const classes = useStyles();
  const [descDialog, setDescDialog] = useState(false);
  const matchRegSize = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const matchPhoneSize = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const matchOrientation = useMediaQuery(json2mq({ orientation: "landscape" }));

  const {
    _id,
    videoId,
    title,
    publishedAt,
    thumbnail,
    tags = [],
    description,
    timestamps = [],
    uploader,
    clips = [],
    relatedVideos = [],
    relatedTweets = [],
    srcVideoId,
  } = video;

  const handleDescDialogOpen = () => {
    setDescDialog(true);
  };

  const handleDescDialogClose = () => {
    setDescDialog(false);
  };

  const matches = matchPhoneSize && matchOrientation;

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container spacing={matchPhoneSize ? 0 : 2}>
        <Grid item xs={matches ? 9 : 12} lg={9}>
          {tags.some((tag) => tag.tagNameEN === "Private") ? (
            <img className={classes.thumbnail} src={thumbnail} alt="" />
          ) : (
            <ResponsiveYoutube videoId={videoId} videoPos={videoPos} />
          )}
        </Grid>
        {(matches || matchRegSize) && (
          <Grid item xs={3}>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">
                  {type === "stream" ? "Timestamp" : "Source"}
                </Typography>
              </div>
            </Paper>
            <div className={classes.timestampContainer}>
              <div className={classes.timestampScroller}>
                {type === "stream" ? (
                  <Timestamp
                    timestamps={timestamps}
                    onVideoSeek={onVideoSeek}
                  />
                ) : (
                  <HorizontalVideoCard
                    title="testnata"
                    videoId={srcVideoId}
                    uploader="kanata"
                  />
                )}
              </div>
            </div>
          </Grid>
        )}
      </Grid>
      <Grid container spacing={2} className={classes.secondGrid}>
        <Grid item xs={12} lg={9}>
          <Paper>
            <Box display="flex" alignItems="center">
              <Hidden mdDown>
                <Typography variant="h6" className={classes.videoTitle}>
                  {title}
                </Typography>
                {localStorage.getItem("authToken") && (
                  <Button
                    className={classes.mobBtn}
                    variant="outlined"
                    href={`/${type}s/${_id}/edit`}
                  >
                    Edit
                  </Button>
                )}
              </Hidden>
              <Hidden lgUp>
                <Accordion className={classes.accordionDesc}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box paddingTop={1}>
                      <Typography>{description}</Typography>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Hidden>
            </Box>
            <Hidden mdDown>
              <Typography
                className={classes.publishedAt}
              >{`Published at ${moment(publishedAt).format(
                "MMM DD, YYYY HH:mm:ss"
              )}`}</Typography>
              <Divider />
              <Box padding={2}>
                <Typography variant="h6">{`Channel: ${uploader}`}</Typography>
                <Box paddingTop={1}>
                  <Typography>{description}</Typography>
                </Box>
              </Box>
            </Hidden>
            <div className={classes.tagContainer}>
              {tags.map((tag) => (
                <TypeChip label={tag.tagNameEN} />
              ))}
            </div>
            <Hidden lgUp>
              <Box display="flex" paddingLeft={2} paddingBottom={2}>
                <Button
                  className={classes.mobBtn}
                  variant="outlined"
                  onClick={handleDescDialogOpen}
                >
                  Timestamp
                </Button>
                {localStorage.getItem("authToken") && (
                  <Button
                    className={classes.mobBtn}
                    variant="outlined"
                    href={`/${type}s/${_id}/edit`}
                  >
                    Edit
                  </Button>
                )}
              </Box>
            </Hidden>
          </Paper>
          {type === "stream" && (
            <Grid item container spacing={2} className={classes.thirdGrid}>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
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
                </Hidden>
                <Hidden lgUp>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Related Tweets</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box width="100%">
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
                    </AccordionDetails>
                  </Accordion>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden mdDown>
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
                </Hidden>
                <Hidden lgUp>
                  <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography variant="h6">Related Videos</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box width="100%">
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
                    </AccordionDetails>
                  </Accordion>
                </Hidden>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
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
      <Slide direction="up" in={descDialog} mountOnEnter unmountOnExit>
        <div className={classes.descDialog}>
          <div className={classes.dialogHeader}>
            <Typography variant="h6" className={classes.dialogHeader_text}>
              Timestamp
            </Typography>
            <IconButton
              className={classes.clrBtn}
              variant="contained"
              onClick={handleDescDialogClose}
            >
              <ClearIcon />
            </IconButton>
          </div>

          <div className={classes.timestampContainer}>
            <div className={classes.timestampScroller}>
              <Timestamp timestamps={timestamps} onVideoSeek={onVideoSeek} />
            </div>
          </div>
        </div>
      </Slide>
    </Container>
  );
};

Video.propTypes = {
  video: Proptypes.object,
  videoPos: Proptypes.number,
  onVideoSeek: Proptypes.func,
  onRelatedVideoClick: Proptypes.func,
  type: Proptypes.string,
};

Video.defaultProps = {
  video: {},
  videoPos: null,
  onVideoSeek: () => {},
  onRelatedVideoClick: () => {},
  type: "stream",
};

export default Video;
