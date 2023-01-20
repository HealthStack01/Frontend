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
import 'react-datepicker/dist/react-datepicker.css';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import CustomTable from '../../components/customtable';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import { Box, Grid, Typography } from '@mui/material';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
import Input from '../../components/inputs/basic/Input';
import TextArea from '../../components/inputs/basic/Textarea';

// eslint-disable-next-line
const searchfacility = {};

export default function FundsManagement() {
	const [currentView, setCurrentView] = useState('list');
	const [createModal, setCreateModal] = useState(false);

	const handleCreateModal = () => {
		setCreateModal(true);
	};

	const handleHideCreateModal = () => {
		setCreateModal(false);
	};

	return (
		<section className='section remPadTop'>
			{currentView === 'list' && (
				<FundsManagementList
					showTransactions={() => setCurrentView('transactions')}
					showCreateModal={handleCreateModal}
				/>
			)}
			{currentView === 'transactions' && (
				<FundsManagementDetails handleGoBack={() => setCurrentView('list')} />
			)}

			<ModalBox
				width='50%'
				overflow='hidden'
				open={createModal}
				onClose={handleHideCreateModal}
				header='Create Fund Management'>
				<FundsManagementCreate />
			</ModalBox>
		</section>
	);
}

export function FundsManagementCreate({ showModal, setShowModal }) {
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
	const [accountType, setAccountType] = useState();

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
	});

	const onSubmit = (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		setShowModal(false),
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
			.catch((err) => {
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
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					<GlobalCustomButton>
						<AddCircleOutline
							sx={{ marginRight: '5px' }}
							fontSize='small'
						/>
						Create
					</GlobalCustomButton>
				</Box>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						md={6}>
						<Input label='Account Name' />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input label='Bank Name' />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input label='Account Type' />
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input label='Current Balance' />
					</Grid>
					<Grid
						item
						xs={12}>
						<TextArea label='Description' />
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export function FundsManagementList({ showTransactions, showCreateModal }) {
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

	const handleCreateNew = async () => {
		showCreateModal();
	};
	// 	const newClientModule = {
	// 		selectedAppointment: {},
	// 		show: 'create',
	// 	};
	// 	await setState((prevstate) => ({
	// 		...prevstate,
	// 		AppointmentModule: newClientModule,
	// 	}));
	// 	//console.log(state)
	// 	const newClient = {
	// 		selectedClient: {},
	// 		show: 'create',
	// 	};
	// 	await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
	// 	setShowModal(1);
	// };

	const handleRow = async (Client) => {
		await setSelectedAppointment(Client);
		const newClientModule = {
			selectedAppointment: Client,
			show: 'detail',
		};
		await setState((prevstate) => ({
			...prevstate,
			AppointmentModule: newClientModule,
		}));
		showTransactions();
	};
	//console.log(state.employeeLocation)

	const handleSearch = (val) => {
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
			.then((res) => {
				console.log(res);
				setFacilities(res.data);
				setMessage(' Client  fetched successfully');
				setSuccess(true);
			})
			.catch((err) => {
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
		ClientServ.on('created', (obj) => handleCalendarClose());
		ClientServ.on('updated', (obj) => handleCalendarClose());
		ClientServ.on('patched', (obj) => handleCalendarClose());
		ClientServ.on('removed', (obj) => handleCalendarClose());
		const newClient = {
			selectedClient: {},
			show: 'create',
		};
		setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
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

	const handleDate = async (date) => {
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
			s_n: 'S/N',
			accountname: 'Amodu Kehinde',
			bankname: 'First Bank',
			fundtype: 'Cash',
			currentbalance: '5000000',
			description: 'Because when the stock market fell apart in 2008',
		},
		{
			s_n: 'S/N',
			accountname: 'Olaniyan Suleimon',
			bankname: 'First Bank',
			fundtype: 'Cash',
			currentbalance: '5000000',
			description: 'Because when the stock market fell apart in 2008',
		},
	];

	const FundsManagementSchema = [
		{
			name: 'S/N',
			key: 's_n',
			description: 'Enter s/n',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Account Name',
			key: 'accountname',
			description: 'Enter Account Name',
			selector: (row) => row.accountname,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Bank Name',
			key: 'bankname',
			description: 'Enter Bank Name',
			selector: (row) => row.bankname,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Account Type',
			key: 'fundtype',
			description: 'Enter Account Type',
			selector: (row) => row.fundtype,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Current Balance',
			key: 'currentbalance',
			description: 'Enter Current Balance',
			selector: (row) => row.currentbalance,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Description',
			key: 'description',
			description: 'Enter Description',
			selector: (row) => row.description,
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
										Fund Management
									</h2>
								</div>

								{handleCreateNew && (
									<GlobalCustomButton onClick={handleCreateNew}>
										<AddCircleOutline
											sx={{ marginRight: '5px' }}
											fontSize='small'
										/>
										Add New
									</GlobalCustomButton>
								)}
							</TableMenu>
							<div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
								{value === 'list' ? (
									<CustomTable
										title={''}
										columns={FundsManagementSchema}
										data={dummyData}
										pointerOnHover
										highlightOnHover
										striped
										onRowClicked={handleRow}
										progressPending={loading}
										//conditionalRowStyles={conditionalRowStyles}
									/>
								) : (
									<CalendarGrid appointments={mapFacilities()} />
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

export function FundsManagementDetails({ handleGoBack, isModal }) {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px solid #f8f8f8',
					backgroundColor: '#f8f8f8',
				}}
				p={2}>
				<GlobalCustomButton onClick={handleGoBack}>
					<ArrowBackIcon
						fontSize='small'
						sx={{ marginRight: '5px' }}
					/>
					Back
				</GlobalCustomButton>

				<Typography
					sx={{
						textTransform: 'capitalize',
						fontWeight: '700',
						color: '#0364FF',
						textAlign: 'center',
					}}>
					Transaction History for Amodu Kehinde
				</Typography>
			</Box>

			<Box
				container
				sx={{
					width: '100%',
					height: '100%',
					px: '2rem',
				}}>
				<Grid
					container
					spacing={1}>
					<Grid
						item
						sx={12}
						sm={12}
						md={5}
						lg={5}>
						<CreditTransactions isModal={isModal} />
					</Grid>

					<Grid
						item
						sx={12}
						sm={12}
						md={7}
						lg={7}>
						<DebitTransactions isModal={isModal} />
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export const CreditTransactions = ({ isModal }) => {
	// eslint-disable-next-line
	const [facility, setFacility] = useState([]);
	const InventoryServ = client.service('subwallettransactions');
	const SubwalletServ = client.service('subwallet');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [balance, setBalance] = useState(0);

	const [accountType, setAccountType] = useState('credit');

	const clientSel = state.SelectedClient.client;
	const getSearchfacility = (obj) => {};

	useEffect(() => {
		setCurrentUser(user);
		////console.log(currentUser)
		return () => {};
	}, [user]);

	useEffect(() => {
		getaccountdetails();
		getBalance();
		return () => {};
	}, [clientSel]);

	const getaccountdetails = () => {
		InventoryServ.find({
			query: {
				facility: user.currentEmployee.facilityDetail._id,
				//IF SELECTED CLIENT IS FROM COLLECTIONS, CLIENT ID IS STORE IN client key but if Selected Client is from client, use the _id key
				client: clientSel.client || clientSel._id,

				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				setFacility(res.data);
			})
			.catch((err) => {
				toast('Error getting account details ' + err);
			});
	};

	const getBalance = async () => {
		const findProductEntry = await SubwalletServ.find({
			query: {
				client: clientSel.client || clientSel._id,
				organization: user.currentEmployee.facilityDetail._id,

				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			},
		});

		if (findProductEntry.data.length > 0) {
			await setBalance(findProductEntry.data[0].amount);
		} else {
			await setBalance(0);
		}
	};

	const creditData = [
		{
			date: '15-03-2022',
			amount: '5000',
			paymentmode: 'Cash',
		},
		{
			date: '15-03-2022',
			amount: '6000',
			paymentmode: 'Wallet',
		},
	];

	const creditSchema = [
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
			name: 'Date & Time',
			key: 'createdAt',
			description: 'Enter Date',
			selector: (row) => row.date,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		// {
		//   name: "Description",
		//   style: {color: "#0364FF", textTransform: "capitalize"},
		//   key: "description",
		//   description: "Enter Date",
		//   selector: row => (row.description ? row.description : "-----------"),
		//   sortable: true,
		//   required: true,
		//   inputType: "DATE",
		// },
		{
			name: 'Amount',
			key: 'amount',
			description: 'Enter Date',
			selector: (row) => row.amount,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Mode',
			key: 'paymentmode',
			description: 'Enter Date',
			selector: (row) => row.paymentmode,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
	];

	const creditTransactions =
		facility && facility.filter((item) => item.category === 'credit');

	const totalCreditAmout =
		creditTransactions &&
		creditTransactions.reduce((n, { amount }) => n + amount, 0);
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				mb={1.5}>
				<FormsHeaderText
					text='Credit Transactions'
					color='#588157'
				/>
				<Box
					style={{
						minWidth: '200px',
						height: '40px',
						border: '1px solid #E5E5E5',
						display: 'flex',
						padding: '0 10px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					gap={1.5}>
					<Typography
						sx={{
							color: '#000000',
							fontSize: '14px',
							lineHeight: '21.86px',
						}}>
						Total Credit Amount:
					</Typography>

					<Typography
						sx={{
							fontWeight: '600',
							fontSize: '20px',
							color: '#386641',
						}}>
						<span>&#8358;</span>
						{totalCreditAmout}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					height: isModal ? 'calc(80vh - 160px)' : 'calc(100vh - 210px)',
					overflowY: 'auto',
				}}>
				<CustomTable
					title={''}
					columns={creditSchema}
					data={creditData}
					pointerOnHover
					highlightOnHover
					striped
					//onRowClicked={handleRow}
					progressPending={false}
				/>
			</Box>
		</Box>
	);
};

export const DebitTransactions = ({ isModal }) => {
	// eslint-disable-next-line
	const [facility, setFacility] = useState([]);
	const InventoryServ = client.service('subwallettransactions');
	const SubwalletServ = client.service('subwallet');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [balance, setBalance] = useState(0);

	const [accountType, setAccountType] = useState('credit');

	const clientSel = state.SelectedClient.client;
	const getSearchfacility = (obj) => {};

	useEffect(() => {
		setCurrentUser(user);
		////console.log(currentUser)
		return () => {};
	}, [user]);

	useEffect(() => {
		getaccountdetails();
		getBalance();
		return () => {};
	}, [clientSel]);

	const getaccountdetails = () => {
		InventoryServ.find({
			query: {
				facility: user.currentEmployee.facilityDetail._id,
				client: clientSel.client || clientSel._id,

				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				setFacility(res.data);
			})
			.catch((err) => {
				toast('Error getting account details ' + err);
			});
	};

	const getBalance = async () => {
		const findProductEntry = await SubwalletServ.find({
			query: {
				client: clientSel.client || clientSel._id,
				organization: user.currentEmployee.facilityDetail._id,

				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			},
		});

		if (findProductEntry.data.length > 0) {
			await setBalance(findProductEntry.data[0].amount);
		} else {
			await setBalance(0);
		}
	};

	const debitData = [
		{
			date: '15-03-2022',
			description: 'Ciprotab',
			amount: '5000',
			paymentmode: 'Cash',
		},
		{
			date: '15-03-2022',
			description: 'Ciprotab',
			amount: '6000',
			paymentmode: 'Wallet',
		},
	];
	const debitColumns = [
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
			name: 'Date & Time',
			key: 'createdAt',
			description: 'Enter Date',
			selector: (row) => row.date,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '120px',
		},
		{
			name: 'Description',
			style: { color: '#0364FF' },
			key: 'description',
			description: 'Enter Date',
			selector: (row) => row.description,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Amount',
			key: 'amount',
			description: 'Enter Date',
			selector: (row) => row.amount,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
			width: '120px',
		},
		{
			name: 'Mode',
			key: 'paymentmode',
			description: 'Enter Date',
			selector: (row) => row.paymentmode,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '120px',
		},
	];

	const debitTransactions =
		facility && facility.filter((item) => item.category === 'debit');

	const totalDebitAmout =
		debitTransactions &&
		debitTransactions.reduce((n, { amount }) => n + amount, 0);

	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				mb={1.5}>
				<FormsHeaderText
					text='Debit Transactions'
					color='#e63946'
				/>
				<Box
					style={{
						minWidth: '200px',
						height: '40px',
						border: '1px solid #E5E5E5',
						display: 'flex',
						padding: '0 10px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					gap={1.5}>
					<Typography
						sx={{
							color: '#000000',
							fontSize: '14px',
							lineHeight: '21.86px',
						}}>
						Total Debit Amount:
					</Typography>

					<Typography
						sx={{
							fontWeight: '600',
							fontSize: '20px',
							color: '#e63946',
						}}>
						<span>&#8358;</span>
						{totalDebitAmout}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					height: isModal ? 'calc(80vh - 160px)' : 'calc(100vh - 210px)',
					overflowY: 'auto',
				}}>
				<CustomTable
					title={''}
					columns={debitColumns}
					data={debitData}
					pointerOnHover
					highlightOnHover
					striped
					//onRowClicked={handleRow}
					progressPending={false}
				/>
			</Box>
		</Box>
	);
};
