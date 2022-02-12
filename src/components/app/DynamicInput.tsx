import { Controller } from 'react-hook-form';

import CheckboxInput from '../inputs/basic/Checkbox';
import Input from '../inputs/basic/Input';
import CustomSelect from '../inputs/basic/Select';
import Textarea from '../inputs/basic/Textarea';
import { InputType } from './schema/util';

const DynamicInput = (props) => {
  const { inputType, name, options, description, control, errors = {} } = props;
  if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={description || name}
            errorText={errors[name]?.message}
          />
        )}
      />
    );
  }

  if (inputType === InputType.NUMBER) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            label={description}
            errorText={errors[name]?.message}
            type="number"
          />
        )}
      />
    );
  }

  if (inputType === InputType.TEXT_AREA) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            label={description}
            errorText={errors[name]?.message}
          />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_LIST) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CustomSelect
            {...field}
            label={description}
            options={options}
            errorText={errors[name]?.message}
          />
        )}
      />
    );
  }

  if (inputType === InputType.CHECKBOX) {
    return options.map((option, i) => (
      <Controller
        key={i}
        control={control}
        name={option.value || option}
        render={({ field }) => (
          <CheckboxInput
            {...field}
            label={option.label || option}
            errorText={errors[name]?.message}
          />
        )}
      />
    ));
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          label={description}
          errorText={errors[name]?.message}
        />
      )}
    />
  );
};

export default DynamicInput;
