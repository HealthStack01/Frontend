import React, { useState } from 'react';
import { TableColumn } from 'react-data-table-component';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';

interface Props {
  backClick: () => void;
  schema?: any;
  data?: any;
}

export interface DataProps {
  clientSearch: any;
  billingMode: any;
  chooseServiceItem: any;
  chooseQuantity: any;
}

export const columnHead: TableColumn<DataProps>[] = [
  {
    name: 'Client',
    selector: (row) => row.clientSearch,
    sortable: true,
  },
  {
    name: 'Billing Mode',
    selector: (row) => row.billingMode,
    sortable: true,
  },
  {
    name: 'Service Item',
    selector: (row) => row.chooseServiceItem,
    sortable: true,
  },
  {
    name: 'Quantity',
    selector: (row) => row.chooseQuantity,
    sortable: true,
  },
];

const BillClientCreate: React.FC<Props> = ({ backClick }) => {
  const [values, setValues] = useState({});
  const [bill, setBill] = useState([]);
  const [update, setUpdate] = useState(false);
  let bills = [];

  const createBills = () => {
    bills.push(values);

    return bills;
  };

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Bill</h2>
            <span>
              Create a New Bill by filling out the form below to get started.
            </span>
          </div>
          <Button
            label="Back to List"
            background="#fdfdfd"
            color="#333"
            onClick={backClick}
          />
        </HeadWrapper>
        <DetailsWrapper title="Create Bill Service" defaultExpanded={true}>
          <GridWrapper className="five-columns">
            <Input
              label="Search for Client"
              name="clientSearch"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <CustomSelect
              label="Choose a Billing Mode"
              name="billingMode"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
              options={['Mode 1', 'Mode 2']}
            />

            <Input
              label="Choose a Service Item"
              name="chooseServiceItem"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <Input
              label="Quantity"
              name="chooseQuantity"
              type="number"
              onChange={(e) =>
                setValues({
                  ...values,
                  [e.target.name]: e.target.value,
                })
              }
            />
            {update ? (
              <Button label="Update" />
            ) : (
              <button
                onClick={() => {
                  const bills = createBills();
                  setBill(bills);
                }}
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
            )}
          </GridWrapper>
          <CustomTable
            columns={columnHead}
            data={bill}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={(row) => {
              setValues(row);
              setUpdate(true);
            }}
          />
        </DetailsWrapper>

        <BottomWrapper>
          <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Form" type="submit" />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillClientCreate;
