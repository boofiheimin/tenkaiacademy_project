import { useState, useEffect, cloneElement } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@material-ui/core";

import { omit } from "lodash";

import useStyles from "./styles";

import CommonRow from "./commonRow/commonRow";
import CommonForm from "./commonForm/commonForm";

const CommonTable = ({
  columnOptions,
  rowComponent,
  data: propData,
  onRowSave,
  onRowRemove,
}) => {
  const classes = useStyles();
  const [data, setData] = useState(propData);
  const [createData, setCreateData] = useState({});
  const [editData, setEditData] = useState({});
  const [filters, setFilters] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    setData(propData);
    const filterHeader = [];
    let initCreateData = {};
    columnOptions.forEach(({ input, value, name }) => {
      filterHeader.push("");
      if (input) {
        initCreateData = {
          ...initCreateData,
          [value]: { value: null, name, input: true },
        };
      }
    });

    setCreateData(initCreateData);
    setFilters(filterHeader);
  }, [propData]);

  const inputOptions = columnOptions.filter(({ input }) => input);

  const handleFilterChange = (index, event) => {
    const newFilters = filters.map((filter, filtersIndex) => {
      if (filtersIndex === index) {
        return event.target.value;
      }
      return filter;
    });
    setFilters(newFilters);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleRowEdit = (index) => {
    let newEditData = {};

    inputOptions.forEach(({ value, name }) => {
      newEditData = {
        ...newEditData,
        [value]: { value: data[index][value], name, input: true },
      };
    });

    console.log(newEditData);

    setEditData({ _id: data[index]._id, ...newEditData });
    setOpenEditModal(true);
  };

  const handleOnEditFormChange = (formData) => {
    setEditData(formData);
  };

  const handleRowSave = () => {
    let saveData = {};

    Object.keys(omit(editData, "_id")).forEach((key) => {
      saveData = { ...saveData, [key]: editData[key].value };
    });
    onRowSave(editData._id, saveData);
    setOpenEditModal(false);
  };
  let filteredRows = data;

  filters.forEach((filter, index) => {
    if (filter !== "") {
      filteredRows = filteredRows.filter((item) =>
        Object.values(item)[index].includes(filter)
      );
    }
  });

  return (
    <div className={classes.root}>
      <Box marginTop={2} marginBottom={2}>
        <Paper elevation={3}>
          <Box padding={2}>
            <CommonForm
              onFormChange={handleOnEditFormChange}
              data={createData}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined">Clear</Button>
              <Button variant="outlined">Submit</Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {columnOptions.map(({ name, width, filter }, index) => (
                <TableCell
                  style={{ width: width }}
                  align={index === columnOptions.length - 1 ? "right" : "left"}
                >
                  <Typography>{name}</Typography>
                  {filter && (
                    <input
                      type="text"
                      onChange={(event) => handleFilterChange(index, event)}
                      placeholder={`search by ${name}`}
                    />
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <CommonRow
                columnOptions={columnOptions}
                row={row}
                onEdit={() => handleRowEdit(index)}
                onRemove={onRowRemove}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogContent dividers>
          <CommonForm onFormChange={handleOnEditFormChange} data={editData} />
        </DialogContent>
        <DialogActions dividers>
          <Button variant="contained" color="primary" onClick={handleRowSave}>
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseEditModal}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommonTable;
