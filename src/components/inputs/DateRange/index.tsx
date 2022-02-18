import React from 'react';
import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
interface Props {
  handleSelect?: () => void;
}

const DateRange: React.FC<Props> = ({ handleSelect }) => {
  return (
    <>
      <DateRangePicker hoverRange="week" ranges={[]} />
    </>
  );
};

export default DateRange;
