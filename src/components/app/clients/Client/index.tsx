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
    if(user.employeeData[0]) {
      ClientServ.find({
        query: {
          facility: user.employeeData[0]._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          }
        }
      })
      .then((res) => { setNewClients(res.data)})

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
        console.error(err)
      })
    }
  };


  const handleSearch = (text) => {
    ClientServ.find({
      query: {
        name: {
          $regex: text,
          $options: 'i',
        },
        facility: user?.employeeData[0]?._id || '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setNewClients(res.data);
        toast('Client fetched succesfully');
      })
      .catch((err) => {
        toast('Error updating Client, probable network issues or ' + err);
      });
  };



  const onSubmit = (data) => {
    const values = getFormStrings(user.employeeData[0]._id);
    

    if (user.employeeData[0]) {
      data.facility = user.employeeData[0]._id;

    }
    
    (data._id ? ClientServ.update(data.facility, data) : ClientServ.create(data))
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

          items = {newClients}
          handleSearch = {handleSearch}
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
