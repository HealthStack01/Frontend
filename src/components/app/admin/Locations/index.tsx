import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { getFormStrings } from '../../Utils';
import LocationCreate from './LocationCreate';
import LocationDetails from './LocationDetail';
import Locations from './LocationList';
import LocationModify from './LocationModify';

function AppLocations() {
  let LocationServ = client.service('location');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [locations, setLocations] = useState([]);
  let location = resource.locationResource.selectedLocation;

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

  const getLocations = async (text?: string) => {
    LocationServ.find({
      query: {
        name: text && {
          $regex: text,
          $options: 'i',
        },
        facility: user.currentEmployee && user.currentEmployee.facilityDetail._id,
        $limit: 200,
        $sort: {
          createdAt: user.currentEmployee && -1,
          facility: user.stacker && -1,
        },
      },
    })
      .then((res) => {
        setLocations(res.data);
        toast('Location fetched succesfully');
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleSearch = (val) => {
    const field = 'name';
    LocationServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: 'i',
        },
        facility: user.currentEmployee && user.currentEmployee.facilityDetail._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setLocations(res.data);
      })
      .catch((err) => {
        toast('Error updating Location, probable network issues or ' + err);
      });
  };

  const handleDelete = () => {
    LocationServ.remove(location)
      .then((_) => {
        toast('Location deleted successfully');
        backClick();
      })
      .catch((err) => {
        toast(`Error deleting location, probable network issues or ${err}`);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    if (user.employeeData) {
      data.facility = user.employeeData[0].facility;
    }
    (data._id ? LocationServ.update(data._id, data) : LocationServ.create(data))
      .then(() => {
        toast(`Location ${values.message}`);
        backClick();
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
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
      {resource.locationResource.show === 'lists' && (
        <Locations
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                show: 'details',
                selectedLocation: row,
              },
            }));
          }}
          items={locations}
          handleSearch={handleSearch}
        />
      )}
      {resource.locationResource.show === 'create' && (
        <LocationCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
      {resource.locationResource.show === 'details' && (
        <LocationDetails
          row={resource.locationResource.selectedLocation}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={handleDelete}
        />
      )}
      {resource.locationResource.show === 'edit' && (
        <LocationModify
          row={resource.locationResource.selectedLocation}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
                show: 'lists',
              },
            }))
          }
          cancelEditClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              locationResource: {
                ...prevState.locationResource,
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
