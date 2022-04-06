import React from 'react';

import { useObjectState } from '../../../../context/context';
import BillPrescriptionSentDetails from './BillPrescriptionSentDetail';
import BillPrescriptionSent from './BillPrescriptionSentList';

const AppBillPrescriptionSent = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.billPrescriptionSentResource.show === 'lists' && (
        <BillPrescriptionSent
          onRowClicked={(row, _event) => {
            setResource((prevState) => ({
              ...prevState,
              billPrescriptionSentResource: {
                show: 'details',
                selectedBillPrescriptionSent: row,
              },
            }));
          }}
        />
      )}

      {resource.billPrescriptionSentResource.show === 'details' && (
        <BillPrescriptionSentDetails
          row={resource.billPrescriptionSentResource.selectedBillPrescriptionSent}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billPrescriptionSentResource: {
                ...prevState.billPrescriptionSentResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billPrescriptionSentResource: {
                ...prevState.billPrescriptionSentResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBillPrescriptionSent;
