import PropTypes from "prop-types";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import useStyles from "./styles";

import MusicRecord from "./musicRecord/musicRecord";

const MusicEdit = ({ musicRecords = [] }) => {
  const classes = useStyles();
  return (
    <Container>
      <Typography>Song Record Manager</Typography>
      <div className={classes.songTable}>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "10%" }}>id</TableCell>
                <TableCell style={{ width: "30%" }}>
                  <div>Song</div>
                </TableCell>
                <TableCell style={{ width: "30%" }}>
                  <div>Artist</div>
                </TableCell>
                <TableCell style={{ width: "10%" }}>
                  <div>Stream date</div>
                </TableCell>
                <TableCell style={{ width: "20%" }} align="right">
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {musicRecords.map((musicRecord) => (
                <MusicRecord record={musicRecord} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
};

MusicEdit.propTypes = {};

export default MusicEdit;
