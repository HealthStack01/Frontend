import React from 'react';

import Button from '../../../../../components/buttons/Button';
import { FlexBox, ImageBox } from '../../../../../ui/styled/global';
import { FullDetailsWrapper } from '../../../styles';
import InfoBox from './InfoBox';
import MiscBox from './MiscBox';

const UserBox = () => {
  return (
    <>
      <FullDetailsWrapper className="attend attend-small">
        <FlexBox>
          <ImageBox src="https://via.placeholder.com/150" />

          <div className="text">
            <h4>Adam Mike Olu</h4>
            <small>Cash</small>
            <p>HMO: Avon HMO</p>

            <p>Description: 32 years Male Married Christian IT professional</p>
            <p>Geneotype: AA</p>
            <p>Blood Group: O</p>
            <Button label="Bill Client" />
          </div>
        </FlexBox>
        <InfoBox />

        <MiscBox />
      </FullDetailsWrapper>
    </>
  );
};

export default UserBox;
