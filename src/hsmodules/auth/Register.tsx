import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/basic/Input';
import client from '../../feathers';
import { toast, ToastContainer } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from './schema';
import PasswordInput from '../../components/inputs/basic/Password';
import axios from 'axios';

const Register = () => {
	const ClientServ = client.service('auth-management');
	const baseuRL = 'https://healthstack-backend.herokuapp.com';

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({ _id: '' });

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
	const submit = async (data, event) => {
		event.preventDefault();
		setLoading(true);

		axios
			.post(`${baseuRL}/users`, data, {
				headers: { 'Content-Type': 'application/json' },
			})
			.then(response => {
				toast.success(`You have successfully created an account`);
				localStorage.setItem('verify_id', JSON.stringify(response.data._id));
				navigate('/verify', { replace: true });
			})
			.catch(err => {
				toast.error(`Sorry, You are unable to create an account ${err}`);
			});

		setLoading(false);
	};

	return (
		<AuthWrapper paragraph='Forgot your password'>
			<form onSubmit={handleSubmit(submit)}>
				<ToastContainer theme='colored' />

				<Input
					label='Email'
					placeholder='Enter your email address'
					register={register('email')}
					errorText={errors?.email?.message}
				/>
				<PasswordInput register={register('password')} />

				<Button
					type='submit'
					label='Confirm Email'
					fullwidth='true'
					loading={loading}
				/>
				<p>
					Remember your passowrd?
					<Link
						className='nav-link'
						style={{
							padding: '0',
							background: 'transparent',
							color: 'blue',
							marginLeft: '0.6rem',
						}}
						to='/'>
						Login
					</Link>
				</p>
			</form>
		</AuthWrapper>
	);
};

export default Register;
