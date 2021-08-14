import { useState } from "react";
import Proptypes from "prop-types";
import { Typography, IconButton } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import CancelIcon from "@material-ui/icons/Cancel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import ConfirmationPopper from "../../ConfirmationPopper/ConfirmationPopper";

import useStyles from "./styles";

const CustomDraggable = ({ item: { id, text, img }, index, onRemove }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleRemoveClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handlePopperConfirm = () => {
    onRemove(id);
    setAnchorEl(null);
  };
  const handlePopperCancel = () => {
    setAnchorEl(null);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, { isDragging, draggableStyle }) => {
        const classes = useStyles({ isDragging, draggableStyle });
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={classes.listContainer}>
              <FontAwesomeIcon icon={faBars} className={classes.icon} />
              {img && <img src={img} alt="listimg" className={classes.img} />}
              <Typography className={classes.text}>{text}</Typography>
              <IconButton
                className={classes.cancel}
                onClick={handleRemoveClick}
              >
                <CancelIcon />
              </IconButton>
              <ConfirmationPopper
                popperId={id}
                onPopperConfirm={handlePopperConfirm}
                onPopperCancel={handlePopperCancel}
                anchorEl={anchorEl}
              />
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

CustomDraggable.propTypes = {
  item: Proptypes.shape({
    id: Proptypes.string.isRequired,
    text: Proptypes.string.isRequired,
    img: Proptypes.string,
  }),
  index: Proptypes.number.isRequired,
  onRemove: Proptypes.func,
};

CustomDraggable.defaultProps = {
  item: {
    id: 0,
    text: "",
    img: "",
  },
  onRemove: () => {},
};

export default CustomDraggable;
