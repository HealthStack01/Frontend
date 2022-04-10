import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { FormGroup, TextField } from '@mui/material';
import { useRef } from 'react';
import { Controller } from 'react-hook-form';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

import CheckboxInput from '../../components/inputs/basic/Checkbox';
import Input from '../../components/inputs/basic/Input';
import RadioButton from '../../components/inputs/basic/Radio';
import CustomSelect from '../../components/inputs/basic/Select';
import Textarea from '../../components/inputs/basic/Textarea';
import { DateFormats } from '../../pages/app/Constants';
import { toAPIDate } from '../../pages/app/DateUtils';
import { InputType } from '../../pages/app/schema';
import AutoSuggestInput from './AutoSuggestInput';

const DynamicInput = (props) => {
  const { inputType, label, name, data = {}, options, control, errors = {}, readonly } = props;
  const ref = useRef();
  if (inputType === InputType.HIDDEN && data[name]) {
    return <input type="hidden" value={data[name]} />;
  } else if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => (
          <Input
            {...field}
            label={label}
            disabled={readonly}
            errorText={errors[name]?.message}
            defaultValue={data[name]}
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
        render={({ field: { ref: _re, ...field } }) => (
          <Input
            {...field}
            label={label}
            disabled={readonly}
            errorText={errors[name]?.message}
            type="number"
            defaultValue={data[name]}
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
        render={({ field: { ref: _re, ...field } }) => (
          <Textarea
            {...field}
            label={label}
            disabled={readonly}
            errorText={errors[name]?.message}
            defaultValue={data[name]}
          />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_RADIO) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, ...field } }) => (
          <RadioButton {...field} title={label} disabled={readonly} options={options} defaultValue={data[name]} />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_LIST) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref: _re, ...field } }) => (
          <CustomSelect
            {...field}
            label={label}
            options={options}
            errorText={errors[name]?.message}
            defaultValue={data[name]}
            disabled={readonly}
          />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_CHECKBOX) {
    return options.map((option, i) => (
      <Controller
        key={i}
        control={control}
        name={option.value || option}
        render={({ field }) => (
          <CheckboxInput
            ref={ref}
            {...field}
            disabled={readonly}
            label={option.label || option}
            errorText={errors[name]?.message}
          />
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
            value={data[name]}
            renderInput={(params) => (
              <TextField
                ref={ref}
                {...params}
                disabled={readonly}
                error={errors[name]?.message}
                defaultValue={data[name]}
              />
            )}
          />
        )}
      />
    );
  }

  if (inputType === InputType.DATE) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label={label}
            onChange={(value) => field.onChange({ target: { value: toAPIDate(value) } })}
            inputFormat={DateFormats.CONTROL_DATE}
            value={data[name]}
            renderInput={(params) => (
              <TextField
                ref={ref}
                {...params}
                disabled={readonly}
                error={errors[name]?.message}
                defaultValue={data[name]}
              />
            )}
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
        render={({ field: { ref: _re, ...field } }) => (
          <AutoSuggestInput label={label} options={options} defaultValue={data[name]} readonly={readonly} {...field} />
        )}
      />
    );
  }

  if (inputType === InputType.JSON) {
    return (
      <FormGroup>
        <label>{label}</label>
        <JSONInput id="a_unique_id" placeholder={{ id: 'value' }} locale={locale} height="550px" />
      </FormGroup>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          ref={ref}
          {...field}
          label={label}
          disabled={readonly}
          errorText={errors[name]?.message}
          defaultValue={data[name]}
        />
      )}
    />
  );
};

export default DynamicInput;
