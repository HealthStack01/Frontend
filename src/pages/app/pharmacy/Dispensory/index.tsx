import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import ListView from '../../generic/ListView';
import { DispensorySummary } from '../schema';
import DispensoryDetail from './DispensoryDetail';
import { dispensoryQuery } from './query';

const AppDispensorysPharmacy = () => {
  const { resource, setResource } = useObjectState();
  const {
    dispensoryResource: { show, selectedDispensory },
  } = resource;

  const handleNavigation = (show: string) => (selectedDispensory?: any) =>
    setResource({
      ...resource,
      dispensoryResource: {
        ...resource.dispensoryResource,
        show,
        selectedDispensory:
          selectedDispensory || resource.dispensoryResource.selectedDispensory,
      },
    });

  const {
    groupedList: dispensorys,
    submit: handleSubmit,
    setFindQuery,
    facility,
    user,
  } = useRepository(Models.BILLS, handleNavigation);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    console.debug(facility);
    if (facility)
      setFindQuery(dispensoryQuery(facility._id, searchText || undefined));
  }, [searchText, facility]);
  return (
    <>
      {show === Views.LIST && (
        <ListView
          title="Dispensory"
          schema={DispensorySummary}
          items={dispensorys}
          handleSearch={setSearchText}
          onRowClicked={(rows) => handleNavigation(Views.DETAIL)(rows)}
          loading={false}
        />
      )}

      {show === Views.DETAIL &&
        (user.currentEmployee ? (
          <DispensoryDetail
            row={selectedDispensory}
            onBackClick={handleNavigation(Views.LIST)}
            onSubmit={handleSubmit}
            facilityId={facility._id}
            userId={user._id}
          />
        ) : (
          <div>Current user is not an employee</div>
        ))}
    </>
  );
};

export default AppDispensorysPharmacy;
