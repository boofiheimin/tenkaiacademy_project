import PropTypes from "prop-types";
import { TextField, IconButton, Box } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const AddForm = ({ label, value, onAdd, onChange }) => (
  <Box
    display="flex"
    justifyContent="center"
    bgcolor="white"
    borderRadius={8}
    padding={1}
  >
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
    <IconButton onClick={onAdd}>
      <AddIcon />
    </IconButton>
  </Box>
);

AddForm.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
};

AddForm.defaultProps = {
  label: "",
  value: "",
  onAdd: () => {},
  onChange: () => {},
};

export default AddForm;
