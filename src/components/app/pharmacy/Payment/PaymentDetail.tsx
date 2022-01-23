import React, { useState } from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import RadioButton from '../../../inputs/basic/Radio';
import CustomSelect from '../../../inputs/basic/Select';
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

const PaymentDetails: React.FC<Props> = ({
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
            <h2>Payment Details</h2>
            <span>Below are your payment’s details</span>
          </div>
          <div>
            <Button
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={backClick}
            />
<<<<<<< HEAD
=======
            <Button
              label={'Delete'}
              background="#FFE9E9"
              color="#ED0423"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
            <Button
              label={'Edit Details'}
              background={'#ECF3FF'}
              color="#0364FF"
              showicon={true}
              icon="bi bi-pen-fill"
              onClick={editBtnClicked}
            />
>>>>>>> 6f32e02b5e290369d0c6d4adec27b1d49d4851d0
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
                  background: '#ffb3bd',
                  color: '#ED0423',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
                Balance {row.amount}
              </label>
            </div>
          </HeadWrapper>
          <form action=''>
            <GridWrapper>
              <CustomSelect
                options={paymentOptions}
                name='paymentOptions'
                label='Payment Options'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Amount'
                name='name'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <Input
                label='Description'
                name='description'
                onChange={e =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </GridWrapper>
            <BottomWrapper>
              <Button label='Accept Payment' type='submit' />
            </BottomWrapper>
          </form>
        </FullDetailsWrapper>

        <FullDetailsWrapper>
          <GridWrapper>
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
            <RadioButton title='Type' options={typeOptions} />
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
            <Button label='Pay' type='submit' />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default PaymentDetails;
