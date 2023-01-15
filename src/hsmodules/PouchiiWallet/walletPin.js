import { useState } from 'react';
import Input from '../../components/inputs/basic/Input';
import { Box, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import Button from '../../components/buttons/CustomButton';
import api from '../../utils/api';
export default function WalletPin() {
	const [userPin, setUserPin] = useState('');

	function handleSubmitPin() {
		try {
			let res = api.post(`/pin`, {
				pin: userPin,
			});
			// console.log(res.data);
			toast.success('Pin created successfully');
		} catch (error) {
			// console.log(error);
			toast.error('Pin was unable create');
		}
	}

	return (
		<Box
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				mt: '4rem',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<Box
				sx={{
					height: '60px',
					width: '400px',
					boxShadow: '2',
					borderRadius: '7px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				mb={4}>
				<img
					style={{
						height: '50px',
						width: 'auto',
						display: 'block',
					}}
					src='https://healthstack.africa/wp-content/uploads/2021/10/Healthstack-logo1-300x92.png'
					alt=''
				/>
			</Box>
			<Box
				sx={{
					width: '400px',
					height: '150px',
					boxShadow: '2',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					borderRadius: '7px',
				}}>
				<form
					style={{
						width: '250px',
					}}>
					<Grid
						container
						spacing={1}
						alignItems='center'>
						<Grid
							item
							xs={12}
							mt={4}>
							<Input
								label='Pin'
								value={userPin}
								onChange={(e) => setUserPin(e.target.value)}
								placeholder='Please enter your pin'
							/>
						</Grid>
						<Grid
							item
							xs={12}
							ml={4}>
							<Button
								sx={{ px: '4rem', fontWeight: 'bold' }}
								onClick={handleSubmitPin}>
								Submit
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Box>
	);
}
