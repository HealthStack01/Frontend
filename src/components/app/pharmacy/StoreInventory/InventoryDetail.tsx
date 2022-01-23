import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { columnHead } from '../../admin/Employees/data';
import {
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
          <GridWrapper className='four-columns'>
            <Button
              label={'Set Price'}
              color='#fefffb'
              background='#04ed6d'
              showicon={true}
            />
            <Button label='Batches' background='#fdfdfd' color='#333' />
            <Button
              label={'Reoder Level'}
              background={'#ECF3FF'}
              color='#0364FF'
              showicon={true}
            />
            <Button
              label={'Audit'}
              background='#FFE9E9'
              color='#ED0423'
              showicon={true}
            />
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default InventoryDetails;

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
              onChange={e =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </GridWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
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

          {/* <DataTable
            title='Batches'
            columns={columnHead}
            data={row.data}
            selectableRows
            pointerOnHover
            highlightOnHover
            striped
          /> */}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};
