import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import QuestionInput from '../../pages/app/communications/Questionaries/Question';
import { Models } from '../../pages/app/Constants';
import useRepository from '../hooks/repository';
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: '0 0  10px 0px',
  background: isDragging ? '#0364FF' : 'white',
  color: isDragging ? 'white' : 'black',
  //   border: `0.1px solid gray`,
  fontSize: '1rem',
  borderRadius: '0.4rem',

  ...draggableStyle,
});

const DnDBox = ({ questions, onChange }) => {
  const { submit } = useRepository(Models.QUESTION);
  const [items, setItems] = useState(
    (questions || []).sort((a, b) => a.index - b.index),
  );
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const srcQuestion = questions.find((obj) => source.index == obj.index);
    const destQuestion = questions.find(
      (obj) => destination.index == obj.index,
    );

    srcQuestion.index = destination.index;
    destQuestion.index = source.index;

    setItems((questions || []).sort((a, b) => a.index - b.index));
    submit([srcQuestion, destQuestion]);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        {' '}
        <div>
          <QuestionInput
            question={{ index: questions.length }}
            onSubmit={(data) => {
              const newQuestions = [...questions, data];
              onChange(newQuestions);
            }}
          />
        </div>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((obj) => (
                <Draggable
                  key={obj.index}
                  draggableId={`${obj.index}`}
                  index={obj.index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                      )}
                    >
                      <QuestionInput
                        question={obj}
                        onSubmit={(e) => console.debug({ e })}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DnDBox;
