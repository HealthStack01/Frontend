import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
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

const ServiceModify: React.FC<Props> = ({
  cancelEditClicked,
  row,
  backClick,
}) => {
  const [values, setValue] = useState({
    id: row.id,
    name: row.name,
    panel: row.panel,
    amount: row.amount,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Service Details</h2>
            <span>Below are your service's details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
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
            label="Name"
            value={values.name}
            placeholder={values.name}
            onChange={(e) => setValue({ ...values, name: e.target.value })}
          />
          <Input
            label="Panel"
            value={values.panel}
            placeholder={values.panel}
            onChange={(e) => setValue({ ...values, panel: e.target.value })}
          />
          <Input
            label="Amount"
            value={values.amount}
            placeholder={values.amount}
            onChange={(e) => setValue({ ...values, amount: e.target.value })}
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label="Delete Service" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Service" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ServiceModify;
