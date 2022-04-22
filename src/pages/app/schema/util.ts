import * as yup from 'yup';

const getResolver = (schema: Schema[]) => {
  const validators = {};
  const requiredValidator = (required, name) =>
    required && yup.string().required(`Field: ${name} is required`);
  schema.forEach(({ name, key, validator, required }) => {
    const func = validator || requiredValidator(required, name);
    if (func) validators[key] = func;
  });
  return yup.object(validators);
};

const getDefaultValues = (schema: Schema[]) => {
  const defaultValues = {};
  schema.forEach((obj) => {
    defaultValues[obj.key] = obj.defaultValue;
  });
  return defaultValues;
};

enum InputType {
  DATE,
  DATETIME,
  HIDDEN,
  TEXT,
  TEXT_AREA,
  SELECT_CHECKBOX,
  EMAIL,
  PHONE,
  NUMBER,
  SELECT_RADIO,
  SELECT_AUTO_SUGGEST,
  SELECT_LIST,
  JSON,
  FILE_UPLOAD,
  READ_ONLY,
  SNOMED,
}

enum FormType {
  EDIT = 'edit',
  CREATE = 'create',
  DETAIL = 'details',
  LIST = 'lists',
  BULK_CREATE = 'bulk_create',
}

export type Schema = {
  name: string;
  key: string;
  description?: string;
  selector?: (_row) => string;
  sortable?: boolean;
  inputType: InputType;
  required?: boolean;
  validator?: any;
  options?: any[];
  defaultValue?: string;
};

export { FormType, getDefaultValues, getResolver, InputType };
