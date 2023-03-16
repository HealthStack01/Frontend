import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import client from '../../../feathers';
import LineChart from '../charts/LineChart';
import PieChart from '../charts/PieChat';
import ManagedCareDashboardCard from './@sections/ManagedCareDashboardCardOne';
import ManagedCareDashboardCardTwo from './@sections/ManagedCareDashboardCardTwo';
import ViewCard from './@sections/ViewCard';

import {
  DashboardContainer,
  DashboardPageWrapper,
  StartCardWapper
} from '../core-ui/styles';
import { userDetails } from '../utils/fetchUserDetails';

const ManagedCareFrontDashboard = () => {
	const [userName, setUserName] = useState('');
	const [facilityName, setFacilityName] = useState('');
	useEffect(() => {
		const { userFullName, facilityFullName } = userDetails();
		setUserName(userFullName);
		setFacilityName(facilityFullName);
	}, []);

	return (
		<DashboardPageWrapper>
			<Box>
				<Box>
					<Typography variant='h2'>
						Hello <span>{userName}</span>👋
					</Typography>
					<Typography variant='body1'>
						Welcome to your Managed Care <span>Dashboard</span>
					</Typography>
				</Box>

				<StartCardWapper>
					<ViewCard
						count={50}
						title='Total Claims'
					/>
					<ViewCard
						count={180}
						title='Total Referrals'
					/>
					<ViewCard
						count={16}
						title='Total Check-in'
					/>
					<ViewCard
						count={12}
						title='No. Of HMO Tariff'
					/>
				</StartCardWapper>

				<DashboardContainer>
					<Box
						sx={{
							display: 'grid',
							width: '100%',
							gridGap: '10px',
							gridTemplateColumns: { lg: 'repeat(3, 1fr)', xs: '1fr' },
						}}>
						<Box
							sx={{
								p: 4,
								background: '#f9f9f9',
								boxShadow: '0',
								borderRadius: 4,
								width: { xs: '100%' },
								textAlign: 'center',
								mr: 1,
								mb: { xs: 1 },
								alignItems: 'center',
							}}>
							<Typography sx={{ fontWeight: 'bold', fontSize: '22px' }}>
								Check-in Overview
							</Typography>
							<Box style={{ marginBottom: '3rem', marginTop: '5rem' }}>
								{/* <CircleChart title="" series={domeArray}/> */}
								<PieChart />
							</Box>
							<Typography sx={{ fontWeight: 'bold' }}>
								300{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Time Btw Check-In/Out
								</span>
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								180{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Pending Check-in
								</span>
							</Typography>
							<Typography sx={{ fontWeight: 'bold' }}>
								20{' '}
								<span style={{ fontWeight: 'normal', fontSize: '0.8rem' }}>
									- Check-in Overdue
								</span>
							</Typography>
						</Box>

						<Box sx={{ width: '100%', pt: 2, pb: 2 }}>
							<LineChart title='Tariff' />
							<Box
								sx={{
									p: 4,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
								}}>
								<ManagedCareDashboardCard
									count={0}
									title='80k'
									hasFilter={true}
									dataSource={''}
									isLoading={false}
								/>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16px',
									}}>
									Referral Overview
								</Typography>
							</Box>
						</Box>
						<Box>
							<Box
								sx={{
									p: 4,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									height: '40vh',
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
									display: 'spacearound',
								}}>
								<Typography
									sx={{
										fontWeight: 'bold',
										fontSize: '22px',
										marginTop: '4rem',
										marginBottom: '1rem',
									}}>
									250
								</Typography>
								<Typography>Beneficiaries</Typography>
							</Box>
							<Box
								sx={{
									p: 4,
									background: '#f9f9f9',
									boxShadow: '0',
									borderRadius: 4,
									width: { xs: '100%' },
									textAlign: 'center',
									mr: 1,
									mb: { xs: 1 },
									alignItems: 'center',
									display: 'spacearound',
								}}>
								<Box style={{ display: 'flex' }}>
									{/* <Typography style={{color: '#0064cc', fontWeight: 'bold', fontSize: '2rem', position: 'relative', left: '8rem', top: '5rem'}}>80k</Typography> */}
									<Box
										style={{
											position: 'relative',
											left: '12rem',
											padding: '0',
										}}>
										<ManagedCareDashboardCardTwo
											count={0}
											title='80k'
											hasFilter={true}
											dataSource={''}
											isLoading={false}
										/>
									</Box>
								</Box>
								<Typography
									style={{
										color: '#444444',
										fontWeight: '700',
										fontSize: '16 px',
									}}>
									Claims Overview
								</Typography>
							</Box>
						</Box>
					</Box>
				</DashboardContainer>
			</Box>
		</DashboardPageWrapper>
	);
};

export default ManagedCareFrontDashboard;
