import useFetch from "../usefetch";

export const TotalNumberOfData = (service) => {
  const query = {
    $sort: { createdAt: -1 },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalValue = Number(data.total);
  let err = error;
  return {
    totalValue,
    isPending,
    err,
  };
};

export const TotalUpcomingAppointment = (service) => {
  const query = {
    $sort: { createdAt: -1 },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalValue = Number(data.total);
  let err = error;
  return {
    totalValue,
    isPending,
    err,
  };
};

export const TotalNewClientWithinAMonth = (service) => {
  const DAY_MS = 24 * 60 * 60 * 1000 * 100;

  const query = {
    $sort: { createdAt: -1 },
    createdAt: {
      $gt: new Date().getTime() - DAY_MS,
    },
  };
  const { data, isPending, error } = useFetch(service, query);
  let totalNewClient = Number(data.total);
  let err = error;
  return {
    totalNewClient,
    isPending,
    err,
  };
};
