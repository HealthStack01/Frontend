import * as yup from 'yup';

export const forgotPasswordSchema = yup.object().shape({
	email: yup
		.string()
		.email('Must be a valid email!')
		.required('Email is required!'),
});
export const createUserSchema = yup.object().shape({
	email: yup
		.string()
		.email('Must be a valid email!')
		.required('Email is required!'),
	password: yup.string().required('Password is required!'),
});
export const createPasswordSchema = yup.object().shape({
	password: yup.string().required('Password is required!'),
	confirmPassword: yup
		.string()
		.required('Confirm password is required!')
		.oneOf([yup.ref('password'), null], 'Passwords must match!'),
});
