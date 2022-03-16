import React from 'react';

import { FlexBox } from '../../../ui/styled/global';

const MiscBox = () => {
  return (
    <>
      <FlexBox className="left">
        <div className="label-btn">Visit History</div>
        <div className="label-btn">Drug Intolerance</div>
        <div className="label-btn">Medications</div>
        <div className="label-btn">History</div>
        <div className="label-btn">Problem List</div>
        <div className="label-btn">Task</div>
      </FlexBox>
    </>
  );
};

export default MiscBox;
