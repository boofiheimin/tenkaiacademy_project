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
import MobileRecord from "./mobileRecord/mobileRecord";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const Records = ({
  songs,
  rowsPerPage,
  page,
  recordCount,
  onPlay,
  onAddToQueue,
  onPageChange,
  onRowsPerPageChange,
  mobile,
}) => (
  <Box>
    {mobile ? (
      <MobileRecord songs={songs} onPlay={onPlay} onAddToQueue={onAddToQueue} />
    ) : (
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
            {songs.map((song) => (
              <Record song={song} onPlay={onPlay} onAddToQueue={onAddToQueue} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
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
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      date: PropTypes.string,
      artistsLabel: PropTypes.string,
    })
  ),
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  recordCount: PropTypes.number,
  onPlay: PropTypes.func,
  onAddToQueue: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  mobile: PropTypes.bool,
};

Records.defaultProps = {
  songs: [],
  rowsPerPage: 10,
  page: 0,
  recordCount: 0,
  onPlay: () => {},
  onAddToQueue: () => {},
  onPageChange: () => {},
  onRowsPerPageChange: () => {},
  mobile: false,
};

export default Records;
