import ChatInterface from '../../components/chat/ChatInterface';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Chat() {
	return (
		<Grid
			container
			spacing={2}
			p='3rem'>
			<Grid xs={7}>
				<List sx={{ width: '100%' }}>
					<ListItem alignItems='flex-start'>
						<ListItemAvatar>
							<Avatar
								alt='Remy Sharp'
								// src='/static/images/avatar/1.jpg'
							/>
						</ListItemAvatar>
						<ListItemText
							primary='Dr Sulaimon'
							secondary={
								<>
									<Typography
										sx={{ display: 'inline', color: 'gray' }}
										component='span'
										variant='p'
										color='text.primary'>
										I'll be in your neighborhood doing errands this
									</Typography>
								</>
							}
						/>
						<ListItemText>
							<Typography
								sx={{ display: 'inline', color: 'gray' }}
								component='span'
								variant='p'
								color='text.primary'>
								6 minutes
							</Typography>
						</ListItemText>
					</ListItem>
					{/* <Divider
						variant='inset'
						component='li'
					/> */}
					<ListItem alignItems='flex-start'>
						<ListItemAvatar>
							<Avatar
								alt='Remy Sharp'
								// src='/static/images/avatar/1.jpg'
							/>
						</ListItemAvatar>
						<ListItemText
							primary='Dr Musa'
							secondary={
								<>
									<Typography
										sx={{ display: 'inline', color: 'gray' }}
										component='span'
										variant='p'
										color='text.primary'>
										I'll be in your neighborhood doing errands this
									</Typography>
								</>
							}
						/>
						<ListItemText>
							<Typography
								sx={{ display: 'inline', color: 'gray' }}
								component='span'
								variant='p'
								color='text.primary'>
								6 minutes
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem alignItems='flex-start'>
						<ListItemAvatar>
							<Avatar
								alt='Remy Sharp'
								// src='/static/images/avatar/1.jpg'
							/>
						</ListItemAvatar>
						<ListItemText
							primary='Dr Musa'
							secondary={
								<>
									<Typography
										sx={{ display: 'inline', color: 'gray' }}
										component='span'
										variant='p'
										color='text.primary'>
										I'll be in your neighborhood doing errands this
									</Typography>
								</>
							}
						/>
						<ListItemText>
							<Typography
								sx={{ display: 'inline', color: 'gray' }}
								component='span'
								variant='p'
								color='text.primary'>
								6 minutes
							</Typography>
						</ListItemText>
					</ListItem>
					<ListItem alignItems='flex-start'>
						<ListItemAvatar>
							<Avatar
								alt='Remy Sharp'
								// src='/static/images/avatar/1.jpg'
							/>
						</ListItemAvatar>
						<ListItemText
							primary='Dr Musa'
							secondary={
								<>
									<Typography
										sx={{ display: 'inline', color: 'gray' }}
										component='span'
										variant='p'
										color='text.primary'>
										I'll be in your neighborhood doing errands this
									</Typography>
								</>
							}
						/>
						<ListItemText>
							<Typography
								sx={{ display: 'inline', color: 'gray' }}
								component='span'
								variant='p'
								color='text.primary'>
								6 minutes
							</Typography>
						</ListItemText>
					</ListItem>
				</List>
			</Grid>
			<Grid xs={5}>
				<Box>
					<ChatInterface />
				</Box>
			</Grid>
		</Grid>
	);
}
