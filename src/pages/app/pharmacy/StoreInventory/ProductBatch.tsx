import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import { Models } from '../../Constants';
import FormView from '../../generic/FormView';
import { ProductBatchSchema } from '../../schema';
import { BottomWrapper } from '../../styles';

const ProductBatch = ({ onBackClick }) => {
  const { submit } = useRepository(Models.INVENTORY);
  const [batches, setBatches] = useState([]);

  const onSubmit = () => {
    submit({
      batches,
    })
      .then(() => {
        toast.success('Updated succesfully');
        onBackClick();
      })
      .catch((err) => {
        toast.error('Error updating Batch, probable network issues or ' + err);
      });
  };

  const onAddBatch = (data) => {
    setBatches([...batches, data]);
  };

  return (
    <>
      <FormView schema={ProductBatchSchema} title="Product Batch" backClick={onBackClick} onSubmit={onAddBatch} />
      <CustomTable columns={ProductBatchSchema} data={[]} />
      <BottomWrapper>
        <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
        <Button label="Save Form" type="submit" onClick={onSubmit} />
      </BottomWrapper>
    </>
  );
};

export default ProductBatch;
