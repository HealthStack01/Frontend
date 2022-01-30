import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import CollectionDetails from './CollectionDetail';
import Collections from './CollectionList';

const AppCollections = () => {
  let InventoryServ=client.service('subwallettransactions')
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [collection, setCollection] = useState([])
  
  
  const getFacilities = ()=>{
    if (user.employeeData){
      
     
      InventoryServ.find({
        query:{
          facility:user.employeeData[0].facility,
          category:"credit",
          
          $sort: {
            createdAt: -1,
          },
        }
      })
      .then((res) => {
        console.log(res.data)
        setCollection(res.data);
        toast('Collections fetched succesfully');
      })
      .catch((error) => {
        toast.error(error);
      });
    }
  }

  const handleSearch = (text) => {
    const field = 'fromName'
    InventoryServ.find({
      query: {
        [field]: {
          $regex: text,
          $options: 'i',
        },
        facility: user?.employeeData[0]?.facility|| '',
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setCollection(res.data);
        toast('Collections fetched succesfully');
      })
      .catch((err) => {
        toast('Error during search, probable network issues or ' + err);
      });
  };

  useEffect(() => {
    if (!InventoryServ) {
      InventoryServ = client.service('subwallettransactions');
      InventoryServ.on('created', (_) => getFacilities());
      InventoryServ.on('updated', (_) => getFacilities());
      InventoryServ.on('patched', (_) => getFacilities());
      InventoryServ.on('removed', (_) => getFacilities());
    }
    user && getFacilities();
    return () => {
      InventoryServ = null;
    };
  }, [user]);
  return (
    <>
      {resource.collectionsResource.show === 'lists' && (
        <Collections
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                show: 'details',
                selectedCollection: row,
              },
            }));
          }}
         
        />
      )}

      {resource.collectionsResource.show === 'details' && (
        <CollectionDetails
          row={resource.collectionsResource.selectedCollection}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              collectionsResource: {
                ...prevState.collectionsResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppCollections;
