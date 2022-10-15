import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../components/buttons/Button';
import CustomTable from '../../../components/customtable';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { FlexBox, PlacementWrapper } from '../../../ui/styled/global';
import { FormType } from '../schema/util';
import { BottomWrapper, FullDetailsWrapper } from '../styles';

const FormRowsView = ({ title, formType, schema, onSubmit, onCancel }) => {
  const [items, setItems] = useState([]);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      client: '',
    },
  });

  const onAddNew = (data) => {
    let result = {};
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && !data.documentname) {
        result = { ...result, ...value };
      } else {
        result[key] = value;
      }
    });
    setItems([result, ...items]);
    const formData = {};
    schema.forEach((obj) => {
      formData[obj.key] = '';
    });
    reset(formData);
  };

  return (
    <>
      <PlacementWrapper>
        <FlexBox className="row">
          <h4>{title}</h4>

          <button
            onClick={onCancel}
            style={{
              borderRadius: '32px',
              background: '#f3f3f3',
              border: 'none',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              margin: '1rem 0',
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </FlexBox>
        <form onSubmit={handleSubmit(onAddNew)}>
          <FullDetailsWrapper className="small">
            <div>
              {schema.map((field, index) => {
                return (
                  <DynamicInput
                    key={index}
                    name={field.key}
                    control={control}
                    label={field.description}
                    inputType={field.inputType}
                    options={field.options || []}
                  />
                );
              })}

              {formType === FormType.BULK_CREATE ? (
                <button
                  style={{
                    borderRadius: '32px',
                    background: '#f3f3f3',
                    border: 'none',
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    margin: '1rem 0',
                  }}
                  type="submit"
                >
                  +
                </button>
              ) : (
                <BottomWrapper>
                  <Button
                    label="Close without Saving"
                    background="#ECF3FF"
                    color="#0364FF"
                    onClick={() => {
                      onCancel();
                      onSubmit(items);
                    }}
                  />
                  <Button label="Create " type="submit" />
                </BottomWrapper>
              )}
            </div>
          </FullDetailsWrapper>
        </form>
        {formType === FormType.BULK_CREATE && (
          <div>
            {' '}
            <CustomTable
              columns={schema}
              data={items}
              pointerOnHover
              highlightOnHover
              striped
            />
            <BottomWrapper>
              <Button
                label="Close without Saving"
                background="#ECF3FF"
                color="#0364FF"
                onClick={() => {
                  onCancel();
                  onSubmit(items);
                }}
              />
              <Button label="Create " onClick={onSubmit} />
            </BottomWrapper>
          </div>
        )}
      </PlacementWrapper>
    </>
  );
};

export default FormRowsView;
