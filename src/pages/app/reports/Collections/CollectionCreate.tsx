import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  backClick: () => void;
}

const locationType = ['Type 1', 'Type 2', 'Type 3'];

const CollectionCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Location</h2>
            <span>
              Create a new location by filling out the form below to get
              started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Employee">
            <GridWrapper>
              <Input
                label="Name of Location"
                name="locationname"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <CustomSelect
                label="Choose a Location Type"
                name="locationType"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={locationType}
              />
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionCreate;
