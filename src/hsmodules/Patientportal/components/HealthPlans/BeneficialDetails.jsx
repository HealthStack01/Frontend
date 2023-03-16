import { Box, Grid } from '@mui/material';
import { UserContext, ObjectContext } from '../../../../context';
import Input from '../../../../components/inputs/basic/Input/index';
import React, { useState, useContext } from 'react';
import { styled } from '@mui/material/styles';

export default function BeneficialDetail({ setShowModal }) {
	//const { register, handleSubmit, watch, setValue } = useForm(); //errors,

	const [error, setError] = useState(false); //,
	const [finacialInfoModal, setFinacialInfoModal] = useState(false);
	const [billingModal, setBillingModal] = useState(false);
	const [billModal, setBillModal] = useState(false);
	const [appointmentModal, setAppointmentModal] = useState(false);
	const [display, setDisplay] = useState(1);
	// eslint-disable-next-line
	const [message, setMessage] = useState(''); //,
	//const ClientServ=client.service('/Client')
	// const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { state, setState } = useContext(ObjectContext);
	const [imgSrc, setImgSrc] = useState(
		'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
	);
	const [editing, setEditing] = useState(false);
	const onChange = (file) => {
		const reader = new FileReader();
		const { files } = file.target;
		if (files && files.length !== 0) {
			reader.onload = () => setImgSrc(reader.result);
			reader.readAsDataURL(files[0]);
		}
	};

	let Client = state.ClientModule.selectedClient;

	console.log(Client);
	// eslint-disable-next-line
	const client = Client;
	const handleEdit = async () => {
		const newClientModule = {
			selectedClient: Client,
			show: 'modify',
		};
		await setState((prevstate) => ({
			...prevstate,
			ClientModule: newClientModule,
		}));
		//console.log(state)
		setShowModal(3);
	};

	const handleFinancialInfo = () => {
		setFinacialInfoModal(true);
	};
	const handlecloseModal = () => {
		setFinacialInfoModal(false);
	};

	const handlecloseModal1 = () => {
		setBillingModal(false);
	};

	const handlecloseModal2 = () => {
		setAppointmentModal(false);
	};

	const showBilling = () => {
		setBillingModal(true);
		//history.push('/app/finance/billservice')
	};

	const handleSchedule = () => {
		setAppointmentModal(true);
	};
	const handleBill = () => {
		setBillModal(true);
	};
	const handlecloseModal3 = () => {
		setBillModal(false);
	};

	const ImgStyled = styled('img')(({ theme }) => ({
		width: 150,
		height: 150,
		marginRight: theme.spacing(6.25),
		borderRadius: theme.shape.borderRadius,
	}));
	return (
		<>
			<div
				className='card '
				style={{
					height: 'auto',
					overflowY: 'scroll',
					width: '80%',
					marginTop: '2rem',
					marginLeft: '3rem',
				}}>
				<Box sx={{ position: 'relative' }}>
					<ImgStyled
						src={imgSrc}
						alt='Profile Pic'
					/>
				</Box>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						md={4}>
						<Input
							label='First Name'
							value={Client?.firstname}
							disabled
						/>
					</Grid>
					<Grid
						item
						md={4}>
						<Input
							label='Middle Name'
							value={Client?.middlename}
							disabled
						/>
					</Grid>
					<Grid
						item
						md={4}>
						<Input
							label='Last Name'
							value={Client?.lastname}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Date of Birth'
							value={new Date(Client?.dob).toLocaleDateString('en-GB')}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Gender'
							value={Client?.gender}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Marital Status'
							value={Client?.maritalstatus}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Medical Records Number'
							value={Client?.mrn}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Religion'
							value={Client?.religion}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Profession'
							value={Client?.profession}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Phone Number'
							value={Client?.phone}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Email'
							value={Client?.email}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Address'
							value={Client?.address}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Town/City'
							value={Client?.city}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='LGA'
							value={Client?.lga}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='State'
							value={Client?.state}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Country'
							value={Client?.country}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Blood Group'
							value={Client?.bloodgroup}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Genotype'
							value={Client?.genotype}
							disable
							d
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Disabilities'
							value={Client?.disabilities}
							disable
							d
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Allergies'
							value={Client?.allergies}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Tags'
							value={Client?.clientTags}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Specific Details'
							value={Client?.specificDetails}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Next of Kin Name'
							value={Client?.nok_name}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Next of Kin Phone'
							value={Client?.nok_phoneno}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='Next of Kin Email'
							value={Client?.nok_email}
							disabled
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}
						md={4}>
						<Input
							label='NOK Relationship'
							value={Client?.nok_relationship}
							disabled
						/>
					</Grid>
				</Grid>
			</div>
		</>
	);
}
