import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Autocomplete from "@material-ui/lab/Autocomplete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import useStyles from "./styles";

const SearchForm = ({ onSearch, tags = [] }) => {
  const [titleValue, setTitleValue] = useState();
  const [value, setValue] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [openOption, setOpenOption] = useState(false);
  const accPanel = useRef(null);

  const classes = useStyles();

  useEffect(() => {
    setOptions(["", ...tags]);
  }, [tags]);

  const handleOnChange = (e, v) => {
    console.log(v);
    setValue(v);
  };

  const handleOnTextFieldChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const handleOnSearch = () => {
    console.log(value);
    setValue([]);
    // onSearch(value);
  };

  const toggleOption = () => {
    // setOpenOption(!openOption);

    const currPanel = accPanel.current;

    if (currPanel.style.maxHeight) {
      currPanel.style.maxHeight = null;
    } else {
      currPanel.style.maxHeight = `${currPanel.scrollHeight}px`;
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.basicSearch}>
        <div>
          <TextField
            className={classes.searchTitle}
            label="Search by title"
            variant="outlined"
          />
        </div>
        <div>
          <Autocomplete
            className={classes.searchTitle}
            multiple
            options={options}
            value={value}
            onChange={handleOnChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            getOptionSelected={(o, v) => o._id === v._id}
            getOptionLabel={(o) => (o.tagNameEN ? o.tagNameEN : "")}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Search by tags"
                placeholder="Add Tags.."
              />
            )}
          />
        </div>

        <div className={classes.searchBtn}>
          <Button variant="contained" onClick={handleOnSearch}>
            <SearchIcon /> Search
          </Button>
        </div>
      </div>
      <IconButton onClick={toggleOption}>
        <KeyboardArrowDownIcon />
      </IconButton>
      <div
        className={openOption ? classes.advSearch : classes.advSearchClose}
        ref={accPanel}
      >
        <div className={classes.accdContainer}>
          <TextField
            className={classes.searchUploader}
            label="Search by Uploader"
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy "
              label="Start time"
              id="date-picker-inline"
            />
          </MuiPickersUtilsProvider>
          <Typography>-</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              format="MM/dd/yyyy  "
              label="End time"
              id="date-picker-inline"
            />
          </MuiPickersUtilsProvider>
          <Select
            label="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={1}
            variant="outlined"
          >
            <MenuItem value={1}>Sort by Date DESC</MenuItem>
            <MenuItem value={-1}>Sort by Date AESC</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

SearchForm.propTypes = {};

export default SearchForm;
