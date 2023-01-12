import axios from 'axios';

let token =
	'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIrMjM0ODAzNjY0ODcxMiIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzYwOTc2NjZ9.-0x814pTNLec7X70eL6YjKfqI-Z-3Kla5Wi-L6RPyfBWjtVozhe3MUrbJA-UMQTyHZDRokC3COxCvUxDSj9wxQ';

export default axios.create({
	baseURL: 'https://walletdemo.remita.net/api',
	headers: {
		'Content-type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});
