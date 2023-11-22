import { useState, useEffect } from 'react';

const useFetchTotal = (service, query, isFacilityId) => {
	const [data, setData] = useState({});
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const userDetails = localStorage.getItem('user');

	const facilityId = JSON.parse(userDetails).employeeData[0].facility;
	const queryObj =
		isFacilityId === true
			? {
					...query,
					$limit: 1000,
			  }
			: { ...query, facility: facilityId, $limit: 0 };

	useEffect(() => {
		service
			.find({
				query: queryObj,
			})
			.then((result) => {
				// Once both return, update the stat
				setIsPending(false);
				setData(result);
				setError(null);
			})
			.catch((error) => {
				setError(error);
			})
			.finally(() => {
				setIsPending(false);
			});

		// service.on('created', (data) =>
		// 	setData((currentData) => currentData.concat(data)),
		// );
	}, [service, facilityId]);

	return { data, isPending, error };
};

export default useFetchTotal;
