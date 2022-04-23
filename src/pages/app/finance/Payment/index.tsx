import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ListView from '../../generic/ListView';
import PaymentDetails from '../../pharmacy/Payment/PaymentDetail';
import { paymentQuery } from '../../pharmacy/Payment/query';
import { PaymentsSummary } from '../../pharmacy/schema';

const AppPayments = () => {
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
        selectedPayment:
          selectedPayment || resource.paymentsResource.selectedPayment,
      },
    });

  const { groupedList: payments, setFindQuery } = useRepository(
    Models.BILLS,
    handleNavigation
  );

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(paymentQuery(undefined, searchText || undefined));
  }, [searchText]);
  return (
    <>
      {show === Views.LIST && (
        <ListView
          title="Payments"
          schema={PaymentsSummary}
          items={payments}
          handleSearch={setSearchText}
          onRowClicked={(rows) => handleNavigation(Views.DETAIL)(rows)}
          loading={false}
        />
      )}

      {show === Views.DETAIL && (
        <PaymentDetails
          row={selectedPayments}
          onBackClick={handleNavigation(Views.LIST)}
        />
      )}
    </>
  );
};

export default AppPayments;
