import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  TableRow,
  TableCell,
  TextField,
  Button,
  Typography,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faSave,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import useStyles from "./styles";

import ConfirmationPopper from "../../confirmationPopper/confirmationPopper";

const CommonRow = ({ columnOptions, row, onEdit, onRemove }) => {
  const classes = useStyles();
  const [mode, setMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleState = () => {
    setMode(!mode);
  };

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
  columnOptions.forEach(({ value }) => {
    if (value) {
      cells.push(
        <TableCell>
          <Typography>{row[value]}</Typography>
        </TableCell>
      );
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

export default CommonRow;
