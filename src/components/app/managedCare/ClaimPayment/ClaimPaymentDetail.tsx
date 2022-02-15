import React from 'react';

import Button from '../../../buttons/Button';
import Input from '../../../inputs/basic/Input';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';

interface Props {
  editBtnClicked?: () => void;
  backClick: () => void;
  row?: any;
}

const ClaimPaymentDetails: React.FC<Props> = ({ row, backClick }) => {
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Claim Payment Details</h2>
            <span>Below are your payment detail details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <HeadWrapper>
            <div>
              <h2>Bills for {row.name}</h2>
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
          <GridWrapper>
            <div>
              <label>ID</label>
              <p>{row.id}</p>
            </div>
            <div>
              <label>Category</label>
              <p>{row.category}</p>
            </div>
            <div>
              <label>Description</label>
              <p>{row.description}</p>
            </div>
            <div>
              <label>Amount</label>
              <p>{row.amount}</p>
            </div>
            <div>
              <label>Service Details</label>
              {/* {row.serviceDetails.map(service => (
                <p>{service.HMO}</p>
              ))} */}
            </div>
            <div>
              <label>Descriptions</label>
              <p>{row.description}</p>
            </div>
            <div>
              <label>Status</label>
              <p>{row.status}</p>
            </div>
            <div>
              <label>Departmental Unit</label>
              <p>{row.departmentalUnit}</p>
            </div>
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'center' }} className="two-columns">
            <Input label="Authorization Code" name="authorizationCode" size="small" />
            <Button label="Update" type="submit" style={{ width: '80px', height: '42px' }} />
            <Input label="CoPayAmount" name="coPayAmount" size="small" />
            <Button label="Update" type="submit" style={{ width: '80px', height: '42px' }} />
          </GridWrapper>
          <BottomWrapper>
            <Button label="Approve" type="submit" />
          </BottomWrapper>
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default ClaimPaymentDetails;
