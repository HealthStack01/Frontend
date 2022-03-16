import React from 'react';

import { FlexBox } from '../../../ui/styled/global';
import RoundButton from '../../buttons/Button/RoundButton';

const InfoBox = () => {
  return (
    <>
      <FlexBox className="left">
        <FlexBox className="align-left">
          <FlexBox className="row">
            <h6>Specific Information</h6>
            <RoundButton />
          </FlexBox>

          <small>null</small>
        </FlexBox>
        <FlexBox className="align-left">
          <FlexBox className="row">
            <h6>Allergies</h6>
            <RoundButton />
          </FlexBox>

          <small>null</small>
        </FlexBox>
        <FlexBox className="align-left">
          <FlexBox className="row">
            <h6>Mobidities</h6>
            <RoundButton />
          </FlexBox>

          <small>null</small>
        </FlexBox>
        <FlexBox className="align-left">
          <FlexBox className="row">
            <h6>Disabilities</h6>
            <RoundButton />
          </FlexBox>

          <small>null</small>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default InfoBox;
