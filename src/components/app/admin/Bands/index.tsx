import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { getFormStrings } from '../../Utils';
import BandCreate from './BandCreate';
import BandDetails from './BandDetail';
import BandList from './BandList';
import BandModify from './BandModify';

function AppBands() {
  let BandServ = client.service('bands');
  const { resource, setResource } = useObjectState();
  const { user } = useContext(UserContext);
  const [bands, setBands] = useState([]);
  let Emp = resource.bandResource.selectedBand;

  const backClick = () => {
    setResource((prevState) => ({
      ...prevState,
      bandResource: {
        ...prevState.bandResource,
        show: 'lists',
      },
    }));
  };

  const getBands = async () => {
    if (user.currentEmployee) {
      BandServ.find({
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
      BandServ.find({
        query: {
          $limit: 200,
          $sort: {
            facility: -1,
          },
        },
      })
        .then((res) => {
          setBands(res.data);
          toast('Bands fetched succesfully');
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const handleDelete = () => {
    const row = Emp;
    // const dleteId = data._id;
    console.log(row);

    BandServ.remove(row)
      .then((res) => {
        //console.log(JSON.stringify(res))

        toast('Channel deleted successfully');
        getBands();
        backClick();
      })
      .catch((err) => {
        toast(
          `'Error deleting Channel, probable network issues or ' + ${err}'`
        );
      });
  };

  const handleSearch = (text) => {
    BandServ.find({
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
        setBands(res.data);
        toast('Band fetched succesfully');
      })
      .catch((err) => {
        toast('Error updating Band, probable network issues or ' + err);
      });
  };

  const onSubmit = (data) => {
    const values = getFormStrings(data._id);
    if (data.bandType === '') {
      alert('Kindly choose band type');
      return;
    }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    (data._id ? BandServ.update(data._id, data) : BandServ.create(data))
      .then(() => {
        toast(`Band ${values.message}`);
        backClick();
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  };

  useEffect(() => {
    if (!BandServ) {
      BandServ = client.service('bands');
      BandServ.on('created', (_) => getBands());
      BandServ.on('updated', (_) => getBands());
      BandServ.on('patched', (_) => getBands());
      BandServ.on('removed', (_) => getBands());
    }
    user && getBands();
    return () => {
      BandServ = null;
    };
  }, [user]);

  return (
    <>
      {resource.bandResource.show === 'lists' && (
        <BandList
          handleCreate={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'create',
              },
            }))
          }
          onRowClicked={(row) => {
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                show: 'details',
                selectedBand: row,
              },
            }));
          }}
          items={bands}
          handleSearch={handleSearch}
        />
      )}
      {resource.bandResource.show === 'create' && (
        <BandCreate
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          onSubmit={onSubmit}
        />
      )}
      {resource.bandResource.show === 'details' && (
        <BandDetails
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'lists',
              },
            }))
          }
          editBtnClicked={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
                show: 'edit',
              },
            }))
          }
          handleDelete={handleDelete}
        />
      )}
      {resource.bandResource.show === 'edit' && (
        <BandModify
          row={resource.bandResource.selectedBand}
          backClick={() =>
            setResource((prevState) => ({
              ...prevState,
              bandResource: {
                ...prevState.bandResource,
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
        />
      )}
    </>
  );
}

export default AppBands;
