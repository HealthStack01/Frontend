import sumBy from 'lodash/sumBy';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import Input from '../../../../components/inputs/basic/Input';
import CustomSelect from '../../../../components/inputs/basic/Select';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import { DispensaryCreateSchema, DispensaryDetailSchema } from '../../schema';
import { BottomWrapper, FullDetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import { randomString } from '../../Utils';

const flattenAndAddCategory = (row) => {
  row.bills.forEach((obj) => {
    obj.order.forEach((orderObj) => {
      orderObj.category = obj.catName;
    });
  });
  return row.bills.map((obj) => obj.order).flat();
};

const DispensaryDetails = ({ row, onBackClick, onSubmit, userId, facilityId }) => {
  const { submit: makePayment } = useRepository(Models.PRODUCTENTRY);
  const options = ['Sales', 'In-house', 'Dispense', 'Audit'];
  const invoiceNo = randomString(6);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      client: '',
    },
  });
  const [dispenseMode, setBillingMode] = useState('');
  const [prescriptions] = useState(flattenAndAddCategory(row));
  const order = row.bills[0].order[0].orderInfo.orderObj;
  const clientName =
    row.bills[0].order[0].participantInfo.client.firstname +
    ' ' +
    row.bills[0].order[0].participantInfo.client.lastname;
  const locationId = ''; //FIXME: Implement Location context

  const resetForm = () => {};
  const handleSell = async () => {
    const productsToSell = {
      productitems: prescriptions,
      date: new Date().toLocaleString(),
      documentNo: invoiceNo,
      type: dispenseMode,
      totalamount: sumBy(prescriptions, (obj: any) => obj.serviceInfo.amount),
      source: clientName,
      createdby: userId,
      transactioncategory: 'debit',
      facility: facilityId,
      storeId: locationId,
    };
    makePayment(productsToSell)
      .then(() => {
        resetForm();
        toast.success('ProductExit created succesfully');
        onBackClick();
      })
      .catch((err) => {
        toast.error('Error creating ProductExit ' + err);
      });
  };

  if (locationId) return <div>You need to select a store before removing inventory</div>;
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Dispensary Sent Details</h2>
            <span>Below are your dispensary’s details</span>
          </div>
          <div>
            <Button label="Back to List" background="#fdfdfd" color="#333" onClick={onBackClick} />
          </div>
        </HeadWrapper>

        <FullDetailsWrapper>
          <GridWrapper className="two-columns" style={{ alignItems: 'end' }}>
            <div>
              <label>Name</label>
              <p>{order.clientname}</p>
            </div>

            <CustomSelect
              label="Dispensary Mode"
              name="hmo"
              options={options}
              onChange={(e) => setBillingMode(e.target.value)}
            />
          </GridWrapper>
          <GridWrapper style={{ alignItems: 'end' }}>
            <Input label="Date" name="date" defaultValue={new Date().toLocaleString()} disabled />
            <Input label="Invoice" name="phone" defaultValue={invoiceNo} disabled />
            <Input
              label="Total"
              name="quantity"
              defaultValue={sumBy(prescriptions, (obj: any) => obj.serviceInfo.amount) + ''}
              disabled
            />
          </GridWrapper>

          <br />

          <form onSubmit={handleSubmit(onSubmit)}>
            <GridWrapper title="Create Employee">
              {DispensaryCreateSchema.map((schema: any, index) => {
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options || []}
                  />
                );
              })}
              <button
                style={{
                  borderRadius: '32px',
                  background: '#f3f3f3',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                }}
                type="submit"
              >
                +
              </button>
            </GridWrapper>
          </form>
        </FullDetailsWrapper>

        <CustomTable
          title="Product Items"
          columns={DispensaryDetailSchema}
          data={prescriptions}
          highlightOnHover
          striped
        />

        <BottomWrapper>
          <Button label="Clear " background="#FFE9E9" color="#ED0423" />
          <Button label="Sell" onClick={handleSell} />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default DispensaryDetails;
