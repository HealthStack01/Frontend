import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import CustomSelect from '../../../inputs/basic/Select';
import {
  BottomWrapper,
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import { columnHead } from './DispensaryList';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const DispensaryDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});

  const rowData = [
    {
      id: row.id,
      name: row.name,
      date: row.date,
      description: row.description,
      status: row.status,
      amount: row.amount,
    },
  ];
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Dispensary Sent Details</h2>
            <span>Below are your dispensary’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
          </div>
        </HeadWrapper>

        <FullDetailsWrapper>
          <GridWrapper className="two-columns" style={{ alignItems: 'end' }}>
            <div>
              <label>Name</label>
              <p>{row.name}</p>
            </div>

            <CustomSelect
              label="Dispensary Mode"
              name="hmo"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
              options={['Mode 1', 'Mode 2', 'Mode 3']}
            />
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'end' }}>
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
              label="Phone Number"
              name="phone"
              type="tel"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
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
          </GridWrapper>

          <br />

          <h2>Instructions:</h2>
          <h2>Billing Status: {row.mode}</h2>
          <br />

          <GridWrapper style={{ alignItems: 'center' }} className="two-columns">
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
              label="Amount"
              name="amount"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Button label="+" type="submit" fullwidth={false} />
          </GridWrapper>
          <BottomWrapper>
            <Button label="Adjust" type="submit" />
          </BottomWrapper>

          <DataTable
            title="Product Items"
            columns={columnHead}
            data={rowData}
            selectableRows
            pointerOnHover
            highlightOnHover
            striped
          />
        </FullDetailsWrapper>
        <BottomWrapper>
          <Button label="Clear " background="#FFE9E9" color="#ED0423" />
          <Button label="Sell" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DispensaryDetails;
