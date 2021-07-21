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
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { secondsTohhmmss } from "../../../helper";
import useStyles from "./styles";

const DetailContent = ({ publishedAtBox, publishedAt, description }) => (
  <Box padding={1}>
    <Typography
      className={publishedAtBox}
    >{`Published at ${publishedAt}`}</Typography>
    <Typography>{description}</Typography>
  </Box>
);

DetailContent.propTypes = {
  publishedAtBox: Proptypes.string.isRequired,
  publishedAt: Proptypes.string.isRequired,
  description: Proptypes.string.isRequired,
};

const TimestampContent = ({ timestamps = [], buttonLink, onSeek }) => (
  <Box padding={1}>
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {timestamps.map(({ timestamp, description }) => (
            <TableRow component="tr" scope="row" key={`s_${timestamp}`}>
              <TableCell style={{ width: 138 }}>
                <Typography>
                  <button
                    type="button"
                    className={buttonLink}
                    onClick={() => onSeek(timestamp)}
                  >
                    <Typography> {secondsTohhmmss(timestamp)}</Typography>
                  </button>
                </Typography>
              </TableCell>
              <TableCell style={{ width: 322 }}>
                <Typography> {description} </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

const BottomInfo = ({
  publishedAt,
  clipAcc,
  clipAccordionControl,
  description,
  timestamps,
  onSeek,
}) => {
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
                  <Typography>Description</Typography>
                </Box>
                <DetailContent
                  description={description}
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
                <TimestampContent
                  timestamps={timestamps}
                  buttonLink={classes.buttonLink}
                  onSeek={onSeek}
                />
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
              <Typography>Description</Typography>
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
  description: Proptypes.string,
};

BottomInfo.defaultProps = {
  description: "",
};

export default BottomInfo;
