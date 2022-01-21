import { Controller } from 'react-hook-form';

import Input from '../inputs/basic/Input';
import CustomSelect from '../inputs/basic/Select';
import { InputType } from './ModelSchema';

const DynamicInput = (props) => {
  const { inputType, name, label, options, control } = props;
  if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        key={name}
        control={control}
        name={name}
        render={({ field }) => <Input {...field} label={label} />}
      />
    );
  }

  if (inputType === InputType.SELECT) {
    return (
      <Controller
        key={name}
        control={control}
        name={name}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label="Choose a Band Type"
            options={options}
          />
        )}
      />
    );
  }

  return <></>;
};

export default DynamicInput;
