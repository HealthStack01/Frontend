import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import Textarea from '../../../inputs/basic/Textarea';
import {
  BottomWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
}

const bandTypeOptions: string[] = ['Band 1', 'Band 2', 'Band 3', 'Band 4'];

const EmployeeModify: React.FC<Props> = ({ cancelEditClicked, row }) => {
  const [values, setValue] = useState({
    id: row.id,
    name: row.name,
    bandType: row.bandType,
    description: row.description,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee's Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <Button
            label={'Cancel Editing'}
            background={'#f2f2f2'}
            color={'#333'}
            showicon={true}
            icon='bi bi-pen-fill'
            onClick={cancelEditClicked}
          />
        </HeadWrapper>
        <GridWrapper>
          <Input label='ID' value={values.id} disabled />
          <Input
            label='Name'
            value={values.name}
            placeholder={values.name}
            onChange={e => setValue({ ...values, name: e.target.value })}
          />
          <CustomSelect
            name={values.bandType}
            label='Band Type'
            options={bandTypeOptions}
            value={values.bandType}
            onChange={e =>
              setValue({
                ...values,
                bandType: e.target.value,
              })
            }
          />
          <Textarea
            label='Description'
            value={values.description}
            onChange={e => setValue({ ...values, description: e.target.value })}
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label='Delete Band' background='#FFE9E9' color='#ED0423' />
          <Button label='Save Band' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeModify;
