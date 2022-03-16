import DateTimePicker from '@mui/lab/DateTimePicker';
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';

import CheckboxInput from '../../components/inputs/basic/Checkbox';
import Input from '../../components/inputs/basic/Input';
import RadioButton from '../../components/inputs/basic/Radio';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import AutoSuggestInput from './AutoSuggestInput';
import { DateFormats } from './Constants';
import { toAPIDate } from './DateUtils';
import { InputType } from './schema/util';

const DynamicInput = (props) => {
  const { inputType, label, name, defaultValue, options, control, errors = {} } = props;
  const ref = useRef();
  if (inputType === InputType.HIDDEN && defaultValue) {
    return <input type="hidden" value={defaultValue} />;
  } else if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => (
          <Input {...field} label={label} errorText={errors[name]?.message} />
        )}
      />
    );
  }

  if (inputType === InputType.NUMBER) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => (
          <Input {...field} label={label} errorText={errors[name]?.message} type="number" />
        )}
      />
    );
  }

  if (inputType === InputType.TEXT_AREA) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => (
          <Textarea {...field} label={label} errorText={errors[name]?.message} />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_RADIO) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => <RadioButton {...field} title={label} options={options} />}
      />
    );
  }

  if (inputType === InputType.SELECT_LIST) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref: _re, ...field } }) => (
          <CustomSelect {...field} label={label} options={options} errorText={errors[name]?.message} />
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
            onChange={(value) => field.onChange({ target: { value: toAPIDate(value) } })}
            inputFormat={DateFormats.CONTROL_DATE_TIME}
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
        render={({ field: { ref: _re, ...field } }) => <AutoSuggestInput label={label} options={options} {...field} />}
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
