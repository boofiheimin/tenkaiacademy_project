import Proptypes from "prop-types";
import clsx from "clsx";
import { Typography, IconButton } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import CancelIcon from "@material-ui/icons/Cancel";
import useStyles from "./styles";

const CustomDraggable = ({ item: { id, text, img }, index, onRemove }) => (
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
            <Typography className={classes.text}>{text}</Typography>
            <IconButton className={classes.cancel} onClick={() => onRemove(id)}>
              <CancelIcon />
            </IconButton>
          </div>
        </div>
      );
    }}
  </Draggable>
);

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
