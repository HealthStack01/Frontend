import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../context/feathers';
import ClientCreate from '../../../../pages/app/clients/Client/ClientCreate';
import ClientDetails from '../../../../pages/app/clients/Client/ClientDetail';
import Clients from '../../../../pages/app/clients/Client/ClientList';
import ClientModify from '../../../../pages/app/clients/Client/ClientModify';
import { getFormStrings } from '../../../../pages/app/Utils';

const AppClient = () => {
  let ClientServ = client.service('client');

  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [newClients, setNewClients] = useState([]);
  const [pending, setPending] = useState(true);

  const Client = resource.billClientResource.selectedBillClient;

  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      billClientResource: {
        ...prevState.billClientResource,
        show: 'lists',
      },
    }));
  };

  const getClients = async () => {
    if (user.employeeData[0]) {
      ClientServ.find({
        query: {
          facility: user.employeeData[0]._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then((res) => {
          setNewClients(res.data);
          setPending(false);
        })

        .catch((err) => {
          console.error(err);
        });
    } else if (user.stacker) {
      ClientServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          },
        },
      })
        .then((res) => {
          setNewClients(res.data);

          toast('Clients fetched successfully');
        })
        .catch((err) => {
          console.error(err);
        });
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

  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = Client['_id'];
    if (conf) {
      ClientServ.remove(dleteId)
        .then(() => {
          toast('Client deleted succesfully');
          backClick();
        })
        .catch((err) => {
          toast('Error deleting Client, probable network issues or ' + err);
        });
    }
  };

  const onSubmit = (data) => {
    const values = getFormStrings(Client['_id']);

    if (user.employeeData) {
      data.facility = user.employeeData[0]._id;
    }

    (data._id ? ClientServ.update(Client['_id'], data) : ClientServ.create(data))
      .then(() => {
        toast(`Client ${values.message}`);

        backClick();
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  };

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
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row, _event) => {
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                show: 'details',
                selectedBillClient: row,
              },
            }));
          }}
          items={newClients}
          handleSearch={handleSearch}
          progressPending={pending}
        />
      )}

      {resource.billClientResource.show === 'create' && (
        <ClientCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}

      {resource.billClientResource.show === 'details' && (
        <ClientDetails
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={() => handleDelete()}
        />
      )}
      {resource.billClientResource.show === 'edit' && (
        <ClientModify
          row={resource.billClientResource.selectedBillClient}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              billClientResource: {
                ...prevState.billClientResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'details',
              },
            }))
          }
          onSubmit={onSubmit}
          handleDelete={() => handleDelete()}
        />
      )}
    </>
  );
};

export default AppClient;
