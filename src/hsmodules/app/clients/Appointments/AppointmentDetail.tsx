import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import { ButtonGroup } from '../../../../ui/styled/global';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import Attend from './Attend';

const AppointmentDetails = ({
  schema,
  editBtnClicked,
  deleteBtnClicked,
  row,
  backClick,
}) => {
  const [state, setState] = useState('all');

  return (
    <>
      {state === 'attend' ? (
        <Attend appointment={row} backClick={backClick} />
      ) : (
        <PageWrapper>
          <GrayWrapper>
            <HeadWrapper>
              <div>
                <h2>Appointment Details</h2>
                <span>Below are your Appointment’s details</span>
              </div>
              <ButtonGroup>
                <Button
                  label="Back to List"
                  background="#fdfdfd"
                  color="#333"
                  onClick={backClick}
                />
              </ButtonGroup>
            </HeadWrapper>
            <FullDetailsWrapper>
              {state === 'all' && (
                <GridWrapper>
                  {schema.flat().map((schema) => (
                    <div key={schema.key}>
                      <label>{schema.name}</label>
                      <p>{schema.selector(row)}</p>
                    </div>
                  ))}
                </GridWrapper>
              )}
            </FullDetailsWrapper>
            <FullDetailsWrapper>
              <BottomWrapper>
                <Button
                  label={'Edit Appointment Details'}
                  background={'#04ed7c'}
                  color={'#fff'}
                  onClick={editBtnClicked}
                />
                <Button
                  label="Attend to Client"
                  onClick={() => setState('attend')}
                />
                <Button
                  label={'Delete Appointment'}
                  background={'#ff0000'}
                  color={'#fff'}
                  onClick={() => deleteBtnClicked(row._id)}
                />
              </BottomWrapper>
            </FullDetailsWrapper>
          </GrayWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export default AppointmentDetails;
