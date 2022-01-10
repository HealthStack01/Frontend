import React from 'react';
import { LayoutContent } from '../../../layout/styles';
import { GrayWrapper, PageWrapper } from '../../styles';

const AttendMode = () => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <h2>Attend Mode</h2>

        <LayoutContent className='layout'></LayoutContent>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AttendMode;
