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
const questionnaireOptions = ['Type 1', 'Type 2', 'Type 3'];

const ConfigurationModify: React.FC<Props> = ({ cancelEditClicked, row, backClick }) => {
  const [values, setValue] = useState({
    id: row.id,
    name: row.name,
    channel: row.channel,
    questionnaire: row.questionnaire,
    tiggerToken: row.triggerToken,
    autoproceedTimeout: row.autoproceedTimeout,
    senderPhoneNumber: row.senderPhoneNumber,
    otherConfig: row.otherConfig,
  });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Configuration Details</h2>
            <span>Below are your Configuration’s details</span>
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
          <Input
            label="Tigger Token"
            value={values.tiggerToken}
            placeholder={values.tiggerToken}
            onChange={(e) => setValue({ ...values, tiggerToken: e.target.value })}
          />
          <Input
            label="Autoproceed Timeout"
            value={values.autoproceedTimeout}
            placeholder={values.autoproceedTimeout}
            onChange={(e) => setValue({ ...values, autoproceedTimeout: e.target.value })}
          />
          <Input
            label="Sender Phone Number"
            value={values.senderPhoneNumber}
            placeholder={values.senderPhoneNumber}
            onChange={(e) => setValue({ ...values, senderPhoneNumber: e.target.value })}
          />
          <CustomSelect
            name={values.channel}
            label="Channel Type"
            options={channelOptions}
            value={values.channel}
            onChange={(e) =>
              setValue({
                ...values,
                channel: e.target.value,
              })
            }
          />
          <CustomSelect
            name={values.questionnaire}
            label="Questionnaire"
            options={questionnaireOptions}
            value={values.questionnaire}
            onChange={(e) =>
              setValue({
                ...values,
                questionnaire: e.target.value,
              })
            }
          />

          <Textarea
            label="Other Configuration"
            value={values.otherConfig}
            onChange={(e) => setValue({ ...values, otherConfig: e.target.value })}
          />
        </GridWrapper>

        <BottomWrapper>
          <Button label="Delete Configuration" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Configuration" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ConfigurationModify;
