import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  backClick: () => void;
}

const ProductEntryCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Product Entry</h2>
            <span>Create a new Product Entry by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form action="" onSubmit={() => {}}>
          <FullDetailsWrapper title="Create Employee">
            <GridWrapper className="two-columns">
              <CustomSelect
                label="Purchase Invoice"
                name="purchaseMode"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
                options={['Mode 1', 'Mode 2']}
              />
              <Input
                label="Supplier"
                name="supplier"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Date"
                name="date"
                type="date"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Invoice Number"
                name="invoiceNo"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Total Amount"
                name="amount"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>

            <h2>Add Product Items</h2>

            <Input
              label="Search Product"
              name="search"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />

            <GridWrapper>
              <Input
                label="Quantity"
                name="quantity"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Cost Price"
                name="price"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button
                style={{
                  borderRadius: '32px',
                  background: '#f3f3f3',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                }}
                type="submit"
              >
                +
              </button>
            </GridWrapper>
          </FullDetailsWrapper>

          <BottomWrapper>
            <Button label="Adjust" type="submit" />
          </BottomWrapper>
        </form>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ProductEntryCreate;
