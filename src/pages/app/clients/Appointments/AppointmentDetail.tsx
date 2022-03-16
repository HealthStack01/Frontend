import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import { ButtonGroup } from '../../../../ui/styled/global';
import { AppointmentSchema } from '../../schema';
import { BottomWrapper, FullDetailsWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import Attend from './Attend';

const AppointmentDetails = ({ editBtnClicked, deleteBtnClicked, row, backClick }) => {
  const [state, setState] = useState('all');

  return (
    <>
      {state === 'attend' ? (
        <Attend appointment={row} backClick={backClick} />
      ) : (
        <PageWrapper>
          <HeadWrapper>
            <div>
              <h2>Appointment Details</h2>
              <span>Below are your Appointment’s details</span>
            </div>
            <ButtonGroup>
              <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
              <Button label={'Start or Join Telemedicine'} background={'#04ed7c'} color={'#fff'} />
            </ButtonGroup>
          </HeadWrapper>
          <FullDetailsWrapper>
            {state === 'all' && (
              <>
                <GridWrapper>
                  {AppointmentSchema.flat().map((schema) => (
                    <div key={schema.key}>
                      <label>{schema.name}</label>
                      <p>{schema.selector(row)}</p>
                    </div>
                  ))}
                </GridWrapper>
                <BottomWrapper>
                  <Button
                    label={'Delete Appointment'}
                    background={'#ff0000'}
                    color={'#fff'}
                    onClick={() => deleteBtnClicked(row._id)}
                  />
                  <Button
                    label={'Edit Appointment Details'}
                    background={'#04ed7c'}
                    color={'#fff'}
                    onClick={editBtnClicked}
                  />
                  <Button label="Attend to Client" onClick={() => setState('attend')} />
                </BottomWrapper>
              </>
            )}
          </FullDetailsWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export default AppointmentDetails;
