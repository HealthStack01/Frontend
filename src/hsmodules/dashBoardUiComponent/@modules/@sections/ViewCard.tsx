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
				backgroundColor: "#fff",
				boxShadow: "1px 1px 2px 1px rgba(0, 0, 0, 0.3)",
			    borderRadius: "8px",
				width: { xs: '100%' },
				textAlign: 'center',
				mr: 1,
				mt:3,
				mb: { xs: 1 },
				display: 'flex',
				alignItems: 'center',
			}}>
			<Box sx={{ width: '75%' }}>
				<Typography
					variant='h1'
					sx={{ fontWeight: 'bold', fontSize: '19px' }}>
					{count}
				</Typography>
				<Typography variant='h6' sx={{fontSize: '17px' }}>{title}</Typography>
			</Box>
		</Card>
	);
};

export default ViewCard;
