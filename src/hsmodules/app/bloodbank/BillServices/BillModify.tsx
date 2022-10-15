import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import Textarea from '../../../../components/inputs/basic/Textarea';
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

const BillModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
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
            <h2>Band Details</h2>
            <span>Below are your band’s details</span>
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
          <CustomSelect
            name={values.bandType}
            label="Band Type"
            options={bandTypeOptions}
            value={values.bandType}
            onChange={(e) =>
              setValue({
                ...values,
                bandType: e.target.value,
              })
            }
          />
          <Textarea
            label="Description"
            value={values.description}
            onChange={(e) =>
              setValue({ ...values, description: e.target.value })
            }
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
