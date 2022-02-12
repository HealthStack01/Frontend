import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useObjectState, UserContext } from '../../../../context/context';
import client from '../../../../feathers';
import { Views } from '../../Constants';
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
  const {
    bandResource: { show, selectedBand },
  } = resource;

  const goto = (show: string) => (selectedBand?: any) =>
    setResource({
      ...resource,
      bandResource: {
        ...resource.bandResource,
        show,
        selectedBand,
      },
    });

  const getBands = async () => {
    if (!BandServ) return;
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
        .then((res) => {
          setBands(res.data);
        })
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
    BandServ.remove(selectedBand['_id'])
      .then((_) => {
        toast('Band deleted successfully');
        goto(Views.LIST)();
      })
      .catch((err) => {
        toast(`'Error deleting Band, probable network issues or ' + ${err}'`);
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
      toast('Kindly choose band type');
      return;
    }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    (data._id ? BandServ.update(data._id, data) : BandServ.create(data))
      .then(() => {
        goto(Views.LIST)();
        toast(`Band ${values.message}`);
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  };

  useEffect(() => {
    BandServ.on('created', getBands);
    BandServ.on('updated', getBands);
    BandServ.on('patched', getBands);
    BandServ.on('removed', getBands);
    getBands();
    return () => {
      BandServ = null;
    };
  }, []);

  return (
    <>
      {show === Views.LIST && (
        <BandList
          handleCreate={goto(Views.CREATE)}
          onRowClicked={goto(Views.DETAIL)}
          handleSearch={handleSearch}
          items={bands}
        />
      )}
      {show === Views.CREATE && (
        <BandCreate backClick={goto(Views.LIST)} onSubmit={onSubmit} />
      )}
      {show === Views.DETAIL && (
        <BandDetails
          row={selectedBand}
          backClick={goto(Views.LIST)}
          editBtnClicked={() => goto(Views.EDIT)(selectedBand)}
          handleDelete={handleDelete}
        />
      )}
      {resource.bandResource.show === Views.EDIT && (
        <BandModify
          row={selectedBand}
          backClick={goto(Views.LIST)}
          cancelEditClicked={goto(Views.DETAIL)}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
}

export default AppBands;
