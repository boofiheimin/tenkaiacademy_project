import { useState } from "react";
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
  Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { styled } from "@mui/material/styles";

import Record from "./record/record";
import MobileRecord from "./mobileRecord/mobileRecord";

import Loading from "../../loading/loading";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const ClickableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
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
  onSortChange,
  show,
}) => {
  const [dateSort, setDateSort] = useState(true);

  const handleSortToggle = () => {
    onSortChange(!dateSort ? -1 : 1);
    setDateSort(!dateSort);
  };

  return (
    <Box>
      {mobile ? (
        <>
          <MobileRecord
            songs={songs}
            onPlay={onPlay}
            onAddToQueue={onAddToQueue}
          />
          {!show && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Loading />
            </Box>
          )}
        </>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell style={{ width: "40%" }}>Song</StyledTableCell>
                <StyledTableCell style={{ width: "30%" }}>
                  Artist
                </StyledTableCell>
                <ClickableCell
                  style={{ width: "20%" }}
                  onClick={handleSortToggle}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>Date</Typography>
                    {dateSort ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
                  </Box>
                </ClickableCell>
                <StyledTableCell style={{ width: "10%" }} />
              </TableRow>
            </TableHead>
            {show && (
              <TableBody>
                {songs.map((song) => (
                  <Record
                    key={song.id}
                    song={song}
                    onPlay={onPlay}
                    onAddToQueue={onAddToQueue}
                  />
                ))}
              </TableBody>
            )}
          </Table>
          {!show && (
            <Box
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Loading />
            </Box>
          )}
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
};

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
  onSortChange: PropTypes.func,
  show: PropTypes.bool,
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
  onSortChange: () => {},
  show: false,
};

export default Records;
