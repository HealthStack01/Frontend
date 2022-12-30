import {useState, useEffect} from "react";

const useFetch = (service, query) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = localStorage.getItem("user");

  const facilityId = JSON.parse(userDetails).employeeData[0].facility;

  useEffect(() => {
    service
      .find({
        query: {...query, facility: facilityId, $limit: 100000},
      })
      .then(result => {
        // Once both return, update the stat

        setIsPending(false);
        setData(result);
        setError(null);
      })
      .catch(error => {
        setError(error);
      });
    service.on("created", data => {});
  }, [service, facilityId]);

  return {data, isPending, error};
};

export default useFetch;

// import { useState, useEffect } from "react";

// const useFetchTwo = (service, query) => {
//   const [data, setData] = useState({});
//   const [isPending, setIsPending] = useState(true);
//   const [error, setError] = useState(null);

//   const userDetails = localStorage.getItem("user");

//   const facilityId = JSON.parse(userDetails).employeeData[0].facility;
//   useEffect(() => {
//     const check = async () => {
//       (async () => {
//         try {
//           const resp = await service.find({
//             query: { ...query, facility: facilityId, $limit: 100000  },
//           });

//           setIsPending(false);
//           setData(resp);
//           setError(null);
//           return;
//         } catch (error) {
//           console.log(error);
//           setError(error);
//         }
//       })();
//     };
//     check().then((resp) => {});
//     // eslint-disable-next-line
//   }, [service, facilityId]);

//   return { data, isPending, error };
// };

// export default useFetchTwo;
