// import 'rsuite/dist/rsuite.min.css';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';

import React from 'react';
import SemanticDatepicker from 'react-semantic-ui-datepickers';
// import { DateRangePicker } from 'rsuite';

interface Props {
  handleSelect?: () => void;
}

const DateRange: React.FC<Props> = ({ handleSelect }) => {
  return (
    <>
      <SemanticDatepicker type="range" onChange={handleSelect} />
    </>
  );
};

export default DateRange;
