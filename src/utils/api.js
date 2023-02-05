import axios from 'axios';

export let token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzU2MDg2MjAsImV4cCI6MTY3NTY5NTAyMCwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjA1NGFlZDgzN2JjNDkwMDE1ZjU2ZmU4IiwianRpIjoiZGI2OWM3ODYtMDY1MC00OGZlLTgyNzUtOGVmNDgwOGI1NWQyIn0.9zm1i15id_Tw_vFBUYtse9KucEq6_sT9sTBvPzaqPdw';

export default axios.create({
	baseURL: 'https://walletdemo.remita.net/api',
	headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});

export const baseuRL = 'https://healthstack-backend.herokuapp.com';
