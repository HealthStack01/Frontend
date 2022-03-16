import React from 'react';

import Button from '../../../../components/buttons/Button';
import { ButtonGroup } from '../../../../ui/styled/global';
import { ClientFullSchema } from '../../schema';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
  handleDelete: () => void;
}

const ClientDetails: React.FC<Props> = ({ editBtnClicked, row, backClick, handleDelete }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Details</h2>
            <span>Below are your Client’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={handleDelete}
            />
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color="#0364FF"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
          </ButtonGroup>
        </HeadWrapper>

        <FullDetailsWrapper>
          <div style={{ marginTop: '30px' }}>
            <h2>Names</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.names.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Bio-Data</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.biodata.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Address</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.address.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Other Details</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.otherDetails.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Next Of Kin</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.nextOfKin.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Non-Hospital Indetifiers</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.nonHospitalIndetifiers.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Payment Information</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.paymentInformation.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h2>Medical Data</h2>
            <GridWrapper style={{ marginTop: '10px' }}>
              {ClientFullSchema.medicalData.map((client) => (
                <div>
                  <label>{client.name}</label>
                  <p>{client.selector(row)}</p>
                </div>
              ))}
            </GridWrapper>
          </div>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClientDetails;
