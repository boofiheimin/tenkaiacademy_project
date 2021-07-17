import { Typography } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";

const CustomDraggable = ({ item: { id, text, img }, index }) => (
  <Draggable draggableId={id} index={index}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <div>
          {img && <img src={img} alt="listimg" />}
          <Typography>{text}</Typography>
        </div>
      </div>
    )}
  </Draggable>
);

export default CustomDraggable;
