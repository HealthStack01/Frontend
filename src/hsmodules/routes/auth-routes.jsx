import { lazy, Fragment } from 'react';
import { Route } from 'react-router-dom';

import Login from '../auth';
import OrganizationSignup from '../auth/forms/sign-up/sign-up';
import OrganizationSignupWithType from '../auth/forms/sign-up/sign-up-with-type';
import IndividualSignup from '../auth/IndividualSignup';
import Signup from '../auth/Signup';

const ForgotPassword = lazy(() => import('../auth/ForgotPassword'));
const CreatePassword = lazy(() => import('../auth/CreatePassword'));

const Register = lazy(() => import('../auth/Register'));
const Verifying = lazy(() => import('../auth/Verifying'));

export const authRoutes = [
	{
		path: '/',
		Component: Login,
	},
	{
		path: '/register',
		Component: Register,
	},
	{
		path: '/verify',
		Component: Verifying,
	},
	{
		path: '/signup',
		Component: OrganizationSignup,
	},
	{
		path: '/signup/:type',
		Component: OrganizationSignupWithType,
	},
	{
		path: '/signupindividual',
		Component: IndividualSignup,
	},
	{
		path: '/forgot-password',
		Component: ForgotPassword,
	},
	{
		path: '/create-password',
		Component: CreatePassword,
	},
];
