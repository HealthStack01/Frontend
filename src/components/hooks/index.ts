import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { UserContext } from '../../context/context';
import client from '../../feathers';
import { Views } from '../app/Constants';
import { getFormStrings } from '../app/Utils';

const useModelManager = (modelName: string, goto): [any, any, any, any] => {
  let Service = client.service(modelName);
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);

  const handleDelete = (obj) => {
    Service.remove(obj._id)
      .then((_) => {
        toast('Band deleted successfully');
        goto(Views.LIST)();
      })
      .catch((err) => {
        toast(`'Error deleting Band, probable network issues or ' + ${err}'`);
      });
  };

  const getList = async (filter?: any) => {
    console.log('gettinng  again', typeof filter);
    Service.find({
      query: {
        facility: user.stacker ? -1 : user.currentEmployee.facilityDetail._id,
        name: filter && {
          $regex: filter,
          $options: 'i',
        },
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        setList(res.data);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleSubmit = (data) => {
    const values = getFormStrings(data._id);

    if (data.bandType === '') {
      toast('Kindly choose band type');
      return;
    }

    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    (data._id ? Service.update(data._id, data) : Service.create(data))
      .then(() => {
        goto(Views.LIST)();
        toast(`Band ${values.message}`);
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  };

  useEffect(() => {
    Service.on('created', () => getList());
    Service.on('updated', () => getList());
    Service.on('patched', () => getList());
    Service.on('removed', () => getList());
    getList();
    return () => {
      Service = null;
    };
  }, []);

  return [list, getList, handleDelete, handleSubmit];
};

export default useModelManager;
