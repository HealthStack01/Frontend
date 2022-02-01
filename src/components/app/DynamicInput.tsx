import { Controller } from 'react-hook-form';

import Input from '../inputs/basic/Input';
import CustomSelect from '../inputs/basic/Select';
import { InputType } from './ModelSchema';

const DynamicInput = (props) => {
  const { inputType, key, name, options, description, control } = props;
  if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        key={key}
        control={control}
        name={key}
        render={({ field }) => <Input {...field} label={name} />}
      />
    );
  }

  if (inputType === InputType.SELECT) {
    return (
      <Controller
        key={key}
        control={control}
        name={key}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label={description}
            options={options}
          />
        )}
      />
    );
  }

  return (
   <Controller
     key={key}
     control={control}
     name={key}
     render={({ field }) => <Input {...field} label={name} />}
   />
 );
};

export default DynamicInput;
