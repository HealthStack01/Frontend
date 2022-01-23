import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import { columnHead } from '../../admin/Employees/data';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const InventoryDetails: React.FC<Props> = ({
  editBtnClicked,
  row,
  backClick,
}) => {
  const [values, setValues] = useState({});
  const [state, setState] = useState('all');

  const SetPrice = () => {
    const [values, setValues] = useState({});

    return (
      <PageWrapper>
        <GrayWrapper>
          <FullDetailsWrapper>
            <GridWrapper>
              <Input
                label='New Selling Price'
                name='newPrice'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Old Price'
                name='oldPrice'
                value={row.price}
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
            <BottomWrapper>
              <Button
                label='Clear Form'
                background='#FFE9E9'
                color='#ED0423'
                onClick={() => setState('all')}
              />
              <Button
                label='Save Form'
                type='submit'
                onClick={() => setState('all')}
              />
            </BottomWrapper>
          </FullDetailsWrapper>
        </GrayWrapper>
      </PageWrapper>
    );
  };
  const SetReOrder = () => {
    const [values, setValues] = useState({});

    return (
      <PageWrapper>
        <GrayWrapper>
          <FullDetailsWrapper>
            <GridWrapper>
              <Input
                label='New Reoder Level'
                name='newReOrder'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Old Reoder Level'
                name='oldReOrder'
                value={row.reOrderLevel}
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
            <BottomWrapper>
              <Button
                label='Clear Form'
                background='#FFE9E9'
                color='#ED0423'
                onClick={() => setState('all')}
              />
              <Button
                label='Save Form'
                type='submit'
                onClick={() => setState('all')}
              />
            </BottomWrapper>
          </FullDetailsWrapper>
        </GrayWrapper>
      </PageWrapper>
    );
  };

  const SetAudit = () => {
    return (
      <form action='' onSubmit={() => {}}>
        <FullDetailsWrapper title='Purchase Invoice'>
          <GridWrapper className='two-columns'>
            <CustomSelect
              label='Purchase Invoice'
              name='purchaseMode'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
              options={['Mode 1', 'Mode 2']}
            />
            <Input
              label='Supplier'
              name='supplier'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label='Date'
              name='date'
              type='date'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label='Invoice Number'
              name='invoiceNo'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label='Total Amount'
              name='amount'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </GridWrapper>

          <h2>Add Product Items</h2>

          <Input
            label='Search Product'
            name='search'
            onChange={e =>
              setValues({
                ...values,
                [e.target.name]: e.target.value,
              })
            }
          />

          <GridWrapper>
            <Input
              label='Quantity'
              name='quantity'
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label='Cost Price'
              name='price'
              onChange={e =>
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
              type='submit'
            >
              +
            </button>
          </GridWrapper>
        </FullDetailsWrapper>

        <BottomWrapper>
          <Button
            label='Adjust'
            type='submit'
            onClick={() => setState('all')}
          />
        </BottomWrapper>
      </form>
    );
  };

  const SetBatches = () => {
    const [values, setValues] = useState({});

    return (
      <PageWrapper>
        <GrayWrapper>
          <FullDetailsWrapper>
            <GridWrapper>
              <Input
                label='Batch Number'
                name='batchNo'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Expiry Date'
                name='expiry'
                type='date'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>

            <DataTable
              title='Batches'
              columns={columnHead}
              data={row.data}
              selectableRows
              pointerOnHover
              highlightOnHover
              striped
            />
          </FullDetailsWrapper>
          <BottomWrapper>
            <Button
              label='Clear Form'
              background='#FFE9E9'
              color='#ED0423'
              onClick={() => setState('all')}
            />
            <Button
              label='Save Form'
              type='submit'
              onClick={() => setState('all')}
            />
          </BottomWrapper>
        </GrayWrapper>
      </PageWrapper>
    );
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Inventory Details</h2>
            <span>Below are your Inventory’s details</span>
          </div>
          <div>
            <Button
              label='Back to List'
              background='#fdfdfd'
              color='#333'
              onClick={backClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <h4>Product Name: {row.product} </h4>
          {state === 'all' && (
            <GridWrapper className='four-columns'>
              <Button
                label={'Set Price'}
                color='#fefffb'
                background='#04ed6d'
                showicon={true}
                onClick={() => setState('price')}
              />
              <Button
                label='Batches'
                background='#fdfdfd'
                color='#333'
                onClick={() => setState('batch')}
              />
              <Button
                label={'Reoder Level'}
                background={'#ECF3FF'}
                color='#0364FF'
                showicon={true}
                onClick={() => setState('reorder')}
              />
              <Button
                label={'Audit'}
                background='#FFE9E9'
                color='#ED0423'
                showicon={true}
                onClick={() => setState('audit')}
              />
            </GridWrapper>
          )}

          {state === 'price' && <SetPrice />}
          {state === 'batch' && <SetBatches />}
          {state === 'audit' && <SetAudit />}
          {state === 'reorder' && <SetReOrder />}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default InventoryDetails;
