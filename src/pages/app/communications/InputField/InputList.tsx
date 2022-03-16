import React from 'react';

import CheckboxInput from '../../../../components/inputs/basic/Checkbox';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import CustomSelect from '../../../../components/inputs/basic/Select';
import Textarea from '../../../../components/inputs/basic/Textarea';
import BasicDatePicker from '../../../../components/inputs/Date';
import DateRange from '../../../../components/inputs/DateRange';
import { GrayWrapper, GridWrapper, PageWrapper } from '../../styles';

interface Props {}

const InputFields: React.FC<Props> = () => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <h2>InputField</h2>

        <GridWrapper className="top">
          <Input label="Free Text" />
          <Textarea label="Text area" />
          <Input label="Email" type="email" />
          <BasicDatePicker label="Date" />
          <Input type="datetime-local" />
          <Input label="Password" type="password" />
          <Input label="Number" type="number" />
          <Input type="file" />
          <CustomSelect options={[]} />
          <CheckboxInput label="Checkbox" />
          <RadioButton
            title="Radio"
            options={[
              { value: 'A', label: 'Value A' },
              { value: 'B', label: 'Value B' },
            ]}
          />
          <DateRange />
        </GridWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default InputFields;
