import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import useRepository from '../../../../components/hooks/repository';
import { Models } from '../../Constants';
import {
  FullDetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from '../../styles';
import FieldModifier from './FieldModifier';
import ProductAudit from './ProductAudit';
import ProductBatch from './ProductBatch';

interface Props {
  editBtnClicked?: () => void;
  onBackClick: () => void;
  row?: any;
}

const priceModifier = (data, newValue, facilityId) => {
  const contractSel = data.contracts.find(
    (element) =>
      element.source_org === facilityId && element.dest_org === facilityId,
  );
  contractSel.price = newValue;
};

const reorderModifier = (data, newValue) => {
  return {
    ...data,
    reorder_level: newValue,
  };
};

const InventoryDetails: React.FC<Props> = ({ row, onBackClick }) => {
  const [state, setState] = useState('all');
  const { location, get } = useRepository(Models.BILLING);
  const [service, setService] = useState<any>();
  const [defaultPrice, setDefaultPrice] = useState(0);

  useEffect(() => {
    get(row.billingId)
      .then((result: any) => {
        setService(result);
        const price =
          result.contracts.find(
            (obj) =>
              obj.source_org === location._id && obj.dest_org === location._id,
          )?.price || 0.0;
        setDefaultPrice(price);
      })
      .catch((err) => toast.error('Error getting service details ' + err));
  }, []);
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
              label="Back to List"
              background="#fdfdfd"
              color="#333"
              onClick={onBackClick}
            />
          </div>
        </HeadWrapper>
        <FullDetailsWrapper>
          <h4>Product Name: {row.product} </h4>
          {state === 'all' && (
            <GridWrapper className="four-columns">
              <Button
                label={'Set Price'}
                color="#fefffb"
                background="#04ed6d"
                showicon={true}
                onClick={() => setState('price')}
              />
              <Button
                label="Batches"
                background="#fdfdfd"
                color="#333"
                onClick={() => setState('batch')}
              />
              <Button
                label={'Reoder Level'}
                background={'#ECF3FF'}
                color="#0364FF"
                showicon={true}
                onClick={() => setState('reorder')}
              />
              <Button
                label={'Audit'}
                background="#FFE9E9"
                color="#ED0423"
                showicon={true}
                onClick={() => setState('audit')}
              />
            </GridWrapper>
          )}

          {state === 'price' && (
            <FieldModifier
              row={row}
              name="Price"
              defaultValue={defaultPrice}
              modifyData={priceModifier}
              onBackClick={onBackClick}
            />
          )}
          {state === 'batch' && <ProductBatch onBackClick={onBackClick} />}
          {state === 'audit' && (
            <ProductAudit
              onBackClick={onBackClick}
              locationId=""
              facilityId=""
              userId=""
            />
          )}
          {state === 'reorder' && (
            <FieldModifier
              name="Reorder Level"
              row={service}
              defaultValue={row.reorder_level}
              modifyData={reorderModifier}
              onBackClick={onBackClick}
            />
          )}
        </FullDetailsWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default InventoryDetails;
