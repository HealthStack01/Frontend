import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import Textarea from '../../../../components/inputs/basic/Textarea';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

const channelType = ['Type 1', 'Type 2', 'Type 3'];
const providerType = ['Type 1', 'Type 2', 'Type 3'];
interface Props {
  backClick: () => void;
}

const ChannelCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Channel</h2>
            <span>Create a New Channel by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Channel">
            <GridWrapper>
              <Input
                label="Channel Name"
                placeholder="Enter a Channel Name"
                name="channelName"
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
                options={channelType}
              />
              <CustomSelect
                label="Choose a Provider Type"
                name="providerType"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={providerType}
              />
              <Input
                label="Base URL"
                placeholder="Enter a Base URL"
                name="baseURL"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Textarea label="Provider Config" />
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

export default ChannelCreate;
