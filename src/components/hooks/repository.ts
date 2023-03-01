import {useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";

import {UserContext} from "../../context";
import client from "../../feathers";
import {Views} from "../../hsmodules/app/Constants";
import {getFormStrings} from "../../hsmodules/app/Utils";
import {DictionaryOf} from "../../types.d";

interface Repository<T> {
  list: T[];
  groupedList: any[];
  find: (_text) => Promise<T[]>;
  get: (_id) => Promise<T>;
  submit: (data: T) => Promise<T>;
  remove: (_id: T) => Promise<T>;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    imageurl: string;
    currentEmployee: {
      facility: string;
      facilityDetail: {_id: string; facilityName: string};
    };
  };
  setFindQuery: (query) => void;
  facility: any;
  location: any;
  setLocation: (_location) => void;
  locationType: any;
  setLocationType: (_location) => void;
}

const useRepository = <T>(
  modelName: string,
  onNavigate?: (view: string) => () => void
): Repository<T> => {
  let Service = client.service(modelName);
  const {user, facility, location, setLocation, locationType, setLocationType} =
    useContext(UserContext);
  const [findQuery, setFindQuery] = useState(null);
  const [list, setList] = useState([]);
  const [groupedList, setGroupedList] = useState([]);

  const remove = (obj): Promise<T> => {
    return Service.remove(obj._id ? obj._id : obj)
      .then(_ => {
        toast(`${modelName} deleted successfully`);
        onNavigate && onNavigate(Views.LIST)();
      })
      .catch(err => {
        toast(
          `'Error deleting ${modelName}, probable network issues or ' + ${err}'`
        );
      });
  };

  const find = async (query?: any): Promise<T[]> => {
    const isString = typeof query === "string";
    const extras = isString ? {} : {...findQuery, ...query};
    const params = {
      query: {
        name: isString && query ? {$regex: query, $options: "i"} : undefined,
        $limit: 200,
        $sort: {
          createdAt: -1,
        },
      },
      ...extras,
    };

    return (
      Service &&
      Service.find(params)
        .then(response => {
          console.debug(
            "received response of model ",
            modelName,
            " with body ",
            {
              params: {...params},
              response,
            }
          );
          setList(response.data);
          //TODO: This is a hack for billclient list table, find a better way
          setGroupedList(response.groupedOrder);
          return response;
        })
        .catch(error => {
          console.error("received error of model ", modelName, " with body ", {
            params: {...params},
            error,
          });
        })
    );
  };

  const spreadSubData = (data): DictionaryOf<string> => {
    let result = {};
    Object.entries(data).map(([key, value]) => {
      // Exceptions
      if (
        typeof value === "object" &&
        !data.documentname && // Documentation
        !data.questions && // questionnaire
        !data.interactions &&
        !data.client && //Orders,and others
        !data.providerConfig && // client
        !data.options && // question
        !data.disease && // case definition
        !data.observations //  case definition
      ) {
        result = {...result, ...value};
      } else {
        result[key] = value;
      }
    });
    return result;
  };

  const submit = dataIn => {
    const data = dataIn.length ? dataIn : spreadSubData(dataIn);
    const values = getFormStrings(data._id);
    console.debug("submitted " + modelName + " data ", JSON.stringify({data}));
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id;
    }
    return (data._id ? Service.update(data._id, data) : Service.create(data))
      .then(data => {
        toast(`${modelName.toUpperCase()} ${values.message}`);
        onNavigate && onNavigate(Views.LIST)();
        return data;
      })
      .catch(err => {
        toast.error(`Error occurred : ${err}`);
      });
  };

  const get = id => {
    return Service.get(id);
  };

  useEffect(() => {
    Service.on("created", find);
    Service.on("updated", find);
    Service.on("patched", find);
    Service.on("removed", find);
    //if (onNavigate) find();
    return () => {
      Service = null;
    };
  }, []);

  useEffect(() => {
    if (findQuery) find();
  }, [findQuery]);

  return {
    list,
    groupedList,
    find,
    setFindQuery,
    remove,
    submit,
    get,
    user,
    facility,
    location,
    setLocation,
    locationType,
    setLocationType,
  };
};

export default useRepository;
