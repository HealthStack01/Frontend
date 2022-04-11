import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillPrescriptionSentDetails from './BillPrescriptionSentDetail';
import BillPrescriptionSent from './BillPrescriptionSentList';
import { orderQuery } from './query';

const AppBillPrescriptionSent = () => {
  const { resource, setResource } = useObjectState();
  const {
    billPrescriptionSentResource: { show, selectedBillPrescriptionSent },
  } = resource;

  const navigate = (show: string) => (selectedBillPrescriptionSent?: any) =>
    setResource({
      ...resource,
      billPrescriptionSentResource: {
        ...resource.appointmentResource,
        show,
        selectedBillPrescriptionSent:
          selectedBillPrescriptionSent || resource.billPrescriptionSentResource.selectedBillPrescriptionSent,
      },
    });

  const { groupedList: billprescription, submit: handleSubmit, setFindQuery } = useRepository(Models.ORDER, navigate);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setFindQuery(orderQuery(undefined, searchText || undefined));
  }, [searchText]);

  return (
    <>
      {show === Views.LIST && (
        <BillPrescriptionSent
          onRowClicked={(row) => navigate(Views.DETAIL)(row)}
          onSearch={setSearchText}
          items={billprescription}
        />
      )}

      {show === Views.DETAIL && (
        <BillPrescriptionSentDetails
          onSubmit={handleSubmit}
          row={selectedBillPrescriptionSent}
          backClick={navigate(Views.LIST)}
        />
      )}
    </>
  );
};

export default AppBillPrescriptionSent;
