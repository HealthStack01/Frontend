import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import Textarea from '../../../../components/inputs/basic/Textarea';
import { ButtonGroup } from '../../../../ui/styled/global';
import { BottomWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  cancelEditClicked?: () => void;
  row?: any;
  backClick: () => void;
}

const channelOptions = ['Type 1', 'Type 2', 'Type 3'];
const providerOptions = ['Type 1', 'Type 2', 'Type 3'];

const ChannelModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
  const [values, setValue] = useState({
    id: row.id,
    name: row.name,
    channelType: row.channelType,
    provider: row.provider,
    baseUrl: row.baseURL,
    providerConfig: row.providerConfig,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Channel Details</h2>
            <span>Below are your channel's details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </ButtonGroup>
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
            name={values.channelType}
            label="Channel Type"
            options={channelOptions}
            value={values.channelType}
            onChange={(e) =>
              setValue({
                ...values,
                channelType: e.target.value,
              })
            }
          />
          <CustomSelect
            name={values.provider}
            label="Provider"
            options={providerOptions}
            value={values.provider}
            onChange={(e) =>
              setValue({
                ...values,
                provider: e.target.value,
              })
            }
          />
          <Input
            label="Base URL"
            value={values.baseUrl}
            onChange={(e) => setValue({ ...values, baseUrl: e.target.value })}
          />
          <Textarea
            label="Provider Configuration"
            value={values.providerConfig}
            onChange={(e) => setValue({ ...values, providerConfig: e.target.value })}
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

export default ChannelModify;
