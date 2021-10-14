import { useState } from "react";
import PropTypes from "prop-types";

import { omit } from "lodash";
import { Checkbox, TextField, FormControlLabel, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const CommonForm = ({
  data,
  onFormChange,
  requiredErrors,
  typeCheckErrors,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleFormChange = (key, value) => {
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
        let helperText = null;
        if (typeCheckErrors[key]) {
          helperText = `Wrong input for type ${data[key].inputValidation} `;
        }
        if (requiredErrors[key]) {
          helperText = "Required";
        }

        if (data[key].input === "boolean") {
          return (
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data[key].value}
                    onChange={(event) =>
                      handleFormChange(key, event.target.checked)
                    }
                  />
                }
                label={data[key].name}
              />
            </Box>
          );
        }
        if (data[key].options) {
          return (
            <Box marginBottom={1}>
              <Autocomplete
                multiple={data[key].input === "multi"}
                options={data[key].options}
                value={data[key].value}
                onChange={(event, _value) => handleFormChange(key, _value)}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                isOptionEqualToValue={(o, v) => o._id === v._id}
                getOptionLabel={(o) => o[data[key].optionLabel] || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label={data[key].name}
                    error={requiredErrors[key]}
                    helperText={helperText}
                  />
                )}
              />
            </Box>
          );
        }

        return (
          <Box marginBottom={1}>
            <TextField
              fullWidth
              label={data[key].name}
              value={data[key].value}
              onChange={(event) => handleFormChange(key, event.target.value)}
              key={`${data._id}_${data[key].name}`}
              error={requiredErrors[key] || typeCheckErrors[key]}
              helperText={helperText}
              placeholder={data[key].placeholder}
            />
          </Box>
        );
      })}
    </div>
  );
};

CommonForm.propTypes = {
  data: PropTypes.object,
  onFormChange: PropTypes.func,
  requiredErrors: PropTypes.object,
  typeCheckErrors: PropTypes.object,
};

CommonForm.defaultProps = {
  data: {},
  onFormChange: () => {},
  requiredErrors: {},
  typeCheckErrors: {},
};

export default CommonForm;
