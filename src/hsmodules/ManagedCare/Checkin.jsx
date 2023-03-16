/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';

import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import { Button } from '@mui/material';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';

import { Box, Grid } from '@mui/material';

import { MdCancel } from 'react-icons/md';
import OtpInput from 'react-otp-input';

// eslint-disable-next-line
const searchfacility = {};

export default function CheckIn() {
	const { state } = useContext(ObjectContext); //,setState
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	//const [showState,setShowState]=useState() //create|modify|detail
	const [createModal, setCreateModal] = useState(false);
	const [showModal, setShowModal] = useState(0);

	return (
		<section className='section remPadTop'>
			<CheckInList
				openCreateModal={() => setCreateModal(true)}
				setShowModal={() => setShowModal(1)}
			/>
			{showModal === 1 && (
				<ModalBox
					open
					onClose={() => setShowModal(0)}>
					<CheckDetails />
				</ModalBox>
			)}
		</section>
	);
}

export function AppointmentCreate({ showModal, setShowModal }) {
	const { state, setState } = useContext(ObjectContext);
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
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
	const [selectedClient, setSelectedClient] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	// const [appointment_reason,setAppointment_reason]= useState()
	const [appointment_status, setAppointment_status] = useState('');
	const [appointment_type, setAppointment_type] = useState('');
	const [billingModal, setBillingModal] = useState(false);

	const [chosen, setChosen] = useState();
	const [chosen1, setChosen1] = useState();
	const [chosen2, setChosen2] = useState();
	const appClass = ['On-site', 'Teleconsultation', 'Home Visit'];

	let appointee; //  =state.ClientModule.selectedClient
	/*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
	const handleChangeType = async e => {
		await setAppointment_type(e.target.value);
	};

	const handleChangeStatus = async e => {
		await setAppointment_status(e.target.value);
	};

	const getSearchfacility = obj => {
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
	const getSearchfacility1 = obj => {
		setLocationId(obj._id);
		setChosen1(obj);

		if (!obj) {
			//"clear stuff"
			setLocationId();
			setChosen1();
		}
	};
	const getSearchfacility2 = obj => {
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
	});

	const onSubmit = (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		setShowModal(false),
			setState(prevstate => ({
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
			.then(res => {
				//console.log(JSON.stringify(res))
				e.target.reset();
				setAppointment_type('');
				setAppointment_status('');
				setClientId('');
				setLocationId('');
				/*  setMessage("Created Client successfully") */
				setSuccess(true);
				setSuccess1(true);
				setSuccess2(true);
				toast({
					message:
						'Appointment created succesfully, Kindly bill patient if required',
					type: 'is-success',
					dismissible: true,
					pauseOnHover: true,
				});
				setSuccess(false);
				setSuccess1(false);
				setSuccess2(false);
				// showBilling()
			})
			.catch(err => {
				toast({
					message: 'Error creating Appointment ' + err,
					type: 'is-danger',
					dismissible: true,
					pauseOnHover: true,
				});
			});
	};

	useEffect(() => {
		getSearchfacility(state.ClientModule.selectedClient);

		/* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
		return () => {};
	}, [state.ClientModule.selectedClient]);

	/*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */

	return (
		<>
			<div className='card '>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}
							sm={6}>
							<h2>Create Appointment</h2>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}>
							<MdCancel
								onClick={() => {
									setShowModal(false),
										setState(prevstate => ({
											...prevstate,
											AppointmentModule: {
												selectedAppointment: {},
												show: 'list',
											},
										}));
								}}
								style={{
									fontSize: '2rem',
									color: 'crimson',
									cursor: 'pointer',
									float: 'right',
								}}
							/>
						</Grid>
					</Grid>

					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							lg={6}>
							<ClientSearch
								getSearchfacility={getSearchfacility}
								clear={success}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							lg={6}>
							<LocationSearch
								getSearchfacility={getSearchfacility1}
								clear={success1}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							lg={6}>
							<EmployeeSearch
								getSearchfacility={getSearchfacility2}
								clear={success2}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={6}
							lg={6}>
							<div className='field ml-3 '>
								{/* <label className= "mr-2 "> <b>Modules:</b></label> */}
								{appClass.map((c, i) => (
									<label
										className=' is-small'
										key={c}
										style={{ fontSize: '16px', fontWeight: 'bold' }}>
										<input
											type='radio'
											value={c}
											name='appointmentClass'
											{...register('appointmentClass', { required: true })}
											style={{
												border: '1px solid #0364FF',
												transform: 'scale(1.5)',
												color: '#0364FF',
												margin: '.5rem',
											}}
										/>
										{c + ' '}
									</label>
								))}
							</div>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={3}
							lg={3}>
							<div className='field'>
								<input
									name='start_time'
									{...register('start_time', { required: true })}
									type='datetime-local'
									style={{
										border: '1px solid #0364FF',
										padding: '1rem',
										color: ' #979DAC',
									}}
								/>
							</div>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={3}
							lg={3}>
							<select
								name='type'
								value={type}
								onChange={handleChangeType}
								style={{
									border: '1px solid #0364FF',
									padding: '1rem',
									color: ' #979DAC',
								}}>
								<option defaultChecked>Choose Appointment Type </option>
								<option value='New'>New</option>
								<option value='Followup'>Followup</option>
								<option value='Readmission with 24hrs'>
									Readmission with 24hrs
								</option>
								<option value='Annual Checkup'>Annual Checkup</option>
								<option value='Walk in'>Walk-in</option>
							</select>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={3}
							lg={3}>
							<select
								name='appointment_status'
								value={appointment_status}
								onChange={handleChangeStatus}
								style={{
									border: '1px solid #0364FF',
									padding: '1rem',
									color: ' #979DAC',
								}}>
								<option defaultChecked>Appointment Status </option>
								<option value='Scheduled'>Scheduled</option>
								<option value='Confirmed'>Confirmed</option>
								<option value='Checked In'>Checked In</option>
								<option value='Vitals Taken'>Vitals Taken</option>
								<option value='With Nurse'>With Nurse</option>
								<option value='With Doctor'>With Doctor</option>
								<option value='No Show'>No Show</option>
								<option value='Cancelled'>Cancelled</option>
								<option value='Billed'>Billed</option>
							</select>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							lg={12}>
							<textarea
								className='input is-small'
								name='appointment_reason'
								{...register('appointment_reason', { required: true })}
								type='text'
								placeholder='Appointment Reason'
								rows='10'
								cols='50'
								style={{
									border: '1px solid #0364FF',
									padding: '1rem',
									color: ' #979DAC',
									width: '100%',
								}}>
								{' '}
							</textarea>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							xs={12}
							sm={12}
							md={4}
							lg={3}>
							<Button
								type='submit'
								style={{
									backgroundColor: '#0364FF',
									width: '100%',
									cursor: 'pointer',
								}}>
								Save
							</Button>
						</Grid>
						<Grid
							item
							xs={12}
							sm={12}
							md={4}
							lg={3}>
							<Button
								type='button'
								onClick={e => e.target.reset()}
								style={{
									backgroundColor: '#ffffff',
									width: '100%',
									color: '#0364FF',
									border: '1px solid #0364FF',
									cursor: 'pointer',
								}}>
								Clear
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		</>
	);
}

export function CheckInList({ openCreateModal, setShowModal }) {
	// const { register, handleSubmit, watch, errors } = useForm();
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	const ClientServ = client.service('appointments');
	//const navigate=useNavigate()
	// const {user,setUser} = useContext(UserContext)
	const [facilities, setFacilities] = useState([]);
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState(); //
	// eslint-disable-next-line
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const { user, setUser } = useContext(UserContext);
	const [startDate, setStartDate] = useState(new Date());
	const [selectedAppointment, setSelectedAppointment] = useState();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState('list');
	const [checkedin, setCheckedin] = useState(true);

	const handleCreateNew = async () => {
		const newClientModule = {
			selectedAppointment: {},
			show: 'create',
		};
		await setState(prevstate => ({
			...prevstate,
			AppointmentModule: newClientModule,
		}));
		//console.log(state)
		const newClient = {
			selectedClient: {},
			show: 'create',
		};
		await setState(prevstate => ({ ...prevstate, ClientModule: newClient }));
		setShowModal(true);
	};

	const handleRow = async Client => {
		setShowModal(true);
		await setSelectedAppointment(Client);
		const newClientModule = {
			selectedAppointment: Client,
			show: 'detail',
		};
		await setState(prevstate => ({
			...prevstate,
			AppointmentModule: newClientModule,
		}));
		setShowModal(1);
	};
	//console.log(state.employeeLocation)

	const handleSearch = val => {
		const field = 'firstname';
		//  console.log(val)

		let query = {
			$or: [
				{
					firstname: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					lastname: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					middlename: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					phone: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					appointment_type: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					appointment_status: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					appointment_reason: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					location_type: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					location_name: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					practitioner_department: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					practitioner_profession: {
						$regex: val,
						$options: 'i',
					},
				},
				{
					practitioner_name: {
						$regex: val,
						$options: 'i',
					},
				},
			],
			facility: user.currentEmployee.facilityDetail._id, // || "",
			$limit: 20,
			$sort: {
				createdAt: -1,
			},
		};
		if (state.employeeLocation.locationType !== 'Front Desk') {
			query.locationId = state.employeeLocation.locationId;
		}

		ClientServ.find({ query: query })
			.then(res => {
				console.log(res);
				setFacilities(res.data);
				setMessage(' Client  fetched successfully');
				setSuccess(true);
			})
			.catch(err => {
				console.log(err);
				setMessage('Error fetching Client, probable network issues ' + err);
				setError(true);
			});
	};

	const getFacilities = async () => {
		console.log(user);
		if (user.currentEmployee) {
			let stuff = {
				facility: user.currentEmployee.facilityDetail._id,
				// locationId:state.employeeLocation.locationId,
				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			};
			// if (state.employeeLocation.locationType !== "Front Desk") {
			//   stuff.locationId = state.employeeLocation.locationId;
			// }

			const findClient = await ClientServ.find({ query: stuff });

			await setFacilities(findClient.data);
			console.log(findClient.data);
		} else {
			if (user.stacker) {
				const findClient = await ClientServ.find({
					query: {
						$limit: 100,
						$sort: {
							createdAt: -1,
						},
					},
				});

				await setFacilities(findClient.data);
			}
		}
	};

	useEffect(() => {
		if (user) {
			handleCalendarClose();
		} else {
			/* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
		}
		ClientServ.on('created', obj => handleCalendarClose());
		ClientServ.on('updated', obj => handleCalendarClose());
		ClientServ.on('patched', obj => handleCalendarClose());
		ClientServ.on('removed', obj => handleCalendarClose());
		const newClient = {
			selectedClient: {},
			show: 'create',
		};
		setState(prevstate => ({ ...prevstate, ClientModule: newClient }));
		return () => {};
	}, []);
	const handleCalendarClose = async () => {
		let query = {
			start_time: {
				$gt: subDays(startDate, 1),
				$lt: addDays(startDate, 1),
			},
			facility: user.currentEmployee.facilityDetail._id,

			$limit: 100,
			$sort: {
				createdAt: -1,
			},
		};
		// if (state.employeeLocation.locationType !== "Front Desk") {
		//   query.locationId = state.employeeLocation.locationId;
		// }

		const findClient = await ClientServ.find({ query: query });

		await setFacilities(findClient.data);
	};

	const handleDate = async date => {
		setStartDate(date);
	};

	useEffect(() => {
		if (!!startDate) {
			handleCalendarClose();
		} else {
			getFacilities();
		}

		return () => {};
	}, [startDate]);
	//todo: pagination and vertical scroll bar

	const onRowClicked = () => {};

	const mapFacilities = () => {
		let mapped = [];
		facilities.map((facility, i) => {
			mapped.push({
				title: facility?.firstname + ' ' + facility?.lastname,
				start: format(new Date(facility?.start_time), 'yyyy-MM-ddTHH:mm'),
				end: facility?.end_time,
				id: i,
			});
		});
		return mapped;
	};

	const activeStyle = {
		backgroundColor: '#0064CC29',
		border: 'none',
		padding: '0 .8rem',
	};

	const dummyData = [
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'Out patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Filed',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'In patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Expired',
			preauth_requested: '',
			capitation: 'Unfiled',
			fee_for_service: 'Not Required',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'In patient',
			encounter_status: 'Unconfirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Required',
		},

		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'Out patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Filed',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'Out patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Cancelled',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Filed',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'In patient',
			encounter_status: 'Uncorfirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Required',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'Out patient',
			encounter_status: 'Unconfirmed',
			expiration_status: 'Expired',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Filed',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'In patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Cancelled',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Required',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'Out patient',
			encounter_status: 'Unconfirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Required',
		},
		{
			date_of_encounter: '27/10/21',
			patients_name: 'Tejiri Tabor',
			policy_id: '234.75.43.01',
			premium_status: '',
			health_encounter_type: 'In patient',
			encounter_status: 'Confirmed',
			expiration_status: 'Active',
			preauth_requested: '',
			capitation: 'Filed',
			fee_for_service: 'Not Filed',
		},
	];

	const returnCell = status => {
		// if (status === "approved") {
		//   return <span style={{color: "green"}}>{status}</span>;
		// }
		// else if
		switch (status.toLowerCase()) {
			case 'active':
				return <span style={{ color: '#17935C' }}>{status}</span>;

			case 'inactive':
				return <span style={{ color: '#0364FF' }}>{status}</span>;

			default:
				break;
		}
	};

	const CheckInSchema = [
		{
			name: 'Date of Encounter',
			key: 'date_of_encounter',
			description: 'Enter date of encounter',
			selector: row => row.date_of_encounter,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Patients Name',
			key: 'patients_name',
			description: 'Enter patients name',
			selector: row => row.patients_name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Policy ID',
			key: 'policy_id',
			description: 'Enter policy ID',
			selector: row => row.policy_id,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Premium Status',
			key: 'premium_status',
			description: 'Enter premium status',
			selector: row => row.premium_status,
			// cell: (row) => returnCell(row.status),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Health encounter type',
			key: 'health_encounter_type',
			description: 'Enter health encounter type',
			selector: (row, i) => row.health_encounter_type,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Encounter Status',
			key: 'encounter_status',
			description: 'Enter your encounter status',
			selector: (row, i) => row.encounter_status,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Expiration Status',
			key: 'expiration_status',
			description: 'Enter your expiration status',
			selector: (row, i) => row.expiration_status,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'PreAuth Requested',
			key: 'preAuth_requested',
			description: 'Enter your preauth request',
			selector: (row, i) => row.preauth_requested,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Capitation',
			key: 'capitation',
			description: 'Enter capitation',
			selector: (row, i) => row.capitation,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Fee for Service',
			key: 'fee_for_service',
			description: 'Enter fee for the service',
			selector: (row, i) => row.fee_for_service,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

	return (
		<>
			{user ? (
				<>
					<div className='level'>
						<PageWrapper
							style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}>
							<TableMenu>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									{handleSearch && (
										<div className='inner-table'>
											<FilterMenu onSearch={handleSearch} />
										</div>
									)}
									<h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
										{checkedin ? 'Check In' : 'Check Out'}
									</h2>
								</div>

								{/* {handleCreateNew && ( */}
								<Button
									style={{ fontSize: '14px', fontWeight: '600' }}
									label={checkedin ? 'Check Out' : 'Check In'}
									onClick={() => setCheckedin(!checkedin)}
								/>
								{/* )} */}
							</TableMenu>
							<div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
								{checkedin ? (
									<>
										<CustomTable
											title={''}
											columns={CheckInSchema}
											data={dummyData}
											pointerOnHover
											highlightOnHover
											striped
											onRowClicked={handleRow}
											progressPending={loading}
											//conditionalRowStyles={conditionalRowStyles}
										/>
									</>
								) : (
									<>
										<CustomTable
											title={''}
											columns={CheckInSchema}
											data={dummyData}
											pointerOnHover
											highlightOnHover
											striped
											onRowClicked={handleRow}
											progressPending={loading}
											//conditionalRowStyles={conditionalRowStyles}
										/>
									</>
								)}
							</div>
						</PageWrapper>
					</div>
				</>
			) : (
				<div>loading</div>
			)}
		</>
	);
}
export function CheckDetails({ showModal, setShowModal }) {
	//const { register, handleSubmit, watch, setValue } = useForm(); //errors,
	// eslint-disable-next-line
	const navigate = useNavigate();

	const [error, setError] = useState(false); //,
	//const [success, setSuccess] =useState(false)
	// eslint-disable-next-line
	const [message, setMessage] = useState(''); //,
	//const ClientServ=client.service('/Client')
	//const navigate=useNavigate()
	//const {user,setUser} = useContext(UserContext)
	const { state, setState } = useContext(ObjectContext);
	const [selectedClient, setSelectedClient] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	const [enterOTP, setEnterOTP] = useState(false);
	const [otp, setOtp] = useState('');

	const Client = state.AppointmentModule.selectedAppointment;
	//const client=Client
	const handleEdit = async () => {
		const newClientModule = {
			selectedAppointment: Client,
			show: 'modify',
		};
		await setState(prevstate => ({
			...prevstate,
			AppointmentModule: newClientModule,
		}));
		//console.log(state)
	};
	const handleOtp = otp => {
		setOtp(otp);
	};

	return (
		<>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					sm={6}>
					<h2>Client Details</h2>
				</Grid>
				<Grid
					item
					xs={12}
					sm={6}>
					<Grid
						item
						xs={12}
						sm={3}
						md={6}
						sx={{ marginLeft: 'auto' }}>
						<Button
							variant='contained'
							size='small'
							sx={{
								textTransform: 'capitalize',
								width: '100%',
							}}
							onClick={() => setEnterOTP(true)}>
							Enter OTP
						</Button>
					</Grid>
					{/* <MdCancel
            onClick={() => {
              setShowModal(false);
              setState((prevstate) => ({
                ...prevstate,
                AppointmentModule: {
                  selectedAppointment: {},
                  show: 'list',
                },
              }));
            }}
            style={{
              fontSize: '2rem',
              color: 'crimson',
              cursor: 'pointer',
              float: 'right',
            }}
          /> */}
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				mt={1}>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						First Name:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client?.firstname}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Middle Name:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client?.middlename}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Last Name:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client?.lastname}
					</span>
				</Grid>
			</Grid>

			<Grid
				container
				spacing={2}
				mt={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Age:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{/* {formatDistanceToNowStrict(new Date(Client?.dob))} */}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Gender:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.gender}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Phone No:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.phone}
					</span>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				mt={2}
				mb={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Email:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.email}
					</span>
				</Grid>
			</Grid>
			<hr />
			<Grid
				container
				spacing={2}
				mt={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Start Time:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{/* {format(new Date(Client.start_time), 'dd/MM/yyyy HH:mm')} */}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Location:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{/* {`${Client.location_name} (${Client.location_type})`} */}
					</span>
				</Grid>

				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Professional:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{/* {`  ${Client.practitioner_name} (${Client.practitioner_profession})`} */}
					</span>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				mt={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Appointment Status:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.appointment_status}
					</span>
				</Grid>
				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Appointment Class:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.appointmentClass}
					</span>
				</Grid>

				<Grid
					item
					xs={12}
					sm={3}
					md={4}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Appointment Type:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.appointment_type}
					</span>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				mt={2}>
				<Grid
					item
					xs={12}
					sm={3}
					md={12}>
					<span
						style={{
							color: ' #0364FF',
							fontSize: '16px',
							marginRight: '.8rem',
						}}>
						Reason for Appointment:
					</span>
					<span style={{ color: ' #000000', fontSize: '16px' }}>
						{Client.appointment_reason}
					</span>
				</Grid>
			</Grid>
			{enterOTP && (
				<ModalBox
					open
					onClose={() => setEnterOTP(false)}>
					<div style={{ width: '25vw', height: 'auto' }}>
						<ModalHeader text={'Enter OTP'} />
						<OtpInput
							value={otp}
							onChange={handleOtp}
							numInputs={6}
							isInputSecure={true}
							separator={<span style={{ padding: '0 6px' }}></span>}
							inputStyle={{
								width: '100%',
								display: 'block',
								padding: '12px 0',
								margin: '1rem 0',
								border: '1px solid #a6a6a6',
								borderRadius: '3px',
								background: '#f0fbee',
								textAlign: 'center',
							}}
						/>
						<Button
							variant='contained'
							size='small'
							sx={{
								textTransform: 'capitalize',
							}}>
							{' '}
							Verify OTP
						</Button>
					</div>
				</ModalBox>
			)}
		</>
	);
}
