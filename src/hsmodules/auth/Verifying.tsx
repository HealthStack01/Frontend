import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';

import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import client from '../../feathers';
import { createUserSchema } from './schema';

import { Box } from '@mui/material';
import axios from 'axios';
import { Circles } from 'react-loader-spinner';

const Register = () => {
	const ClientServ = client.service('auth-management');
	const baseuRL = 'https://healthstack-backend.herokuapp.com';

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(createUserSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	let navigate = useNavigate();

	useEffect(() => {
		const verifyAccount = async () => {
			let datum = {
				action: 'verifySignupLong',
				value: JSON.parse(localStorage.getItem('verify_id') || ''),
			};

			axios
				.post(`${baseuRL}/authManagement`, datum, {
					headers: { 'Content-Type': 'application/json' },
				})
				.then(response => {
					toast.success(`You has been successfully verified`);
					navigate('/', { replace: true });
				})
				.catch(err => {
					setError(true);
				});
		};

		verifyAccount();
	});

	return (
		<AuthWrapper paragraph='Verifying Account'>
			<Box
				sx={{
					width: '300px',
					textAlign: 'center',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Circles
					height='80'
					width='80'
					color='#000'
					ariaLabel='circles-loading'
					wrapperStyle={{}}
					wrapperClass=''
					visible={true}
				/>
				<p>Verifying your Account</p>
				{error && (
					<Box
						sx={{
							padding: '10px',
							background: 'rgba(0,0,255,0.2)',
							borderRadius: '4px',
						}}>
						Sorry, You are unable to verify this account at the moment{' '}
					</Box>
				)}
			</Box>
		</AuthWrapper>
	);
};

export default Register;
