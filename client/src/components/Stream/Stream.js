import { useEffect, useState } from "react";
import Proptypes from "prop-types";

import {
  Box,
  Grid,
  Container,
  Typography,
  Card,
  Tabs,
  Tab,
  Chip,
  IconButton,
  Button,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";

import fitvids from "fitvids";

import moment from "moment";
import BottomInfo from "./BottomInfo/BottomInfo";

import useStyles from "./styles";

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

TabPanel.propTypes = {
  children: Proptypes.string.isRequired,
  value: Proptypes.number.isRequired,
  index: Proptypes.number.isRequired,
};

const Stream = ({
  stream = {},
  clipAcc,
  clipAccordionControl,
  tabStatus,
  tabControl,
  goBack,
  isLogin,
  goEdit,
}) => {
  const classes = useStyles();
  const [sec, setSec] = useState(0);

  const {
    videoId,
    title,
    publishedAt,
    tags = [],
    detail,
    timestamps = [],
  } = stream;

  useEffect(() => {
    fitvids();
  }, []);

  const onSeek = (seekTo) => {
    setSec(seekTo);
  };

  return (
    <Container className={classes.root}>
      <Box display="flex" flexDirection="column" height="100%">
        <Box display="flex" padding={1} alignItems="center">
          <IconButton onClick={goBack}>
            <ArrowBackIcon />
          </IconButton>
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
        <Box marginBottom={1}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={7}>
              <Box>
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=${
                    sec ? 1 : 0
                  }&start=${sec}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={5}>
              <Card className={classes.card}>
                <Tabs
                  value={tabStatus}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={tabControl}
                  classes={{
                    root: classes.tabs,
                    indicator: classes.indicator,
                  }}
                >
                  <Tab
                    label={<Typography>Related Video</Typography>}
                    classes={{
                      root: classes.tab,
                      selected: classes.selected,
                    }}
                  />
                  <Tab
                    label={<Typography>Related Tweets</Typography>}
                    classes={{
                      root: classes.tab,
                      selected: classes.selected2,
                    }}
                  />
                </Tabs>
                <TabPanel value={tabStatus} index={0}>
                  videocardlinkhere
                </TabPanel>
                <TabPanel value={tabStatus} index={1}>
                  tweetembedhere
                </TabPanel>
              </Card>
            </Grid>
          </Grid>
        </Box>
        <Box marginBottom={1}>
          <Card className={classes.card}>
            <Box className={classes.tagHeader}>
              <Typography>Tags</Typography>
            </Box>
            <Box padding={1}>
              {tags.map(({ id: tagId, tagNameEN }) => (
                <Chip label={tagNameEN} key={tagId} className={classes.chip} />
              ))}
            </Box>
          </Card>
        </Box>
        <Box>
          <BottomInfo
            publishedAt={moment(publishedAt).toString()}
            detail={detail}
            timestamps={timestamps}
            clipAcc={clipAcc}
            clipAccordionControl={clipAccordionControl}
            onSeek={onSeek}
          />
        </Box>
      </Box>
    </Container>
  );
};

Stream.propTypes = {
  stream: Proptypes.object,
  clipAcc: Proptypes.bool.isRequired,
  clipAccordionControl: Proptypes.func.isRequired,
  tabStatus: Proptypes.number.isRequired,
  tabControl: Proptypes.func.isRequired,
  goBack: Proptypes.func.isRequired,
  isLogin: Proptypes.string.isRequired,
  goEdit: Proptypes.func.isRequired,
};

Stream.defaultProps = {
  stream: {},
};

export default Stream;
