import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const clientFormData = [
  {
    title: 'Name of Band',
    name: 'bandname',
    description: 'Enter name of band',
    required: true,
  },
  {
    title: 'Description of Band',
    name: 'banddescription',
    description: 'Enter description of band',
    required: false,
  },
];

const bandType = ['Type 1', 'Type 2', 'Type 3'];
interface Props {
  backClick: () => void;
}

const BillCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Bill</h2>
            <span>Create a New Bill by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Bill">
            <GridWrapper>
              <CustomSelect
                label="Choose a Bill Type"
                name="bandType"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={bandType}
              />
              {clientFormData.map((client, index) => (
                <Input
                  key={index}
                  label={client.title}
                  name={client.title}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [e.target.name]: e.target.value,
                    })
                  }
                ></Input>
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

export default BillCreate;
