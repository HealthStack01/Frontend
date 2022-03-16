import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import Textarea from '../../../../components/inputs/basic/Textarea';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  backClick: () => void;
}

const channelOptions = ['Type 1', 'Type 2', 'Type 3'];
const questionnaireOptions = ['Type 1', 'Type 2', 'Type 3'];

const ConfigurationCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Configuration</h2>
            <span>Create a new Configuration by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Channel">
            <GridWrapper>
              <Input
                label="Configuration Name"
                placeholder="Enter a Configuration Name"
                name="configName"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Tigger Token"
                placeholder="Enter a Tigger Token"
                name="tiggerTokens"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Autoproceed Timeout"
                placeholder="Enter a Autoproceed Timeout"
                name="autoproceedTimeout"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Sender Phone Number"
                placeholder="Enter a Sender Phone Number"
                name="senderPhoneNumber"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <CustomSelect
                label="Choose a Channel Type"
                name="channelType"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={channelOptions}
              />
              <CustomSelect
                label="Choose a Questionnaire"
                name="questionnaire"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={questionnaireOptions}
              />

              <Textarea label="Other Config" />
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

export default ConfigurationCreate;
