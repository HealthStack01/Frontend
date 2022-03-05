import React from 'react';

import { FlexBox } from '../../../styles/global';

const MiscBox = () => {
  return (
    <>
      <FlexBox className="left">
        <div className="label-btn">Last Visit</div>
        <div className="label-btn">Drug Tolerance</div>
        <div className="label-btn">Medications</div>
        <div className="label-btn">History</div>
        <div className="label-btn">Problem List</div>
        <div className="label-btn">Task</div>
      </FlexBox>
    </>
  );
};

export default MiscBox;
