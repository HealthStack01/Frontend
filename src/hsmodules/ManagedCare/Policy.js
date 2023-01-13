import { yupResolver } from '@hookform/resolvers/yup';
import { FileUpload } from '@mui/icons-material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import SaveIcon from '@mui/icons-material/Save';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import {
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	Typography,
} from '@mui/material';
import axios from 'axios';
import moment from 'moment';
import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; //Route, Switch,Link, NavLink,
import { toast, ToastContainer } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import CustomTable from '../../components/customtable';
import Input from '../../components/inputs/basic/Input/index';
import CustomSelect from '../../components/inputs/basic/Select';
import BasicDatePicker from '../../components/inputs/Date';
import MuiClearDatePicker from '../../components/inputs/Date/MuiClearDatePicker';
import MuiCustomDatePicker from '../../components/inputs/Date/MuiDatePicker';
import ModalBox from '../../components/modal/';
import { FormsHeaderText } from '../../components/texts';
import FilterMenu from '../../components/utilities/FilterMenu';
import { ObjectContext, UserContext } from '../../context';
import client from '../../feathers';
import { TableMenu } from '../../ui/styled/global';
import { PageWrapper } from '../../ui/styled/styles';
import { HeadWrapper } from '../app/styles';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import ClientGroup from '../Client/ClientGroup';
import { createClientSchema2 } from '../Client/schema';
import { FileUploader } from 'react-drag-drop-files';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import {
	HmoFacilitySearch,
	OrgFacilitySearch,
	SponsorSearch,
} from '../helpers/FacilitySearch';
import { getBase64 } from '../helpers/getBase64';
import Claims from './Claims';
import PremiumPayment from './Premium';
import Provider, { OrganizationCreate } from './Providers';
import {
	EnrolleSchema,
	EnrolleSchema2,
	EnrolleSchema3,
	EnrolleSchema4,
	EnrolleSchema5,
	principalData,
} from './schema';

var random = require('random-string-generator');
// eslint-disable-next-line
const searchfacility = {};

export default function Policy({ standAlone }) {
	const { state } = useContext(ObjectContext); //,setState
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState();
	const [showModal, setShowModal] = useState(0);
	const [showModal2, setShowModal2] = useState(false);
	const [loading, setLoading] = useState(false);
	return (
		<section className='section remPadTop'>
			{standAlone
				? showModal === 0 && (
						<PolicyList
							showModal={showModal}
							setShowModal={setShowModal}
							standAlone={standAlone}
						/>
				  )
				: showModal === 0 && (
						<PolicyList
							showModal={showModal}
							setShowModal={setShowModal}
						/>
				  )}
			{showModal === 1 && (
				<PolicyCreate
					showModal={showModal}
					setShowModal={setShowModal}
					setOpenCreate={setShowModal2}
				/>
			)}
			{showModal2 && (
				<ModalBox
					open={showModal2}
					onClose={() => {
						setShowModal(1);
						setShowModal2(false);
					}}>
					<ClientCreate />
				</ModalBox>
			)}
			{showModal === 2 && <PolicyDetail setShowModal={setShowModal} />}
		</section>
	);
}

export function PolicyList({ showModal, setShowModal, standAlone }) {
	// const { register, handleSubmit, watch, errors } = useForm();
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	const ClientServ = client.service('policy');
	//const navigate=useNavigate()
	// const {user,setUser} = useContext(UserContext)
	const [facilities, setFacilities] = useState([]);
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState(); //
	// eslint-disable-next-line
	const { state, setState } = useContext(ObjectContext);
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line
	const { user, setUser } = useContext(UserContext);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(50);
	const [total, setTotal] = useState(0);
	const [display, setDisplay] = useState('approve');

	const handleCreateNew = async () => {
		const newClientModule = {
			selectedClient: {},
			show: 'create',
		};
		await setState((prevstate) => ({
			...prevstate,
			ManagedCareModule: newClientModule,
		}));
		//console.log(state)
		setShowModal(1);
		console.log('test');
	};

	const handleRow = async (Client) => {
		await setSelectedClient(Client);
		const newClientModule = {
			selectedClient: Client,
			show: 'detail',
		};
		await setState((prevstate) => ({
			...prevstate,
			ManagedCareModule: newClientModule,
		}));
		setShowModal(2);
	};

	const handleSearch = (val) => {
		// eslint-disable-next-line
		const field = 'firstname';
		console.log(val);
		ClientServ.find({
			query: {
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
						clientTags: {
							$regex: val,
							$options: 'i',
						},
					},
					{
						mrn: {
							$regex: val,
							$options: 'i',
						},
					},
					{
						email: {
							$regex: val,
							$options: 'i',
						},
					},
					{
						specificDetails: {
							$regex: val,
							$options: 'i',
						},
					},
					{ gender: val },
				],

				organizationId: user.currentEmployee.facilityDetail._id, // || "",
				$limit: limit,
				$sort: {
					createdAt: -1,
				},
			},
		})
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
		if (user.currentEmployee) {
			// const findClient= await ClientServ.find()
			const findClient = await ClientServ.find({
				query: {
					organizationId: user.currentEmployee.facilityDetail._id,
					$sort: {
						createdAt: -1,
					},
				},
			});
			/*  if (page===0){ */
			await setFacilities(findClient.data);
			console.log(findClient.data);
			/* }else{
             await setFacilities(prevstate=>prevstate.concat(findClient.data))
         } */

			await setTotal(findClient.total);
			//console.log(user.currentEmployee.facilityDetail._id, state)
			//console.log(facilities)
			setPage((page) => page + 1);
		} else {
			if (user.stacker) {
				const findClient = await ClientServ.find({
					query: {
						$limit: 20,
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
			//getFacilities()
			rest();
		} else {
			/* const localUser= localStorage.getItem("user")
                     const user1=JSON.parse(localUser)
                     console.log(localUser)
                     console.log(user1)
                     fetchUser(user1)
                     console.log(user)
                     getFacilities(user) */
		}
		ClientServ.on('created', (obj) => rest());
		ClientServ.on('updated', (obj) => rest());
		ClientServ.on('patched', (obj) => rest());
		ClientServ.on('removed', (obj) => rest());
		return () => {};
		// eslint-disable-next-line
	}, []);
	const rest = async () => {
		// console.log("starting rest")
		// await setRestful(true)
		await setPage(0);
		//await  setLimit(2)
		await setTotal(0);
		await setFacilities([]);
		await getFacilities();
		//await  setPage(0)
		//  await setRestful(false)
	};

	useEffect(() => {
		//console.log(facilities)
		return () => {};
	}, [facilities]);
	//todo: pagination and vertical scroll bar
	const PolicySchema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'SN',
			selector: (row, i) => i + 1,
			sortable: true,
			inputType: 'HIDDEN',
			width: '80px',
		},
		{
			name: 'Date Created',
			key: 'createdAt',
			description: 'Date Created',
			selector: (row) => moment(row.createdAt).format('YYYY-MM-DD'),
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Sponsorship Type',
			key: 'sponsorshipType',
			description: 'Sponsorship Type',
			selector: (row) => row.sponsorshipType,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Plan',
			key: 'plan',
			description: 'Plan',
			selector: (row) => row.plan.name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Premium',
			key: 'premium',
			description: 'Premium',
			selector: (row) => row.premium,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Paid',
			key: 'isPaid',
			description: 'Paid',
			selector: (row) => (row.isPaid ? 'Yes' : 'No'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Active',
			key: 'active',
			description: 'Active',
			selector: (row) => (row.active ? 'Yes' : 'No'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Pricipal Last Name',
			key: 'principal',
			description: 'Principal Last Name',
			selector: (row) => row.principal.lastname,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'First Name',
			key: 'firstname',
			description: 'First Name',
			selector: (row) => row.principal.firstname,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Middle Name',
			key: 'middlename',
			description: 'Middle Name',
			selector: (row) => row.principal.middlename,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Phone',
			key: 'phone',
			description: 'Phone Number',
			selector: (row) => row.principal.phone,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},

		{
			name: 'Email',
			key: 'email',
			description: 'simpa@email.com',
			selector: (row) => row.principal.email,
			sortable: true,
			required: true,
			inputType: 'EMAIL',
		},

		{
			name: 'Tags',
			key: 'tags',
			description: 'Tags',
			selector: (row) => row.principal.clientTags,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

	const approvedFacilities = facilities.filter(
		(facility) => facility.approved === true,
	);
	const pendingFacilities = facilities.filter(
		(facility) => facility.approved === false,
	);

	// const approvedSelectedpol = approvedFacilities.filter(
	//   (item) =>
	//     item?.principal._id === standAlone ||
	//     (item?.dependantBeneficiaries.length > 0 &&
	//       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
	// );
	// const pendingSelectedpol = pendingFacilities.filter(
	//   (item) =>
	//     item?.principal._id === standAlone ||
	//     (item?.dependantBeneficiaries.length > 0 &&
	//       item?.dependantBeneficiaries?.map((item) => item._id === standAlone))
	// );

	// const renderFAcilities = () => {
	//   switch (display) {
	//     case 'approve':
	//       if (standAlone) {
	//         return approvedSelectedpol;
	//       } else {
	//         return approvedFacilities;
	//       }
	//     case 'pending':
	//       if (standAlone) {
	//         return pendingSelectedpol;
	//       } else {
	//         return pendingFacilities;
	//       }
	//     default:
	//       return [];
	//   }
	// };

	console.log(user, 'ID', standAlone);
	return (
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
							<h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
								List of {display === 'approve' ? 'Approved' : 'Pending'}{' '}
								Policies
							</h2>
						</div>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-end',
							}}>
							<GlobalCustomButton
								text={
									display === 'approve'
										? 'Pending Policies'
										: 'Approved Policies'
								}
								onClick={() =>
									setDisplay(display === 'approve' ? 'pending' : 'approve')
								}
								customStyles={{
									marginRight: '10px',
								}}
								color={display === 'approve' ? 'warning' : 'success'}
							/>

							{!standAlone && (
								<Button
									style={{
										fontSize: '14px',
										fontWeight: '600',
									}}
									color='primary'
									variant='contained'
									size='small'
									sx={{ textTransform: 'capitalize' }}
									onClick={handleCreateNew}
									showicon={true}>
									{' '}
									Add New
								</Button>
							)}
						</Box>
					</TableMenu>
					<div
						className='level'
						style={{
							height: '80vh',
							overflowY: 'scroll',
						}}>
						<CustomTable
							title={''}
							columns={PolicySchema}
							data={
								display === 'approve' ? approvedFacilities : pendingFacilities
							}
							pointerOnHover
							highlightOnHover
							striped
							onRowClicked={handleRow}
							progressPending={loading}
							CustomEmptyData={
								display === 'approve'
									? 'No Approved Policies'
									: 'No Pending Policies'
							}
						/>
					</div>
				</PageWrapper>
			</div>
		</>
	);
}

export function PolicyCreate({ showModal, setShowModal, setOpenCreate }) {
	const { register, handleSubmit, setValue, getValues, reset, control } =
		useForm();
	const { state, setState } = useContext(ObjectContext);
	const { user } = useContext(UserContext);
	const [clientModal, setClientModal] = useState(false);
	const [dependant, setDependant] = useState(false);
	const [selectedClient, setSelectedClient] = useState();
	//const [productItem,setProductItem] = useState([])
	const productItem = useRef([]);
	const [showCorp, setShowCorp] = useState(false);
	const [message, setMessage] = useState('');
	const [benefittingPlans1, setBenefittingPlans1] = useState([]);
	const [price, setPrice] = useState('');
	const [chosenPlan, setChosenPlan] = useState();
	const [success, setSuccess] = useState(false);
	const [chosen, setChosen] = useState([]);
	const [planHMO, setPlanHMO] = useState('');
	const [error, setError] = useState(false);
	//const [documentNo,setDocumentNo] = useState("")
	const documentNo = useRef();
	//const [date,setDate] = useState()
	const date = useRef();
	//const [patient, setPatient] =useState("")
	const patient = useRef();
	//const [productEntry,setProductEntry]=useState()
	const productEntry = useRef();
	//const [type,setType] = useState("Bill")
	const type = useRef('Bill');
	const ServicesServ = client.service('billing');
	const policyServ = client.service('policy');
	const BillCreateServ = client.service('createbilldirect');
	const orgServ = client.service('organizationclient');
	const [facilities, setFacilities] = useState([]);
	const [paymentOptions, setPaymentOptions] = useState([]);
	const [billMode, setBillMode] = useState('');
	const [obj, setObj] = useState('');
	const [paymentmode, setPaymentMode] = useState('');
	const [loading, setLoading] = useState(false);
	const [createOrg, setCreateOrg] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState();
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [hmo, setHmo] = useState({});

	const getSearchfacility = async (obj) => {
		if (
			// check if obj is an object
			obj && // check if obj is not null
			Object.keys(obj).length > 0 && // check if obj is not empty
			obj.constructor === Object &&
			// check if the obj is already present in the array
			!chosen.some((el) => el._id === obj._id)
		) {
			await setChosen([...chosen, obj]);
			await console.log('OBJ', chosen);
		}
	};

	const getSearchfacility1 = (obj) => {
		setPlanHMO(obj);
		if (!obj) {
		}
	};
	const getSearchHmo = (obj) => {
		setHmo(obj[0]);
		if (!obj) {
		}
	};

	const handleChangeMode = async (mode) => {
		setMessage(mode);
		if (mode === 'Company') {
			setShowCorp(true);
		} else {
			setShowCorp(false);
		}
		let billm = paymentOptions.filter((el) => el.name === mode);
		await setBillMode(billm[0]);
		console.log(billm);
	};

	const handleChangePlan = async (value) => {
		console.log(value);
		setSelectedPlan(value);
		if (value === '') {
			setPrice('');
			return;
		}
		console.log(benefittingPlans1);
		let cplan = benefittingPlans1.filter((el) => el.name === value);
		console.log(cplan);
		setChosenPlan(cplan[0]);
		let contract = cplan[0].contracts.filter(
			(el) => el.source_org === el.dest_org,
		);
		setPrice(contract[0]);
	};

	const handleClickProd = () => {
		setState((prevstate) => ({ ...prevstate, currBeneficiary: 'principal' }));
		setDependant('principal');
		console.log(state.Beneficiary);
		setClientModal(true);
		setOpenCreate(true);
	};
	const handleClickProd2 = () => {
		setState((prevstate) => ({ ...prevstate, currBeneficiary: 'dependent' }));
		setDependant('dependent');
		setOpenCreate(true);
	};

	const handleRow = (Client) => {
		//domething o
	};

	const handlecloseModal4 = () => {
		setClientModal(false);
		console.log(state.Beneficiary);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		// generate a unique policy number where the year is the lat 2 digits of the year, plan type is a single digit, organization type is a single digit, organizationId is a system generated 6 digit that should not be repeated, and the last 1 digit is the sponsor type
		// 1 - individual, 2 - corporate, 3 - group
		// 1 - HMO, 2 - PPO, 3 - EPO
		const year = new Date().getFullYear().toString().slice(-2);
		const planType = selectedPlan?.charAt(0);
		const orgType = data?.sponsortype === 'Self' ? 1 : 2;
		const orgId = Math.floor(100000 + Math.random() * 900000);
		const familyCode =
			state.Beneficiary.principal._id && !state.Beneficiary.dependent._id
				? '-1'
				: state.Beneficiary.dependent.length + 1;
		const policyNo = `${year}${planType}${orgType}${orgId}${familyCode}`;
		console.log(policyNo);

		if (!state.Beneficiary.principal._id) {
			toast.warning('Please add principal! ');

			return;
		}
		if (user.currentEmployee) {
			data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
		}

		let confirm = window.confirm(
			`You are about to register a new policy ${policyNo} ?`,
		);
		if (confirm) {
			let policy = {
				policyNo: policyNo,
				organizationType:
					user.currentEmployee.facilityDetail.facilityType === 'HMO'
						? user.currentEmployee.facilityDetail.facilityType
						: hmo.facilityType,
				organizationId:
					user.currentEmployee.facilityType === 'HMO'
						? user.currentEmployee.facilityDetail._id
						: hmo._id,
				organizationName:
					user.currentEmployee.facilityType === 'HMO'
						? user.currentEmployee.facilityDetail.facilityName
						: hmo.facilityName,
				organization:
					user.currentEmployee.facilityDetail.facilityType === 'HMO'
						? user.currentEmployee.facilityDetail
						: hmo,
				principal: state.Beneficiary.principal, //
				dependantBeneficiaries: state.Beneficiary.dependent,
				providers: chosen,
				sponsor: state.Beneficiary.principal, //mixed
				sponsorshipType: data.sponsortype,
				sponsor: planHMO,
				plan: chosenPlan,
				premium: price.price,
				premiumContract: price,
				active: false,
				isPaid: false,
				approved: false,
				validitystarts: data.start_date,
				validityEnds: data.end_date,
			};

			await policyServ
				.create(policy)
				.then((res) => {
					setSuccess(true);
					toast.success('Client created succesfully');
					setSuccess(false);
				})
				.then(async (res) => {
					//await setType("Sales")
					type.current = 'Sales';
					const today = new Date().toLocaleString();
					//await setDate(today)
					date.current = today;
					const invoiceNo = random(6, 'uppernumeric');
					// await setDocumentNo(invoiceNo)
					documentNo.current = invoiceNo;
					//await setPatient(state.Beneficiary.principal)
					patient.current = state.Beneficiary.principal;
					// await createBillmode()
					await createProductItem();
					await createProductEntry();

					// await handleCreateBill();
					await setShowModal(0);
				})
				.catch((err) => {
					toast.error('Error creating Client ' + err);
				});
		}
	};
	const getBenfittingPlans = async () => {
		setBenefittingPlans1([]);
		if (user.currentEmployee?.facilityDetail.facilityType === 'HMO') {
			const findServices = await ServicesServ.find({
				query: {
					facility: user.currentEmployee.facilityDetail._id,
					'contracts.source_org': user.currentEmployee.facilityDetail._id,
					'contracts.dest_org': user.currentEmployee.facilityDetail._id,
					category: 'Managed Care',
					$sort: {
						category: 1,
					},
				},
			});
			console.log(findServices);
			if (findServices.total > 0) {
				findServices?.groupedOrder[0]?.services?.forEach(async (c) => {
					const newPlan = {
						name: c?.name,
					};
					await setBenefittingPlans1((prev) => prev.concat(c));
				});
			}
		} else if (hmo) {
			const findServices = await ServicesServ.find({
				query: {
					facility: hmo?._id,
					'contracts.source_org': hmo?._id,
					'contracts.dest_org': hmo?._id,
					category: 'Managed Care',
					$sort: {
						category: 1,
					},
				},
			});
			console.log(findServices);
			if (findServices.total > 0) {
				findServices?.groupedOrder[0]?.services?.forEach(async (c) => {
					const newPlan = {
						name: c?.name,
					};
					await setBenefittingPlans1((prev) => prev.concat(c));
				});
			}
		}
	};

	const createPaymentOption = () => {
		const paymentoptions = [];
		// const info = client.paymentinfo
		let billme;
		let obj;
		//ideally this should be based on whether self or corporate
		let patient = state.Beneficiary.principal;
		if (!!patient.paymentinfo) {
			patient.paymentinfo.forEach((pay, i) => {
				if (pay.active) {
					switch (pay.paymentmode) {
						case 'Cash':
							// code block
							obj = createObj(pay, 'Cash', 'Cash', 'Cash');

							paymentoptions.push(obj);
							setPaymentMode('Cash');
							billme = obj;
							console.log('billme', billme);
							break;
						case 'Family':
							// code block
							obj = createObj(
								pay,
								'Family Cover',
								'familyCover',
								'Family Cover',
							);
							paymentoptions.push(obj);
							setPaymentMode('Family Cover');
							billme = obj;
							// console.log("billme",billme)
							break;
						case 'Company':
							// code block
							let name =
								'Company: ' + pay.organizationName + '(' + pay.plan + ')';

							obj = createObj(pay, name, 'CompanyCover', 'Company Cover');
							paymentoptions.push(obj);
							setPaymentMode(
								'Company: ' + pay.organizationName + '(' + pay.plan + ')',
							);
							billme = obj;
							// console.log("billme",billme)
							break;
						case 'HMO':
							// code block
							console.log(pay);
							let sname = 'HMO: ' + pay.organizationName + '(' + pay.plan + ')';

							obj = createObj(pay, sname, 'HMOCover', 'HMO Cover');
							paymentoptions.push(obj);
							setPaymentMode(
								'HMO: ' + pay.organizationName + '(' + pay.plan + ')',
							);
							billme = obj;
							//  console.log("billme",billme)

							break;
						default:
						// code block
					}
				}
			});
		}
		setPaymentOptions(paymentoptions);
		setBillMode(billme);
	};
	const createObj = (pay, name, cover, type) => {
		let details = {};
		details = { ...pay };
		details.type = type;

		return {
			name,
			value: cover,
			detail: details,
			type,
		};
	};
	//create productitem
	const createProductItem = async () => {
		productItem.current = [
			{
				//productId:,
				name: chosenPlan.name,
				quantity: '1',
				sellingprice: price.price,
				amount: price.price, //||qamount
				baseunit: '',
				costprice: '',
				category: chosenPlan.category,
				billingId: chosenPlan._id,
				billingContract: price,
				billMode: billMode, // state.Beneficiary.principal.paymentinfo[0]
			},
		];
		console.log(chosenPlan.name);
	};

	const createProductEntry = () => {
		productEntry.current = {
			productitems: productItem.current,
			date: date.current,
			documentNo: documentNo.current,
			type: type.current,
			totalamount: price.price,
			createdby: user._id,
			transactioncategory: 'debit',
			source: patient.current.firstname + ' ' + patient.current.lastname,
			facility: user.currentEmployee.facilityDetail._id,
		};
	};

	//create billfor policy
	// const handleCreateBill = async () => {
	//   //handle selected single order
	//   //documentation

	//   console.log(productEntry.current, productItem.current);
	//   let serviceList = [];
	//   let document = {};

	//   if (user.currentEmployee) {
	//     document.facility = user.currentEmployee.facilityDetail._id;
	//     document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
	//   }
	//   document.documentdetail = productItem.current;
	//   console.log(document.documentdetail);
	//   document.documentname = 'Billed Orders'; //state.DocumentClassModule.selectedDocumentClass.name
	//   // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
	//   document.location =
	//     state.employeeLocation.locationName +
	//     ' ' +
	//     state.employeeLocation.locationType;
	//   document.locationId = state.employeeLocation.locationId;
	//   document.client = patient.current._id;
	//   document.clientname =
	//     patient.current.firstname +
	//     ' ' +
	//     patient.current.middlename +
	//     ' ' +
	//     patient.current.lastname;
	//   document.clientobj = patient.current;
	//   document.createdBy = user._id;
	//   document.createdByname = user.firstname + ' ' + user.lastname;
	//   document.status = 'completed';
	//   console.log(document);

	//   //order
	//   document.documentdetail.forEach(async (element) => {
	//     let orderinfo = {
	//       //for reach document
	//       documentationId: '', //tbf
	//       order_category: element.category, //category
	//       order: element.name + ' Plan', //name
	//       instruction: '',
	//       destination_name: document.facilityname, //facilityname
	//       destination: document.facility, //facility id
	//       order_status: 'Billed',
	//       payer: '', //!!element.billMode.organizationName?element.billMode.organizationName:"",
	//       paymentmode: '', //element.billMode.paymentmode?element.billMode.paymentmode:"",

	//       requestingdoctor_Id: document.createdBy,
	//       requestingdoctor_Name: document.createdByname,
	//       requestingdoctor_locationid: document.locationId,
	//       requestingdoctor_locationName: document.location,
	//       requestingdoctor_facilityId: document.facility,
	//       requestingdoctor_facilityname: document.facilityname,

	//       clientId: document.client,
	//       clientname: document.clientname,
	//       client: document.clientobj,

	//       order_action: [],
	//       medication_action: [],
	//       treatment_action: [],
	//     };

	//     let billInfo = {
	//       orderInfo: {
	//         orderId: '', //tbf
	//         orderObj: orderinfo,
	//       },
	//       serviceInfo: {
	//         price: element.sellingprice,
	//         quantity: element.quantity,
	//         productId: element.productId,
	//         name: element.name + ' Plan',
	//         baseunit: element.baseunit,
	//         amount: element.amount,
	//         billingId: element.billingId,
	//         billingContract: element.billingContract,
	//         createdby: user._id,
	//       },
	//       paymentInfo: {
	//         amountDue: element.amount,
	//         paidup: 0,
	//         balance: element.amount,
	//         paymentDetails: [],
	//       },
	//       participantInfo: {
	//         billingFacility: orderinfo.destination,
	//         billingFacilityName: orderinfo.destination_name,
	//         locationId: document.locationId, //selected location,
	//         clientId: orderinfo.clientId,
	//         client: orderinfo.client,
	//         paymentmode: element.billMode,
	//       },
	//       createdBy: user._id,
	//       billing_status: 'Unpaid',
	//     };
	//     let items = {
	//       orderinfo,
	//       billInfo,
	//     };
	//     alert('aboutto create bill ' + items.orderinfo.name);
	//     serviceList.push(items);
	//   });

	//   console.log('==================');
	//   console.log(document, serviceList);

	//   let confirm = window.confirm(
	//     `You are about to bill ${document.clientname} for ${serviceList.length} service(s)?`
	//   );
	//   if (confirm) {
	//     await BillCreateServ.create({
	//       document,
	//       serviceList,
	//     })
	//       .then((res) => {
	//         setSuccess(true);
	//         toast({
	//           message: 'Billed Orders created succesfully',
	//           type: 'is-success',
	//           dismissible: true,
	//           pauseOnHover: true,
	//         });
	//         setSuccess(false);
	//         productItem.current = [];
	//         //setCalcAmount(0);
	//         const today = new Date().toLocaleString();
	//         //console.log(today)
	//         date.current = today;
	//         const invoiceNo = random(6, 'uppernumeric');
	//         documentNo.current = invoiceNo;
	//       })
	//       .catch((err) => {
	//         toast({
	//           message: 'Error creating Billed Orders ' + err,
	//           type: 'is-danger',
	//           dismissible: true,
	//           pauseOnHover: true,
	//         });
	//       });
	//   }
	// };

	// const getFacility = async () => {
	//   let stuff = {
	//     facility: user.currentEmployee.facilityDetail._id,
	//     // locationId:state.employeeLocation.locationId,
	//     $limit: 100,
	//     $sort: {
	//       createdAt: -1,
	//     },
	//   };
	//   orgServ
	//     .find({
	//       query: {
	//         relationshiptype: 'managedcare',
	//         facility: user.currentEmployee.facilityDetail._id,
	//         $limit: 100,
	//         $sort: {
	//           createdAt: -1,
	//         },
	//       },
	//     })
	//     .then((res) => {
	//       console.log(res.data);
	//       setFacilities(res.data);
	//     })
	//     .catch((err) => {
	//       console.log(err);
	//     });
	// };
	const handleSearch = async (value) => {
		if (value === '') {
			await setFacilities([]);
			return;
		}
		if (value.length >= 3) {
			orgServ
				.find({
					query: {
						$search: value,
						relationshiptype: 'managedcare',
						facility: user.currentEmployee.facilityDetail._id,
						$limit: 100,
						$sort: {
							createdAt: -1,
						},
					},
				})
				.then((res) => {
					setFacilities(res.data);
				})
				.catch((err) => {
					toast.error(`Error creating Service due to ${err}`);
				});
		} else {
			await setFacilities([]);
		}
	};

	useEffect(() => {
		getBenfittingPlans();
		createPaymentOption();
		// getFacility();

		return () => {};
	}, [hmo, user]);

	const OrgFacilitySchema = [
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
			name: 'Facility Name',
			key: 'facilityname',
			description: 'Facility Name',
			selector: (row) => row?.organizationDetail?.facilityName,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Facility Address',
			key: 'facilityaddress',
			description: 'Facility Address',
			selector: (row) => row?.organizationDetail?.facilityAddress,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Facility City',
			key: 'facilitycity',
			description: 'Facility City',
			selector: (row) => row?.organizationDetail?.facilityCity,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Facility Phone',
			key: 'facilityphone',
			description: 'Facility Phone',
			selector: (row) => row?.organizationDetail?.facilityContactPhone,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Facility Type',
			key: 'facilitytype',
			description: 'Facility Type',
			selector: (row) => row?.organizationDetail?.facilityType,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Facility Category',
			key: 'facilitycategory',
			description: 'Facility Category',
			selector: (row) => row?.organizationDetail?.facilityCategory,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'contact_email',
			description: 'Enter Date',
			selector: (row) => (
				<IconButton
					onClick={() => {
						setChosen(chosen.filter((item) => item._id !== row._id));
					}}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	console.log('==================', selectedPlan, hmo);

	return (
		<>
			<div
				className='card '
				style={{
					height: '88vh',
					overflowY: 'scroll',
					width: '98%',
					margin: '0 1rem',
				}}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<FormsHeaderText text={'Policy Create'} />
						<Box sx={{ display: 'flex', alignItems: 'center' }}>
							<GlobalCustomButton
								text={'Back'}
								color='warning'
								onClick={() => setShowModal(0)}
								customStyles={{ marginRight: '.5rem' }}
							/>
							<GlobalCustomButton
								text={'Save'}
								color='success'
								customStyles={{ marginRight: '.5rem' }}
								onClick={handleSubmit(onSubmit)}
							/>
						</Box>
					</Box>

					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							md={12}
							sx={{ display: 'flex' }}>
							<Box style={{ marginRight: '1rem', fontSize: '.8rem' }}>
								<input
									type='radio'
									name='sponsortype'
									{...register('sponsortype', { required: true })}
									value='Self'
									onChange={(e) => handleChangeMode(e.target.value)}
									style={{ marginRight: '.5rem' }}
								/>
								<label>Self</label>
							</Box>
							<Box style={{ fontSize: '.8rem' }}>
								<input
									type='radio'
									name='sponsortype'
									{...register('sponsortype', { required: true })}
									value='Company'
									onChange={(e) => handleChangeMode(e.target.value)}
									style={{ marginRight: '.5rem' }}
								/>
								<label>Company</label>
							</Box>
						</Grid>

						{showCorp && (
							<Grid
								item
								md={6}>
								<SponsorSearch
									getSearchfacility={getSearchfacility1}
									clear={success}
								/>
							</Grid>
						)}
						{user.currentEmployee.facilityDetail.facilityType !== 'HMO' && (
							<Grid
								item
								md={6}>
								<HmoFacilitySearch
									getSearchfacility={getSearchHmo}
									clear={success}
								/>
							</Grid>
						)}
						<Grid
							item
							md={6}>
							<CustomSelect
								name='plan'
								label='Choose Plan'
								options={benefittingPlans1}
								required
								important
								// control={control}
								onChange={(e, i) => handleChangePlan(e.target.value)}
							/>
						</Grid>
						<Grid
							item
							md={6}>
							<Input
								value={price.price}
								disabled
								label='Price'
							/>
						</Grid>
						{/* <Grid item md={6}>
              <MuiCustomDatePicker
                label="Start Date"
                control={control}
                name="start_date"
              />
            </Grid>
            <Grid item md={6}>
              <MuiCustomDatePicker
                name="end_date"
                label="End Date"
                control={control}
              />
            </Grid> */}
					</Grid>
					<Box sx={{ float: 'left' }}>
						{!state.Beneficiary?.principal._id && (
							<p>
								Add Principal
								<button
									onClick={handleClickProd}
									style={{
										border: 'none',
										backgroundColor: '#E8F1FF',
										padding: ' .5rem 1rem',
										marginLeft: '.5rem',
										cursor: 'pointer',
									}}
									type='button'>
									+
								</button>
							</p>
						)}
						<p>
							Add Dependant
							<button
								onClick={handleClickProd2}
								style={{
									border: 'none',
									backgroundColor: '#E8F1FF',
									padding: ' .5rem 1rem',
									marginLeft: '.5rem',
									cursor: 'pointer',
								}}
								type='button'>
								+
							</button>
						</p>
					</Box>
					<Grid
						container
						spacing={2}
						mt={2}>
						<Grid
							item
							md={12}>
							{state?.Beneficiary?.principal._id && (
								<>
									<FormsHeaderText text={'Principal'} />
									<CustomTable
										title={''}
										columns={EnrolleSchema}
										data={[state?.Beneficiary?.principal]}
										pointerOnHover
										highlightOnHover
										striped
										onRowClicked={() => handleRow(state.Beneficiary?.principal)}
										progressPending={loading}
									/>
								</>
							)}
						</Grid>
						<Grid
							item
							md={12}>
							{state?.Beneficiary?.dependent.length > 0 && (
								<>
									<FormsHeaderText text={'Dependant'} />
									<CustomTable
										title={''}
										columns={EnrolleSchema2}
										data={state?.Beneficiary?.dependent}
										pointerOnHover
										highlightOnHover
										striped
										onRowClicked={() => handleRow()}
										progressPending={loading}
									/>
								</>
							)}
						</Grid>
					</Grid>
					<Box
						style={{
							// height: '50vh',
							overflowY: 'scroll',
							width: '100%',
						}}>
						<Grid
							container
							spacing={2}
							my={1}>
							<Grid
								item
								md={8}>
								<FormsHeaderText text={'Selected Provider'} />
							</Grid>
							<Grid
								item
								md={4}>
								<OrgFacilitySearch
									getSearchfacility={getSearchfacility}
									clear={success}
								/>
							</Grid>
						</Grid>
						{chosen?.length > 0 && (
							<CustomTable
								title={''}
								columns={OrgFacilitySchema}
								data={chosen?.filter((item) => item !== null)}
								pointerOnHover
								highlightOnHover
								striped
								progressPending={loading}
							/>
						)}
					</Box>
				</form>
				<ModalBox
					open={createOrg}
					onClose={() => setCreateOrg(false)}
					header='Add Organization'>
					<OrganizationCreate />
				</ModalBox>
			</div>
		</>
	);
}
const UploadComponent = ({}) => {
	return (
		<Box
			sx={{
				width: '100px',
				height: '100px',
				borderRadius: '50%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				border: '1px dashed gray',
				cursor: 'pointer',
			}}>
			<FileUploadOutlinedIcon />
			<Typography
				sx={{
					fontSize: '10px',
				}}>
				Select Logo Image or Drag and Drop here
			</Typography>
		</Box>
	);
};
export function ClientCreate({ closeModal }) {
	//, watch, errors, reset
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const ClientServ = client.service('client');
	const mpiServ = client.service('mpi');
	//const navigate=useNavigate()
	const [billModal, setBillModal] = useState(false);
	const [patList, setPatList] = useState([]);
	const [dependant, setDependant] = useState(false);
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [date, setDate] = useState();
	const [loading, setLoading] = useState(false);
	const { state, setState } = useContext(ObjectContext);
	const [showdept, setShowdept] = useState(false);
	const [isFullRegistration, setFullRegistration] = useState(false);
	const data = localStorage.getItem('user');
	const [duplicateModal, setDuplicateModal] = useState(false);
	const [file, setFile] = useState(null);
	const [openDp, setOpenDp] = useState(false);
	const [imageUploadModal, setImageUploadModal] = useState(false);
	const user = JSON.parse(data);

	const {
		register,
		handleSubmit,
		setValue,
		getValues,
		control,
		reset,
		formState: { isSubmitSuccessful, errors },
	} = useForm({
		resolver: yupResolver(createClientSchema2),

		defaultValues: {
			firstname: '',
			lastname: '',
			middlename: '',
			dob: '',
			phone: '',
			email: '',
			facility: user.currentEmployee.facility,
		},
	});

	// eslint-disable-next-line
	const getSearchfacility = (obj) => {
		setValue('facility', obj._id, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	const handleDate = async (date) => {
		setDate(date);
	};
	// useEffect(() => {
	//   setCurrentUser(user);
	//   return () => {};
	// }, [user]);

	const checkClient = () => {
		const data = getValues();
		data.dob = date;
		const obj = {
			firstname: data.firstname,
			middlename: data.middlename,
			lastname: data.lastname,
			gender: data.gender,
			email: data.email,
			phone: data.phone,
			dob: data.dob,
		};
		/* find if there is a match with the paramters entered
          run search if 
            1.phone no alone or  
            2.email alone or 
            3.both is entered
            4. all other 5 parameters

        */
		let query = {};

		if (!!data.phone) {
			query.phone = data.phone;
			checkQuery(query);
		}

		if (!!data.email) {
			query.email = data.email;
			checkQuery(query);
		}

		if (!!data.firstname && !!data.lastname && !!data.gender && !!data.dob) {
			// console.log("simpa")
			data.middlename = data.middlename || '';
			query.gender = data.gender;
			query.dob = data.dob;

			query.$or = [
				{
					firstname: data.firstname,
					lastname: data.lastname,
					middlename: data.middlename,
				},
				{
					firstname: data.firstname,
					lastname: data.middlename,
					middlename: data.lastname,
				},
				{
					firstname: data.middlename,
					lastname: data.lastname,
					middlename: data.firstname,
				},
				{
					firstname: data.middlename,
					lastname: data.firstname,
					middlename: data.lastname,
				},
				{
					firstname: data.lastname,
					lastname: data.firstname,
					middlename: data.middlename,
				},
				{
					firstname: data.lastname,
					lastname: data.middlename,
					middlename: data.firstname,
				},
			];
			checkQuery(query);
		}
	};

	const checkQuery = (query) => {
		setPatList([]);
		if (
			!(
				query &&
				Object.keys(query).length === 0 &&
				query.constructor === Object
			)
		) {
			ClientServ.find({ query: query })
				.then((res) => {
					console.log(res);
					if (res.total > 0) {
						// alert(res.total)
						setPatList(res.data);
						setBillModal(true);
						return;
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const dupl = (client) => {
		toast({
			message: 'Client previously registered in this facility',
			type: 'is-danger',
			dismissible: true,
			pauseOnHover: true,
		});
		reset();
		setPatList([]);
	};
	const reg = async (client) => {
		if (
			client.relatedfacilities.findIndex(
				(el) => el.facility === user.currentEmployee.facilityDetail._id,
			) === -1
		) {
			//create mpi record
			const newPat = {
				client: client._id,
				facility: user.currentEmployee.facilityDetail._id,
				mrn: client.mrn,
				clientTags: client.clientTags,
				relfacilities: client.relatedfacilities,
			};
			//console.log(newPat)
			await mpiServ
				.create(newPat)
				.then((resp) => {
					toast({
						message: 'Client created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
				})
				.catch((err) => {
					toast({
						message: 'Error creating Client ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		//reset form
		reset();
		setPatList([]);
		//cash payment
	};
	const depen = (client) => {
		setDependant(true);
	};

	const handleChange = (file) => {
		//console.log(file);
		getBase64(file)
			.then((res) => {
				//console.log(res);
				setFile(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// ****************************************************************************
	const onSubmit = async (data, e) => {
		if (!date) {
			toast.warning('Please enter Date of Birth!');
			return;
		}

		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		checkClient();
		if (patList.length > 0) {
			if (!dependant) {
				return;
			}
			setPatList([]);
		}
		if (user.currentEmployee) {
			data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
		}
		let confirm = window.confirm(
			`You are about to register a new client ${data.firstname}  ${data.middlename} ${data.lastname} ?`,
		);
		if (confirm) {
			const token = localStorage.getItem('feathers-jwt');
			axios
				.post(
					'https://healthstack-backend.herokuapp.com/upload',
					{ uri: file },
					{ headers: { Authorization: `Bearer ${token}` } },
				)
				.then(async (res) => {
					const imageUrl = res.data.url;
					data.dob = date;
					data.imageurl = imageUrl;
					await ClientServ.create(data)
						.then((res) => {
							setSuccess(true);
							toast.success('Client created succesfully');
							setSuccess(false);
							setPatList([]);
							setDependant(false);
							setDate();
							reset();
							let newClientModule = {};
							if (state.currBeneficiary === 'principal') {
								newClientModule = {
									principal: res,
									dependent: state.Beneficiary.dependent,
									others: state.Beneficiary.others,
									show: 'create',
								};
							}
							if (state.currBeneficiary === 'dependent') {
								newClientModule = {
									principal: state.Beneficiary.principal,
									dependent: [...state.Beneficiary.dependent, res],
									others: state.Beneficiary.others,
									show: 'create',
								};
							}
							setState((prevstate) => ({
								...prevstate,
								Beneficiary: newClientModule,
							}));
						})
						.catch((err) => {
							toast.error('Error creating Client ' + err);
							setPatList([]);
							setDependant(false);
						});
					closeModal();
				});
		}
	};

	return (
		<>
			<ModalBox
				open={duplicateModal}
				onClose={() => setDuplicateModal(false)}
				header='Client With Similar Information already Exist'>
				<ClientGroup
					list={patList}
					closeModal={() => setDuplicateModal(false)}
					//choosen={choosen}
					dupl={dupl}
					reg={reg}
					depen={depen}
				/>
			</ModalBox>

			<form onSubmit={handleSubmit(onSubmit)}>
				<ToastContainer theme='colored' />
				<PageWrapper>
					<div>
						<HeadWrapper>
							<div>
								<h2>{`${
									isFullRegistration
										? 'Full Client Registeration'
										: 'Quick Client Registeration'
								}`}</h2>
								{/* <span>
                Create a New client by filling out the form below to get
                started.
              </span> */}
							</div>

							{isFullRegistration ? (
								<GlobalCustomButton onClick={() => setFullRegistration(false)}>
									<ElectricBoltIcon
										fontSize='small'
										sx={{ marginRight: '5px' }}
									/>
									Quick Registration
								</GlobalCustomButton>
							) : (
								<GlobalCustomButton onClick={() => setFullRegistration(true)}>
									<OpenInFullIcon
										fontSize='small'
										sx={{ marginRight: '5px' }}
									/>
									Full Registration
								</GlobalCustomButton>
							)}
						</HeadWrapper>

						<ToastContainer theme='colored' />

						{!isFullRegistration ? (
							<>
								<Box sx={{ width: '80vw', maxHeight: '80vh' }}>
									<Grid
										container
										spacing={1}>
										<Grid
											item
											md={12}
											sm={12}>
											<IconButton onClick={() => setOpenDp(true)}>
												{file ? (
													<Box
														sx={{
															display: 'flex',
															alignItems: 'center',
															justifyContent: 'center',
															display: 'block',
														}}>
														<img
															src={file}
															alt='logo'
															style={{
																width: '100px',
																height: '100px',
																display: 'block',
																borderRadius: '50%',
															}}
														/>
													</Box>
												) : (
													<FileUploader
														multiple={false}
														handleChange={handleChange}
														name='upload'
														types={['jpeg', 'png', 'jpg']}
														children={<UploadComponent />}
													/>
												)}
											</IconButton>
										</Grid>

										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='First Name'
												register={register('firstname')}
												errorText={errors?.firstname?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Middle Name'
												register={register('middlename')}
												errorText={errors?.middlename?.message}
												onBlur={checkClient}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Last Name'
												register={register('lastname')}
												errorText={errors?.lastname?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Phone'
												register={register('phone')}
												type='tel'
												errorText={errors?.phone?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Email'
												register={register('email')}
												type='email'
												errorText={errors?.email?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<input
												type='date'
												onChange={(e) => setDate(e.target.value)}
												style={{
													width: '100%',
													height: '2.2rem',
													border: '1px solid #BBBBBB',
													borderRadius: '4px',
													fontSize: '.85rem',
													padding: '0.4rem 1rem',
												}}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<CustomSelect
												label='Gender'
												register={register('gender', { required: true })}
												onBlur={checkClient}
												options={[
													{ label: 'Male', value: 'Male' },
													{ label: 'Female', value: 'Female' },
												]}
												errorText={errors?.gender?.message}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<CustomSelect
												label='Marital Status'
												register={register('maritalstatus')}
												options={[
													{ label: 'Single', value: 'Single' },
													{ label: 'Married', value: 'Married' },
													{ label: 'Widowed', value: 'Widowed' },
													{
														label: 'Divorced/Seperated',
														value: 'Divorced/Seperated',
													},
												]}
											/>
										</Grid>
										<Grid
											item
											lg={6}
											md={6}
											sm={12}>
											<Input
												label='Residential Address'
												register={register('residentialaddress')}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Town'
												register={register('town')}
												type='text'
											/>
										</Grid>

										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='LGA'
												type='text'
												register={register('lga')}
											/>
										</Grid>

										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='State'
												register={register('state')}
												type='text'
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Country'
												register={register('country')}
												type='text'
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Next of Kin'
												register={register('nextofkin')}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Next of Kin Phone'
												register={register('nextofkinphone')}
												type='tel'
											/>
										</Grid>
									</Grid>

									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'flex-end',
										}}
										mt={2}>
										<GlobalCustomButton
											color='warning'
											onClick={closeModal}
											sx={{ marginRight: '15px' }}>
											Cancel
										</GlobalCustomButton>

										<GlobalCustomButton
											type='submit'
											loading={loading}
											onClick={handleSubmit(onSubmit)}>
											<SaveIcon
												fontSize='small'
												sx={{ marginRight: '5px' }}
											/>
											Register Client
										</GlobalCustomButton>
									</Box>
								</Box>
							</>
						) : (
							<>
								<Box sx={{ width: '80vw', maxHeight: '80vh' }}>
									<Grid
										container
										spacing={1}>
										<Grid
											item
											xs={12}>
											<FormsHeaderText text='Client Names' />
										</Grid>
										<Grid
											item
											lg={4}
											md={4}
											sm={4}>
											<Input
												label='First Name'
												register={register('firstname')}
												errorText={errors?.firstname?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={4}
											md={4}
											sm={4}>
											<Input
												label='Middle Name'
												register={register('middlename')}
												errorText={errors?.middlename?.message}
												onBlur={checkClient}
											/>
										</Grid>
										<Grid
											item
											lg={4}
											md={4}
											sm={4}>
											<Input
												label='Last Name'
												register={register('lastname')}
												errorText={errors?.lastname?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
									</Grid>

									<Grid
										container
										spacing={1}>
										<Grid
											item
											xs={12}>
											<FormsHeaderText text='Client Biodata' />
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<input
												type='date'
												onChange={(date) => handleDate(date)}
												label='DOB'
												style={{
													width: '100%',
													height: '2.2rem',
													border: '1px solid #BBBBBB',
													borderRadius: '4px',
													fontSize: '.85rem',
													padding: '0.4rem 1rem',
												}}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<CustomSelect
												label='Gender'
												register={register('gender')}
												onBlur={checkClient}
												options={[
													{ label: 'Male', value: 'male' },
													{ label: 'Female', value: 'female' },
												]}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<CustomSelect
												label='Marital Status'
												register={register('maritalstatus')}
												options={[
													{ label: 'Single', value: 'Single' },
													{ label: 'Married', value: 'Married' },
													{ label: 'Widowed', value: 'Widowed' },
													{
														label: 'Divorced/Seperated',
														value: 'Divorced/Seperated',
													},
												]}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Medical record Number'
												register={register('mrn')}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Religion'
												register={register('religion')}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Profession'
												register={register('profession')}
											/>
										</Grid>

										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Phone No'
												register={register('phone')}
												errorText={errors?.phone?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Email'
												register={register('email')}
												errorText={errors?.email?.message}
												onBlur={checkClient}
												important={true}
											/>
										</Grid>

										<Grid
											item
											lg={6}
											md={6}
											sm={12}>
											<Input
												label='Tags'
												register={register('clientTags')}
											/>
										</Grid>
									</Grid>

									<Grid
										container
										spacing={1}>
										<Grid
											item
											xs={12}>
											<FormsHeaderText text='Client Address' />
										</Grid>
										<Grid
											item
											lg={4}
											md={6}
											sm={8}>
											<Input
												label='Residential Address'
												register={register('address')}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={4}>
											<Input
												label='Town/City'
												register={register('city')}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={4}>
											<Input
												label='LGA'
												register={register('lga')}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={4}>
											<Input
												label='State'
												register={register('state')}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={4}>
											<Input
												label='Country'
												register={register('country')}
											/>
										</Grid>
									</Grid>

									<Grid
										container
										spacing={1}>
										<Grid
											item
											xs={12}>
											<FormsHeaderText text='Client Medical Data' />
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Blood Group'
												register={register('bloodgroup')}
											/>
										</Grid>
										<Grid
											item
											lg={2}
											md={4}
											sm={6}>
											<Input
												label='Genotype'
												register={register('genotype')}
											/>
										</Grid>

										<Grid
											item
											lg={8}
											md={6}
											sm={6}>
											<Input
												label='Disabilities'
												register={register('disabilities')}
											/>
										</Grid>

										<Grid
											item
											lg={6}
											md={6}
											sm={6}>
											<Input
												label='Allergies'
												register={register('allergies')}
											/>
										</Grid>

										<Grid
											item
											lg={6}
											md={4}
											sm={6}>
											<Input
												label='Co-mobidities'
												register={register('comorbidities')}
											/>
										</Grid>

										<Grid
											item
											lg={12}
											md={4}
											sm={6}>
											<Input
												label='Specific Details '
												register={register('specificDetails')}
											/>
										</Grid>
									</Grid>

									<Grid
										container
										spacing={1}>
										<Grid
											item
											xs={12}>
											<FormsHeaderText text='Client Next of Kin Information' />
										</Grid>
										<Grid
											item
											lg={6}
											md={6}
											sm={12}>
											<Input
												label='Full Name'
												register={register('nok_name')}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label='Phone Number'
												register={register('nok_phoneno')}
											/>
										</Grid>
										<Grid
											item
											lg={3}
											md={4}
											sm={6}>
											<Input
												label=' Email'
												register={register('nok_email')}
												type='email'
											/>
										</Grid>
										<Grid
											item
											lg={4}
											md={4}
											sm={6}>
											<Input
												label='Relationship'
												register={register('nok_relationship')}
											/>
										</Grid>
										<Grid
											item
											lg={8}
											md={6}
											sm={12}>
											<Input
												label='Co-mobidities'
												register={register('comorbidities')}
											/>
										</Grid>
									</Grid>

									<Box
										sx={{
											width: '100%',
											display: 'flex',
											justifyContent: 'flex-end',
										}}
										mt={2}>
										<GlobalCustomButton
											color='warning'
											onClick={closeModal}
											sx={{ marginRight: '15px' }}>
											Cancel
										</GlobalCustomButton>

										<GlobalCustomButton
											type='submit'
											loading={loading}
											onClick={handleSubmit(onSubmit)}>
											<SaveIcon
												fontSize='small'
												sx={{ marginRight: '5px' }}
											/>
											Register Client
										</GlobalCustomButton>
									</Box>
								</Box>
							</>
						)}
					</div>
				</PageWrapper>
			</form>
			{/* <ModalBox
				open={openDp}
				onClose={() => setOpenDp(false)}
				header='Upload New Profile Photo'>
				<Box sx={{ width: '400px', maxHeight: '80vw' }}>
					{file ? (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}>
							<img
								src={file}
								alt='logo'
								style={{ width: '200px', height: 'auto', display: 'block' }}
							/>
						</Box>
					) : (
						<FileUploader
							multiple={false}
							handleChange={handleChange}
							name='upload'
							types={['jpeg', 'png', 'jpg']}
							children={<UploadComponent />}
						/>
					)}

					<Box
						sx={{ display: 'flex' }}
						gap={2}
						mt={2}>
						<GlobalCustomButton
							color='error'
							onClick={closeModal}>
							Cancel
						</GlobalCustomButton>

						<GlobalCustomButton
							onClick={() => setOpenDp(false)}
							disabled={file === null}>
							Upload Image
						</GlobalCustomButton>
					</Box>
				</Box>
			</ModalBox> */}
		</>
	);
}

export function PolicyDetail({ showModal, setShowModal }) {
	const { register, reset, control, handleSubmit } = useForm();
	const policyServ = client.service('policy');
	const [error, setError] = useState(false); //,
	const [finacialInfoModal, setFinacialInfoModal] = useState(false);
	const [billingModal, setBillingModal] = useState(false);
	const [billModal, setBillModal] = useState(false);
	const [appointmentModal, setAppointmentModal] = useState(false);
	const [message, setMessage] = useState(''); //,
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const { state, setState } = useContext(ObjectContext);
	const [display, setDisplay] = useState(1);
	const [editPolicy, setEditPolicy] = useState(false);
	const [loading, setLoading] = useState(false);
	const [editCustomer, setEditCustomer] = useState(false);
	const [facility, setFacility] = useState([]);

	useEffect(() => {
		let Client = state.ManagedCareModule.selectedClient;
		setFacility(Client);

		const initFormValue = {
			policyNo: Client.policyNo,
			phone: Client.principal?.phone,
			start_date: Client.validitystarts,
			end_date: Client.validityEnds,
			status: Client?.approved ? 'Approved' : 'Pending',
			sponsorship_type: Client.sponsorshipType,
			plan_type: Client.plan.name,
			policy_tag: Client.principal.clientTags,
			premium: Client.premium,
			sponsor_name: Client.sponsor?.organizationDetail?.facilityName,
			sponsor_phone: Client.sponsor?.organizationDetail?.facilityContactPhone,
			sponsor_email: Client.sponsor?.organizationDetail?.facilityEmail,
			sponsor_address: Client.sponsor?.organizationDetail?.facilityAddress,
		};
		reset(initFormValue);
	}, [state.ManagedCareModule.selectedClient]);

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
	const updateDetail = async (data) => {
		const docId = state.ManagedCareModule.selectedClient._id;
		console.log(data, docId);
		const policyDetails = {
			policyNo: data.policyNo,
			phone: data.phone,
			validitystarts: data.start_date,
			validityEnds: data.end_date,
			status: data.active,
			sponsorship_type: data.sponsorshipType,
			plan_type: data.plan_type,
			policy_tag: data.policy_tag,
			premium: data.premium,
			sponsor_name: data.sponsor_name,
			sponsor_phone: data.sponsor_phone,
			sponsor_email: data.sponsor_email,
			sponsor_address: data.sponsor_address,
		};
		await policyServ
			.patch(docId, policyDetails)
			.then((res) => {
				setState((prev) => ({
					...prev,
					ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
				}));
				toast.success('Policy Detail Updated');
				setEditPolicy(false);
			})
			.catch((err) => {
				toast.error('Error Updating Policy Detail');
				setEditPolicy(false);
			});
	};

	const approvePolicy = async () => {
		const docId = state.ManagedCareModule.selectedClient._id;
		const policyDetails = {
			approved: true,
			approvalDate: new Date(),
			approvedby: {
				employeename: user.currentEmployee.facilityDetail.facilityName,
				employeeId: user.currentEmployee.facilityDetail._id,
			},
		};
		console.log(policyDetails);
		await policyServ
			.patch(docId, policyDetails)
			.then((res) => {
				setState((prev) => ({
					...prev,
					ManagedCareModule: { ...prev.ManagedCareModule, selectedClient: res },
				}));
				toast.success('Policy Approved');
				setEditPolicy(false);
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error Approving Policy' + err);
				setEditPolicy(false);
			});
	};

	console.log(facility);
	return (
		<>
			<div
				className='card '
				style={{
					height: 'auto',
					overflowY: 'scroll',
					margin: '0 1rem',
					width: '98%',
				}}>
				<Grid container>
					<Grid
						item
						xs={12}
						sm={12}
						md={6}>
						<ModalHeader text={'Policy Details'} />
					</Grid>
				</Grid>
				<Grid container>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						sx={{ display: 'flex', justifyContent: 'flex-end' }}
						my={1}>
						<Button
							onClick={() => setShowModal(0)}
							variant='contained'
							size='small'
							sx={{ textTransform: 'capitalize', marginRight: '10px' }}
							color='warning'>
							Back
						</Button>
						<Button
							onClick={() => setDisplay(1)}
							variant='contained'
							size='small'
							sx={{ textTransform: 'capitalize', marginRight: '10px' }}
							color='secondary'>
							Details
						</Button>

						<Button
							onClick={() => setDisplay(5)}
							variant='contained'
							size='small'
							color='info'
							sx={{ textTransform: 'capitalize', marginRight: '10px' }}>
							Claims
						</Button>
						<Button
							onClick={() => setDisplay(6)}
							variant='outlined'
							size='small'
							sx={{ textTransform: 'capitalize', marginRight: '10px' }}>
							Premium
						</Button>
					</Grid>
				</Grid>
				<Box>
					{display === 1 && (
						<Box
							sx={{
								height: '80vh',
								overflowY: 'scroll',
							}}>
							<Box
								sx={{
									display: 'flex',
									alignItem: 'center',
									justifyContent: 'space-between',
								}}
								mb={1}>
								<FormsHeaderText text='Policy Details' />
								<Box>
									{!facility.approved && (
										<GlobalCustomButton
											color='success'
											onClick={handleSubmit(approvePolicy)}
											text='Approve'
											sx={{ marginRight: '5px' }}
										/>
									)}
									{editPolicy ? (
										<GlobalCustomButton
											color='success'
											onClick={handleSubmit(updateDetail)}>
											<UpgradeOutlinedIcon
												fontSize='small'
												sx={{ marginRight: '5px' }}
											/>
											Update
										</GlobalCustomButton>
									) : (
										<Button
											variant='contained'
											size='small'
											sx={{ textTransform: 'capitalize' }}
											onClick={() => setEditPolicy(true)}>
											<ModeEditOutlineOutlinedIcon fontSize='small' /> Edit
										</Button>
									)}
								</Box>
							</Box>

							<Grid
								container
								spacing={1}>
								<Grid
									item
									md={3}>
									<Input
										register={register('policyNo', { required: true })}
										label='Policy No.'
										disabled
									/>
								</Grid>

								<Grid
									item
									md={3}>
									<Input
										register={register('phone', { required: true })}
										label='Phone'
										disabled
									/>
								</Grid>
								<Grid
									item
									md={3}>
									<Input
										register={register('sponsorship_type', { required: true })}
										label='Sponsorship Type'
										disabled
										//placeholder="Enter customer number"
									/>
								</Grid>
								<Grid
									item
									md={3}>
									<Input
										register={register('plan_type', { required: true })}
										label='Plan Type'
										disabled
										//placeholder="Enter customer number"
									/>
								</Grid>
								<Grid
									item
									md={3}>
									<Input
										register={register('status', { required: true })}
										label='Status'
										disabled
										important
										//placeholder="Enter customer name"
									/>
								</Grid>

								<Grid
									item
									md={3}>
									<Input
										register={register('policy_tag')}
										label='Policy Tag'
										disabled
										// placeholder="Enter customer name"
									/>
								</Grid>

								<Grid
									item
									md={3}>
									<Input
										register={register('premium', { required: true })}
										label='Premium'
										disabled
										//placeholder="Enter customer number"
									/>
								</Grid>
								<Grid
									item
									md={3}>
									<MuiCustomDatePicker
										label='Start Date'
										name='start_date'
										control={control}
										disabled={!editPolicy}
									/>
								</Grid>
								<Grid
									item
									md={3}>
									<MuiCustomDatePicker
										label='End Date'
										name='end_date'
										control={control}
										disabled={!editPolicy}
									/>
								</Grid>
							</Grid>
							<Box
								sx={{
									display: 'flex',
									alignItem: 'center',
									justifyContent: 'space-between',
								}}
								mb={1}></Box>
							{facility.sponsorshipType === 'Company' && (
								<>
									<FormsHeaderText text='Sponsor Details' />
									<Grid
										container
										spacing={1}>
										<Grid
											item
											lg={6}
											md={6}
											sm={6}>
											<Input
												register={register('sponsor_name')}
												label='Sponsor Name'
												disabled

												//placeholder="Enter customer number"
											/>
										</Grid>
										<Grid
											item
											lg={6}
											md={6}
											sm={6}>
											<Input
												register={register('sponsor_phone')}
												label='Sponsor Phone'
												disabled

												//placeholder="Enter customer number"
											/>
										</Grid>
										<Grid
											item
											lg={6}
											md={6}
											sm={6}>
											<Input
												register={register('sponsor_email')}
												label='Sponsor Email'
												disabled

												//placeholder="Enter customer numbe"
											/>
										</Grid>
										<Grid
											item
											lg={6}
											md={6}
											sm={6}>
											<Input
												register={register('sponsor_address')}
												label='Sponsor Address'
												disabled

												//placeholder="Enter customer number"
											/>
										</Grid>
									</Grid>
								</>
							)}
							<Grid
								item
								md={12}>
								<FormsHeaderText text='Principal Details' />
								<CustomTable
									title={''}
									columns={EnrolleSchema3}
									data={[facility?.principal]}
									pointerOnHover
									highlightOnHover
									striped
									onRowClicked={() => {}}
									progressPending={loading}
									CustomEmptyData='You have no Principal yet.'
								/>
								<FormsHeaderText text='Dependant Details' />
								<CustomTable
									title={''}
									columns={EnrolleSchema3}
									data={facility?.dependantBeneficiaries}
									pointerOnHover
									highlightOnHover
									striped
									onRowClicked={() => {}}
									progressPending={loading}
									CustomEmptyData='You have no Dependant yet'
								/>
								<FormsHeaderText text='HMO' />
								<CustomTable
									title={''}
									columns={EnrolleSchema5}
									data={[facility?.organization]}
									pointerOnHover
									highlightOnHover
									striped
									onRowClicked={() => {}}
									progressPending={loading}
									CustomEmptyData='You have no HMO yet.'
								/>
								<FormsHeaderText text='Provider List' />
								<CustomTable
									title={''}
									columns={EnrolleSchema4}
									data={facility?.providers}
									pointerOnHover
									highlightOnHover
									striped
									onRowClicked={() => {}}
									progressPending={loading}
									CustomEmptyData='You have no Provider yet.'
								/>
							</Grid>
						</Box>
					)}

					{display === 5 && <Claims standAlone />}
					{display === 6 && <PremiumPayment />}
				</Box>
			</div>
		</>
	);
}
