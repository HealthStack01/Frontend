import {
	Stack,
	Box,
	Typography,
	Grid,
	CardMedia,
	CardContent,
	Rating,
	CardActions,
	Drawer,
	Paper,
	CardHeader,
	Avatar,
	Button,
	ButtonGroup,
	Badge,
	Card,
} from '@mui/material';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productDetailsData } from './data';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import GButton from '../../../../components/buttons/CustomButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cart from './cart';
import { FormsHeaderText } from '../../../../components/texts';

export const reviewData = [
	{
		img: 'D',
		name: 'Danalle',
		time: '4 hours',
		description:
			'Nexus Pharma’s Gluta-1 Injections are all lyophilized (freeze dried) glutathione.',
	},
	{
		img: 'P',
		name: 'Paella',
		time: '6 hours',
		description:
			'Nexus Pharma’s Gluta-1 Injections are all lyophilized (freeze dried) glutathione.',
	},
];

const StyledGrid = styled(Grid)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));
export default function ProductDetails({ handleGoBack }) {
	const navigate = useNavigate();
	const [products] = useState(productDetailsData);
	const [healthInsuranceModal, setHealthInsuranceModal] = useState(false);
	const [value, setValue] = useState(2);
	const [cart, setCart] = useState([]);
	const [open, setOpen] = useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const drawerWidth = 240;

	// let {id} = useParams();
	const handleHideInsuranceModal = () => {
		setHealthInsuranceModal(false);
	};

	const handleInsuranceModal = () => {
		setHealthInsuranceModal(true);
	};

	function addToCart(product) {
		setCart((items) => {
			const itemInCart = items.find((item) => item.product === product);
			if (itemInCart) {
				return items.map((item) =>
					item.product === product
						? { ...item, quantity: item.quantity + 1 }
						: item,
				);
			} else {
				return [...items, { product, quantity: 1 }];
			}
		});
	}

	function removeCart(removeProduct) {
		setCart((items) => {
			const itemCart = items.find((item) => item === removeProduct.id);
			console.log(itemCart);
			if (itemCart?.quantity == 1) {
				return items.filter((item) => item.id !== removeProduct.id);
			} else {
				return items.map((item) =>
					item.id === removeProduct.id
						? { ...item, quantity: item.quantity - 1 }
						: item,
				);
			}
		});
		console.log(cart);
	}

	const amount = cart?.reduce(
		(calcQuantity, cart, i) => calcQuantity + cart.quantity,
		0,
	);

	const { productId } = useParams();

	const product = products.find((prod) => prod.id == productId);

	return (
		<Box m={4}>
			<Box
				display='flex'
				justifyContent='space-between'
				pb='2rem'>
				<GButton onClick={() => navigate(-1)}>
					<ArrowBackIcon />
					Go Back
				</GButton>
				<Badge
					color='secondary'
					badgeContent={amount}
					onClick={handleDrawerOpen}>
					<ShoppingBagIcon />
				</Badge>
			</Box>
			<Drawer
				sx={{
					width: '450px',
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: '50vh',
					},
				}}
				variant='persistent'
				anchor='right'
				open={open}
				onClick={handleDrawerClose}>
				<FormsHeaderText text='Carts' />

				<Cart
					cart={product}
					amount={amount}
				/>
			</Drawer>
			{/* <td> */}
			<Box
				style={{
					height: '80vh',
					overflowY: 'scroll',
				}}>
				<Grid container>
					<StyledGrid
						item
						md={5}
						xs={12}>
						<CardContent>
							<Paper
								elevation={3}
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									p: '2rem',
								}}>
								<img
									width='60%'
									height='50%'
									alt=''
									src={product?.img}
								/>
							</Paper>
						</CardContent>
					</StyledGrid>
					<Grid
						item
						xs={6}
						md={7}
						sx={{
							paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
							paddingLeft: [
								'2.5rem !important',
								'1.5rem !important',
								'0 !important',
							],
						}}>
						<CardContent>
							<Typography
								variant='h6'
								sx={{ marginBottom: 2 }}
								pt='1rem'>
								{product?.name}
							</Typography>
							<Box
								display='flex'
								alignItems='center'
								gap='1rem'>
								<Rating
									name='simple-controlled'
									value={value}
									onChange={(event, newValue) => {
										setValue(newValue);
									}}
								/>

								<Typography
									variant='p'
									fontSize='16px'
									fontWeight='semibold'
									color='text.secondary'>
									{product?.review} reviews
								</Typography>
							</Box>
							<Stack pt='1rem'>
								<Typography
									variant='p'
									fontSize='16px'
									fontWeight='bold'
									color='text.secondary'>
									Description
								</Typography>
								<Typography
									variant='p'
									width='70%'
									fontSize='14px'
									color='text.secondary'>
									{product?.description}
								</Typography>
							</Stack>
							<Stack>
								<Typography
									variant='p'
									fontSize='16px'
									fontWeight='bold'
									color='text.secondary'>
									Dosage
								</Typography>
								<Typography
									variant='p'
									width='70%'
									fontSize='14px'
									color='text.secondary'>
									{product?.dosage}
								</Typography>
							</Stack>
							<Stack pt='1rem'>
								<Typography
									variant='h1'
									fontSize='18px'
									fontWeight='bold'>
									{product?.price}
								</Typography>
							</Stack>
						</CardContent>

						<CardActions>
							<ButtonGroup size='large'>
								<Button
									aria-label='increase'
									onClick={() => {
										addToCart(product);
									}}>
									<AddIcon fontSize='small' />
								</Button>
								<Button>{amount}</Button>
								<Button
									aria-label='reduce'
									onClick={() => {
										removeCart(product);
									}}>
									<RemoveIcon fontSize='small' />
								</Button>
							</ButtonGroup>
						</CardActions>
						<CardActions className='card-action-dense'>
							<ButtonGroup
								variant='contained'
								fontWeight='bold'
								aria-label='outlined primary button group'>
								<Button
									onClick={() => {
										addToCart(product);
									}}>
									Add To Cart
								</Button>
								<Button>Buy Now</Button>
							</ButtonGroup>
						</CardActions>
					</Grid>
				</Grid>
				<Box pt='2rem'>
					<Typography
						variant='h1'
						fontSize='16px'
						fontWeight='bold'
						color='text.secondary'>
						Reviews
					</Typography>
					<Box
						display='flex'
						gap='1.5rem'
						pb='1rem'>
						{reviewData.map((data, i) => (
							<Card
								sx={{ width: '40%' }}
								key={i}>
								<CardHeader
									avatar={
										<Avatar
											sx={{ bgcolor: 'red' }}
											aria-label='recipe'>
											{data?.img}
										</Avatar>
									}
									action={
										<Typography
											variant='p'
											fontSize='16px'
											fontWeight='normal'
											color='text.secondary'>
											{data?.time} ago
										</Typography>
									}
									title={data?.name}
									subheader={
										<Rating
											name='simple-controlled'
											value={value}
											onChange={(event, newValue) => {
												setValue(newValue);
											}}
										/>
									}
								/>

								<Stack
									width='80%'
									p='1.5rem'>
									<Typography
										variant='p'
										fontSize='14px'
										fontWeight='normal'
										color='text.secondary'>
										{data?.description}
									</Typography>
								</Stack>
							</Card>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
