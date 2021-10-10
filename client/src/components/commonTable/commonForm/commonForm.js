import { useState } from "react";
import PropTypes from "prop-types";

import { omit } from "lodash";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CommonForm = ({ data, onFormChange, fieldErrors }) => {
  const [inputValue, setInputValue] = useState("");

  const handleFormChange = (key, event) => {
    const newData = {
      ...data,
      [key]: { ...data[key], value: event.target.value },
    };

    onFormChange(newData);
  };

  const handleOnValueChange = (key, value) => {
    const newData = {
      ...data,
      [key]: { ...data[key], value },
    };
    onFormChange(newData);
  };

  const handleInputChange = (e, v) => {
    setInputValue(v);
  };

  return (
    <div>
      {Object.keys(omit(data, "_id")).map((key) => {
        if (data[key].options) {
          return (
            <Autocomplete
              multiple
              options={data[key].options}
              value={data[key].value}
              onChange={(event, _value) => handleOnValueChange(key, _value)}
              inputValue={inputValue}
              onInputChange={handleInputChange}
              getOptionSelected={(o, v) => o._id === v._id}
              getOptionLabel={(o) => o[data[key].optionLabel] || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label={data[key].name}
                  error={fieldErrors[key]}
                  helperText={fieldErrors[key] ? "Required" : null}
                />
              )}
            />
          );
        }
        return (
          <div>
            <TextField
              fullWidth
              label={data[key].name}
              value={data[key].value}
              onChange={(event) => handleFormChange(key, event)}
              key={`${data._id}_${data[key].name}`}
              error={fieldErrors[key]}
              helperText={fieldErrors[key] ? "Required" : null}
            />
          </div>
        );
      })}
    </div>
  );
};

CommonForm.propTypes = {
  data: PropTypes.object,
  onFormChange: PropTypes.func,
  fieldErrors: PropTypes.object,
};

CommonForm.defaultProps = {
  data: {},
  onFormChange: () => {},
  fieldErrors: {},
};

export default CommonForm;
