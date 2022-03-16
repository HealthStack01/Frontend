import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import DnDBox from '../../../../components/dnd';
import Input from '../../../../components/inputs/basic/Input';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  backClick: () => void;
}

const listItems = [
  {
    id: '1',
    name: 'Name',
  },
  {
    id: '2',
    name: 'Gender',
  },
  {
    id: '3',
    name: 'Date of Birth',
  },
  {
    id: '4',
    name: 'Appointment Time',
  },
  {
    id: '5',
    name: 'State of Origin',
  },
];

const QuestionnairesCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Questionnaire</h2>
            <span>Create a new Questionnaire by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper>
            <GridWrapper className="two-columns">
              <Input
                label="Questionnaire Name"
                name="questionnaireName"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Short Name"
                name="shortName"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
            <BottomWrapper>
              <Button label="Start " type="submit" />
            </BottomWrapper>
          </FullDetailsWrapper>
          <DnDBox listItems={listItems}></DnDBox>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default QuestionnairesCreate;
