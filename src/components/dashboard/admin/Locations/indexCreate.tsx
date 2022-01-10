import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

const clientFormData = [
  {
    title: 'First Name',
    name: 'fname',
    description: 'John',
    required: true,
  },
  {
    title: 'Midlle Name',
    description: 'Onyekachi',
    required: false,
  },
  {
    title: 'Last Name',
    description: 'Mabdiwe',
  },
  {
    title: 'Date of Birth',
    description: '2021-12-08',
  },
  {
    title: 'Gender',
    description: 'Male',
  },
  {
    title: 'Marital Status',
    description: 'Single',
  },
  {
    title: 'Email',
    description: 'johndoe@mail.com',
  },
  {
    title: 'Phone Number',
    description: '0806478263',
  },
  {
    title: 'Residential Address',
    description: 'Ozumba Mbadiwe',
  },
  {
    title: 'Town',
    description: 'Ikate Elegushi',
  },
  {
    title: 'State',
    description: 'Lagos',
  },
  {
    title: 'Country',
    description: 'Nigeria',
  },
  {
    title: 'Next of Kin',
    description: 'Cheif OBA Elegushi',
  },
  {
    title: 'Next of kin Phone',
    description: '0806478263',
  },
];

const LocationCreate = () => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Location</h2>
            <span>
              Create a new location by filling out the form below to get
              started.
            </span>
          </div>
        </HeadWrapper>
        <form action='' onSubmit={() => {}}>
          <FullDetailsWrapper title='Create Client'>
            <GridWrapper>
              {clientFormData.map((client, index) => (
                <Input
                  key={index}
                  label={client.title}
                  name={client.title}
                  onChange={e =>
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
            <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
            <Button label='Save Form' type='submit' />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default LocationCreate;
