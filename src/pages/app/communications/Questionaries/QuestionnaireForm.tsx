import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { QuestionnaireSchema } from '../schema';
import DnDBox from './QuestionsDnd';

const QuestionnaireForm = ({
  backClick,
  questionnaire: defaultValue,
  onSubmit,
}) => {
  const { submit } = useRepository<any>(Models.QUESTIONNAIRE);
  const { handleSubmit, control } = useForm({
    defaultValues: defaultValue,
  });
  const [questionnaire, setQuestionnaire] = useState(defaultValue || {});

  const updateQuestions = (questions) => {
    console.debug({ questions });
    submit({ ...questionnaire, questions: [...questions] })
      .then(() => {
        setQuestionnaire({ ...questionnaire, questions: [...questions] });
      })
      .catch((error) => {
        toast.error('Error occured updating questions ' + error);
      });
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Questionnaire</h2>
            <span>
              Create a new Questionnaire by filling out the form below to get
              started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <FullDetailsWrapper>
            <GridWrapper className="two-columns">
              {QuestionnaireSchema.filter(
                (obj) => obj.name !== 'questions',
              ).map((client, index) => (
                <DynamicInput
                  key={index}
                  name={client.key}
                  control={control}
                  label={client.name}
                  inputType={client.inputType}
                  data={questionnaire}
                />
              ))}
            </GridWrapper>
            <BottomWrapper>
              <Button
                label={questionnaire._id ? 'Update' : 'Save'}
                type="submit"
              />
            </BottomWrapper>
          </FullDetailsWrapper>
        </form>
        {questionnaire._id && (
          <DnDBox
            questions={questionnaire.questions}
            onChange={updateQuestions}
          />
        )}
      </GrayWrapper>
    </PageWrapper>
  );
};

export default QuestionnaireForm;
