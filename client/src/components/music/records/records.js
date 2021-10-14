import PropTypes from "prop-types";
import {
  Box,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  tableCellClasses,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Record from "./record/record";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const Records = ({
  musicRecords,
  rowsPerPage,
  page,
  recordCount,
  onPlay,
  onAddToQueue,
  onPageChange,
  onRowsPerPageChange,
}) => (
  <Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell style={{ width: "40%" }}>Song</StyledTableCell>
            <StyledTableCell style={{ width: "30%" }}>Artist</StyledTableCell>
            <StyledTableCell style={{ width: "20%" }}>Date</StyledTableCell>
            <StyledTableCell style={{ width: "10%" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {musicRecords.map((record) => (
            <Record
              record={record}
              onPlay={onPlay}
              onAddToQueue={onAddToQueue}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      <TablePagination
        component="div"
        page={page}
        count={recordCount}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  </Box>
);

Records.propTypes = {
  musicRecords: PropTypes.arrayOf(
    PropTypes.shape({
      songStart: PropTypes.number,
      songEnd: PropTypes.number,
      songData: PropTypes.shape({
        songNameEN: PropTypes.string,
        artists: PropTypes.array,
      }),
      streamData: PropTypes.shape({
        publishedAt: PropTypes.string,
        videoId: PropTypes.string,
        proxyVideoId: PropTypes.string,
      }),
    })
  ),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  recordCount: PropTypes.number,
  onPlay: PropTypes.func,
  onAddToQueue: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
};

Records.defaultProps = {
  musicRecords: [],
  rowsPerPage: 10,
  page: 0,
  recordCount: 0,
  onPlay: () => {},
  onAddToQueue: () => {},
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
};

export default Records;
