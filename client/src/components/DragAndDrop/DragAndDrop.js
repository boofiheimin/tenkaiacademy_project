import { useState } from "react";
import Proptypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { Typography } from "@material-ui/core";
import Draggable from "./Draggable/Draggable";

import useStyles from "./styles";

const DragAndDrop = ({ items: propItems }) => {
  const [items, setItems] = useState(propItems);
  const classes = useStyles();

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={classes.container}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <Draggable item={item} index={index} key={item.id} />
              ))
            ) : (
              <Typography align="center">No Content</Typography>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

DragAndDrop.propTypes = {
  items: Proptypes.array,
};

DragAndDrop.defaultProps = {
  items: [],
};

export default DragAndDrop;
