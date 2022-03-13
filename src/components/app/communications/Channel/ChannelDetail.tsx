import React from 'react';

import { ButtonGroup } from '../../../../styles/global';
import Button from '../../../buttons/Button';
import { FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ChannelDetails: React.FC<Props> = ({ editBtnClicked, row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Channel Details</h2>
            <span>Below are your Channel’s details</span>
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
              <label>Channel Type</label>
              <p>{row.channelType}</p>
            </div>
            <div>
              <label>Channel Name</label>
              <p>{row.name}</p>
            </div>
            <div>
              <label>Provider</label>
              <p>{row.provider}</p>
            </div>
            <div>
              <label>Base URL</label>
              <p>{row.baseURL}</p>
            </div>
            <div>
              <label>Provider Config</label>
              <p>{row.providerConfig}</p>
            </div>
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ChannelDetails;
