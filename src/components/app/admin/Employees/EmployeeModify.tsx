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
  backClick: () => void;
}

const bandTypeOptions: string[] = ['Band 1', 'Band 2', 'Band 3', 'Band 4'];

const EmployeeModify: React.FC<Props> = ({
  cancelEditClicked,
  row,
  backClick,
}) => {
  const [values, setValue] = useState({
    id: row.id,
    fname: row.fname,
    lname: row.lname,
    profession: row.profession,
    phone: row.phone,
    email: row.email,
    department: row.department,
    departmentalUnit: row.departmentalUnit,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Employee Details</h2>
            <span>Below are your employee’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon='bi bi-pen-fill'
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <GridWrapper>
          <Input label='ID' value={values.id} disabled />
          <Input
            label='First Name'
            value={values.fname}
            placeholder={values.fname}
            onChange={e => setValue({ ...values, fname: e.target.value })}
          />
          <Input
            label='Last Name'
            value={values.lname}
            placeholder={values.lname}
            onChange={e => setValue({ ...values, lname: e.target.value })}
          />
          <Input
            label='Profession'
            value={values.profession}
            placeholder={values.profession}
            onChange={e => setValue({ ...values, profession: e.target.value })}
          />
          <Input
            label='Phone'
            value={values.phone}
            placeholder={values.phone}
            onChange={e => setValue({ ...values, phone: e.target.value })}
          />
          <Input
            label='Email'
            value={values.email}
            placeholder={values.email}
            onChange={e => setValue({ ...values, email: e.target.value })}
          />
          <Input
            label='Department'
            value={values.department}
            placeholder={values.department}
            onChange={e => setValue({ ...values, department: e.target.value })}
          />
          <Input
            label='Departmental Unit'
            value={values.departmentalUnit}
            placeholder={values.departmentalUnit}
            onChange={e =>
              setValue({ ...values, departmentalUnit: e.target.value })
            }
          />
        </GridWrapper>

        <BottomWrapper>
          <Button
            label='Delete Employee'
            background='#FFE9E9'
            color='#ED0423'
          />
          <Button label='Save Employee' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default EmployeeModify;
