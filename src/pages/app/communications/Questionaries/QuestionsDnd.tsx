import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';

import useRepository from '../../../../components/hooks/repository';
import { Models } from '../../Constants';
import QuestionInput from './Question';

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  margin: '0 0  10px 0px',
  background: isDragging ? '#0364FF' : 'white',
  color: isDragging ? 'white' : 'black',
  border: '0.1px solid gray',
  fontSize: '1rem',
  borderRadius: '0.4rem',

  ...draggableStyle,
});

const QuestionsDnd = ({ questions = [], onChange }) => {
  const { submit } = useRepository(Models.QUESTION);
  const [sortedQuestions, setSortedQuestions] = useState(
    (questions || []).sort((a, b) => a.index - b.index),
  );
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newQuestions = sortedQuestions.filter(
      (obj) => obj.index !== +source.index && obj.index !== +destination.index,
    );

    const srcQuestion = sortedQuestions.find(
      (obj) => source.index == obj.index,
    );
    const destQuestion = sortedQuestions.find(
      (obj) => destination.index == obj.index,
    );

    srcQuestion.index = destination.index;
    destQuestion.index = source.index;

    const arr = [...newQuestions, srcQuestion, destQuestion].sort(
      (a, b) => +a.index - +b.index,
    );

    setSortedQuestions(arr);
    Promise.all([srcQuestion, destQuestion].map((obj) => submit(obj)));
  };

  useEffect(() => {
    setSortedQuestions((questions || []).sort((a, b) => a.index - b.index));
  }, [questions]);

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
        <Droppable droppableId="items">
          {(provided) => (
            <div
              className="todo"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {sortedQuestions.map((obj, i) => (
                <Draggable draggableId={`${obj._id}`} key={obj._id} index={i}>
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
                      <QuestionInput question={{ ...obj }} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default QuestionsDnd;
