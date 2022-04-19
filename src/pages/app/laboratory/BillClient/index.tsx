import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import BillCreate from './BillCreate';
import BillDetails from './BillDetail';
import Bill from './BillList';
import { LabClientQuery } from './query';

const AppBillClient = () => {
  const { resource, setResource } = useObjectState();

  const {
    billClientResource: { show, selectedBillClient },
  } = resource;

  const handleNavigation = (show: string) => (selectedBillClient?: any) =>
    setResource({
      ...resource,
      billClientResource: {
        ...resource.billClientResource,
        show,
        selectedBillClient: selectedBillClient || resource.billClientResource.selectedBillClient,
      },
    });

  const {
    groupedList: clientBillsSummary,
    submit: handleSubmit,
    setFindQuery,
  } = useRepository(Models.BILLS, handleNavigation);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(LabClientQuery(undefined, searchText || undefined));
  }, [searchText]);

  return (
    <>
      {show === Views.LIST && (
        <Bill
          handleCreate={handleNavigation(Views.CREATE)}
          onRowClicked={(row) => handleNavigation(Views.DETAIL)(row)}
          onSearch={setSearchText}
          progressPending={false}
          items={clientBillsSummary}
        />
      )}
      {show === Views.CREATE && <BillCreate backClick={handleNavigation(Views.LIST)} onSubmit={handleSubmit} />}
      {show === Views.DETAIL && (
        <BillDetails
          row={selectedBillClient}
          backClick={handleNavigation(Views.LIST)}
          editBtnClicked={() => handleNavigation(Views.EDIT)(selectedBillClient)}
        />
      )}
    </>
  );
};

export default AppBillClient;
