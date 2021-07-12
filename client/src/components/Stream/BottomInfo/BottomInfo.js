import Proptypes from "prop-types";
import {
  Grid,
  Box,
  Card,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import useStyles from "./styles";

const DetailContent = ({ publishedAtBox, publishedAt }) => (
  <Box>
    <Typography
      className={publishedAtBox}
    >{`Published at ${publishedAt}`}</Typography>
  </Box>
);

DetailContent.propTypes = {
  publishedAtBox: Proptypes.string.isRequired,
  publishedAt: Proptypes.string.isRequired,
};

const BottomInfo = ({ publishedAt, clipAcc, clipAccordionControl }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();
  return (
    <div>
      {matches ? (
        <Grid container spacing={2} style={{ minHeight: "100%" }}>
          <Grid item xs={12} lg={4}>
            <Box height="100%">
              <Card>
                <Box className={classes.header}>
                  <Typography>Detail</Typography>
                </Box>
                <DetailContent
                  publishedAt={publishedAt}
                  publishedAtBox={classes.publishedAtBox}
                />
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box height="100%">
              <Card>
                <Box className={classes.header}>
                  <Typography>Timestamp</Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box height="100%">
              <Card>
                <Box className={classes.header}>
                  <Typography> Clip</Typography>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <div>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Detail</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {DetailContent(classes, publishedAt)}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Timestamp</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={clipAcc} onChange={clipAccordionControl}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Clips</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography />
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </div>
  );
};

BottomInfo.propTypes = {
  publishedAt: Proptypes.string.isRequired,
  clipAcc: Proptypes.bool.isRequired,
  clipAccordionControl: Proptypes.func.isRequired,
};

export default BottomInfo;
