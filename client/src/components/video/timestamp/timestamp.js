import PropTypes from "prop-types";
import {
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

import useStyles from "./styles";

import { secondsTohhmmss } from "../../../helper";

const Timestamp = ({ timestamps, onVideoSeek }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {timestamps.map(({ timestamp, description: timpstampDesc }) => (
            <TableRow component="tr" scope="row" key={`s_${timestamp}`}>
              <TableCell style={{ width: 138 }}>
                <Typography>
                  <button
                    type="button"
                    className={classes.buttonLink}
                    onClick={() => onVideoSeek(timestamp)}
                  >
                    <Typography>{secondsTohhmmss(timestamp)}</Typography>
                  </button>
                </Typography>
              </TableCell>
              <TableCell style={{ width: 322 }}>
                <Typography> {timpstampDesc} </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Timestamp.propTypes = {
  timestamps: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number,
      description: PropTypes.string,
    })
  ),
  onVideoSeek: PropTypes.func,
};

Timestamp.defaultProps = {
  timestamps: [],
  onVideoSeek: () => {},
};

export default Timestamp;
