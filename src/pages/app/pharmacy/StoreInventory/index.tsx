import { useEffect, useState } from 'react';

import useRepository from '../../../../components/hooks/repository';
import { useObjectState } from '../../../../context/context';
import { Models, Views } from '../../Constants';
import InventoryDetails from './InventoryDetail';
import Inventory from './InventoryList';
import { storeInventoryQuery } from './query';

const AppInventory = () => {
  const { resource, setResource } = useObjectState();
  const {
    storeInventoryResource: { show, selectedStoreInventory },
  } = resource;

  const handleNavigation = (show: string) => (selectedStoreInventory?: any) =>
    setResource({
      ...resource,
      storeInventoryResource: {
        ...resource.storeInventoryResource,
        show,
        selectedStoreInventory:
          selectedStoreInventory ||
          resource.storeInventoryResource.selectedStoreInventory,
      },
    });

  const {
    list: inventory,
    setLocationType,
    setFindQuery,
  } = useRepository(Models.INVENTORY, handleNavigation);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setFindQuery(
      storeInventoryQuery(undefined, undefined, searchText || undefined),
    );
  }, [searchText]);
  useEffect(() => {
    setLocationType('Pharmacy');
  }, []);
  return (
    <>
      {show === Views.LIST && (
        <Inventory
          onRowClicked={(row) => {
            handleNavigation(Views.DETAIL)(row);
          }}
          onSearch={setSearchText}
          items={inventory}
          onBackClick={handleNavigation(Views.LIST)}
        />
      )}

      {show === Views.DETAIL && (
        <InventoryDetails
          row={selectedStoreInventory}
          onBackClick={handleNavigation(Views.LIST)}
        />
      )}
    </>
  );
};

export default AppInventory;
