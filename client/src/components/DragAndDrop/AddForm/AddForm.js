import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { TextField, IconButton, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Autocomplete from "@material-ui/lab/Autocomplete";

const AddForm = ({ label, placeholder, onAdd, lists }) => {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(["", ...lists]);
  }, [lists]);

  const handleOnChange = (e, v) => {
    setValue(v);
  };

  const handleOnTextFieldChange = (e) => {
    setValue(e.target.value);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  const handleOnAdd = () => {
    setValue("");
    onAdd(value);
  };

  return (
    <Box display="flex" justifyContent="center" borderRadius={8} padding={1}>
      {lists.length > 0 ? (
        <Autocomplete
          options={options}
          value={value}
          onChange={handleOnChange}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          getOptionSelected={(o, v) => o._id === v._id}
          getOptionLabel={(o) => (o.tagNameEN ? o.tagNameEN : "")}
          style={{ width: "80%" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      ) : (
        <TextField
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={handleOnTextFieldChange}
          style={{ width: "80%" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}

      <IconButton onClick={handleOnAdd}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};
AddForm.propTypes = {
  label: PropTypes.string,
  onAdd: PropTypes.func,
  lists: PropTypes.array,
  placeholder: PropTypes.string,
};

AddForm.defaultProps = {
  label: "",
  onAdd: () => {},
  lists: [],
  placeholder: "",
};

export default AddForm;
