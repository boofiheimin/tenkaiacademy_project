import { useState, useEffect } from "react";
import { omit } from "lodash";
import { TextField } from "@material-ui/core";

const CommonForm = ({ data, onFormChange }) => {
  const handleFormChange = (key, event) => {
    const newData = {
      ...data,
      [key]: { ...data[key], value: event.target.value },
    };
    onFormChange(newData);
  };

  return (
    <div>
      {Object.keys(omit(data, "_id")).map((key) => (
        <div>
          <TextField
            fullWidth
            label={data[key].name}
            value={data[key].value}
            onChange={(event) => handleFormChange(key, event)}
          />
        </div>
      ))}
    </div>
  );
};

export default CommonForm;
