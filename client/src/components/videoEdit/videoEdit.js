import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Container,
  Box,
  Typography,
  IconButton,
  Card,
  Grid,
  Button,
  Divider,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes, faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import DragAndDrop from "../dragAndDrop/dragAndDrop";
import Timestamp from "./timestamp/timestamp";
import ImportTimestampModal from "./importTimestampModal/importTimestampModal";

import useStyles from "./styles";

import { VIDEO_TYPE_STREAM } from "../../constants/main";

import { tagSortHelper } from "../../helper";

const VideoEdit = (props) => {
  const {
    type,
    goBack,
    formData,
    onSubmit,
    onReset,
    onTitleChange,
    onDurationChange,
    onPublishedChange,
    onUploaderChange,
    onThumbnailChange,
    onMirrorChange,
    tags: propTags,
    onAddTag,
    onReorderTag,
    onRemoveTag,
    onDetailChange,
    onAddTimeStamp,
    onDeleteTimestamp,
    onTimestampSave,
    onAddTweet,
    onReorderTweet,
    onRemoveTweet,
    onAddVideo,
    onReorderVideo,
    onRemoveVideo,
    onAddSrc,
    onReorderSrc,
    onRemoveSrc,
    refetchVideo,
    onImportTimestamp,
    onClearTimestamp,
  } = props;

  const {
    title,
    thumbnail,
    _id,
    videoId,
    duration,
    publishedAt,
    uploader,
    source,
    tags,
    timestamps = [],
    description,
    relatedTweets = [],
    relatedVideos = [],
    srcVideos = [],
    mirror,
  } = formData;

  const classes = useStyles();

  const disableVideoInfo = source !== "manual";
  tagSortHelper(propTags);

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" padding={1}>
          <IconButton onClick={goBack} size="large">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Edit Form</Typography>
        </Box>

        <form onSubmit={onSubmit}>
          <div className={classes.formController}>
            <Button
              className={clsx(classes.formControlButton, classes.saveButton)}
              variant="contained"
              type="submit"
            >
              <FontAwesomeIcon icon={faSave} className={classes.refetchIcon} />
              Save
            </Button>
            <Button
              className={clsx(classes.formControlButton, classes.resetButton)}
              variant="contained"
              onClick={onReset}
            >
              <FontAwesomeIcon icon={faTimes} className={classes.refetchIcon} />
              Reset
            </Button>
          </div>
          <Grid container>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <img
                className={clsx(classes.thumbnail, classes.segmentContainer)}
                src={thumbnail}
                alt="vidthumb"
              />
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography className={classes.vidInfo} variant="h6">
                    Video Information
                  </Typography>
                  <Button
                    className={classes.refetchButton}
                    variant="contained"
                    onClick={refetchVideo}
                    disabled={!disableVideoInfo}
                  >
                    <FontAwesomeIcon
                      icon={faSyncAlt}
                      className={classes.refetchIcon}
                    />
                    Refetch
                  </Button>
                </div>
                <Divider />
                <Box padding={2}>
                  <Typography>id: {_id}</Typography>
                  <Typography>
                    {`videoId: `}
                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {videoId}
                    </a>
                  </Typography>

                  <div className={classes.infoInputContainer}>
                    <Typography>title:&nbsp;</Typography>
                    <TextField
                      variant="standard"
                      value={title}
                      className={classes.infoInput}
                      onChange={onTitleChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>thumbnail:&nbsp;</Typography>
                    <TextField
                      variant="standard"
                      value={thumbnail}
                      className={classes.infoInput}
                      onChange={onThumbnailChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>duration:&nbsp;</Typography>
                    <TextField
                      variant="standard"
                      value={duration}
                      onChange={onDurationChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>uploader:&nbsp;</Typography>
                    <TextField
                      variant="standard"
                      className={classes.infoInput}
                      value={uploader}
                      onChange={onUploaderChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>publisedAt:&nbsp;</Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        variant="inline"
                        format="MM/dd/yyyy HH:mm:ss "
                        id="date-picker-inline"
                        value={publishedAt}
                        onChange={onPublishedChange}
                        disabled={disableVideoInfo}
                        renderInput={(params) => (
                          <TextField {...params} variant="standard" />
                        )}
                      />
                    </LocalizationProvider>
                  </div>
                  {type === VIDEO_TYPE_STREAM && (
                    <div className={classes.infoInputContainer}>
                      <Typography>mirror:&nbsp;</Typography>
                      <TextField
                        variant="standard"
                        value={mirror}
                        onChange={onMirrorChange}
                        disabled={disableVideoInfo}
                        className={classes.infoInput}
                      />
                    </div>
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Tag Manager</Typography>
                </div>
                <Divider />
                <div className={classes.dndContainer}>
                  <DragAndDrop
                    items={tags}
                    addItemLabel="Add tags"
                    onAddItem={onAddTag}
                    lists={propTags}
                    onReorderItem={onReorderTag}
                    onRemoveItem={onRemoveTag}
                    addForm
                  />
                </div>
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Description</Typography>
                </div>
                <Divider />
                <div className={classes.textAreaContainer}>
                  <TextareaAutosize
                    className={classes.textarea}
                    minRows={9}
                    value={description || ""}
                    onChange={onDetailChange}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Related Videos</Typography>
                </div>
                <Divider />
                <div className={classes.dndContainer}>
                  <DragAndDrop
                    items={relatedVideos}
                    addItemLabel="Add Related Videos"
                    placeholder="video id"
                    onAddItem={onAddVideo}
                    onReorderItem={onReorderVideo}
                    onRemoveItem={onRemoveVideo}
                    addForm
                  />
                </div>
              </Card>
            </Grid>
            {type === VIDEO_TYPE_STREAM ? (
              <Grid item md={6} xs={12} className={classes.gridContainer}>
                <Card className={classes.segmentContainer}>
                  <div className={classes.cardHeader}>
                    <Typography variant="h6">Related Tweets</Typography>
                  </div>
                  <Divider />
                  <div className={classes.dndContainer}>
                    <DragAndDrop
                      items={relatedTweets}
                      addItemLabel="Add Related Tweets"
                      placeholder="twitter id"
                      onAddItem={onAddTweet}
                      onReorderItem={onReorderTweet}
                      onRemoveItem={onRemoveTweet}
                      addForm
                    />
                  </div>
                </Card>
              </Grid>
            ) : (
              <Grid item md={6} xs={12} className={classes.gridContainer}>
                <Card className={classes.segmentContainer}>
                  <div className={classes.cardHeader}>
                    <Typography variant="h6">Sources</Typography>
                  </div>
                  <Divider />
                  <div className={classes.dndContainer}>
                    <DragAndDrop
                      items={srcVideos}
                      addItemLabel="Sources"
                      placeholder="video id"
                      onAddItem={onAddSrc}
                      onReorderItem={onReorderSrc}
                      onRemoveItem={onRemoveSrc}
                      addForm
                    />
                  </div>
                </Card>
              </Grid>
            )}
          </Grid>
          {type === VIDEO_TYPE_STREAM && (
            <Grid container>
              <Grid item md={6} xs={12} className={classes.gridContainer}>
                <Card className={classes.segmentContainer}>
                  <div className={classes.cardHeader}>
                    <Typography
                      variant="h6"
                      className={classes.timestampHeader}
                    >
                      Timestamp
                    </Typography>
                    <ImportTimestampModal
                      onImportTimestamp={onImportTimestamp}
                    />
                    <Button
                      variant="outlined"
                      onClick={onClearTimestamp}
                      color="secondary"
                    >
                      Clear
                    </Button>
                  </div>
                  <Divider />
                  <div className={classes.dndContainer}>
                    <Timestamp
                      timestamps={timestamps}
                      onAddTimeStamp={onAddTimeStamp}
                      onDeleteTimestamp={onDeleteTimestamp}
                      onTimestampSave={onTimestampSave}
                    />
                  </div>
                </Card>
              </Grid>
            </Grid>
          )}
        </form>
      </Box>
    </Container>
  );
};

VideoEdit.propTypes = {
  formData: PropTypes.object,
  goBack: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func,
  onDurationChange: PropTypes.func,
  onPublishedChange: PropTypes.func,
  onUploaderChange: PropTypes.func,
  onDetailChange: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      tagNameJP: PropTypes.string,
      tagId: PropTypes.string,
      catId: PropTypes.string,
    })
  ),
  onAddTag: PropTypes.func,
  onReorderTag: PropTypes.func,
  onRemoveTag: PropTypes.func,
  onAddTimeStamp: PropTypes.func,
  onDeleteTimestamp: PropTypes.func,
  onTimestampSave: PropTypes.func,
  onReset: PropTypes.func,
  onAddTweet: PropTypes.func,
  onReorderTweet: PropTypes.func,
  onRemoveTweet: PropTypes.func,
  onAddVideo: PropTypes.func,
  onReorderVideo: PropTypes.func,
  onRemoveVideo: PropTypes.func,
  refetchVideo: PropTypes.func,
  onThumbnailChange: PropTypes.func,
  onImportTimestamp: PropTypes.func,
  onClearTimestamp: PropTypes.func,
  type: PropTypes.string,
  onAddSrc: PropTypes.func,
  onReorderSrc: PropTypes.func,
  onRemoveSrc: PropTypes.func,
  onMirrorChange: PropTypes.func,
};

VideoEdit.defaultProps = {
  formData: {},
  onTitleChange: () => {},
  onDurationChange: () => {},
  onPublishedChange: () => {},
  onUploaderChange: () => {},
  onDetailChange: () => {},
  tags: [],
  onAddTag: () => {},
  onReorderTag: () => {},
  onRemoveTag: () => {},
  onAddTimeStamp: () => {},
  onDeleteTimestamp: () => {},
  onTimestampSave: () => {},
  onReset: () => {},
  onAddTweet: () => {},
  onReorderTweet: () => {},
  onRemoveTweet: () => {},
  onAddVideo: () => {},
  onReorderVideo: () => {},
  onRemoveVideo: () => {},
  refetchVideo: () => {},
  onThumbnailChange: () => {},
  onImportTimestamp: () => {},
  onClearTimestamp: () => {},
  type: VIDEO_TYPE_STREAM,
  onAddSrc: () => {},
  onReorderSrc: () => {},
  onRemoveSrc: () => {},
  onMirrorChange: () => {},
};

export default VideoEdit;
