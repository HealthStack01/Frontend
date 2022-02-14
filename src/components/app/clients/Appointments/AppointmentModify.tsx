import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import DynamicInput from '../../DynamicInput';
import { AppointmentSchema, Schema } from '../../schema';
import {
  BottomWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

const AppointmentModify = ({ cancelEditClicked, row, backClick, onSubmit }) => {
  const { handleSubmit, control } = useForm({ defaultValues: row });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Appointment Details</h2>
            <span>Below are your Appointment's details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
            <Button
              label={'Cancel Editing'}
              background={'#f2f2f2'}
              color={'#333'}
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={cancelEditClicked}
            />
          </div>
        </HeadWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <GridWrapper>
            {AppointmentSchema.map((obj, index) => {
              if (obj['length']) {
                const schemas = obj as Schema[];
                return (
                  <GridWrapper className="subgrid two-columns">
                    {schemas.map((schema) => (
                      <DynamicInput
                        key={index}
                        name={schema.key}
                        control={control}
                        label={schema.description}
                        inputType={schema.inputType}
                        options={schema.options}
                      />
                    ))}
                  </GridWrapper>
                );
              } else {
                const schema = obj as Schema;
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options}
                  />
                );
              }
            })}
          </GridWrapper>
        </form>
        <BottomWrapper>
          <Button
            label="Delete Appointment"
            background="#FFE9E9"
            color="#ED0423"
          />
          <Button label="Save Appointment" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default AppointmentModify;
