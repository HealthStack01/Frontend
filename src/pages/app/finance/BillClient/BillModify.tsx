import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import Textarea from '../../../../components/inputs/basic/Textarea';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const BillModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
  const [values, setValue] = useState({
    id: row.id,
    date: row.date,
    description: row.description,
    status: row.status,
    amount: row.amount,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Band Details</h2>
            <span>Below are your band’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <GridWrapper>
          <Input label="ID" value={values.id} disabled />
          <Input
            label="Date"
            value={values.date}
            type="datetime-local"
            onChange={(e) => setValue({ ...values, date: e.target.value })}
          />
          <Input
            label="Status"
            value={values.status}
            onChange={(e) => setValue({ ...values, status: e.target.value })}
          />
          <Input
            label="Amount"
            value={values.amount}
            onChange={(e) => setValue({ ...values, amount: e.target.value })}
          />
          <Textarea
            label="Description"
            value={values.description}
            onChange={(e) => setValue({ ...values, description: e.target.value })}
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label="Delete Band" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Band" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillModify;
