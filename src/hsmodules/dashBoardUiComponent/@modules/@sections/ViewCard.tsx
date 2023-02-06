import { Box, Card, Typography } from '@mui/material';
interface ViewCardProps {
	count: any;
	title: string;
}

const ViewCard: React.FC<ViewCardProps> = ({ title, count = 0 }) => {
	return (
		<Card
			sx={{
				p: 4,
				background: '#f9f9f9',
				boxShadow: '0',
				borderRadius: 4,
				width: { xs: '100%' },
				textAlign: 'center',
				mr: 1,
				mb: { xs: 1 },
				display: 'flex',
				alignItems: 'center',
			}}>
			<Box sx={{ width: '75%' }}>
				<Typography
					variant='h1'
					sx={{ fontWeight: 'bold', fontSize: '15px' }}>
					{count}
				</Typography>
				<Typography>{title}</Typography>
			</Box>
		</Card>
	);
};

export default ViewCard;
