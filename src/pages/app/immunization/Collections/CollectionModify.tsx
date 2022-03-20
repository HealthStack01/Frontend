import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const locationTypeOptions: string[] = ['Locations 1', 'Location 2'];

const CollectionModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
  const [values, setValue] = useState({
    id: row.id,
    locationname: row.locationname,
    locationType: row.locationType,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Location Details</h2>
            <span>Below are your location’s details</span>
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
            label="Name"
            value={values.locationname}
            placeholder={values.locationname}
            onChange={(e) => setValue({ ...values, locationname: e.target.value })}
          />
          <CustomSelect
            name={values.locationType}
            label="Band Type"
            options={locationTypeOptions}
            value={values.locationType}
            onChange={(e) =>
              setValue({
                ...values,
                locationType: e.target.value,
              })
            }
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label="Delete Collection" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Collection" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionModify;
