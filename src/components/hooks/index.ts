import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { UserContext } from '../../context/context';
import client from '../../feathers';
import { Views } from '../app/Constants';
import { getFormStrings } from '../app/Utils';

interface Repository<T> {
  list: T[];
  find: (_text) => Promise<T[]>;
  get: (_id) => Promise<T>;
  submit: (data: T) => Promise<T>;
  remove: (_id: T) => Promise<T>;
}

const useRepository = <T>(
  modelName: string,
  onNavigate?: (view: string) => () => void
): Repository<T> => {
  let Service = client.service(modelName);
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);

  const remove = (obj): Promise<T> => {
    return Service.remove(obj._id)
      .then((_) => {
        toast(`${modelName} deleted successfully`);
        onNavigate && onNavigate(Views.LIST)();
      })
      .catch((err) => {
        toast(
          `'Error deleting ${modelName}, probable network issues or ' + ${err}'`
        );
      });
  };

  const find = async (query?: any): Promise<T[]> => {
    return Service.find({
      query: {
        facility: user.stacker ? -1 : user.currentEmployee.facilityDetail._id,
        name:
          typeof query === 'string'
            ? {
              $regex: query,
              $options: 'i',
            }
            : undefined,
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
      ...query,
    })
      .then((res) => {
        setList(res.data);
        return res;
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const submit = (data) => {
    const values = getFormStrings(data._id);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    return (data._id ? Service.update(data._id, data) : Service.create(data))
      .then(() => {
        onNavigate && onNavigate(Views.LIST)();
        toast(`Band ${values.message}`);
      })
      .catch((err) => {
        toast.error(`Error occurred : ${err}`);
      });
  };

  const get = (id) => {
    return Service.get(id);
  };

  useEffect(() => {
    Service.on('created', find);
    Service.on('updated', find);
    Service.on('patched', find);
    Service.on('removed', find);
    find();
    return () => {
      Service = null;
    };
  }, []);

  return { list, find, remove, submit, get };
};

export default useRepository;
