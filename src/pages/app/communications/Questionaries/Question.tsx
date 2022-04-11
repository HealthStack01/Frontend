import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { Models } from '../../Constants';
import { InputType } from '../../schema';
import { BottomWrapper, DetailsWrapper } from '../../styles';

const QuestionInput = ({ onSubmit, question }) => {
  const { submit } = useRepository(Models.QUESTION);
  const { handleSubmit, control, register, reset } = useForm({ defaultValues: question });
  const [editMode, setEditMode] = useState(false);

  const addQuestion = (data) => {
    submit({ ...data, index: question.index })
      .then((submittedQ: any) => {
        reset(question);
        if (!data._id) {
          return onSubmit(submittedQ);
        }
        setEditMode(false);
        return submittedQ;
      })
      .then(() => toast.success(`${question._id ? 'Updated' : 'Added'} question successfully`))
      .catch((error) => toast.error('Error occured adding question ' + error));
  };

  return (
    <DetailsWrapper title={(question.caption || question.name || 'Add new Question') + ' - ' + question.index}>
      <form onSubmit={handleSubmit(addQuestion)}>
        <Controller
          name="name"
          control={control}
          render={({ field: { ref: _re, ...field } }) => (
            <Input
              label="Name"
              placeholder="Enter name"
              {...field}
              defaultValue={question.name}
              disabled={!editMode && question._id}
            />
          )}
        />
        <Controller
          name="caption"
          control={control}
          render={({ field: { ref: _re, ...field } }) => (
            <Input
              label="Caption"
              placeholder="Enter caption"
              {...field}
              defaultValue={question.caption}
              disabled={!editMode && question._id}
            />
          )}
        />
        <input type="hidden" {...register('index')} defaultValue={question.index} />
        <CustomSelect
          label="Choose a Input Type"
          name="formInputType"
          options={Object.keys(InputType).filter((obj: any) => isNaN(obj))}
          defaultValue={question.formInputType}
          {...register('inputType')}
          disabled={!editMode && question._id}
        />
        <BottomWrapper>
          <Button label="Clear" background="#FFE9E9" color="#ED0423" />
          {!question._id && <Button label="Add" type="submit" />}
          {editMode && <Button label="Update" type="submit" />}
          {!editMode && question._id && <Button label="Edit" type="submit" onClick={() => setEditMode(true)} />}
        </BottomWrapper>
      </form>
    </DetailsWrapper>
  );
};

export default QuestionInput;
