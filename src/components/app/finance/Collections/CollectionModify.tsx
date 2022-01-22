import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
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

const options: string[] = ['Cash', 'Bank'];

const CollectionModify: React.FC<Props> = ({
  cancelEditClicked,
  row,
  backClick,
}) => {
  const [values, setValue] = useState({
    id: row.id,
    name: row.name,
    client: row.client,
    amount: row.amount,
    mode: row.mode,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Collection Details</h2>
            <span>Below are your collection's details</span>
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
            label='CollectionName'
            value={values.name}
            placeholder={values.name}
            onChange={e => setValue({ ...values, name: e.target.value })}
          />
          <Input
            label='Client'
            value={values.client}
            placeholder={values.client}
            onChange={e => setValue({ ...values, client: e.target.value })}
          />
          <Input
            label='Amount'
            value={values.amount}
            placeholder={values.amount}
            onChange={e => setValue({ ...values, amount: e.target.value })}
          />
          <CustomSelect
            name={values.mode}
            label='Mode'
            options={options}
            value={values.mode}
            onChange={e =>
              setValue({
                ...values,
                mode: e.target.value,
              })
            }
          />
        </GridWrapper>

        <BottomWrapper>
          <Button
            label='Delete Collection'
            background='#FFE9E9'
            color='#ED0423'
          />
          <Button label='Save Collection' />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionModify;
