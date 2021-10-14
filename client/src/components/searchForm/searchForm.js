import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { TextField, Button, IconButton, Select, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import Autocomplete from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DatePicker from "@mui/lab/DatePicker";

import useStyles from "./styles";

const SearchForm = ({ onSubmit, tags = [], searchFilter }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const accPanel = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    tags: [],
    uploader: "",
    from: null,
    to: null,
    sort: -1,
  });
  const [moreOption, setMoreOption] = useState(false);

  useEffect(() => {
    if (options.length > 0) {
      const mappedTag = searchFilter.tags.map((tagId) =>
        options.find((tag) => tag.tagId === `${tagId}`)
      );
      setFormData({ ...searchFilter, tags: mappedTag });
    }
  }, [searchFilter, options]);

  const classes = useStyles();

  useEffect(() => {
    setOptions(tags);
  }, [tags]);

  const handleSearchTitleChange = (e) => {
    const newFormData = {
      ...formData,
      title: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleTagsChange = (e, v) => {
    const newFormData = {
      ...formData,
      tags: v,
    };
    setFormData(newFormData);
  };

  const handleSearchUploaderChange = (e) => {
    const newFormData = {
      ...formData,
      uploader: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleFromChange = (v) => {
    const newFormData = {
      ...formData,
      from: v,
    };
    setFormData(newFormData);
  };
  const handleToChange = (v) => {
    const newFormData = {
      ...formData,
      to: v,
    };
    setFormData(newFormData);
  };

  const handleSortChange = (e) => {
    const newFormData = {
      ...formData,
      sort: e.target.value,
    };
    setFormData(newFormData);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const handleOnSearch = () => {
    onSubmit(formData);
  };

  const handleOnClear = () => {
    setFormData({
      title: "",
      tags: [],
      uploader: "",
      from: null,
      to: null,
      sort: -1,
    });
  };

  const toggleOption = () => {
    setMoreOption(!moreOption);
    const currPanel = accPanel.current;

    if (currPanel.style.maxHeight) {
      currPanel.style.maxHeight = null;
    } else {
      currPanel.style.maxHeight = `${currPanel.scrollHeight}px`;
    }
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleOnSearch();
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
            value={formData.title}
            onChange={handleSearchTitleChange}
            onKeyPress={handleKeypress}
          />
        </div>
        <div>
          <Autocomplete
            className={classes.searchTitle}
            multiple
            options={options}
            value={formData.tags}
            onChange={handleTagsChange}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            isOptionEqualToValue={(o, v) => o.tagId === v.tagId}
            getOptionLabel={(o) => (o.tagNameEN ? o.tagNameEN : "")}
            onKeyPress={handleKeypress}
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
        <div className={classes.btnGroups}>
          <Button variant="contained" onClick={handleOnSearch}>
            <SearchIcon /> Search
          </Button>
          <Button
            className={classes.clrBtn}
            variant="contained"
            onClick={handleOnClear}
          >
            <ClearIcon />
          </Button>
        </div>
      </div>
      <IconButton onClick={toggleOption} size="large">
        {moreOption ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <div className={classes.advSearch} ref={accPanel}>
        <div className={classes.accdContainer}>
          <TextField
            className={classes.moreField}
            label="Search by Uploader"
            variant="outlined"
            value={formData.uploader}
            onChange={handleSearchUploaderChange}
            onKeyPress={handleKeypress}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              value={formData.from}
              onChange={handleFromChange}
              inputFormat="dd/MM/yyyy"
              className={classes.moreField}
              renderInput={(params) => (
                <TextField
                  label="From"
                  {...params}
                  onKeyPress={handleKeypress}
                />
              )}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              variant="inline"
              inputVariant="outlined"
              value={formData.to}
              onChange={handleToChange}
              inputFormat="dd/MM/yyyy"
              onKeyPress={handleKeypress}
              className={classes.moreField}
              renderInput={(params) => (
                <TextField label="To" {...params} onKeyPress={handleKeypress} />
              )}
            />
          </LocalizationProvider>
          <Select
            value={formData.sort}
            onChange={handleSortChange}
            variant="outlined"
            className={classes.moreField}
          >
            <MenuItem value={-1}>Sort by Date DESC</MenuItem>
            <MenuItem value={1}>Sort by Date AESC</MenuItem>
          </Select>
        </div>
      </div>
    </div>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      tagNameEN: PropTypes.tagNameEN,
    })
  ),
  searchFilter: PropTypes.shape({
    title: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
        tagNameEN: PropTypes.tagNameEN,
      })
    ),
    uploader: PropTypes.string,
    from: PropTypes.instanceOf(Date),
    to: PropTypes.instanceOf(Date),
    sort: PropTypes.number,
  }),
};

SearchForm.defaultProps = {
  onSubmit: () => {},
  tags: [],
  searchFilter: {
    title: "",
    tags: [],
    uploader: "",
    from: null,
    to: null,
    sort: -1,
  },
};

export default SearchForm;
