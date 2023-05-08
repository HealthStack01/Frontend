import api from '../../utils/api';
import { useReducer } from 'react';
import Input from '../../components/inputs/basic/Input';
import { Box, Grid } from '@mui/material';
import PaymentsIcon from '@mui/icons-material/Payments';
import { toast } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';

export default function PayWithWallet({ amount }) {
	const [event, updateEvent] = useReducer(
		(prev, next) => {
			return { ...prev, ...next };
		},
		{
			nubanNumber: '',
			amount: amount,
			userPin: '',
			userAccountNumber: '',
			phoneNumber: '',
			description: '',
			traRef: `${new Date().getTime() + Math.trunc(365 * Math.random())}`,
			loading: false,
		},
	);

	// 3679937267
	const handlePayWithWallet = async () => {
		updateEvent(true)
		try {
			let res = await api.post(`/send-money`, {
				accountNumber: event.nubanNumber,
				amount: event.amount,
				pin: event.userPin,
				transRef: event.traRef,
				channel: 'wallettoWallet',
				sourceAccountNumber: event.userAccountNumber,
				phoneNumber: event.phoneNumber,
				narration: event.description,
			});
			updateEvent(false)
			// console.log(res.data);
			toast.success('Payment Successful');
		} catch (error) {
			// console.log(error);
			updateEvent(false)
			toast.error('Payment Failed');
		}
	};
	const pounchiiLogo =
		'https://mywallet.remita.net/static/media/pouchii-ts.e40722f2.svg';

	return (
		<div
			style={{
				width: '100%',
				padding: '0 15px',
			}}>
			<Box sx={{ width: '100px', mx: '6rem', my: '1.5rem' }}>
				<img
					src={pounchiiLogo}
					alt=''
					style={{
						width: '100%',
						height: 'auto',
						display: 'block',
					}}
				/>
			</Box>
			<form>
				<Box
					sx={{
						width: '100%',
					}}
					mb={2}>
					<Grid
						container
						spacing={1}>
						<Grid
							item
							xs={12}
							mb={1}>
							<Input
								value={event.nubanNumber}
								onChange={(e) => updateEvent({ nubanNumber: e.target.value })}
								label='Receiever Wallet Account Number'
							/>
						</Grid>

						<Grid
							item
							xs={12}>
							<Input
								label='Amount'
								value={event.amount}
								onChange={(e) => updateEvent({ amount: e.target.value })}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<Input
								label='Pin'
								value={event.userPin}
								onChange={(e) => updateEvent({ userPin: e.target.value })}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<Input
								label='Sender Wallet Account Number'
								value={event.userAccountNumber}
								onChange={(e) =>
									updateEvent({ userAccountNumber: e.target.value })
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<Input
								label='Phone Number'
								value={event.phoneNumber}
								onChange={(e) => updateEvent({ phoneNumber: e.target.value })}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<Input
								label='Narration'
								value={event.description}
								onChange={(e) => updateEvent({ description: e.target.value })}
							/>
						</Grid>
					</Grid>
				</Box>
				<GlobalCustomButton
					onClick={handlePayWithWallet}
					sx={{
						marginRight: '15px',
					}}
					loading={loading}
				>
					<PaymentsIcon
						sx={{ marginRight: '5px' }}
						fontSize='small'
					/>
					Pay
				</GlobalCustomButton>
			</form>
			<Box></Box>
		</div>
	);
}
