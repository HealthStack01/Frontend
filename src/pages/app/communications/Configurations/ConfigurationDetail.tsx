import React from 'react';

import Button from '../../../../components/buttons/Button';
import { ButtonGroup } from '../../../../ui/styled/global';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ConfigurationDetails: React.FC<Props> = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Configuration Details</h2>
            <span>Below are your Configuration’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
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
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Name</label>
              <p>{row.name}</p>
            </div>
            <div>
              <label>Channel</label>
              <p>{row.channel}</p>
            </div>
            <div>
              <label>Questionnaire</label>
              <p>{row.questionnaire}</p>
            </div>
            <div>
              <label>Trigger Token</label>
              <p>{row.triggerToken}</p>
            </div>
            <div>
              <label>Autoproceed Timeout</label>
              <p>{row.autoproceedTimeout}</p>
            </div>
            <div>
              <label>Sender Phone Number</label>
              <p>{row.senderPhoneNumber}</p>
            </div>
            <div>
              <label>Other Config</label>
              <p>{row.otherConfig}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ConfigurationDetails;
