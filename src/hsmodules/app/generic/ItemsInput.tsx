import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import CustomTable from '../../../components/customtable';
import DynamicInput from '../../../components/inputs/DynamicInput';
import { FlexBox, PlacementWrapper } from '../../../ui/styled/global';
import { FullDetailsWrapper } from '../styles';

const ItemsInput = ({
  onChange,
  schema: { schema },
  label,
  defaultValue,
  name,
  readonly,
}) => {
  const [items, setItems] = useState(defaultValue || []);
  const { control, watch } = useForm();
  const [data, setData] = useState<any>({});

  const onAddNew = (e) => {
    e.preventDefault();
    let result = {};
    Object.entries(data).map(([key, value]) => {
      if (typeof value === 'object' && !data.documentname) {
        result = { ...result, ...value };
      } else {
        result[key] = value;
      }
    });
    const newItems = [...items, result];
    setItems(newItems);
    const formData = {};
    schema.forEach((obj) => {
      formData[obj.key] = '';
    });
    const event = { target: { name, value: newItems } };
    onChange(event);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      setData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <PlacementWrapper>
        <FlexBox className="row">
          <h4>{label}</h4>
        </FlexBox>
        {!readonly && (
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
                onClick={onAddNew}
              >
                +
              </button>
            </div>
          </FullDetailsWrapper>
        )}

        <div>
          <CustomTable
            columns={schema}
            data={items}
            pointerOnHover
            highlightOnHover
            striped
          />
        </div>
      </PlacementWrapper>
    </>
  );
};

export default ItemsInput;
