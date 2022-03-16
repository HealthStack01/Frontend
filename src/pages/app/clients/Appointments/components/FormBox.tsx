import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../../components/buttons/Button';
import CustomTable from '../../../../../components/customtable';
import { useObjectState } from '../../../../../context/context';
import { FlexBox } from '../../../../../ui/styled/global';
import DynamicInput from '../../../DynamicInput';
import { BottomWrapper, FullDetailsWrapper } from '../../../styles';

const Document = ({ schema: documentSchema, onCancel, onSubmit }) => {
  const { resource } = useObjectState();
  const [items, setItems] = useState([]);
  let docName = resource.selectedDocumentation;
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
    console.debug(items, data);
    setItems([result, ...items]);
    const formData = {};
    documentSchema.forEach((obj) => {
      formData[obj.key] = '';
    });
    reset(formData);
  };

  return (
    <>
      <div>
        <FlexBox className="row">
          <h4>{docName}</h4>

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
              {documentSchema.map((schema, index) => {
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options || []}
                  />
                );
              })}

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
            </div>
            <CustomTable columns={documentSchema} data={items} pointerOnHover highlightOnHover striped />
          </FullDetailsWrapper>
        </form>
        <BottomWrapper>
          <Button label="Close without Saving" background="#ECF3FF" color="#0364FF" />
          <Button label="Create " onClick={() => onSubmit(items)} />
        </BottomWrapper>
      </div>
    </>
  );
};

export default Document;
