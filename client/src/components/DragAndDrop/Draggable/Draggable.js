import { useState } from "react";
import PropTypes from "prop-types";
import { Typography, Button } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import ConfirmationPopper from "../../ConfirmationPopper/ConfirmationPopper";

import useStyles from "./styles";

const CustomDraggable = ({
  item: { id, text, img },
  index,
  onRemove,
  active,
  onItemClick,
}) => {
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
  const handleOnClick = () => {
    onItemClick(index);
  };
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, { isDragging, draggableStyle }) => {
        const classes = useStyles({ isDragging, draggableStyle, active });
        return (
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div className={classes.listContainer}>
              <div {...provided.dragHandleProps}>
                <FontAwesomeIcon icon={faBars} className={classes.icon} />
              </div>
              <div
                className={classes.clickable}
                onClick={handleOnClick}
                role="button"
                tabIndex={0}
              >
                {img && <img src={img} alt="listimg" className={classes.img} />}
                <Typography className={classes.text}>{text}</Typography>
              </div>
              {!active && (
                <Button
                  className={classes.actionButton}
                  onClick={handleRemoveClick}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Button>
              )}
            </div>
            <ConfirmationPopper
              popperId={id}
              onPopperConfirm={handlePopperConfirm}
              onPopperCancel={handlePopperCancel}
              anchorEl={anchorEl}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

CustomDraggable.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
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
