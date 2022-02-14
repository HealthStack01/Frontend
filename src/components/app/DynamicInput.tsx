import DateTimePicker from '@mui/lab/DateTimePicker';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import CheckboxInput from '../inputs/basic/Checkbox';
import Input from '../inputs/basic/Input';
import RadioButton from '../inputs/basic/Radio';
import CustomSelect from '../inputs/basic/Select';
import Textarea from '../inputs/basic/Textarea';
import AutoSuggestInput from './AutoSuggestInput';
import { InputType } from './schema/util';

const DynamicInput = (props) => {
  const { inputType, label, name, options, control, errors = {} } = props;
  const ref = useRef();
  if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input ref={ref} {...field} label={label} errorText={errors[name]?.message} />}
      />
    );
  }

  if (inputType === InputType.NUMBER) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input ref={ref} {...field} label={label} errorText={errors[name]?.message} type="number" />
        )}
      />
    );
  }

  if (inputType === InputType.TEXT_AREA) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Textarea ref={ref} {...field} label={label} errorText={errors[name]?.message} />}
      />
    );
  }

  if (inputType === InputType.SELECT_RADIO) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <RadioButton ref={ref} {...field} title={label} options={options} />}
      />
    );
  }

  if (inputType === InputType.SELECT_LIST) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CustomSelect ref={ref} {...field} label={label} options={options} errorText={errors[name]?.message} />
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
          <CheckboxInput ref={ref} {...field} label={option.label || option} errorText={errors[name]?.message} />
        )}
      />
    ));
  }

  if (inputType === InputType.DATETIME) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DateTimePicker
            {...field}
            label={label}
            inputFormat="MM/dd/yyyy hh:mm:ss aa"
            renderInput={(params) => <TextField ref={ref} {...params} error={errors[name]?.message} />}
          />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_AUTO_SUGGEST) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => <AutoSuggestInput ref={ref} label={label} options={options} {...field} />}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input ref={ref} {...field} label={label} errorText={errors[name]?.message} />}
    />
  );
};

export default DynamicInput;
