import React from 'react';

import { useObjectState } from '../../../../context/context';
import { FormType } from '../../schema/util';
import BillLabSentDetails from './BillLabSentDetail';
import BillLabSent from './BillLabSentList';

const AppBillLabSent = () => {
  const { resource, setResource } = useObjectState();

  return (
    <>
      {resource.billPrescriptionSentResource.show === 'lists' && (
        <BillLabSent
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              billPrescriptionSentResource: {
                ...prevState.billPrescriptionSentResource,
                show: 'create',
              },
            }))
          }
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

      {resource.billPrescriptionSentResource.show === FormType.DETAIL && (
        <BillLabSentDetails
          row={
            resource.billPrescriptionSentResource.selectedBillPrescriptionSent
          }
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

export default AppBillLabSent;
