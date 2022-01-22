import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  backClick: () => void;
}

const locationType = ['Type 1', 'Type 2', 'Type 3'];

const ServiceCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Service</h2>
            <span>
              Create a new Service by filling out the form below to get started.
            </span>
          </div>
          <Button
            label='Back to List'
            background='#fdfdfd'
            color='#333'
            onClick={backClick}
          />
        </HeadWrapper>
        <form action='' onSubmit={() => {}}>
          <FullDetailsWrapper title='Create Employee'>
            <GridWrapper className='two-columns'>
              <Input
                label='Search for Service Category'
                name='Servicesearch'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Name of Service'
                name='Servicename'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>

            <h2>Add Pricing Info</h2>

            <Input
              label='Price'
              name='price'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
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

export default ServiceCreate;
