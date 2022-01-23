import React from 'react';

import Button from '../../../buttons/Button';
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
              background='#fefffb'
              color='#04ed6d'
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
