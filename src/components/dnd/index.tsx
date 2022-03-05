import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const listItems = [
  {
    id: '1',
    name: 'Study Spanish',
  },
  {
    id: '2',
    name: 'Workout',
  },
  {
    id: '3',
    name: 'Film Youtube',
  },
  {
    id: '4',
    name: 'Grocery Shop',
  },
];

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: '0 50px 15px 50px',
  background: isDragging ? '#0364FF' : 'white',
  color: isDragging ? 'white' : 'black',
  //   border: `0.1px solid gray`,
  fontSize: '16px',
  borderRadius: '5px',

  ...draggableStyle,
});

const DnDBox = () => {
  const [values, setValues] = useState(listItems);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(values);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setValues(items);
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
              {values.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DnDBox;
