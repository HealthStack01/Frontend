import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
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
  const [values, setValue] = useState({});
  const { handleSubmit, control } = useForm();

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
            {AppointmentSchema.map((obj: Schema | Schema[], index, options) => {
              if (obj['length']) {
                const schemas = obj as Schema[];
                return schemas.map((schema) => (
                  <GridWrapper className="subgrid two-columns">
                    return (
                    <DynamicInput
                      key={index}
                      name={schema.key}
                      control={control}
                      label={schema.name}
                      inputType={schema.inputType}
                      options={options}
                    />
                    );
                  </GridWrapper>
                ));
              }
              const schema = obj as Schema;
              return (
                <DynamicInput
                  key={index}
                  name={schema.key}
                  control={control}
                  label={schema.name}
                  inputType={schema.inputType}
                  options={options}
                />
              );
            })}
            <Input label="ID" value={row.id} disabled />
            <Input
              label="Date and Time"
              type="date"
              value={row.dtime}
              onChange={(e) =>
                setValue({ ...values, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="First Name"
              value={row.fname}
              onChange={(e) =>
                setValue({ ...values, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="Last Name"
              value={row.lname}
              onChange={(e) =>
                setValue({ ...values, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="Classification"
              value={row.classification}
              onChange={(e) =>
                setValue({ ...values, [e.target.name]: e.target.value })
              }
            />
            <Input
              label="Location"
              value={row.location}
              onChange={(e) =>
                setValue({ ...values, [e.target.name]: e.target.value })
              }
            />
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
