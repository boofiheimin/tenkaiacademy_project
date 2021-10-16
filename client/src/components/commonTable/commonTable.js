import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { isArray, isEmpty, isNaN, omit, toNumber } from "lodash";
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
  TablePagination,
} from "@mui/material";

import useStyles from "./styles";

import Loading from "../loading/loading";

import CommonRow from "./commonRow/commonRow";
import CommonForm from "./commonForm/commonForm";

import { extractValueFromPath } from "../../helper";

const CommonTable = ({
  columnOptions,
  data: propData,
  onRowSave,
  onRowRemove,
  onRowAdd,
  defaultRowsPerPage,
  loading,
}) => {
  const classes = useStyles();
  const [data, setData] = useState(propData);
  const [createData, setCreateData] = useState({});
  const [editData, setEditData] = useState({});
  const [filters, setFilters] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [requiredErrors, setRequiredErrors] = useState({
    create: {},
    edit: {},
  });
  const [typeCheckErrors, setTypeCheckError] = useState({
    create: {},
    edit: {},
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const initCreateData = () => {
    let initData = {};
    columnOptions.forEach(
      ({
        input,
        value,
        name,
        options,
        optionLabel,
        required,
        inputValidation,
        placeholder,
      }) => {
        if (input) {
          initData = {
            ...initData,
            [value]: {
              value: input === "boolean" ? false : "",
              name,
              input,
              ...(options &&
                options.length > 0 && {
                  options,
                  value: input === "multi" ? [] : null,
                  optionLabel,
                }),
              ...(required && {
                required: true,
              }),
              ...(inputValidation && {
                inputValidation,
              }),
              placeholder,
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

  const handleRowEdit = (id) => {
    let newEditData = {};

    const index = data.findIndex(({ _id }) => id === _id);

    inputOptions.forEach(
      ({
        value,
        name,
        options,
        optionLabel,
        required,
        input,
        displayValue,
        inputValidation,
        placeholder,
      }) => {
        newEditData = {
          ...newEditData,
          [value]: {
            value: extractValueFromPath(data[index], displayValue || value),
            name,
            input,
            ...(options &&
              options.length > 0 && {
                options,
                optionLabel,
                value: extractValueFromPath(data[index], value),
              }),
            ...(required && {
              required: true,
            }),
            ...(inputValidation && {
              inputValidation,
            }),
            placeholder,
          },
        };
      }
    );
    setEditData({ _id: data[index]._id, ...newEditData });
    setRequiredErrors({ ...requiredErrors, edit: {} });
    setTypeCheckError({ ...typeCheckErrors, edit: {} });
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
    setRequiredErrors({ ...requiredErrors, create: {} });
    setTypeCheckError({ ...typeCheckErrors, create: {} });
  };

  const handleRowSave = () => {
    setRequiredErrors({ ...requiredErrors, edit: {} });
    setTypeCheckError({ ...typeCheckErrors, edit: {} });
    let saveData = {};
    let rErrors = {};
    let tErrors = {};
    Object.keys(omit(editData, "_id")).forEach((key) => {
      if (editData[key].required) {
        if (
          editData[key].value === undefined ||
          editData[key].value.length === 0
        ) {
          rErrors = { ...rErrors, [key]: true };
        }
      }
      if (editData[key].inputValidation) {
        if (editData[key].inputValidation === "number") {
          if (
            editData[key].value !== undefined &&
            isNaN(toNumber(editData[key].value))
          ) {
            tErrors = { ...tErrors, [key]: true };
          }
        }
      }
      saveData = { ...saveData, [key]: editData[key].value };
    });
    if (!isEmpty(rErrors) || !isEmpty(tErrors)) {
      if (!isEmpty(rErrors))
        setRequiredErrors({ ...requiredErrors, edit: rErrors });
      if (!isEmpty(tErrors))
        setTypeCheckError({ ...requiredErrors, edit: tErrors });
    } else {
      onRowSave(editData._id, saveData);
      setOpenEditModal(false);
      setRequiredErrors({ ...requiredErrors, edit: {} });
      setTypeCheckError({ ...typeCheckErrors, edit: {} });
    }
  };

  const handleRowAdd = () => {
    setRequiredErrors({ ...requiredErrors, create: {} });
    setTypeCheckError({ ...typeCheckErrors, create: {} });
    let addData = {};
    let rErrors = {};
    let tErrors = {};
    Object.keys(omit(createData, "_id")).forEach((key) => {
      if (createData[key].required) {
        if (!createData[key].value || createData[key].value.length === 0) {
          rErrors = { ...rErrors, [key]: true };
        }
      }
      if (createData[key].inputValidation) {
        if (createData[key].inputValidation === "number") {
          if (isNaN(toNumber(createData[key].value))) {
            tErrors = { ...tErrors, [key]: true };
          }
        }
      }
      addData = { ...addData, [key]: createData[key].value };
    });
    if (!isEmpty(rErrors) || !isEmpty(tErrors)) {
      if (!isEmpty(rErrors))
        setRequiredErrors({ ...requiredErrors, create: rErrors });
      if (!isEmpty(tErrors))
        setTypeCheckError({ ...requiredErrors, create: tErrors });
    } else {
      onRowAdd(addData);
      handleClearCreateData();
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let filteredRows = data;

  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      filteredRows = filteredRows.filter((item) => {
        const itemKey = extractValueFromPath(item, key);

        if (isArray(itemKey)) {
          return itemKey
            .join()
            .toLowerCase()
            .includes(filters[key].toLowerCase());
        }
        return itemKey.toLowerCase().includes(filters[key].toLowerCase());
      });
    }
  });

  const currentPageNumber = page * rowsPerPage;
  const paginatedRows = filteredRows.slice(
    currentPageNumber,
    currentPageNumber + rowsPerPage
  );

  return (
    <Container>
      <div className={classes.root}>
        <Box marginTop={2} marginBottom={2}>
          <Paper elevation={3}>
            <Box padding={2}>
              <CommonForm
                requiredErrors={requiredErrors.create}
                typeCheckErrors={typeCheckErrors.create}
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
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table className={classes.table} size="small">
              <TableHead>
                <TableRow>
                  {columnOptions
                    .filter(({ hidden }) => !hidden)
                    .map(
                      ({ name, width, filter, value, displayValue }, index) => (
                        <TableCell
                          style={{ width: width }}
                          align={
                            index === columnOptions.length - 1
                              ? "right"
                              : "left"
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
                {paginatedRows.map((row) => (
                  <CommonRow
                    columnOptions={columnOptions}
                    row={row}
                    onEdit={handleRowEdit}
                    onRemove={onRowRemove}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.tablePagination}>
            <TablePagination
              component="div"
              count={filteredRows.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <Dialog open={openEditModal} onClose={handleCloseEditModal}>
            <DialogContent dividers>
              <CommonForm
                requiredErrors={requiredErrors.edit}
                typeCheckErrors={typeCheckErrors.edit}
                onFormChange={handleOnEditFormChange}
                data={editData}
              />
            </DialogContent>
            <DialogActions dividers>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRowSave}
              >
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
        </>
      )}
    </Container>
  );
};

CommonTable.propTypes = {
  columnOptions: PropTypes.array.isRequired,
  data: PropTypes.array,
  onRowSave: PropTypes.func,
  onRowAdd: PropTypes.func,
  onRowRemove: PropTypes.func,
  defaultRowsPerPage: PropTypes.number,
  loading: PropTypes.bool,
};

CommonTable.defaultProps = {
  data: [],
  onRowSave: () => {},
  onRowAdd: () => {},
  onRowRemove: () => {},
  defaultRowsPerPage: 10,
  loading: true,
};

export default CommonTable;
