import React from 'react';
import { StatusBatchWrapper } from '../styles';
interface StatusBatchProps {
  label?: string;
  status: string;
}

const StatusBatch: React.FC<StatusBatchProps> = ({
  label = 'Cancelled',
  status = 'cancelled',
}) => {
  return (
    <StatusBatchWrapper>
      <span className={`batch ${status}`}></span>
      {label}
    </StatusBatchWrapper>
  );
};

export default StatusBatch;
