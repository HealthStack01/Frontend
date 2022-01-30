import React, { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import client from '../../../../feathers'
import { useObjectState, UserContext } from '../../../../context/context';
import { getFormStrings } from '../../Utils';

import ClientCreate from './ClientCreate';
import ClientDetails from './ClientDetail';
import Clients from './ClientList';
import ClientModify from './ClientModify';


const AppClient = () => {
  let ClientServ = client.service('client');
  const { resource, setResource } = useObjectState();
  const {user} = useContext(UserContext);
  const [newClients, setNewClients] = useState([]);


  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      bandResource: {
        ...prevState.bandResource,
        show: 'lists',
      }

    }))
  }

  const getClients = async () => {
    if(user.employeeData) {
      ClientServ.find({
        query: {
          facility: user.employeeData.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          }
        }
      })
      .then(() => {})
      .catch(err => {
        console.error(err)
      })
    }else if (user.stacker) {
      ClientServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          }
        }
      })
      .then(res => {
        setNewClients(res.data);
        toast('Clients fetched successfully');
      })
      .catch(err => {
        console.log(err)
      })
    }
  }


  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    

    if (user.employeeData) {
      data.facility = user.employeeData.facilityDetail._id;
    }
    (data._id ? ClientServ.update(data._id, data) : ClientServ.create(data))
      .then(() => {
        toast(`Client ${values.message}`);
        backClick();
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  }

  useEffect(() => {
    if (!ClientServ) {
      ClientServ.on('created', (_) => getClients());
      ClientServ.on('updated', (_) => getClients());
      ClientServ.on('patched', (_) => getClients());
      ClientServ.on('removed', (_) => getClients());
    }
    user && getClients();
    return () => {
      ClientServ = null;
    };
  }, [user]);

  console.log(newClients)
  console.log(user)

  return (
    <>
      {resource.billClientResource.show === 'lists' && (
        <Clients
          handleCreate={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                show: 'details',
                selectedBillClient: row,
              },
            }));
          }}
        />
      )}

      {resource.billClientResource.show === 'create' && (
        <ClientCreate
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }

          onSubmit = {onSubmit}
        />
      )} 



      {resource.billClientResource.show === 'details' && (
        <ClientDetails
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.billClientResource.show === 'edit' && (
        <ClientModify
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource(prevState => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
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

export default AppClient;
