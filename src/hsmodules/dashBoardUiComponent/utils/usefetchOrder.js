import {useState, useEffect} from "react";

const useFetchOrder = (service, query) => {
  const [data, setData] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const userDetails = localStorage.getItem("user");

  const facilityId = JSON.parse(userDetails).employeeData[0].facility;

  useEffect(() => {
    service
      .find({
        query: {
          ...query,
          destination: facilityId,
          order_category: "Prescription",
          $limit: 1000,
        },
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

export default useFetchOrder;
