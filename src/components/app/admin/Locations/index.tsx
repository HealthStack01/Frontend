import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { getFormStrings } from '../../Utils';
import EmployeeCreate from './LocationCreate';
import EmployeeDetails from './LocationDetail';
import Employees from './LocationList';
import EmployeeModify from './LocationModify';

function AppLocations() {
  let LocationServ = client.service('location');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [locations, setLocations] = useState([]);

  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      locationResource: {
        ...prevState.locationResource,
        show: 'lists',
      },
    }));
    getLocations();
  };

  const getLocations = async () => {
    if (user.currentEmployee) {
      LocationServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(() => {})
        .catch((error) => {
          console.error({ error });
        });
    } else if (user.stacker) {
      LocationServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          },
        },
      })
        .then((res) => {
          setLocations(res.data);
          toast('Locations fetched succesfully');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleSearch = (text) => {
    LocationServ.find({
      query: {
        name: {
          $regex: text,
          $options: 'i',
        },
        facility: user?.currentEmployee?.facilityDetail?._id || '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setLocations(res.data);
        toast('Location fetched succesfully');
      })
      .catch((err) => {
        toast('Error updating Location, probable network issues or ' + err);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    if (data.locationType === '') {
      alert('Kindly choose Location type');
      return;
    }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    (data._id ? LocationServ.update(data._id, data) : LocationServ.create(data))
      .then(() => {
        toast(`Location ${values.message}`);
        backClick();
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
        console.log(err);
      });
  };

  useEffect(() => {
    if (!LocationServ) {
      LocationServ = client.service('location');
      LocationServ.on('created', (_) => getLocations());
      LocationServ.on('updated', (_) => getLocations());
      LocationServ.on('patched', (_) => getLocations());
      LocationServ.on('removed', (_) => getLocations());
    }
    user && getLocations();
    return () => {
      LocationServ = null;
    };
  }, [user]);

  return (
    <>
      {resource.employeeResource.show === 'lists' && (
        <Employees
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                show: 'details',
                selectedEmployee: row,
              },
            }));
          }}
          items={locations}
          handleSearch={handleSearch}
        />
      )}
      {resource.employeeResource.show === 'create' && (
        <EmployeeCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
      {resource.employeeResource.show === 'details' && (
        <EmployeeDetails
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'edit',
              },
            }))
          }
        />
      )}
      {resource.employeeResource.show === 'edit' && (
        <EmployeeModify
          row={resource.employeeResource.selectedEmployee}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              employeeResource: {
                ...prevState.employeeResource,
                show: 'details',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default AppLocations;
