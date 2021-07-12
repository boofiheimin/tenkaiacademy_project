import { useEffect } from "react";
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

import BottomInfo from "./BottomInfo/BottomInfo";

import useStyles from "./styles";
import moment from "moment";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
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

  const { videoId, title, tags, publishedAt } = stream;

  useEffect(() => {
    fitvids();
  }, []);

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
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
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
              <Chip label="tag1" />
              <Chip label="tag1" />
              <Chip label="tag1" />
              <Chip label="tag1" />
              <Chip label="tag1" />
              <Chip label="tag1" />
              <Chip label="tag1" />
            </Box>
          </Card>
        </Box>
        <Box>
          <BottomInfo
            publishedAt={moment(publishedAt).toString()}
            clipAcc={clipAcc}
            clipAccordionControl={clipAccordionControl}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Stream;
