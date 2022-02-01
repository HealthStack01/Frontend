import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';

import RevenueDetails from './RevenueDetail';
import Revenue from './RevenueList';

const AppRevenue = () => {
  let InventoryServ=client.service('subwallettransactions')
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [revenue, setRevenue] = useState([])
  
  

  const getAccountDetails = ()=>{
    if (user.employeeData){
      InventoryServ.find({
        query:{
          facility:user.employeeData[0].facility,
          $limit: 200,
          category:"debit",
          $sort: {
            createdAt: -1,
          },
        }
      })
      .then((res) => {
        setRevenue(res.data);
        toast('Revenues fetched succesfully');
      })
      .catch((error) => {
        toast.error(error);
      });
    }
  }

  const handleSearch = (text) => {
    InventoryServ.find({
      query: {
        name: {
          $regex: text,
          $options: 'i',
        },
        facility: user?.employeeData[0]?.facility|| '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setRevenue(res.data);
        toast('Revenues fetched succesfully');
      })
      .catch((err) => {
        toast('Error during search, probable network issues or ' + err);
      });
  };

  useEffect(() => {
    if (!InventoryServ) {
      InventoryServ = client.service('subwallettransactions');
      InventoryServ.on('created', (_) => getAccountDetails());
      InventoryServ.on('updated', (_) => getAccountDetails());
      InventoryServ.on('patched', (_) => getAccountDetails());
      InventoryServ.on('removed', (_) => getAccountDetails());
    }
    user && getAccountDetails();
    return () => {
      InventoryServ = null;
    };
  }, [user]);



  
  return (
    <>
      {resource.revenuesResource.show === 'lists' && (
        <Revenue
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                show: 'details',
                selectedRevenue: row,
              },
            }));
          }}
          items={revenue}
          handleSearch={handleSearch}
        />
      )}

      {resource.revenuesResource.show === 'details' && (
        <RevenueDetails
          row={resource.revenuesResource.selectedRevenue}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              revenuesResource: {
                ...prevState.revenuesResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
    </>
  );
};

export default AppRevenue;
