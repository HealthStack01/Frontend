import React, { useState } from 'react';

import { ButtonGroup } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const AppointmentModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
  const [values, setValue] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Appointment Details</h2>
            <span>Below are your Appointment's details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </ButtonGroup>
        </HeadWrapper>
        <GridWrapper>
          <Input label="ID" value={row.id} disabled />
          <Input
            label="Date and Time"
            type="date"
            value={row.dtime}
            onChange={(e) => setValue({ ...values, [e.target.name]: e.target.value })}
          />
          <Input
            label="First Name"
            value={row.fname}
            onChange={(e) => setValue({ ...values, [e.target.name]: e.target.value })}
          />
          <Input
            label="Last Name"
            value={row.lname}
            onChange={(e) => setValue({ ...values, [e.target.name]: e.target.value })}
          />
          <Input
            label="Classification"
            value={row.classification}
            onChange={(e) => setValue({ ...values, [e.target.name]: e.target.value })}
          />
          <Input
            label="Location"
            value={row.location}
            onChange={(e) => setValue({ ...values, [e.target.name]: e.target.value })}
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label="Delete Appointment" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Appointment" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentModify;
