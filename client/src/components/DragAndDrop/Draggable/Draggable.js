import Proptypes from "prop-types";
import clsx from "clsx";
import { Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

import useStyles from "./styles";

const CustomDraggable = ({ item: { id, text, img }, index }) => (
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
            <i className={clsx("fas fa-bars", classes.icon)} />
            {img && <img src={img} alt="listimg" className={classes.img} />}
            <Typography>{text}</Typography>
          </div>
        </div>
      );
    }}
  </Draggable>
);

CustomDraggable.propTypes = {
  item: Proptypes.objectOf({
    id: Proptypes.string.isRequired,
    text: Proptypes.string.isRequired,
    img: Proptypes.string,
  }),
};

CustomDraggable.defaultProps = {
  item: {
    id: 0,
    text: "",
    img: "",
  },
};

export default CustomDraggable;
