import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";
import Autocomplete from "@material-ui/lab/Autocomplete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
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
        options.find((tag) => tag.tagId === tagId)
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
            getOptionSelected={(o, v) => o.tagId === v.tagId}
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
      <IconButton onClick={toggleOption}>
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              inputVariant="outlined"
              value={formData.from}
              onChange={handleFromChange}
              format="dd/MM/yyyy "
              label="From"
              onKeyPress={handleKeypress}
              className={classes.moreField}
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              inputVariant="outlined"
              value={formData.to}
              onChange={handleToChange}
              format="dd/MM/yyyy  "
              label="To"
              onKeyPress={handleKeypress}
              className={classes.moreField}
            />
          </MuiPickersUtilsProvider>
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
