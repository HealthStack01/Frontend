import React from 'react';

import { PageWrapper } from '../../../../helper/styles';
import { FlexBox, ImageBox } from '../../../../styles/global';
import { FullDetailsWrapper } from '../../styles';

const AttendDetails = () => {
  return (
    <PageWrapper>
      <FullDetailsWrapper className="small">
        <FlexBox>
          <ImageBox src="https://via.placeholder.com/150" />

          <div>
            <h1>Adam Mike Olu</h1>
            <p>Cash</p>
            <p>HMO: Avon HMO</p>
          </div>

          <div>
            <p>Description: 32 years Male Married Christian IT professional</p>
            <p>Geneotype: AA</p>
            <p>Blood Group: O</p>
          </div>
        </FlexBox>
      </FullDetailsWrapper>
    </PageWrapper>
  );
};

export default AttendDetails;
