import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const clientFormData = [
  {
    title: 'First Name',
    name: 'fname',
    description: 'Enter first name',
    required: true,
  },
  {
    title: 'Last Name',
    name: 'lname',
    description: 'Enter last name',
    required: true,
  },
  {
    title: 'Profession',
    name: 'profession',
    description: 'Enter profession',
    required: true,
  },
  {
    title: 'Phone Number',
    name: 'phone',
    description: 'Enter phone number',
    required: true,
  },
  {
    title: 'Email',
    name: 'email',
    description: 'Enter email address',
    required: true,
  },
  {
    title: 'Department',
    name: 'department',
    description: 'Enter department',
    required: true,
  },
  {
    title: 'Department Unit',
    name: 'departmentalUnit',
    description: 'Enter departmental unit',
    required: true,
  },
];
interface Props {
  backClick: () => void;
}

const PaymentCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Payment</h2>
            <span>Create a New payment by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Payment">
            <GridWrapper>
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

export default PaymentCreate;
