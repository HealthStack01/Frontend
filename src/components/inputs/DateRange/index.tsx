import 'rsuite/dist/rsuite.min.css';

import React from 'react';
import { DateRangePicker } from 'rsuite';
interface Props {
  handleSelect?: () => void;
}

const DateRange: React.FC<Props> = ({ handleSelect }) => {
  return (
    <>
      <DateRangePicker hoverRange="week" ranges={[]} onChange={handleSelect} />
    </>
  );
};

export default DateRange;
