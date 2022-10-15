import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import { Models } from '../../Constants';
import FormView from '../../generic/FormView';
import { BottomWrapper } from '../../styles';
import { ProductAuditSchema } from '../schema';

const ProductAudit = ({ onBackClick, facilityId, locationId, userId }) => {
  const { submit } = useRepository(Models.INVENTORY);
  const [audits, setAudits] = useState([]);

  const resetForm = () => {};

  const onSubmit = async () => {
    let confirm = window.confirm('Are you sure you want to save this entry ?');
    if (confirm) {
      const { date, documentNo, type, totalAmount, supplier } = {} as any;
      let data = {
        date,
        documentNo,
        type,
        totalamount: totalAmount,
        source: supplier,
        productitems: audits,
        createdby: userId,
        transactioncategory: 'credit',
        facility: facilityId,
        storeId: locationId,
      };

      submit(data)
        .then(() => {
          resetForm();
          toast.success('ProductEntry created succesfully');
          setAudits([]);
        })
        .catch((err) => {
          toast.error('Error creating ProductEntry ' + err);
        });
    }
  };

  const onAddAudit = (data) => {
    setAudits([...audits, data]);
  };

  return (
    <>
      <FormView
        schema={ProductAuditSchema}
        title="Product Batch"
        backClick={onBackClick}
        onSubmit={onAddAudit}
      />
      <CustomTable columns={ProductAuditSchema} data={[]} />
      <BottomWrapper>
        <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
        <Button label="Save Form" type="submit" onClick={onSubmit} />
      </BottomWrapper>
    </>
  );
};

export default ProductAudit;
