import React, { useState } from 'react';
import Button from '../../buttons/Button';
import Input from '../../inputs/basic/Input';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../styles';

interface RowProps {
  id: any;
}

interface ClientDetailsProps {
  row?: RowProps;
}
const clientData = [
  {
    title: 'First Name',
    description: 'John',
  },
  {
    title: 'Midlle Name',
    description: 'Onyekachi',
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
    title: 'Religion',
    description: 'Christianity',
  },
  {
    title: 'Medical Record',
    description: 'Record 1',
  },
  {
    title: 'Profession',
    description: 'Engineer',
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

const ClientDetails: React.FC<ClientDetailsProps> = ({ row }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState({});
  console.log(value);
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Details</h2>
            <span>Below are your client’s details</span>
          </div>
          <Button
            label={isEditing ? 'Cancel Editing' : 'Edit Details'}
            background={isEditing ? '#f2f2f2' : '#ECF3FF'}
            color={isEditing ? '#333' : '#0364FF'}
            showicon={true}
            icon='bi bi-pen-fill'
            onClick={() => setIsEditing(!isEditing)}
            // disabled={isEditing ? true : false}
          />
        </HeadWrapper>
        <DetailsWrapper>
          <h3>John Onyekachi Mabdiwe</h3>
          <GridWrapper>
            {clientData.map((client, index) => {
              if (isEditing) {
                return (
                  <Input
                    label={client.title}
                    placeholder={client.description}
                    name={client.title}
                    onChange={e =>
                      setValue({ ...value, [e.target.name]: e.target.value })
                    }
                  />
                );
              } else {
                return (
                  <div key={index}>
                    <label>{client.title}</label>
                    <p>{client.description}</p>
                  </div>
                );
              }
            })}
          </GridWrapper>
        </DetailsWrapper>
        <BottomWrapper>
          <Button label='Delete Client' background='#FFE9E9' color='#ED0423' />
          <Button label='Attend to Client' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientDetails;
