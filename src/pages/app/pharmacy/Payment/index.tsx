import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import PaymentDetails from './PaymentDetail';
import Payments from './PaymentList';
import { paymentQuery } from './query';

const AppPaymentsPharmacy = () => {
  const { resource, setResource } = useObjectState();
  const {
    paymentsResource: { show, selectedPayment: selectedPayments },
  } = resource;

  const handleNavigation = (show: string) => (selectedPayment?: any) =>
    setResource({
      ...resource,
      paymentsResource: {
        ...resource.paymentsResource,
        show,
        selectedPayment: selectedPayment || resource.paymentsResource.selectedPayment,
      },
    });

  const { groupedList: payments, submit: handleSubmit, setFindQuery } = useRepository(Models.BILLS, handleNavigation);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(paymentQuery(undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <Payments
          onMakePayment={(rows) => handleNavigation(Views.DETAIL)(rows)}
          onSearch={setSearchText}
          items={payments}
        />
      )}

      {show === Views.DETAIL && (
        <PaymentDetails row={selectedPayments} backClick={handleNavigation(Views.LIST)} onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default AppPaymentsPharmacy;
