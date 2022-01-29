import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import { columnHead } from '../../admin/Employees/data';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const LaboratoryDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
  const [state, setState] = useState('all');

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Laboratory Details</h2>
            <span>Below are your Laboratory’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <GridWrapper className='two-columns'>
            <div>
              <label>Client</label>
              <p>{row.client}</p>
            </div>
            <div>
              <label>Test</label>
              <p>{row.test}</p>
            </div>

            <RadioButton
              title='Appointment Schedule'
              options={[
                {
                  value: 'Draft',
                  label: 'draft',
                },
                {
                  value: 'Finals',
                  label: 'final',
                },
              ]}
            />
            <Textarea label='Findings' />
            <Textarea label='Recommendations' />
          </GridWrapper>
          <BottomWrapper>
            <Button label='Save' />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default LaboratoryDetails;
