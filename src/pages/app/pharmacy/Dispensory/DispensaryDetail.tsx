import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick?: () => void;
  row?: any;
}

export interface DataProps {
  id: any;
  date: string;
  name: string;
  description: string;
  status: string;
  amount: string;
}

const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Date',
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: 'Description',
    selector: (row) => row.description,
    sortable: true,
  },
  {
    name: 'Status',
    selector: (row) => row.status,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row) => row.amount,
    sortable: true,
  },
];

const DispensaryDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
  const [dispense, setDispense] = useState(false);

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Dispensary Sent Details</h2>
            <span>Below are your dispensary’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>

        <FullDetailsWrapper>
          <CustomTable
            title="Product Items"
            columns={columnHead}
            data={row.data}
            pointerOnHover
            onRowClicked={(row) => {
              setValues(row);
              setDispense(true);
            }}
            highlightOnHover
            striped
          />

          {dispense ? (
            <>
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
                >
                  +
                </button>
              </GridWrapper>
              <BottomWrapper>
                <Button label="Adjust" type="submit" onClick={() => setDispense(false)} />
              </BottomWrapper>
            </>
          ) : (
            <BottomWrapper>
              <Button label="Clear " background="#FFE9E9" color="#ED0423" />
              <Button label="Sell" />
            </BottomWrapper>
          )}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DispensaryDetails;
