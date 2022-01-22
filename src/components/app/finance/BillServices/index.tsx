import React from 'react';
import { useObjectState } from '../../../../context/context';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import Bills from './BillList';
import BillModify from './BillModify';

const AppBills = () => {
  const { resource, setResource } = useObjectState();

  console.log(resource.billServicesResource.show);

  return (
    <>
      {resource.billServicesResource.show === 'lists' && (
        <Bills
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, event) => {
            // https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object

            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                show: 'details',
                selectedBillService: row,
              },
            }));
          }}
        />
      )}
      {resource.billServicesResource.show === 'create' && (
        <BillCreate
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
        />
      )}
      {resource.billServicesResource.show === 'details' && (
        <BillDetails
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billServicesResource.show === 'edit' && (
        <BillModify
          row={resource.billServicesResource.selectedBillService}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billServicesResource: {
                ...prevState.billServicesResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource(prevState => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppBills;
