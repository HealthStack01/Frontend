import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { Models } from '../../Constants';
import { InputType } from '../../schema/util';
import { BottomWrapper, DetailsWrapper } from '../../styles';

const QuestionInput = ({ onSubmit = null, question }) => {
  const { submit } = useRepository(Models.QUESTION);
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: question,
  });
  const [editMode, setEditMode] = useState(false);
  const [options, setOptions] = useState(question.options || []);
  const [newOption, setNewOption] = useState(
    question.formInputType && question.formInputType.includes('SELECT')
      ? { label: '', value: '' }
      : null,
  );

  const addQuestion = (data) => {
    submit({ ...data, index: question.index, options })
      .then((submittedQ: any) => {
        reset(question);
        if (!data._id && onSubmit) {
          return onSubmit(submittedQ);
        }
        setEditMode(false);
        return submittedQ;
      })
      .catch((error) => toast.error('Error occured adding question ' + error));
  };

  const addNewOption = () => {
    if (newOption.label && newOption.value) {
      const newOptions = [...options, newOption];
      setOptions(newOptions);
      setNewOption({ label: '', value: '' });
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'formInputType' && (value[name] || '').includes('SELECT')) {
        setNewOption({ label: '', value: '' });
      } else {
        setNewOption(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <DetailsWrapper
      title={question.caption || question.name || 'Add new Question'}
    >
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
        <Controller
          name="formInputType"
          control={control}
          render={({ field: { ref: _re, ...field } }) => (
            <CustomSelect
              {...field}
              label="Choose a Input Type"
              name="formInputType"
              options={Object.keys(InputType).filter((obj: any) => isNaN(obj))}
              defaultValue={question.formInputType}
              readonly={!!(!editMode && question._id)}
            />
          )}
        />
        {options.length > 0 && (
          <div>
            Options{' '}
            {options.map((option, i) => (
              <div key={i}>
                <span>
                  {option.label}({option.value}),
                </span>
                <button
                  type="button"
                  className="react-datepicker__close-icon undefined"
                  aria-label="Close"
                ></button>
              </div>
            ))}{' '}
          </div>
        )}
        <div className="control has-icons-left grid-cols-2">
          {newOption && editMode && (
            <div className="react-datepicker__input-container">
              <input
                className="input is-small"
                type="text"
                placeholder="Label"
                value={newOption.label}
                onChange={({ target: { value: label } }) =>
                  setNewOption({ ...newOption, label })
                }
              />
              <input
                className="input is-small"
                type="text"
                placeholder="Value"
                value={newOption.value}
                onChange={({ target: { value } }) =>
                  setNewOption({ ...newOption, value })
                }
              />
              <button
                type="button"
                className="fas fa-plus-circle"
                aria-label="Close"
                onClick={addNewOption}
              >
                Add
              </button>
            </div>
          )}
        </div>
        <BottomWrapper>
          {editMode && (
            <Button
              label="Cancel"
              background="#FFE9E9"
              color="#ED0423"
              onClick={() => setEditMode(false)}
            />
          )}
          {!question._id && <Button label="Add" type="submit" />}
          {editMode && <Button label="Update" type="submit" />}
          {!editMode && question._id && (
            <Button
              label="Edit"
              type="submit"
              onClick={() => setEditMode(true)}
            />
          )}
        </BottomWrapper>
      </form>
    </DetailsWrapper>
  );
};

export default QuestionInput;
