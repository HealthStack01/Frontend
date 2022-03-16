import * as yup from 'yup';

const getResolver = (schema: Schema[]) => {
  const validators = {};
  const requiredValidator = (required, name) => required && yup.string().required(`Field: ${name} is required`);
  schema.forEach(({ name, key, validator, required }) => {
    const func = validator || requiredValidator(required, name);
    if (func) validators[key] = func;
  });
  return yup.object(validators);
};

enum InputType {
  DATE,
  DATETIME,
  HIDDEN,
  TEXT,
  TEXT_AREA,
  CHECKBOX,
  EMAIL,
  PHONE,
  NUMBER,
  SELECT_RADIO,
  SELECT_AUTO_SUGGEST,
  SELECT_LIST,
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
};

export { getResolver, InputType };
