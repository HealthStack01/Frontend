import React, { useState } from 'react';
import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
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

const CollectionMode = ['Mode 1', 'Mode 2', 'Mode 3'];

const CollectionCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Collection</h2>
            <span>
              Create a new Collection by filling out the form below to get
              started.
            </span>
          </div>
          <Button
            label='Back to List'
            background='#fdfdfd'
            color='#333'
            onClick={backClick}
          />
        </HeadWrapper>
        <form action='' onSubmit={() => {}}>
          <FullDetailsWrapper title='Create Collection'>
            <GridWrapper>
              <Input
                label='Name of Collection'
                name='collectionname'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Collection Amount'
                name='collectionamount'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                name='collectiondate'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                type='date'
              />
              <CustomSelect
                label='Choose a Collection Mode'
                name='CollectionMode'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={CollectionMode}
              />
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label='Clear Form' background='#FFE9E9' color='#ED0423' />
            <Button label='Save Form' type='submit' />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default CollectionCreate;
