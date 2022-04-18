import React from 'react';

import { useObjectState } from '../../../../context/context';
import { FormType } from '../../schema/util';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
const AppPaymentsLab = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.paymentsResource.show === 'lists' && (
        <Payments
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                show: 'details',
                selectedPayment: row,
              },
            }));
          }}
        />
      )}

      {resource.paymentsResource.show === FormType.DETAIL && (
        <PaymentDetails
          row={resource.paymentsResource.selectedPayment}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppPaymentsLab;
