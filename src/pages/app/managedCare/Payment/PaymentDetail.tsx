import React, { useState } from 'react';

import Button from '../../../../components/buttons/Button';
import Input from '../../../../components/inputs/basic/Input';
import RadioButton from '../../../../components/inputs/basic/Radio';
import CustomSelect from '../../../../components/inputs/basic/Select';
import { ButtonGroup } from '../../../../ui/styled/global';
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

const PaymentDetails: React.FC<Props> = ({ row, backClick }) => {
  const [values, setValues] = useState({});
  const [update, setUpdate] = useState();

  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <ButtonGroup>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </ButtonGroup>
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
                Total Amount Due {row.amount}
              </label>
            </div>
          </HeadWrapper>
          <GridWrapper style={{ alignItems: 'start' }}>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Name</label>
              <p>{row.name}</p>
            </div>
            <div>
              <label>Date</label>
              <p>{row.date}</p>
            </div>
            <div>
              <label>Status</label>
              <p>{row.status}</p>
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
              <p>{row.decription}</p>
            </div>
            <div>
              <label>Amount</label>
              <p>{row.amount}</p>
            </div>
          </GridWrapper>
          <BottomWrapper>
            <Button label="Pay" type="submit" />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
