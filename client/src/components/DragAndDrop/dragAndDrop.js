import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import Draggable from "./Draggable/draggable";
import AddForm from "./AddForm/addForm";

import useStyles from "./styles";

const DragAndDrop = ({
  items: propItems,
  onRemoveItem,
  addItemLabel,
  addItemValue,
  onAddItem,
  onChangeItem,
  onReorderItem,
  lists,
  placeholder,
  addForm,
  onItemClick,
  activeIndex,
}) => {
  const [items, setItems] = useState(propItems);
  const classes = useStyles({ itemsLength: items.length });

  useEffect(() => {
    setItems(propItems);
  }, [propItems]);

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
    onReorderItem(reorderedItems);
  };

  return (
    <div className={classes.container}>
      {addForm && (
        <AddForm
          label={addItemLabel}
          placeholder={placeholder}
          value={addItemValue}
          onAdd={onAddItem}
          onChange={onChangeItem}
          lists={lists}
        />
      )}
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
                  onItemClick={onItemClick}
                  active={activeIndex === index}
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
  items: PropTypes.array,
  onRemoveItem: PropTypes.func,
  addItemLabel: PropTypes.string,
  addItemValue: PropTypes.string,
  onAddItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onReorderItem: PropTypes.func,
  lists: PropTypes.array,
  placeholder: PropTypes.string,
  addForm: PropTypes.bool,
  onItemClick: PropTypes.func,
  activeIndex: PropTypes.number,
};

DragAndDrop.defaultProps = {
  items: [],
  onRemoveItem: () => {},
  addItemLabel: "",
  addItemValue: "",
  onAddItem: () => {},
  onChangeItem: () => {},
  onReorderItem: () => {},
  lists: [],
  placeholder: "",
  addForm: false,
  onItemClick: () => {},
  activeIndex: -1,
};

export default DragAndDrop;
