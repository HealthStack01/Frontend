import { Box, Typography, Stack, Grid, CardMedia } from '@mui/material';
import { HealthAndSafety } from '@mui/icons-material';
import Button from '../../../../components/buttons/CustomButton';
import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import BeneficialDetail from '../HealthPlans/BeneficialDetails';

export default function HealthInsurance({ handleGoBack }) {
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState(false);

	return (
		<>
			<Box
				p='1.4rem'
				display='flex'
				justifyContent='space-between'>
				<Button onClick={handleGoBack}>
					<ArrowBackIcon />
					Go Back
				</Button>

				<Button
					text={isActive ? 'Provider' : 'Active Plans'}
					onClick={() => setIsActive(!isActive)}
				/>
			</Box>
			{isActive ? (
				<>
					<Box p='1rem'>
						<Stack
							display='flex'
							flexDirection='column'
							alignItems='center'
							gap='1rem'>
							<HealthAndSafety sx={{ color: '#f4f3ee', fontSize: '450px' }} />
							<Typography color='gray'>
								You dont have any health insurance plan yet
							</Typography>
							<Button
								width='70%'
								onClick={() => navigate('/app/patient-portal/view/hmo')}>
								Get Insurance Now
							</Button>
						</Stack>
					</Box>
				</>
			) : (
				<BeneficialDetail />
			)}
		</>
	);
}
