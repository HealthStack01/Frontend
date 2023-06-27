import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { baseuRL, token } from '../../../utils/api';

const PatientName = id => {
	const data = localStorage.getItem('user');
	const user = JSON.parse(data);
	let relatedfacilities = user.currentEmployee.facilityDetail._id;

	const [client, setClient] = useState([]);

	useEffect(() => {
		axios
			.get(
				`${baseuRL}/client?relatedfacilities.facility=${relatedfacilities}`,
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			)
			.then(response => {
				const singleClient = response.data.data.filter(c => c._id === id.id);

				setClient(singleClient);
			})
			.catch(err => {
				console.log(err);
			});
	}, [id, relatedfacilities]);

	console.log('Single Client', client);
	console.log('ID', id.id);

	return (
		<div>
			{client[0]?.firstname} {client[0]?.lastname}
		</div>
	);
};

export default PatientName;
