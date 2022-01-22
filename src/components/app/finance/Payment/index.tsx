import React from 'react';

import { useObjectState } from '../../../../context/context';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
const AppPayments = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.paymentsResource.show === 'lists' && (
        <Payments
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              paymentsResource: {
                show: 'details',
                selectedPayment: row,
              },
            }));
          }}
        />
      )}

      {resource.paymentsResource.show === 'details' && (
        <PaymentDetails
          row={resource.paymentsResource.selectedPayment}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              paymentsResource: {
                ...prevState.paymentsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
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

export default AppPayments;
