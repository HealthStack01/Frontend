import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import Input from '../../../../components/inputs/basic/Input';
import { Models } from '../../Constants';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  PageWrapper,
} from '../../styles';

const FieldModifier = ({
  name,
  row,
  onBackClick,
  defaultValue,
  modifyData,
}) => {
  const [value, setValue] = useState(defaultValue);
  const { submit } = useRepository(Models.BILLING);

  const onSubmit = () => {
    const data = { ...row };
    modifyData(data, value);
    submit(data)
      .then(() => {
        toast.success('Updated succesfully');
        onBackClick();
      })
      .catch((err) => {
        toast('Error updating , probable network issues or ' + err);
      });
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <FullDetailsWrapper>
          <GridWrapper>
            <Input
              label={'New ' + name}
              defaultValue={defaultValue}
              onChange={(e) => setValue(e.target.value)}
            />
            <Input label={'Old ' + name} disabled defaultValue={defaultValue} />
          </GridWrapper>
          <BottomWrapper>
            <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
            <Button label="Save Form" type="submit" onClick={onSubmit} />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default FieldModifier;
