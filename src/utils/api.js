import axios from 'axios';

export let token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzU1MTY3NTksImV4cCI6MTY3NTYwMzE1OSwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNjA1NGFlZDgzN2JjNDkwMDE1ZjU2ZmU4IiwianRpIjoiNzVhMzIzYjctZDNjNC00OWZkLWI3NTUtMjI2NTZlYTIwZjI5In0.CGcxJwFwtMHv_ICvzhFnCKFlYopgI0Xi2Gq9zxnnRkg';

export default axios.create({
	baseURL: 'https://walletdemo.remita.net/api',
	headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});

export const baseuRL = 'https://healthstack-backend.herokuapp.com';
