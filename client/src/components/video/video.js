import { useState, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useSelector } from "react-redux";
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
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { TwitterTweetEmbed } from "react-twitter-embed";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import json2mq from "json2mq";

import ResponsiveYoutube from "../responsiveYoutube/responsiveYoutube";

import useStyles from "./styles";

import Timestamp from "./timestamp/timestamp";
import HorizontalVideoCard from "../horizontalVideoCard/horizontalVideoCard";
import TypeChip from "../typeChip/typeChip";

import { VIDEO_TYPE_STREAM, VIDEO_TYPE_CLIP } from "../../constants/main";
import Loading from "../loading/loading";
import NotFound from "../notFound/notFound";

const Video = ({
  video = {},
  onRelatedVideoClick,
  type,
  loading,
  notFound,
}) => {
  const youtubeRef = useRef();
  const classes = useStyles();
  const [descDialog, setDescDialog] = useState(false);
  const matchRegSize = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const matchPhoneSize = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const matchOrientation = useMediaQuery(json2mq({ orientation: "landscape" }));
  const { siteMode } = useSelector((state) => state.global);

  const {
    _id,
    videoId,
    title,
    publishedAt,
    thumbnail,
    tags = [],
    description = "",
    timestamps = [],
    uploader,
    clips = [],
    relatedVideos = [],
    relatedTweets = [],
    srcVideos = [],
    mirror,
  } = video;

  const handleDescDialogOpen = () => {
    setDescDialog(true);
  };

  const handleDescDialogClose = () => {
    setDescDialog(false);
  };

  const handleSeek = (time) => {
    youtubeRef.current.seekTime(time);
  };

  const matches = matchPhoneSize && matchOrientation;

  if (loading) {
    return <Loading />;
  }
  if (notFound) {
    return <NotFound />;
  }

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid container spacing={matchPhoneSize ? 0 : 2}>
        <Grid item xs={matches ? 9 : 12} lg={9}>
          {tags.some((tag) => tag.tagNameEN === "Private") && !mirror ? (
            <img className={classes.thumbnail} src={thumbnail} alt="" />
          ) : (
            <ResponsiveYoutube
              videoId={videoId}
              mirror={mirror}
              ref={youtubeRef}
            />
          )}
        </Grid>
        {(matches || matchRegSize) && (
          <Grid item xs={3}>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">
                  {type === VIDEO_TYPE_STREAM ? "Timestamp" : "Sources"}
                </Typography>
              </div>
            </Paper>
            <div className={classes.timestampContainer}>
              <div className={classes.timestampScroller}>
                {type === VIDEO_TYPE_STREAM ? (
                  <Timestamp timestamps={timestamps} onVideoSeek={handleSeek} />
                ) : (
                  srcVideos.map(
                    ({
                      id: srcID,
                      title: srctitle,
                      videoId: srcVID,
                      thumbnail: srcThumbnail,
                      uploader: srcUploader,
                      existing,
                    }) => (
                      <HorizontalVideoCard
                        title={srctitle}
                        videoId={srcVID}
                        thumbnail={srcThumbnail}
                        uploader={srcUploader}
                        onCardClick={() =>
                          onRelatedVideoClick(srcID, srcVID, existing)
                        }
                      />
                    )
                  )
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
              <Hidden lgDown>
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
                      {description.split("\n").map((d) => (
                        <Typography>{d}</Typography>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Hidden>
            </Box>
            <Hidden lgDown>
              <Typography
                className={classes.publishedAt}
              >{`Published at ${moment(publishedAt).format(
                "MMM DD, YYYY HH:mm:ss"
              )}`}</Typography>
              <Divider />
              <Box paddingLeft={2} paddingTop={2}>
                <Typography variant="h6">{uploader}</Typography>
                <Box paddingTop={1}>
                  {description.split("\n").map((d) => (
                    <Typography>{d}</Typography>
                  ))}
                </Box>
              </Box>
            </Hidden>
            <Hidden lgUp>
              <Box paddingLeft={2} paddingTop={1}>
                <Typography>{uploader}</Typography>
              </Box>
            </Hidden>
            <div className={classes.tagContainer}>
              {tags.map((tag) => (
                <TypeChip label={tag.tagNameEN} />
              ))}
            </div>
            <Hidden lgUp>
              <Box display="flex" paddingLeft={2} paddingBottom={2}>
                {type === VIDEO_TYPE_STREAM && !matches && (
                  <Button
                    className={classes.mobBtn}
                    variant="outlined"
                    onClick={handleDescDialogOpen}
                  >
                    Timestamp
                  </Button>
                )}

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
          {type === VIDEO_TYPE_STREAM && (
            <Grid item container spacing={2} className={classes.thirdGrid}>
              <Grid item xs={12} lg={6}>
                <Hidden lgDown>
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
                          options={{ theme: siteMode }}
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
                              options={{ theme: siteMode }}
                            />
                          ))}
                        </div>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Hidden>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Hidden lgDown>
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
                          thumbnail: relatedVThumbnail,
                          uploader: relatedVUploader,
                          existing,
                        }) => (
                          <HorizontalVideoCard
                            title={relatedVTitle}
                            videoId={relatedVVideoId}
                            thumbnail={relatedVThumbnail}
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
                              thumbnail: relatedVThumbnail,
                              uploader: relatedVUploader,
                              existing,
                            }) => (
                              <HorizontalVideoCard
                                title={relatedVTitle}
                                thumbnail={relatedVThumbnail}
                                uploader={relatedVUploader}
                                videoId={relatedVVideoId}
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
        {type === VIDEO_TYPE_CLIP && !matches && (
          <Hidden lgUp>
            <Grid item xs={12} lg={3}>
              <Box>
                <Paper>
                  <div className={classes.sectionHeader}>
                    <Typography variant="h6">Sources</Typography>
                  </div>
                </Paper>
                <Box padding={2}>
                  {srcVideos.map(
                    ({
                      id: relatedVId,
                      title: relatedVTitle,
                      videoId: relatedVVideoId,
                      thumbnail: relatedVThumbnail,
                      uploader: relatedVUploader,
                      existing,
                    }) => (
                      <HorizontalVideoCard
                        title={relatedVTitle}
                        videoId={relatedVVideoId}
                        thumbnail={relatedVThumbnail}
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
                </Box>
              </Box>
            </Grid>
          </Hidden>
        )}
        <Grid item xs={12} lg={3}>
          <Box>
            <Paper>
              <div className={classes.sectionHeader}>
                <Typography variant="h6">
                  {type === VIDEO_TYPE_STREAM ? "Clips" : "Related Clips"}
                </Typography>
              </div>
            </Paper>
            <Box padding={2}>
              {type === VIDEO_TYPE_STREAM
                ? clips.map(
                    ({
                      _id: clipId,
                      title: clipTitle,
                      videoId: clipVideoId,
                      uploader: clipUploader,
                      thumbnail: clipThumbnail,
                    }) => (
                      <HorizontalVideoCard
                        title={clipTitle}
                        thumbnail={clipThumbnail}
                        uploader={clipUploader}
                        videoId={clipVideoId}
                        onCardClick={() =>
                          onRelatedVideoClick(
                            clipId,
                            clipVideoId,
                            true,
                            VIDEO_TYPE_CLIP
                          )
                        }
                      />
                    )
                  )
                : relatedVideos.map(
                    ({
                      id: relatedVId,
                      title: relatedVTitle,
                      videoId: relatedVVideoId,
                      thumbnail: relatedVThumbnail,
                      uploader: relatedVUploader,
                      existing,
                    }) => (
                      <HorizontalVideoCard
                        title={relatedVTitle}
                        videoId={relatedVVideoId}
                        thumbnail={relatedVThumbnail}
                        uploader={relatedVUploader}
                        onCardClick={() =>
                          onRelatedVideoClick(
                            relatedVId,
                            relatedVVideoId,
                            existing,
                            VIDEO_TYPE_CLIP
                          )
                        }
                      />
                    )
                  )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Slide direction="up" in={descDialog}>
        <div className={classes.descDialog}>
          <div className={classes.dialogHeader}>
            <Typography variant="h6" className={classes.dialogHeader_text}>
              Timestamp
            </Typography>
            <IconButton
              className={classes.clrBtn}
              variant="contained"
              onClick={handleDescDialogClose}
              size="large"
            >
              <ClearIcon />
            </IconButton>
          </div>

          <div className={classes.timestampContainer}>
            <div className={classes.timestampScroller}>
              <Timestamp timestamps={timestamps} onVideoSeek={handleSeek} />
            </div>
          </div>
        </div>
      </Slide>
    </Container>
  );
};

Video.propTypes = {
  video: PropTypes.object,

  onRelatedVideoClick: PropTypes.func,
  type: PropTypes.string,
  loading: PropTypes.bool,
  notFound: PropTypes.bool,
};

Video.defaultProps = {
  video: {},
  onRelatedVideoClick: () => {},
  type: VIDEO_TYPE_STREAM,
  loading: true,
  notFound: true,
};

export default Video;
