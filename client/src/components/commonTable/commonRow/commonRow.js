import { useState } from "react";
import PropTypes from "prop-types";

import { isArray, isBoolean } from "lodash";
import {
  TableRow,
  TableCell,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faEdit } from "@fortawesome/free-solid-svg-icons";
import useStyles from "./styles";

import ConfirmationPopper from "../../confirmationPopper/confirmationPopper";

import { extractValueFromPath } from "../../../helper";

const CommonRow = ({ columnOptions, row, onEdit, onRemove }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleRemove = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handlePopperConfirm = () => {
    onRemove(row._id);
    setAnchorEl(null);
  };

  const handlePopperCancel = () => {
    setAnchorEl(null);
  };

  const cells = [];
  columnOptions
    .filter(({ hidden }) => !hidden)
    .forEach(({ displayValue, value }) => {
      const display = displayValue || value;
      const rowDisplay = extractValueFromPath(row, display);

      if (display) {
        if (isArray(rowDisplay)) {
          cells.push(
            <TableCell>
              {rowDisplay.map((element) => (
                <Typography>{element}</Typography>
              ))}
            </TableCell>
          );
        } else if (isBoolean(rowDisplay)) {
          cells.push(
            <TableCell>
              <Checkbox checked={rowDisplay} disabled />
            </TableCell>
          );
        } else {
          cells.push(
            <TableCell>
              <Typography>{rowDisplay}</Typography>
            </TableCell>
          );
        }
      }
    });

  return (
    <TableRow key={row._id}>
      {cells.map((cell) => cell)}
      <TableCell align="right">
        <Button
          className={classes.actionButton}
          onClick={onEdit}
          key="fas fa-edit"
        >
          <FontAwesomeIcon icon={faEdit} />
        </Button>
        <Button className={classes.actionButton} onClick={handleRemove}>
          <FontAwesomeIcon icon={faMinusSquare} />
        </Button>
        <ConfirmationPopper
          popperId={row._id}
          onPopperConfirm={handlePopperConfirm}
          onPopperCancel={handlePopperCancel}
          anchorEl={anchorEl}
        />
      </TableCell>
    </TableRow>
  );
};

CommonRow.propTypes = {
  columnOptions: PropTypes.array.isRequired,
  row: PropTypes.object.isRequired,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
};

CommonRow.defaultProps = {
  onEdit: () => {},
  onRemove: () => {},
};

export default CommonRow;
