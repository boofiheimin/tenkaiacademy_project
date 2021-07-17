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
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import useStyles from "./styles";

const StreamEdit = ({ stream, goBack, onSubmit }) => {
  const { title, thumbnail } = stream;
  const classes = useStyles();
  return (
    <Container>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" alignItems="center" padding={1}>
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5">Edit Form</Typography>
        </Box>
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
                  <i className={clsx("fas fa-sync-alt", classes.refetchIcon)} />
                  Refetch
                </Button>
              </div>
              <Divider />
              <Box padding={2}>
                <Typography>id: id</Typography>
                <Typography>videoId: title</Typography>
                <Typography>title: title</Typography>
                <Typography>duration: title</Typography>
                <Typography>uploader: title</Typography>
                <Typography>publisedAt: title</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
        <form onSubmit={onSubmit}>
          <div className={classes.formController}>
            <Button
              className={clsx(classes.formControlButton, classes.saveButton)}
              variant="contained"
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
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Tag Manager</Typography>
                </div>
                <Divider />
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Details</Typography>
                </div>
                <Divider />
                <div className={classes.textAreaContainer}>
                  <TextareaAutosize className={classes.textarea} minRows={9} />
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
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Related Tweets</Typography>
                </div>
                <Divider />
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
              </Card>
            </Grid>
            <Grid item md={6} xs={12} className={classes.gridContainer}>
              <Card className={classes.segmentContainer}>
                <div className={classes.cardHeader}>
                  <Typography variant="h6">Clips</Typography>
                </div>
                <Divider />
              </Card>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

StreamEdit.propTypes = {
  stream: Proptypes.object,
  goBack: Proptypes.func.isRequired,
  onSubmit: Proptypes.func.isRequired,
};

StreamEdit.defaultProps = {
  stream: {},
};

export default StreamEdit;
