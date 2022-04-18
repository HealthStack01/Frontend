import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import { Dictionary } from '../../../../types.d';
import { Models } from '../../Constants';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import SubmissionLine from './SubmissionLine';

const getDefaultValues = (interactions) => {
  const values = {};
  interactions.forEach((obj) => (values[obj.question] = obj.response));
  return values;
};

const SubmissionCreate = ({
  backClick,
  onSubmit,
  data: selectedSubmission,
}) => {
  const { control, handleSubmit } = useForm({
    defaultValues: getDefaultValues(selectedSubmission.interactions),
  });
  const { find: getQuestionnaires } = useRepository(Models.QUESTIONNAIRE);
  const [questionnaire, setQuestionnaire] = useState<Dictionary>();

  const onSubmitSubmission = (data) => {
    const interactions = Object.keys(data).map((questionId) => {
      const question = questionnaire.questions.find(
        (obj) => obj._id === questionId,
      );
      return {
        question: question._id,
        questionCaption: question.caption,
        index: question.index,
        response: data[questionId] || '',
        active: false,
      };
    });
    const submission = {
      id: selectedSubmission ? selectedSubmission._id : undefined,
      interactions,
      questionnaire: questionnaire._id,
      completed: true,
    };
    onSubmit(submission);
  };

  useEffect(() => {
    getQuestionnaires({ query: { facility: undefined } })
      .then((res: any) => {
        setQuestionnaire(res.data[0]);
      })
      .catch((e) => {
        toast.error('Questionnaires not available ' + e);
      });
  }, []);

  if (!questionnaire) return <div>Loading questionnaire</div>;

  const getInteraction = (question, interactions) => {
    return (interactions || []).find(
      (interaction) => interaction.question === question._id,
    );
  };
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Fill a Questionnaire</h2>
            <span>
              Submit a new questionnaire by filling out the form below to get
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
        <form action="" onSubmit={handleSubmit(onSubmitSubmission)}>
          <FullDetailsWrapper title="Create Employee">
            <GridWrapper>
              <div>
                <label>Questionnaire</label>
                <p>{questionnaire.name}</p>
              </div>
            </GridWrapper>
            <GridWrapper>
              {questionnaire.questions.map((question) => (
                <SubmissionLine
                  control={control}
                  interaction={{
                    ...getInteraction(
                      question,
                      selectedSubmission.interactions,
                    ),
                    question,
                  }}
                />
              ))}
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default SubmissionCreate;
