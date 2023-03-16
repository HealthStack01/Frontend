import { Stack } from '@mui/material';
import React, { useState } from 'react';

interface SwitchProps {
	children: React.ReactNode;
}

const Switch: React.FC<SwitchProps> = ({ children }) => {

	return (
		<Stack
			direction='row'
			alignItems='center'
			sx={{
				p: 0.5,
				px: 0.9,
				background: '#f8f8f8',
				border: '1px solid #0364FF',
				color: 'blue',
				ml: 1,
				borderRadius: '4px',
				marginLeft: '2rem',
			}}
			className='filter-switch'
			spacing={1}>
			{children}
		</Stack>
	);
};

export default Switch;
