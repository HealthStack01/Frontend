import { Box, Typography, Grid, Avatar } from '@mui/material';
import CustomTable from '../../../components/customtable';

export const ProviderPrintout = ({ data, action }) => {
	const beneschema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'SN',
			selector: (row) => row.sn,
			sortable: true,
			inputType: 'HIDDEN',
			width: '50px',
		},
		{
			name: 'Beneficiary Name',
			key: 'beneficiaryname',
			description: 'Beneficiary Name',
			selector: (row) => row?.name,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Policy Number',
			key: 'policynumber',
			description: 'Policy Number',
			selector: (row) => row?.policyId,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Plan Type',
			key: 'plantype',
			description: 'Plan Type',
			selector: (row) => row?.planType,
			sortable: true,
			inputType: 'HIDDEN',
		},
	];
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					md={6}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						{/* Comapany Logo */}
						<Avatar
							sx={{ marginTop: '5px', marginRight: '10px' }}
							alt=''
						/>
						<h1>HCI</h1>
					</Box>
				</Grid>
				{/* Address */}
				<Grid
					item
					xs={12}
					md={6}
					style={{ textAlign: 'right' }}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						HCI Healthcare Limited
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						269, Herbert Macaulay Way,
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Sabo, Yaba, Lagos.
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						0806 000 0000
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						inf0@healthcare.ng.com
					</Typography>
				</Grid>
			</Grid>
			{/* ***********************************Principal******************************************************* */}
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					md={6}>
					{/* date */}
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						November 12, 2020
					</Typography>
					{/* Principal Name */}
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Principal name
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Dear Sir/Ma,
					</Typography>
				</Grid>
			</Grid>
			{/* ***********************************Document Title******************************************************* */}
			<Box>
				<Typography
					sx={{
						fontSize: '1.2rem',
						color: '#000000',
						textDecoration: 'underline',
						margin: '1rem 0px',
						textAlign: 'center',
						fontWeight: 'bold',
					}}>
					HCI HEALTHCARE LIMITED POLICY DOCUMENT
				</Typography>
			</Box>
			{/* ***********************************Document Body******************************************************* */}
			<Box>
				<Typography
					sx={{ fontSize: '1rem', color: '#000000', marginBottom: '.5rem' }}>
					Kindly find enclosed, {`HCI Healthcare Limited `}Policy Details for
					the following beneficiaries registered on our scheme.
				</Typography>
				<CustomTable
					title={''}
					columns={beneschema}
					data={[
						{
							name: 'Mike Test',
							policyId: '152E918643',
							planType: 'Silver Ultra',
						},
					]}
					pointerOnHover
					highlightOnHover
					striped
					onRowClicked={() => {}}
				/>
				<Box my={2}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						<b> Start Date :</b> 01/01/2021 <br />
						<b> End Date :</b> 31/12/2021 <br />
						<b>Care Provider :</b> HCI Healthcare Limited
					</Typography>
				</Box>

				<Typography
					sx={{ fontSize: '1rem', color: '#000000', fontWeight: 'bold' }}>
					Should you require further clarification, kindly contact us on the
					following numbers {`0900000000`}.
				</Typography>
				<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
					Thank you.
				</Typography>
				<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
					Yours faithfully,
				</Typography>
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between' }}
					my={2}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						<b>{`Kehinde Test`}</b> <br />
						{`Lead, Fulfillment`}
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						<b>{`Funbi Test`}</b> <br />
						{`Client Service Manager`}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};
