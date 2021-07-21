import Proptypes from "prop-types";

import {
  Box,
  Grid,
  Container,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

import ResponsiveYoutube from "../ResponsiveYoutube/ResponsiveYoutube";

import useStyles from "./styles";

import Timestamp from "./Timestamp/Timestamp";

const Stream = ({
  stream = {},
  goBack,
  isLogin,
  goEdit,
  videoPos,
  onVideoSeek,
}) => {
  const classes = useStyles();
  const {
    videoId,
    title,
    publishedAt,
    tags = [],
    description,
    timestamps = [],
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
        <Grid container>
          <Grid item xs={9}>
            <ResponsiveYoutube videoId={videoId} videoPos={videoPos} />
          </Grid>
          <Grid item xs={3}>
            <div className={classes.sectionHeader}>
              <Typography variant="h5">Timestamp</Typography>
            </div>
            <div className={classes.timestampContainer}>
              <div className={classes.timestampScroller}>
                <Timestamp timestamps={timestamps} onVideoSeek={onVideoSeek} />
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={9}>
            <Box display="flex" padding={1} alignItems="center">
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
          </Grid>
          <Grid item xs={3}>
            <div>clips</div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

Stream.propTypes = {
  stream: Proptypes.object,
  goBack: Proptypes.func.isRequired,
  isLogin: Proptypes.string.isRequired,
  goEdit: Proptypes.func.isRequired,
  videoPos: Proptypes.number,
  onVideoSeek: Proptypes.func,
};

Stream.defaultProps = {
  stream: {},
  videoPos: null,
  onVideoSeek: () => {},
};

export default Stream;
