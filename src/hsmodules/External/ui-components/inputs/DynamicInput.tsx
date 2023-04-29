import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  TextField,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import CheckboxInput from './basic/Checkbox';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from './basic/Radio';
import CustomSelect from './basic/Select';
import Textarea from './basic/Textarea';
import { DateFormats } from '../../../app/Constants';
import { toAPIDate } from '../../../app/DateUtils';
import ItemsInput from '../../../app/generic/ItemsInput';
import { InputType } from '../../../app/schema/util';
import AutoSuggestInput from './AutoSuggestInput';

// TODO: Anstract intp seperate components - the controller warapping
const DynamicInput = (props) => {
  const {
    inputType,
    label,
    name,
    data = {},
    options,
    control,
    errors = {},
    readonly,
    defaultValue,
  } = props;
  if (inputType === InputType.HIDDEN && data[name]) {
    return <input type="hidden" defaultValue={defaultValue} />;
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
            defaultValue={data[name] || ''}
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

  if (inputType === InputType.EMAIL) {
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
            type="email"
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
        render={({ field: { ref: _re, value: __, ...field } }) => (
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

  if (inputType === InputType.MULTIPLE_ADD && props.schema) {
    //console.debug({ props });
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { ref: _re, value: __, ...field } }) => (
          <ItemsInput
            {...field}
            label={label}
            readonly={false}
            schema={props}
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
          <RadioButton
            {...field}
            title={label}
            disabled={readonly}
            options={options}
            defaultValue={data[name]}
          />
        )}
      />
    );
  }

  if (inputType === InputType.SELECT_CHECKBOX) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CheckboxInput
            {...field}
            label={label}
            disabled={readonly}
            defaultValue={data[name]}
            options={options}
            errorText={errors[name]?.message}
          />
        )}
      />
    );
  }

  if (inputType === InputType.BOOLEAN_CHECK) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <FormControlLabel
            defaultValue={defaultValue}
            control={
              <Checkbox
                name={field.name}
                onChange={(_, value) => field.onChange({ target: { value } })}
                disabled={readonly}
              />
            }
            label={label}
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
        render={({ field: { ref: _re, ...field } }) => (
          <CustomSelect
            {...field}
            label={label}
            options={options}
            errorText={errors[name]?.message}
            defaultValue={
              defaultValue != undefined ? defaultValue : data[name] || ''
            }
            disabled={readonly}
          />
        )}
      />
    );
  }

  if (inputType === InputType.DATETIME) {
    return (
      <FormControl disabled={readonly} style={{ width: '100%' }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { ref: _, ...field } }) => (
            <>
              <DateTimePicker
                {...field}
                label={label}
                onChange={(value) =>
                  field.onChange({ target: { value: toAPIDate(value) } })
                }
                inputFormat={DateFormats.CONTROL_DATE_TIME}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled={readonly}
                    error={errors[name]?.message}
                  />
                )}
              />
              {errors[name] && (
                <FormHelperText error>{errors[name].message}</FormHelperText>
              )}
            </>
          )}
        />
      </FormControl>
    );
  }

  if (inputType === InputType.DATE) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <DatePicker
              {...field}
              label={label}
              onChange={(value) =>
                field.onChange({ target: { value: toAPIDate(value) } })
              }
              inputFormat={DateFormats.CONTROL_DATE}
              renderInput={(params) => (
                <TextField
                  {...params}
                  disabled={readonly}
                  error={!!errors[name]?.message}
                />
              )}
            />
            {errors[name]?.message && (
              <FormHelperText error>{errors[name]?.message}</FormHelperText>
            )}
          </>
        )}
      />
    );
  }

  if (
    inputType === InputType.SELECT_AUTO_SUGGEST ||
    inputType === InputType.SNOMED
  ) {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref: _re, ...field } }) => (
          <AutoSuggestInput
            label={label}
            options={options}
            defaultValue={data[name]}
            readonly={readonly}
            error={errors[name]}
            inputType={inputType}
            {...field}
          />
        )}
      />
    );
  }

  if (inputType === InputType.JSON) {
    return (
      <FormGroup>
        <label>{label}</label>
        <Controller
          control={control}
          name={name}
          render={({ field: { ref: _re, ...field } }) => (
              <Input
              {...field}
             /*  id="a_unique_id" */
              placeholder="JSON Input"
             /*  locale={locale} */
              /* height="50px" */
            />
            
          )}
        ></Controller>
      </FormGroup>
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
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
};

export default DynamicInput;
