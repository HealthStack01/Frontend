import React, { useState } from 'react';

// import { useObjectState } from '../../../../context/context';
import { ButtonGroup } from '../../../../styles/global';
import Button from '../../../buttons/Button';
// import useRepository from '../../../hooks';
// import { Models } from '../../Constants';
import { AppointmentSchema } from '../../schema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import Attend from './Attend';

const AppointmentDetails = ({ editBtnClicked, row, backClick }) => {
  const [state, setState] = useState('all');
  // const { resource, setResource } = useObjectState();
  // const { get: getClient } = useRepository(Models.CLIENT);

  // const _handleAttend = async () => {
  //   getClient(row.clientId)
  //     .then((selectedClient) => {
  //       setResource({
  //         ...resource,
  //         clientResource: {
  //           selectedClient,
  //           show: 'attend',
  //         },
  //       });
  //       setState('attend');
  //     })
  //     .catch(console.error);
  // };

  return (
    <>
      {state === 'attend' ? (
        <Attend row={row} backClick={backClick} />
      ) : (
        <PageWrapper>
          <GrayWrapper>
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
          </GrayWrapper>
        </PageWrapper>
      )}
    </>
  );
};

export default AppointmentDetails;
