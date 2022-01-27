import React from 'react';

import { LayoutContent } from '../../../layout/styles';
import { GrayWrapper, PageWrapper } from '../../styles';

function AttendMode() {
  return (
    <PageWrapper>
      <GrayWrapper>
        <h2>Attend Mode</h2>

        <LayoutContent className="layout" />
      </GrayWrapper>
    </PageWrapper>
  );
}

export default AttendMode;
