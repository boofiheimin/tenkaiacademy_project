import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Container,
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

import { isArray, isEmpty, omit } from "lodash";

import useStyles from "./styles";

import CommonRow from "./commonRow/commonRow";
import CommonForm from "./commonForm/commonForm";

const CommonTable = ({
  columnOptions,
  data: propData,
  onRowSave,
  onRowRemove,
  onRowAdd,
}) => {
  const classes = useStyles();
  const [data, setData] = useState(propData);
  const [createData, setCreateData] = useState({});
  const [editData, setEditData] = useState({});
  const [filters, setFilters] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const initCreateData = () => {
    let initData = {};
    columnOptions.forEach(
      ({ input, value, name, options, optionLabel, required }) => {
        if (input) {
          initData = {
            ...initData,
            [value]: {
              value: "",
              name,
              input: true,
              ...(options &&
                options.length > 0 && {
                  options,
                  value: [],
                  optionLabel,
                }),
              ...(required && {
                required: true,
              }),
            },
          };
        }
      }
    );

    return initData;
  };

  useEffect(() => {
    setData(propData);
    setCreateData(initCreateData());
  }, [propData]);

  const inputOptions = columnOptions.filter(({ input }) => input);

  const handleFilterChange = (key, event) => {
    const newFilters = {
      ...filters,
      [key]: event.target.value,
    };
    setFilters(newFilters);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleRowEdit = (index) => {
    let newEditData = {};
    inputOptions.forEach(({ value, name, options, optionLabel, required }) => {
      newEditData = {
        ...newEditData,
        [value]: {
          value: data[index][value],
          name,
          input: true,
          ...(options &&
            options.length > 0 && {
              options,
              value: data[index][value],
              optionLabel,
            }),
          ...(required && {
            required: true,
          }),
        },
      };
    });
    setEditData({ _id: data[index]._id, ...newEditData });
    setOpenEditModal(true);
  };

  const handleOnEditFormChange = (formData) => {
    setEditData(formData);
  };

  const handleOnCreateFormChange = (formData) => {
    setCreateData(formData);
  };

  const handleClearCreateData = () => {
    setCreateData(initCreateData());
    setFieldErrors({});
  };

  const handleRowSave = () => {
    let saveData = {};
    Object.keys(omit(editData, "_id")).forEach((key) => {
      saveData = { ...saveData, [key]: editData[key].value };
    });
    onRowSave(editData._id, saveData);
    setOpenEditModal(false);
    handleClearCreateData();
  };

  const handleRowAdd = () => {
    let addData = {};
    let errors = {};
    Object.keys(omit(createData, "_id")).forEach((key) => {
      if (createData[key].required) {
        if (!createData[key].value || createData[key].value.length === 0) {
          errors = { ...errors, [key]: true };
        }
      }
      addData = { ...addData, [key]: createData[key].value };
    });

    if (!isEmpty(errors)) {
      setFieldErrors(errors);
    } else {
      onRowAdd(addData);
      handleClearCreateData();
    }
  };

  let filteredRows = data;

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filteredRows = filteredRows.filter((item) => {
        if (isArray(item[key])) {
          return item[key]
            .join()
            .toLowerCase()
            .includes(filters[key].toLowerCase());
        }
        return item[key].toLowerCase().includes(filters[key].toLowerCase());
      });
    }
  });

  return (
    <Container>
      <div className={classes.root}>
        <Box marginTop={2} marginBottom={2}>
          <Paper elevation={3}>
            <Box padding={2}>
              <CommonForm
                fieldErrors={fieldErrors}
                onFormChange={handleOnCreateFormChange}
                data={createData}
              />
              <div className={classes.buttonContainer}>
                <Button variant="outlined" onClick={handleClearCreateData}>
                  Clear
                </Button>
                <Button variant="outlined" onClick={handleRowAdd}>
                  Submit
                </Button>
              </div>
            </Box>
          </Paper>
        </Box>

        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                {columnOptions.map(
                  ({ name, width, filter, value, displayValue }, index) => (
                    <TableCell
                      style={{ width: width }}
                      align={
                        index === columnOptions.length - 1 ? "right" : "left"
                      }
                    >
                      <Typography>{name}</Typography>
                      {filter && (
                        <input
                          type="text"
                          onChange={(event) =>
                            handleFilterChange(displayValue || value, event)
                          }
                          placeholder={`search by ${name}`}
                        />
                      )}
                    </TableCell>
                  )
                )}
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
    </Container>
  );
};

CommonTable.propTypes = {
  columnOptions: PropTypes.array.isRequired,
  data: PropTypes.array,
  onRowSave: PropTypes.func,
  onRowAdd: PropTypes.func,
  onRowRemove: PropTypes.func,
};

CommonTable.defaultProps = {
  data: [],
  onRowSave: () => {},
  onRowAdd: () => {},
  onRowRemove: () => {},
};

export default CommonTable;
