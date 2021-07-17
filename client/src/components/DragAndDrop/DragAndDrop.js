import { useState } from "react";
import Proptypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Draggable from "./Draggable/Draggable";
import AddForm from "./AddForm/AddForm";

import useStyles from "./styles";

const DragAndDrop = ({
  items: propItems,
  onRemoveItem,
  addItemLabel,
  addItemValue,
  onAddItem,
  onChangeItem,
}) => {
  const [items, setItems] = useState(propItems);
  const classes = useStyles({ itemsLength: items.length });

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
    <div className={classes.container}>
      <AddForm
        label={addItemLabel}
        value={addItemValue}
        onAdd={onAddItem}
        onChange={onChangeItem}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={classes.droppableContainer}
            >
              {items.map((item, index) => (
                <Draggable
                  item={item}
                  index={index}
                  key={item.id}
                  onRemove={onRemoveItem}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

DragAndDrop.propTypes = {
  items: Proptypes.array,
  onRemoveItem: Proptypes.func,
  addItemLabel: Proptypes.string,
  addItemValue: Proptypes.string,
  onAddItem: Proptypes.func,
  onChangeItem: Proptypes.func,
};

DragAndDrop.defaultProps = {
  items: [],
  onRemoveItem: () => {},
  addItemLabel: "",
  addItemValue: "",
  onAddItem: () => {},
  onChangeItem: () => {},
};

export default DragAndDrop;
