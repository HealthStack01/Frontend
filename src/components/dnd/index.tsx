import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { DetailsWrapper } from '../app/styles';
import Input from '../inputs/basic/Input';
import CustomSelect from '../inputs/basic/Select';
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: '0 0  10px 0px',
  background: isDragging ? '#0364FF' : 'white',
  color: isDragging ? 'white' : 'black',
  //   border: `0.1px solid gray`,
  fontSize: '1rem',
  borderRadius: '0.4rem',

  ...draggableStyle,
});

const inputOptions = ['text', 'textarea', 'email', 'date', 'datetime'];

const DnDBox = ({ listItems }) => {
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
                        <DetailsWrapper title={name}>
                          <Input label={name} placeholder={`Enter ${name}`} name={name} />
                          <CustomSelect label="Choose a Input Type" name="inputType" options={inputOptions} />
                        </DetailsWrapper>
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
