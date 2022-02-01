import { Controller } from 'react-hook-form';
import CheckboxInput from '../inputs/basic/Checkbox';

import Input from '../inputs/basic/Input';
import CustomSelect from '../inputs/basic/Select';
import { InputType } from './ModelSchema';

const DynamicInput = (props) => {
  const { inputType,  name, options, description, control } = props;
  if (inputType === InputType.HIDDEN) {
    return <></>;
  }

  if (inputType === InputType.TEXT) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} label={description} />}
      />
    );
  }

  if (inputType === InputType.SELECT) {
    return (
      <Controller
        control={control}
        name={name}
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

  if  (inputType === InputType.CHECKBOX) {
   return (
     options.map((option, i) => (<Controller
      key={i} 
      control={control}
       name={option}
       render={({ field }) => (
        <CheckboxInput
        {  ...field }
        label={option}
      />
       )}
     />))
   );
  }

  return (
   <Controller
     name={name}
     control={control}
     render={({ field }) => <Input {...field} label={description} />}
   />
 );
};

export default DynamicInput;
