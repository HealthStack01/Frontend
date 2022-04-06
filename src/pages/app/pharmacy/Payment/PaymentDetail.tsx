import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { PlacementWrapper } from '../../../../ui/styled/global';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const paymentOptions = ['Cash', 'Transfer'];

const typeOptions = [
  {
    value: 'Full',
    label: 'full',
  },
  {
    value: 'Part',
    label: 'Part',
  },
];

export interface DataProps {
  id: any;
  name: any;
  date: any;
  description: string;
  status: string;
  amount: string;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'S/N',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Name',
    selector: (row) => row.name,
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

const PaymentDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
  const [update, setUpdate] = useState();
  const [pay, setPay] = useState(false);
  const [payValue, setPayValue] = useState({ id: '', name: '', date: '', description: '', status: '', amount: '' });

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Make deposit for {row.name}</h2>
            </div>
            <div>
              <label
                style={{
                  padding: '14px 20px',
                  background: '#ebffe8',
                  color: '#0d4a07',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Balance {row.amount}
              </label>
            </div>
          </HeadWrapper>
          <form action="">
            <GridWrapper>
              <CustomSelect
                options={paymentOptions}
                name="paymentOptions"
                label="Payment Options"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Amount"
                name="name"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label="Payment Details"
                name="description"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
            <BottomWrapper>
              <Button label="Accept Payment" type="submit" />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <CustomTable
            title={row.title}
            columns={columnHead}
            data={row.children}
            pointerOnHover
            highlightOnHover
            onRowClicked={(row) => {
              setPayValue(row);
              setPay(true);
            }}
            striped
            // progressPending={progressPending}
          />
        </FullDetailsWrapper>
        <FullDetailsWrapper>
          {pay && (
            <PlacementWrapper>
              <HeadWrapper>
                <div>
                  <h2>Pay bills for {row.name}</h2>
                </div>
                <div>
                  <label
                    style={{
                      padding: '14px 20px',
                      background: '#ffb3bd',
                      color: '#ED0423',
                      border: 'none',
                      borderRadius: '4px',
                    }}
                  >
                    Total Amount Due {payValue.amount}
                  </label>
                </div>
              </HeadWrapper>
              <GridWrapper style={{ alignItems: 'start' }}>
                <div>
                  <label>Bill Name</label>
                  <p>{payValue.name}</p>
                </div>
                <div>
                  <label>Date</label>
                  <p>{payValue.date}</p>
                </div>
                <div>
                  <label>Status</label>
                  <p>{payValue.status}</p>
                </div>
                <div>
                  <RadioButton title="Type" options={typeOptions} onChange={(e) => setUpdate(e.target.value)} />
                  {update === 'Part' && (
                    <div>
                      <Input
                        name="paymentType"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}

                  <Button>Update</Button>
                </div>

                <div>
                  <label>Description</label>
                  <p>{payValue.description}</p>
                </div>
                <div>
                  <label>Amount</label>
                  <p>{payValue.amount}</p>
                </div>
              </GridWrapper>
              <BottomWrapper>
                <Button
                  label="Pay"
                  type="submit"
                  onClick={() => {
                    setPay(false);
                  }}
                />
              </BottomWrapper>
            </PlacementWrapper>
          )}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
