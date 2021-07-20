import Proptypes from "prop-types";
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
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DragAndDrop from "../DragAndDrop/DragAndDrop";
import Timestamp from "./Timestamp/Timestamp";

import useStyles from "./styles";

const StreamEdit = ({
  goBack,
  formData,
  onSubmit,
  onTitleChange,
  onDurationChange,
  onPublishedChange,
  onUploaderChange,
  tags: propTags,
  onAddTag,
  onTagReordered,
  onTagRemove,
  onDetailChange,
  onAddTimeStamp,
  onDeleteTimestamp,
}) => {
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
    detail,
  } = formData;
  const classes = useStyles();
  const disableVideoInfo = source === "youtube";

  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" padding={1}>
          <IconButton onClick={goBack}>
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
              <i className={clsx("fas fa-save", classes.refetchIcon)} />
              Save
            </Button>
            <Button
              className={clsx(classes.formControlButton, classes.resetButton)}
              variant="contained"
            >
              <i className={clsx("fas fa-times", classes.refetchIcon)} />
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
                  <Button className={classes.refetchButton} variant="contained">
                    <i
                      className={clsx("fas fa-sync-alt", classes.refetchIcon)}
                    />
                    Refetch
                  </Button>
                </div>
                <Divider />
                <Box padding={2}>
                  <Typography>id: {_id}</Typography>
                  <Typography>
                    videoId:{" "}
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
                      value={title}
                      className={classes.infoInput}
                      onChange={onTitleChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>duration:&nbsp;</Typography>
                    <TextField
                      value={duration}
                      onChange={onDurationChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>uploader:&nbsp;</Typography>
                    <TextField
                      className={classes.infoInput}
                      value={uploader}
                      onChange={onUploaderChange}
                      disabled={disableVideoInfo}
                    />
                  </div>
                  <div className={classes.infoInputContainer}>
                    <Typography>publisedAt:&nbsp;</Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        id="date-picker-inline"
                        value={publishedAt}
                        onChange={onPublishedChange}
                        disabled={disableVideoInfo}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
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
                    onReorderedItem={onTagReordered}
                    onRemoveItem={onTagRemove}
                  />
                </div>
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Detail</Typography>
                </div>
                <Divider />
                <div className={classes.textAreaContainer}>
                  <TextareaAutosize
                    className={classes.textarea}
                    minRows={9}
                    value={detail}
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
                  {/* <DragAndDrop
                    items={relatedVideos}
                    addItemLabel="Add Related Videos"
                  /> */}
                </div>
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Related Tweets</Typography>
                </div>
                <Divider />
                <div className={classes.dndContainer}>
                  {/* <DragAndDrop
                    items={relatedVideos}
                    addItemLabel="Add Related Tweets"
                  /> */}
                </div>
              </Card>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Timestamp</Typography>
                </div>
                <Divider />
                <div className={classes.dndContainer}>
                  <Timestamp
                    timestamps={timestamps}
                    onAddTimeStamp={onAddTimeStamp}
                    onDeleteTimestamp={onDeleteTimestamp}
                  />
                </div>
              </Card>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

StreamEdit.propTypes = {
  formData: Proptypes.object,
  goBack: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
  onTitleChange: Proptypes.func,
  onDurationChange: Proptypes.func,
  onPublishedChange: Proptypes.func,
  onUploaderChange: Proptypes.func,
  onDetailChange: Proptypes.func,
  tags: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string,
      text: Proptypes.string,
      tagNameJP: Proptypes.string,
      tagId: Proptypes.number,
      catId: Proptypes.number,
    })
  ),
  onAddTag: Proptypes.func,
  onTagReordered: Proptypes.func,
  onTagRemove: Proptypes.func,
};

StreamEdit.defaultProps = {
  formData: {},
  onTitleChange: () => {},
  onDurationChange: () => {},
  onPublishedChange: () => {},
  onUploaderChange: () => {},
  onDetailChange: () => {},
  tags: [],
  onAddTag: () => {},
  onTagReordered: () => {},
  onTagRemove: () => {},
};

export default StreamEdit;
