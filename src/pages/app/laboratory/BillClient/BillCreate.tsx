import sumBy from 'lodash/sumBy';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/buttons/Button';
import CustomTable from '../../../../components/customtable';
import useRepository from '../../../../components/hooks/repository';
import DynamicInput from '../../../../components/inputs/DynamicInput';
import { Models } from '../../Constants';
import { BillCreateDetailSchema, BillCustomerSchema, BillServiceSchema } from '../../shared/bill';
import { BottomWrapper, DetailsWrapper, GrayWrapper, GridWrapper, HeadWrapper, PageWrapper } from '../../styles';
import { getBillingInfo, getSellingPrice } from './utils';

const BillClientCreate = ({ backClick, onSubmit: _ }) => {
  const { user, submit: submitBilling, location } = useRepository(Models.BILLCREATE);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { handleSubmit, control } = useForm();

  const [client, setClient] = useState<any>({});
  const [clientBills, setClientBills] = useState([]);

  const addNewBill = ({
    clientId,
    inventoryId: { category, name, _id: billingId, productId, contracts, baseunit, costprice },
    quantity,
  }) => {
    setClient(clientId);
    const { paymentOption } = getBillingInfo(clientId.paymentinfo);
    const { sellingPrice } = getSellingPrice(contracts, paymentOption);
    const amount = sellingPrice * quantity;
    const serviceItem = {
      productId,
      name,
      quantity,
      sellingprice: sellingPrice,
      amount,
      baseunit,
      costprice,
      category: category === 'Inventory' ? 'Prescription' : category,
      billingId,
      billingContract: contracts,
      billMode: paymentOption,
    };
    const serviceItems = [...clientBills, serviceItem];
    setClientBills(serviceItems);
    setTotalAmount(sumBy(serviceItems, (obj) => +obj.amount));
  };
  const createBill = () => {
    let document: any = {};
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName;
    }
    document.documentdetail = clientBills;
    document.documentname = 'Billed Orders';
    document.location = location.locationName + ' ' + location.locationType;
    document.locationId = location._id;
    document.client = client._id;
    document.clientname = client.firstname + ' ' + client.middlename + ' ' + client.lastname;
    document.clientobj = client;
    document.createdBy = user._id;
    document.createdByname = user.firstname + ' ' + user.lastname;
    document.status = 'completed';

    const serviceItems = document.documentdetail.map((element) => {
      let orderinfo = {
        documentationId: '',
        order_category: element.category,
        order: element.name,
        instruction: '',
        destination_name: document.facilityname,
        destination: document.facility,
        order_status: 'Billed',

        clientId: client._id,
        clientobj: client,
        client: client,

        order_action: [],
        medication_action: [],
        treatment_action: [],
      };

      let billInfo = {
        orderInfo: {
          orderId: '', //tbf
          orderObj: orderinfo,
        },
        serviceInfo: {
          ...element,
          createdby: user._id,
        },
        paymentInfo: {
          amountDue: element.amount,
          paidup: 0,
          balance: element.amount,
          paymentDetails: [],
        },
        participantInfo: {
          billingFacility: orderinfo.destination,
          billingFacilityName: orderinfo.destination_name,
          locationId: document.locationId, //selected location,
          clientId: orderinfo.clientId,
          client: orderinfo.client,
          paymentmode: element.billMode,
        },
        createdBy: user._id,
        billing_status: 'Unpaid',
      };
      let serviceItem = {
        orderinfo,
        billInfo,
      };

      return serviceItem;
    });

    submitBilling({
      document,
      serviceList: serviceItems,
    });
  };
  return (
    <PageWrapper>
      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Create Bill</h2>
            <span>Create a New Bill by filling out the form below to get started.</span>
          </div>
          <Button label="Back to List" background="#fdfdfd" color="#333" onClick={backClick} />
        </HeadWrapper>
        <form onSubmit={handleSubmit(addNewBill)}>
          <DetailsWrapper title="Create Bill Service" defaultExpanded={true}>
            <GridWrapper>
              {BillCustomerSchema.map((schema, index) => {
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options}
                    readonly={clientBills.length > 0}
                  />
                );
              })}
            </GridWrapper>
            <GridWrapper>
              {BillServiceSchema.filter((obj) => obj.key).map((schema, index) => {
                return (
                  <DynamicInput
                    key={index}
                    name={schema.key}
                    control={control}
                    label={schema.description}
                    inputType={schema.inputType}
                    options={schema.options}
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
                  cursor: 'pointer',
                  margin: '1rem 0',
                }}
                type="submit"
              >
                +
              </button>
            </GridWrapper>
            <CustomTable
              title={'Total : ' + totalAmount}
              columns={BillCreateDetailSchema}
              data={clientBills}
              pointerOnHover
              highlightOnHover
              striped
            />
          </DetailsWrapper>
        </form>
        <BottomWrapper>
          <Button label="Clear Form" background="#FFE9E9" color="#ED0423" />
          <Button label="Save Form" onClick={createBill} />
        </BottomWrapper>
      </GrayWrapper>
    </PageWrapper>
  );
};

export default BillClientCreate;
