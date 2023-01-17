import {
	Stack,
	Typography,
	CardMedia,
	Button,
	ButtonGroup,
	Card,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Box,
	CardContent,
	CardActions,
	Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const removeCart = () => {};

const addToCart = () => {};

export default function Cart({ cart, amount }) {
	return (
		<Stack my='20px'>
			<List
				sx={{
					width: '100%',
					maxWidth: 360,
					bgcolor: 'background.paper',
				}}>
				<ListItem>
					<ListItemAvatar>
						<CardMedia
							component='img'
							width='150px'
							height='60px'
							image={cart?.img}
							alt={cart?.name}
						/>
					</ListItemAvatar>
					<ListItemText
						primary={cart?.name}
						secondary={cart.price}
					/>
					<ButtonGroup size='large'>
						<Button
							aria-label='increase'
							onClick={() => {
								addToCart();
							}}>
							<AddIcon fontSize='small' />
						</Button>
						<Button>{amount}</Button>
						<Button
							aria-label='reduce'
							onClick={() => {
								removeCart();
							}}>
							<RemoveIcon fontSize='small' />
						</Button>
					</ButtonGroup>
				</ListItem>
				<Divider
					variant='inset'
					component='li'
				/>
			</List>
			{/* <Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Stack>
					<CardMedia
						component='img'
						width='150px'
						height='60px'
						image={cart?.img}
						alt={cart?.name}
					/>
				</Stack>
				<CardContent>
					<Stack>
						<Typography
							variant='p'
							fontSize='14px'
							fontWeight='semibold'
							color='text.secondary'>
							{cart?.name}
						</Typography>
					</Stack>
					<Stack>
						<Typography
							variant='p'
							fontSize='16px'
							fontWeight='bold'
							color='text.secondary'>
							{cart?.price}
						</Typography>
					</Stack>
				</CardContent>
				<CardActions>
					<ButtonGroup size='large'>
						<Button
							aria-label='increase'
							onClick={() => {
								addToCart();
							}}>
							<AddIcon fontSize='small' />
						</Button>
						<Button>{amount}</Button>
						<Button
							aria-label='reduce'
							onClick={() => {
								removeCart();
							}}>
							<RemoveIcon fontSize='small' />
						</Button>
					</ButtonGroup>
				</CardActions>
			</Box>
		 */}
		</Stack>
	);
}
