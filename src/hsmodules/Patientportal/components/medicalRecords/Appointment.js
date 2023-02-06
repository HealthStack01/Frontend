import React, { useState, useContext, useEffect } from 'react';
import DescriptionIcon from '@mui/icons-material/Description';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	Box,
	Typography,
	CardHeader,
	Collapse,
	Fab,
	Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import PaymentsIcon from '@mui/icons-material/Payments';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import TuneIcon from '@mui/icons-material/Tune';
import { UserContext, ObjectContext } from '../../../../context';
import LocationSearch from '../../../helpers/LocationSearch';
import EmployeeSearch from '../../../helpers/EmployeeSearch';
import { ClientSearch } from '../../../helpers/ClientSearch';
import BasicDateTimePicker from '../../../../components/inputs/DateTime';
import client from '../../../../feathers';
// import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
// import MuiCustomTimePicker from '../../../../components/inputs/Date/MuiTimePicker';
import Textarea from '../../../../components/inputs/basic/Textarea';
import CustomSelect from '../../../../components/inputs/basic/Select';
import ModalBox from '../../../../components/modal';
import Button from '../../../../components/buttons/CustomButton';
import { useForm } from 'react-hook-form';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Appointment({ handleGoBack }) {
	const [appointmentCreateModal, setAppointmentCreateModal] = useState(false);

	const handleAppointmentCreateModal = () => {
		setAppointmentCreateModal(true);
	};

	const handleAppointmentCreateHideModal = () => {
		setAppointmentCreateModal(false);
	};

	return (
		<Stack>
			<AppointmentDetails
				showAppointmentCreate={handleAppointmentCreateModal}
				handleGoBack={handleGoBack}
			/>

			<ModalBox
				width='50%'
				open={appointmentCreateModal}
				onClose={handleAppointmentCreateHideModal}
				header='Book Appointment'>
				<AppointmentCreate />
			</ModalBox>
		</Stack>
	);
}

export function AppointmentDetails({ showAppointmentCreate, handleGoBack }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					px: '3rem',
				}}
				gap={1}
				py={4}>
				<Button onClick={handleGoBack}>
					<ArrowBackIcon />
					Go Back
				</Button>

				<Box>
					<Typography
						variant='h1'
						fontSize='16px'
						fontWeight='bold'
						color='text.secondary'>
						Appointment List
					</Typography>
				</Box>
				{/* <Box>
					<LocationSearch
					// getSearchfacility={getSearchfacility1}
					// clear={success1}
					/>
				</Box> */}
				<Box>
					<Button onClick={showAppointmentCreate}>
						<AddIcon />
						Add New
					</Button>
				</Box>
			</Box>
			<Box
				width='80%'
				m='4rem'>
				<Box
					sx={{
						width: '80%',
						display: 'flex',
						padding: '8px 8px',
						justifyContent: 'space-between',
						boxShadow: 2,
						borderRadius: '7.5px',
						cursor: 'pointer',
					}}
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}>
					<Box
						sx={{
							width: '80px',
							display: 'flex',
							alignItems: 'center',
							borderRight: '1px solid lightgray',
						}}>
						<Typography
							sx={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'gray' }}>
							8:45pm
						</Typography>
					</Box>

					<Box
						sx={{
							width: 'calc(100% - 50px)',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}>
						<CardHeader
							avatar={
								<DescriptionIcon
									fontSize='large'
									sx={{
										backgroundColor: '#FFF9E6',
										color: '#FBD233',
										borderRadius: '50%',
									}}
								/>
							}
							title={
								<Typography
									variant='h1'
									fontSize='16px'
									fontWeight='bold'
									color='text.secondary'>
									Ante-Natal
								</Typography>
							}
							subheader={
								<Typography sx={{ fontSize: '0.85rem', color: 'gray' }}>
									Pregnancy Visit
								</Typography>
							}
						/>
						<IconButton
							size='small'
							sx={{ width: '30px', height: '30px' }}
							color='error'>
							<DeleteIcon fontSize='medium' />
						</IconButton>
					</Box>
				</Box>
				<Collapse
					in={expanded}
					timeout='auto'
					unmountOnExit>
					<Box
						px='2rem'
						py='1rem'>
						<Box pb='1rem'>
							<Typography variant='h6'>Pregnancy Visit</Typography>
						</Box>
						<Box pb='1rem'>
							<Typography>Venue</Typography>
							<Typography color='gray'>Kings Hospital</Typography>
						</Box>
						<Box pb='1rem'>
							<Typography>Time</Typography>
							<Typography color='gray'>08:45am</Typography>
						</Box>
						<Box>
							<Typography>Instructions</Typography>
							<Typography color='gray'>
								Do not exceed 4 doses in any 24 hours. If symptoms persist
								consult your doctor
							</Typography>
						</Box>
					</Box>
				</Collapse>
			</Box>
		</>
	);
}

export function AppointmentCreate() {
	const { state, setState } = useContext(ObjectContext);
	const {
		register,
		handleSubmit,
		setValue,
		control,
		reset,
		formState: { errors },
	} = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [success1, setSuccess1] = useState(false);
	const [success2, setSuccess2] = useState(false);
	const [message, setMessage] = useState('');
	const [clientId, setClientId] = useState();
	const [locationId, setLocationId] = useState();
	const [practionerId, setPractionerId] = useState();
	const [type, setType] = useState();
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const ClientServ = client.service('appointments');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	// const [appointment_reason,setAppointment_reason]= useState()
	const [appointment_status, setAppointment_status] = useState('');
	const [appointment_type, setAppointment_type] = useState('');
	const [billingModal, setBillingModal] = useState(false);

	const [chosen, setChosen] = useState();
	const [chosen1, setChosen1] = useState();
	const [chosen2, setChosen2] = useState();
	const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];
	const Client = state.AppointmentModule.selectedAppointment;

	let appointee; //  =state.ClientModule.selectedClient
	/*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
	const handleChangeType = async (e) => {
		await setAppointment_type(e.target.value);
	};

	const handleChangeStatus = async (e) => {
		await setAppointment_status(e.target.value);
	};

	const handleSelectedClient = async (Client) => {
		// await setSelectedClient(Client)
		const newClientModule = {
			selectedClient: Client,
			show: 'detail',
		};
		await setState((prevstate) => ({
			...prevstate,
			ClientModule: newClientModule,
		}));
	};

	const getSearchfacility = (obj) => {
		setClientId(obj._id);
		setChosen(obj);
		//handleRow(obj)
		if (!obj) {
			//"clear stuff"
			setClientId();
			setChosen();
		}

		/*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
	};
	const getSearchfacility1 = (obj) => {
		setLocationId(obj._id);
		setChosen1(obj);

		if (!obj) {
			//"clear stuff"
			setLocationId();
			setChosen1();
		}
	};
	const getSearchfacility2 = (obj) => {
		setPractionerId(obj._id);
		setChosen2(obj);

		if (!obj) {
			//"clear stuff"
			setPractionerId();
			setChosen2();
		}
	};

	useEffect(() => {
		setCurrentUser(user);
		//console.log(currentUser)
		return () => {};
	}, [user]);

	//check user for facility or get list of facility
	useEffect(() => {
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
		}
	}, []);

	const onSubmit = (data, e) => {
		console.log(data);
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		setState((prevstate) => ({
			...prevstate,
			AppointmentModule: {
				selectedAppointment: {},
				show: 'list',
			},
		}));

		// data.createdby=user._id
		console.log(data);
		if (user.currentEmployee) {
			data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
		}
		data.locationId = locationId; //state.ClinicModule.selectedClinic._id
		data.practitionerId = practionerId;
		data.appointment_type = appointment_type;
		// data.appointment_reason=appointment_reason
		data.appointment_status = appointment_status;
		data.clientId = clientId;
		data.firstname = chosen.firstname;
		data.middlename = chosen.middlename;
		data.lastname = chosen.lastname;
		data.dob = chosen.dob;
		data.gender = chosen.gender;
		data.phone = chosen.phone;
		data.email = chosen.email;
		data.practitioner_name = chosen2.firstname + ' ' + chosen2.lastname;
		data.practitioner_profession = chosen2.profession;
		data.practitioner_department = chosen2.department;
		data.location_name = chosen1.name;
		data.location_type = chosen1.locationType;
		data.actions = [
			{
				action: appointment_status,
				actor: user.currentEmployee._id,
			},
		];
		console.log(data);

		ClientServ.create(data)
			.then((res) => {
				//console.log(JSON.stringify(res))
				setAppointment_type('');
				setAppointment_status('');
				setClientId('');
				setLocationId('');
				/*  setMessage("Created Client successfully") */
				setSuccess(true);
				setSuccess1(true);
				setSuccess2(true);
				toast.success('Appointment created succesfully');
				setSuccess(false);
				setSuccess1(false);
				setSuccess2(false);
				// showBilling()
			})
			.catch((err) => {
				toast.error('Error creating Appointment ' + err);
			});
	};

	useEffect(() => {
		getSearchfacility(state.ClientModule.selectedClient);

		/* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
		return () => {};
	}, [state.ClientModule.selectedClient]);

	return (
		<>
			<Box
				display='flex'
				justifyContent='flex-end'
				mb='1rem'>
				<Button>
					<AddIcon />
					Create
				</Button>
			</Box>
			<Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
						alignItems='center'>
						<Grid
							item
							xs={6}
							// sm={12}
							// md={4}
						>
							<LocationSearch
								getSearchfacility={getSearchfacility1}
								clear={success1}
							/>
						</Grid>
						<Grid
							item
							xs={6}
							// sm={12}
							// md={4}
							// lg={4}
						>
							<BasicDateTimePicker
								label='Date'
								register={register('start_time', { required: true })}
							/>
							{errors.start_time && (
								<span style={{ color: 'red' }}>This field is required</span>
							)}
						</Grid>
						<Grid
							item
							xs={6}>
							<CustomSelect
								label='Choose Appointment Type'
								control={control}
								name='type'
								options={[
									'New',
									'Follow Up',
									'Readmission with 24hrs',
									'Annual Checkup',
									'Walk-in',
								]}
							/>
						</Grid>
						<Grid
							item
							xs={6}>
							<CustomSelect
								label='Appointment Status'
								control={control}
								name='appointment_status'
								options={[
									'Scheduled',
									'Scheduled',
									'Confirmed',
									'Checked In',
									'Vital Taken',
									'With Nurse',
									'With Doctor',
									'No Show',
									'Cancelled',
									'Billed',
								]}
							/>
						</Grid>

						<Grid
							item
							xs={12}>
							<Textarea
								label='Reason for Appointment'
								placeholder='write here....'
								name='appointment_reason'
								{...register('appointment_reason', { required: true })}
							/>
						</Grid>
					</Grid>
				</form>
			</Box>
		</>
	);
}

// export function AppointmentCreate() {
// 	const { register, handleSubmit, watch, errors, control } = useForm();

// 	return (
// 		<Stack>
// 			<Box
// 				display='flex'
// 				justifyContent='flex-end'
// 				gap='1rem'
// 				pb={4}>
// 				<Button>
// 					<BookOnlineIcon
// 						sx={{ marginRight: '5px' }}
// 						fontSize='small'
// 					/>
// 					Request
// 				</Button>
// 				<Button>
// 					<PaymentsIcon
// 						sx={{ marginRight: '5px' }}
// 						fontSize='small'
// 					/>
// 					Make Payment
// 				</Button>
// 			</Box>
// 			<form>
// 				<Stack pb='1rem'>
// 					<MuiCustomDatePicker
// 						label='Date'
// 						name='date'
// 						control={control}
// 						register={register('date', { required: true })}
// 					/>
// 				</Stack>
// 				<Stack pb='1rem'>
// 					<MuiCustomTimePicker
// 						label='Time'
// 						name='time'
// 						control={control}
// 					/>
// 				</Stack>
// 				<Stack>
// 					<Textarea
// 						register={register('Symptoms')}
// 						label='Symptoms'
// 						type='text'
// 						name='symptoms'
// 					/>
// 				</Stack>
// 			</form>
// 		</Stack>
// 	);
// }
