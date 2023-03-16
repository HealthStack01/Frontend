import React, { useContext, useState, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import { ObjectContext, UserContext } from '../../context';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../dashBoardUiComponent/core-ui/styles';
import client from '../../feathers';
import CustomTable from '../../components/customtable';
import {
	Box,
	Checkbox,
	FormControlLabel,
	FormGroup,
	Portal,
	Radio,
	RadioGroup,
	IconButton,
	Grid,
	Typography,
} from '@mui/material';
import ModalBox from '../../components/modal';
import ServiceSearch from '../helpers/ServiceSearch';
import { BottomWrapper, GridBox } from '../app/styles';
import ViewText from '../../components/viewtext';
import { useForm } from 'react-hook-form';
import Input from '../../components/inputs/basic/Input';
import Textarea from '../../components/inputs/basic/Textarea';
import CustomSelect from '../../components/inputs/basic/Select';
import SearchSelect from '../helpers/SearchSelect';
import { toast, ToastContainer } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
import FilterMenu from '../../components/utilities/FilterMenu';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import CategorySearch from '../helpers/CategorySearch';
import { SelectedBenefit, SelectHealthPlan } from '../helpers/FacilitySearch';
import { Group } from '@mui/icons-material';
import CustomTariffSelect from './components/TariffSelect';

export default function TarrifList({ standAlone }) {
	const { state } = useContext(ObjectContext); //,setState
	// eslint-disable-next-line
	const [selectedClient, setSelectedClient] = useState();
	const [selectedAppointment, setSelectedAppointment] = useState();
	//const [showState,setShowState]=useState() //create|modify|detail
	const [showModal, setShowModal] = useState(0);
	const [selectedPlan, setSelectedPlan] = useState();

	return (
		<section className='section remPadTop'>
			{showModal === 0 && (
				<TarrifListView
					showModal={showModal}
					setShowModal={setShowModal}
					setSelectedClient={setSelectedPlan}
					standAlone={standAlone}
				/>
			)}
			{showModal === 1 && (
				<TariffCreate
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			)}
			{showModal === 2 && (
				<TariffView
					setShowModal={setShowModal}
					selectedPlan={selectedPlan}
					standAlone={standAlone}
				/>
			)}
		</section>
	);
}
export const TarrifListView = ({ showModal, setShowModal }) => {
	const [showView, setShowView] = useState(false);
	const [tariffs, setTariffs] = useState([]);
	const [tariff, setTariff] = useState();
	const { state, setState } = useContext(ObjectContext);
	const { user } = useContext(UserContext);
	const ServicesServ = client.service('tariff');
	const BandsServ = client.service('bands');
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	const [facilities, setFacilities] = useState([]);
	const [selectedServices, setSelectedServices] = useState([]);
	const [selectedFacilities, setSelectedFacilities] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState();
	const [totalServices, setTotalServices] = useState(0);
	const [totalFacilities, setTotalFacilities] = useState(0);
	const [newFacility, setNewFacility] = useState([]);
	const [slide, setSlide] = useState(false);
	const [changeView, setChangeView] = useState('service');
	const ServiceSchema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'S/N',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			width: '50px',
		},
		{
			name: 'Band Name',
			key: 'bandname',
			description: 'Band Name',
			selector: (row) => row?.band,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		// {
		// 	name: 'No of Facilities',
		// 	key: 'nofacilities',
		// 	description: 'No of Facilities',
		// 	selector: (row) =>
		// 		row?.contracts
		// 			?.map((healist) => healist?.source_org_name)
		// 			.filter((v, i, a) => a.indexOf(v) === i).length,
		// 	sortable: true,
		// 	required: true,
		// 	inputType: 'TEXT',
		// },
		{
			name: 'No of Services',
			key: 'noservices',
			description: 'No of Services',
			selector: (row) => row?.contracts?.length,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];
	const conditionalRowStyles = [
		{
			when: (row) => row?.band === newFacility?.map((item) => item?.band),
			style: {
				backgroundColor: '#4cc9f0',
				color: 'white',
				'&:hover': {
					cursor: 'pointer',
				},
			},
		},
	];
	const productItemSchema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'S/N',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			width: '50px',
		},
		{
			name: 'Service Name',
			key: 'serviceName',
			description: 'Service Name',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.serviceName}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Plan',
			key: 'plan',
			description: 'Plan',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.plans?.map((el) => (
						<>
							<b>Capitation?</b>: {el?.capitation === true ? 'Yes' : 'No'}
							<br />
							<b>Free for Service?</b>:
							{el?.feeForService === true ? 'Yes' : 'No'}
							<br />
							<b>PreAuth?</b>: {el?.reqPA !== 'false' ? 'Yes' : 'No'}
							<br />
							<b>Co-Pay</b>:{' '}
							{el?.copayDetail !== '' ? `₦${el?.copayDetail}` : 'N/A'}
						</>
					))}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Amount',
			key: 'price',
			description: 'Amount',
			selector: (row) => `₦${row?.price}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Benefits',
			key: 'benefits',
			description: 'Benefits',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.plans?.map((benefit, i) => (
						<div key={i}>{benefit?.benefit}</div>
					))}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Comment',
			key: 'comment',
			description: 'Comment',
			selector: (row) =>
				row?.plans.map((plan, i) => <div key={i}>{plan?.comments}</div>),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];
	const facilitySchema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'S/N',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			width: '50px',
		},
		{
			name: 'Facility Name',
			key: 'facility',
			description: 'Facility Name',
			selector: (row) => row?.dest_org_name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

	const handleCreateNew = async () => {
		const newServicesModule = {
			selectedServices: {},
			show: 'create',
		};
		await setState((prevstate) => ({
			...prevstate,
			ServicesModule: newServicesModule,
		}));
	};
	const handleRow = async (Service, i) => {
		console.log(Service);
		setSlide(!slide);
		setSelectedServices(Service?.contracts);
		const newServicesModule = {
			selectedServices: Service,
			show: 'detail',
		};
		await setState((prevstate) => ({
			...prevstate,
			ServicesModule: newServicesModule,
		}));
	};
	const handleService = async (Service) => {
		setSelectedCategory(Service);
	};

	const handleSearch = (val) => {
		const field = 'name';
		console.log(val);
		ServicesServ.find({
			query: {
				[field]: {
					$regex: val,
					$options: 'i',
				},
				organizationId: user.currentEmployee.facilityDetail._id,
				$limit: 20,
				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				console.log(res);
				setFacilities(res.data);
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error during search ' + err);
			});
	};

	const getFacilities = async () => {
		if (user.currentEmployee) {
			const findServices = await ServicesServ.find({
				query: {
					organizationId: user.currentEmployee.facilityDetail._id,
					$sort: {
						createdAt: -1,
					},
				},
			});
			console.log(findServices);
			await setFacilities(findServices.data);
		} else {
			if (user.stacker) {
				toast.warning('You do not qualify to view this');
				return;
			}
		}
	};

	useEffect(() => {
		getFacilities();

		ServicesServ.on('created', (obj) => getFacilities());
		ServicesServ.on('updated', (obj) => getFacilities());
		ServicesServ.on('patched', (obj) => getFacilities());
		ServicesServ.on('removed', (obj) => getFacilities());
		return () => {};
	}, [state.facilityModule.selectedFacility]);

	return (
		<div style={{}}>
			<Box
				sx={{
					width: '98%',
					margin: '0 auto',
				}}>
				{!slide && (
					<>
						<TableMenu>
							<div style={{ display: 'flex', alignItems: 'center' }}>
								<h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
									List of Tariffs
								</h2>
								{handleSearch && (
									<div className='inner-table'>
										<FilterMenu onSearch={handleSearch} />
									</div>
								)}
							</div>

							<GlobalCustomButton
								text='Add new '
								onClick={() => setShowModal(1)}
							/>
						</TableMenu>
						<CustomTable
							title={''}
							columns={ServiceSchema}
							data={facilities}
							pointerOnHover
							highlightOnHover
							striped
							onRowClicked={(row) => handleRow(row)}
							conditionalRowStyles={conditionalRowStyles}
						/>
					</>
				)}

				{selectedServices && selectedServices.length > 0 && slide && (
					<Box
						style={{
							width: '100%',
						}}>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								alignItems: 'center',
							}}>
							<FormsHeaderText text={'Band Deatils'} />
							<Box>
								<GlobalCustomButton
									text='Back'
									onClick={() => setSlide(false)}
									customStyles={{ marginRight: '1rem' }}
									color='warning'
								/>
								<GlobalCustomButton
									text={
										changeView === 'service'
											? 'View Facilities'
											: 'View Services'
									}
									onClick={
										changeView === 'facility'
											? () => setChangeView('service')
											: () => setChangeView('facility')
									}
									color={changeView === 'facility' ? 'primary' : 'secondary'}
								/>
							</Box>
						</Box>
						<Box>
							{changeView === 'service' ? (
								<Box
									sx={{
										height: '88vh',
										overflowY: 'scroll',
										marginTop: '1rem',
									}}>
									<CustomTable
										title={''}
										columns={productItemSchema}
										data={selectedServices}
										pointerOnHover
										highlightOnHover
										striped
										onRowClicked={(row) => handleService(row)}
									/>
								</Box>
							) : (
								<Box
									sx={{
										height: '88vh',
										overflowY: 'scroll',
										marginTop: '1rem',
									}}>
									<CustomTable
										title={''}
										columns={facilitySchema}
										data={selectedFacilities}
										pointerOnHover
										highlightOnHover
										striped
										onRowClicked={(row) => handleService(row)}
									/>
								</Box>
							)}
						</Box>
					</Box>
				)}
			</Box>
		</div>
	);
};

export const TariffCreate = ({ showModal, setShowModal }) => {
	const [, setPriceState] = useState({
		bronze: false,
		gold: false,
		silver: false,
		platinium: false,
	});
	const [loading, setLoading] = useState(false);
	const [bands, setBands] = useState([]);
	const [data, setData] = useState(null);
	const [catergory, setCategory] = useState(null);
	const [categoryname, setCategoryName] = useState('');
	const [success, setSuccess] = useState(false);
	const [success2, setSuccess2] = useState(false);
	const [cash, setCash] = useState('Cash');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const [providerBand, setProviderBand] = useState([]);
	const [benefittingPlans1, setBenefittingPlans1] = useState([]);
	const ServicesServ = client.service('tariff');
	const BandsServ = client.service('bands');
	const HealthPlanServ = client.service('healthplan');
	//const history = useHistory()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [facilityId, setFacilityId] = useState('');
	const [source, setSource] = useState('');
	const [panel, setPanel] = useState(false);
	const [name, setName] = useState('');
	const [benefittingplans, setBenefittingPlans] = useState([]);
	const [quantity, setQuantity] = useState();
	const [costprice, setCostprice] = useState('');
	const [orgType, setOrgType] = useState('');
	const [comments, setComments] = useState('');
	const [productItem, setProductItem] = useState([]);
	const [plan, setPlan] = useState('');
	const [service, setService] = useState('');
	const [currentUser, setCurrentUser] = useState('');
	const [panelList, setPanelList] = useState([]);
	const [successService, setSuccessService] = useState(false);
	const { state } = useContext(ObjectContext);
	const [chosen2, setChosen2] = useState();
	const [band, setBand] = useState('');
	const [showService, setShowService] = useState(false);
	const [selectedPlan, setSelectedPlan] = useState([]);
	const [capitation, setCapitation] = useState(false);
	const [feeForService, setFeeForService] = useState(false);
	const [serviceClass, setServiceClass] = useState('');
	const [copay, setCopay] = useState('');
	const [reqCopay, setReqCopay] = useState(false);
	const [reqAuthCode, setReqAuthCode] = useState(false);
	const [selectedBand, setSelectedBand] = useState('');
	const [showCoPay, setShowCoPay] = useState(false);
	const [selectedBenefits, setSelectedBenefits] = useState([]);
	const [facilities, setFacilities] = useState([]);
	const [sCoPay, setSCoPay] = useState(false);
	const [beneCat, setBeneCat] = useState('');
	const [newBene, setNewBene] = useState([]);
	const [selectNo, setSelectNo] = useState('');
	const [serviceUnavailable, setServiceUnavailable] = useState({
		status: false,
		name: '',
	});

	const {
		register,
		handleSubmit,
		formState: { isSubmitSuccessful, errors },
	} = useForm({
		defaultValues: {
			facility: user.currentEmployee.facility,
		},
	});

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				const findServices = await ServicesServ.find();
				const findBands = await BandsServ.find();
				setBands(findBands?.data);
			} catch (err) {}
			setLoading(false);
		};

		getData();
	}, []);
	const updateObjectInArray = (array, child) => {
		array.map((item, index) => {
			if (item.name !== child.name) {
				// This isn't the item we care about - keep it as-is
				return item;
			}
			// Otherwise, this is the one we want - return an updated value
			//console.log(child)
			return {
				...child,
			};
		});
		return array;
	};
	// consider batchformat{batchno,expirydate,qtty,baseunit}
	//consider baseunoit conversions
	const getSearchfacility = (obj) => {
		setFacilityId(obj._id);
		setName(obj.facilityName);
		setOrgType(obj.facilityType);

		if (!obj) {
			// setName("")
			setOrgType('');
			setFacilityId('');
			setCostprice('');
		}

		/*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
	};
	const getSearchfacility2 = (obj) => {
		setCategoryName(obj.categoryname);
		setChosen2(obj);

		if (!obj) {
			//"clear stuff"
			setCategoryName('');
			setChosen2();
		}
	};

	const getSearchService = (obj) => {
		setService(obj);
		if (!obj) {
			setService('');
		}
		setSuccessService(false);
	};

	const notfound = async (obj) => {
		//alert(obj)
		await setServiceUnavailable(obj);
		await setSuccessService(true);
		if (!obj) {
			await setServiceUnavailable('');
		}
		// console.log(obj)
		//here
	};

	useEffect(() => {
		setCurrentUser(user);

		//console.log(currentUser)
		return () => {};
	}, [user]);

	const getProviderBand = async () => {
		if (user.currentEmployee) {
			const findServices = await BandsServ.find({
				query: {
					facility: user.currentEmployee.facilityDetail._id,
					bandType:
						user.currentEmployee.facilityDetail.facilityType === 'HMO'
							? 'Provider'
							: 'Company',

					// storeId:state.StoreModule.selectedStore._id,
					// $limit:20,
					//   paginate:false,
					$sort: {
						category: 1,
					},
				},
			});
			// console.log(findServices)
			await setProviderBand(findServices.data);
			console.log(findServices);
		}
	};
	const getFacilities = async () => {
		console.log(user);
		if (user.currentEmployee) {
			let stuff = {
				organizationId: user.currentEmployee.facilityDetail._id,
				// locationId:state.employeeLocation.locationId,
				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			};
			// if (state.employeeLocation.locationType !== "Front Desk") {
			//   stuff.locationId = state.employeeLocation.locationId;
			// }

			const findHealthPlan = await HealthPlanServ.find({ query: stuff });

			await console.log('HealthPlan', findHealthPlan.data);
			await setFacilities(findHealthPlan.data);
		} else {
			if (user.stacker) {
				const findClient = await HealthPlanServ.find({
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
		// console.log("starting...")
		getFacilities();
		setBenefittingPlans1([]);
		setFacilityId(user.currentEmployee.facilityDetail._id);
		setName(user.currentEmployee.facilityDetail.facilityName);
		setOrgType(user.currentEmployee.facilityDetail.facilityType);
		getProviderBand();
		return () => {};
	}, []);

	const handleServType = async (e, i, c) => {
		let currentPlan = benefittingplans.filter(
			(el) => el.planName === c.planName,
		)[0];
		currentPlan.capitation = e.target.value === 'Capitation' ? true : false;
		currentPlan.feeforService =
			e.target.value === 'Fee for Service' ? true : false;
		const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
		await setBenefittingPlans(updatedplan);
	};

	const handleCopay = async (e, i, c) => {
		let currentPlan = benefittingplans.filter(
			(el) => el.planName === c.planName,
		)[0];
		currentPlan.copayDetail = e.target.value;
		currentPlan.coPay = currentPlan.copayDetail === '' ? false : true;
		const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
		await setBenefittingPlans(updatedplan);
	};

	const handleAuthCode = async (e, i, c) => {
		let currentPlan = benefittingplans.filter(
			(el) => el.planName === c.planName,
		)[0];
		currentPlan.reqPA = e.target.checked;
		const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
		await setBenefittingPlans(updatedplan);
	};
	const handleBenefit = async (e, i, c) => {
		console.log(e.target.value, i, c);
		let selectedBene = e.target.value;
		console.log(selectedBene, selectedBene.comments);
		let currentPlan = benefittingplans.filter(
			(el) => el.planName === c.planName,
		)[0];
		console.log(currentPlan);
		currentPlan.benefit = selectedBene.comments;
		currentPlan.benefitCategory = selectedBene.category;
		// currentPlan.covered =
		// 	facilities.benefits.filter((el) => el.category === e.target.value)[0]
		// 		.status === 'Covered'
		// 		? true
		// 		: false;
		const updatedplan = updateObjectInArray(benefittingplans, currentPlan);
		await setBenefittingPlans(updatedplan);
	};

	const handleChange = async (e, i, c) => {
		c.checked = !c.checked;

		const newPlan = {
			name: c.planName,
			checked: false,
		};
		// console.log(c.checked)
		if (c.checked) {
			//add to benefiting plan
			let planx = {
				planName: c.planName,
				planId: c._id,
				benefit: '',
				// benefitId : c.benefitId,
				benefitCategory: '',
				feeforService: true,
				capitation: false,
				reqPA: false,
				coPay: false,
				copayDetail: '',
				comments: comments,
			};
			//   console.log(planx)
			await setBenefittingPlans((prev) => [...prev, planx]);
		} else {
			await setBenefittingPlans((prevstate) =>
				prevstate.filter((el) => el.name !== c.name),
			); //remove from benefiting plan
		}
	};
	const closeModal = () => {
		setShowService(false);
		setBenefittingPlans([]);
		setComments('');
	};

	const handleClickProd = async () => {
		if (benefittingplans.length === 0) {
			return toast.warning('Please select a plan');
		}
		if (costprice === '') {
			return toast.warning('Please enter price');
		}
		if (service === '') {
			return toast.warning('Please select a service');
		}
		let seviceItem = {
			source_org: user.currentEmployee.facilityDetail,
			source_org_name: user.currentEmployee.facilityDetail.facilityName,
			serviceName: service.name,
			serviceId: service._id,
			price: parseFloat(costprice),
			plans: benefittingplans,
			billing_type:
				user.currentEmployee.facilityDetail.facilityType === 'HMO'
					? 'HMO'
					: 'Company',
		};
		setProductItem([...productItem, seviceItem]);
		await setBenefittingPlans([]);
		await setService('');
		await setCostprice('');
		await setSuccess(true);
	};

	const onSubmit = async () => {
		if (bands.length === 0) {
			return toast.error('Please add a band');
		}
		if (productItem.length === 0) {
			return toast.error('Please add a service');
		}

		let data = {
			organizationId: user.currentEmployee.facilityDetail._id,
			organizationName: user.currentEmployee.facilityDetail.facilityName,
			band: selectedBand,
			contracts: productItem,
		};
		//  console.log(data)

		ServicesServ.create(data)
			.then((res) => {
				toast.success('Tariff created succesfully');
				setShowModal(0);
			})
			.catch((err) => {
				toast.error('Error creating Tariff ' + err);
			});
	};

	// const handleBenefit = (e) => {
	// 	setBenefittingPlans((prevstate) => prevstate.concat(plan));
	// 	setPlan('');
	// };

	const handleRemove = (index, contract) => {
		console.log(index, contract);
		const newProductItem = productItem.filter(
			(ProductionItem, i) => i !== contract,
		);
		setProductItem(newProductItem);
		console.log(newProductItem);
	};
	const handleAddPanel = () => {
		// setSuccessService(false)
		let newService = {
			serviceId: service._id,
			service_name: service.name,
			panel: service.panel,
		};
		setPanelList((prevstate) => prevstate.concat(newService));
		setSuccessService(true);
		newService = {};
		setService('');
		console.log('something added');
	};
	const handleCheck = async () => {
		if (!categoryname) {
			toast.warning('Enter Category!');
			return true;
		}
		console.log('unavailb:', serviceUnavailable.name);
		console.log('availb:', service.name);
		const resp = await ServicesServ.find({
			query: {
				name: serviceUnavailable.name || service.name, //source
				facility: user.currentEmployee.facilityDetail._id,
				category: categoryname,
			},
		});
		console.log(resp);
		//.
		/*then((resp)=>{
        console.log(resp)*/
		if (resp.data.length > 0) {
			toast.info(
				'Service already exist. Kindly modify it ', //+ resp.data ,
			);
			return true;
		} else {
			return false;
		}
	};

	const copaySelect = (e, i) => {
		setShowCoPay(i);
		if (e.target.checked) {
			setSCoPay(true);
		} else {
			setSCoPay(false);
		}
	};
	useEffect(() => {
		facilities?.map((c, i) => {
			console.log('c', c);
			const benefit = c.benefits?.find((b) => b.comments === beneCat?.comments);
			console.log('BENE', benefit);
			if (benefit) {
				setNewBene([benefit]);
			}
			console.log('NEW BENEFITS', newBene);
		});
	}, [beneCat]);
	const productItemSchema = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'S/N',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			width: '50px',
		},
		{
			name: 'Service Name',
			key: 'serviceName',
			description: 'Service Name',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.serviceName}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Plan',
			key: 'plan',
			description: 'Plan',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.plans?.map((el) => (
						<>
							<b>Plan name</b>: {el?.planName} <br />
							<b>Capitation?</b>: {el?.capitation === true ? 'Yes' : 'No'}
							<br />
							<b>Free for Service?</b>:
							{el?.feeforService === true ? 'Yes' : 'No'}
							<br />
							<b>PreAuth?</b>: {el?.reqAuthCode === true ? 'Yes' : 'No'}
							<br />
							<b>Co-Pay</b>:{' '}
							{el?.copayDetail !== '' ? `₦${el?.copayDetail}` : 'N/A'}
							<br />
						</>
					))}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Amount',
			key: 'price',
			description: 'Amount',
			selector: (row) => `₦${row?.price}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Benefits',
			key: 'benefits',
			description: 'Benefits',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.plans?.map((benefit, i) => (
						<div key={i}>{benefit?.benefit}</div>
					))}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Comment',
			key: 'comment',
			description: 'Comment',
			selector: (row) =>
				row?.plans.map((plan, i) => <div key={i}>{plan?.comments}</div>),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'contact_email',
			description: 'Enter Date',
			selector: (i, row) => (
				<IconButton
					onClick={() => handleRemove(i, row)}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];
	console.log('selectedBenefit', benefittingplans, 'productItem', productItem);
	console.log('beneCat', beneCat);
	return (
		<Box
			style={{
				margin: '0 1rem',
			}}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<FormsHeaderText text='Create Tariff' />
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<GlobalCustomButton
						text='Back'
						onClick={() => setShowModal(0)}
						color='warning'
						customStyles={{ marginRight: '1rem' }}
					/>
					<GlobalCustomButton
						text='Create Tarrif'
						onClick={onSubmit}
						color='success'
					/>
				</Box>
			</Box>
			<Grid
				container
				spacing={2}
				mt={1}>
				{/* <Grid item xs={12} sm={6}>
            <Input label="Tariff Name" />
          </Grid> */}
				<Grid
					item
					xs={12}
					sm={4}>
					<select
						name='bandType'
						value={selectedBand}
						onChange={(e) => setSelectedBand(e.target.value)}
						className='selectadd'
						style={{
							border: '1px solid #b6b6b6',
							height: '2.2rem',
							borderRadius: '4px',
							width: '100%',
						}}>
						<option value=''>
							{user.currentEmployee.facilityDetail.facilityType === 'HMO'
								? 'Choose Provider Band'
								: 'Choose Company Band'}{' '}
						</option>
						{providerBand.map((option, i) => (
							<option
								key={i}
								value={option.name}>
								{' '}
								{option.name}
							</option>
						))}
					</select>
				</Grid>
			</Grid>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					margin: '1rem 0',
				}}>
				<FormsHeaderText text={'Services'} />
				<GlobalCustomButton
					type='button'
					variant='contained'
					color='primary'
					onClick={() => setShowService(true)}
					text='Add Service'
					customStyles={{ marginRight: '.8rem' }}
				/>
			</Box>
			{productItem?.length > 0 && (
				<Box my={1}>
					<CustomTable
						title={''}
						columns={productItemSchema}
						data={productItem}
						pointerOnHover
						highlightOnHover
						striped
					/>
				</Box>
			)}

			{showService && (
				<ModalBox
					open={showService}
					onClose={() => closeModal()}>
					<Box
						sx={{
							width: '70vw',
						}}>
						<GlobalCustomButton
							type='button'
							variant='contained'
							color='success'
							onClick={handleClickProd}
							text='Add Service'
							customStyles={{ float: 'right' }}
						/>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={12}
								sm={4}>
								<SearchSelect
									getSearchService={getSearchService}
									clear={successService}
									notfound={notfound}
									placeholder='Search Service'
								/>
							</Grid>
							{/* <Grid
							item
							xs={12}
							sm={4}>
							<SelectHealthPlan
								selectedPlan={selectedPlan}
								setSelectedPlan={setSelectedPlan}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}>
							<SelectedBenefit
								data={selectedPlan}
								setSelectedBenefits={setSelectedBenefits}
								selectedBenefits={selectedBenefits}
							/>
						</Grid> */}
							<Grid
								item
								xs={12}
								sm={4}>
								<Input
									label='Price'
									onChange={(e) => setCostprice(e.target.value)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sm={12}>
								<Textarea
									label='Comments'
									onChange={(e) => setComments(e.target.value)}
								/>
							</Grid>
							{/* <Box sx={{ width: '95%' }}>
							<Grid
								container
								spacing={2}
								m={1}>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className=' is-small'
										value='Capitation'
										type='radio'
										onChange={(e) => handleServType(e)}
										style={{ marginRight: '5px' }}
									/>
									<span>Capitation</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className=' is-small'
										value='Fee for Service'
										type='radio'
										onChange={(e) => handleServType(e)}
										style={{ marginRight: '5px' }}
									/>

									<span>Fee for Service</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className='checkbox is-small'
										type='checkbox'
										onChange={(e) => setShowCoPay(!showCoPay)}
										style={{ marginRight: '5px' }}
									/>
									<span>Co-Pay?</span>
								</Grid>
								<Grid
									item
									xs={12}
									sm={3}>
									<input
										className='checkbox is-small'
										type='checkbox'
										onChange={(e) => handleAuthCode(e)}
										style={{ marginRight: '5px' }}
									/>
									<span>Requires Pre-Authorization Code</span>
								</Grid>
							</Grid>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}
									sm={6}
									m={1}>
									{showCoPay && (
										<Input
											className='input smallerinput is-small is-pulled-right '
											onChange={(e) => handleCopay(e)}
											label='Co-pay Amount'
										/>
									)}
								</Grid>
							</Grid>
						</Box> */}
							<Box
								mx={2}
								sx={{
									width: '98%',
								}}>
								{facilities.map((c, i) => {
									const allCategories = c?.benefits?.map((cat) => cat);
									console.log('ALL CATS', allCategories);
									return (
										<>
											<Grid
												container
												spacing={2}
												my={1}
												sx={{
													alignItems: 'center',
												}}>
												<Grid
													item
													sx={{ display: 'flex', alignItems: 'center' }}
													xs={12}
													sm={2}
													key={i}>
													<input
														className='checkbox is-small '
														type='checkbox'
														value={i}
														name={`selectedPlans +${i}`}
														label={c.planName}
														onChange={(e) => handleChange(e, i, c)}
													/>
													<p
														style={{
															fontWeight: 'bold',
															marginRight: '10px',
														}}>
														{c.planName}
													</p>
												</Grid>
												<Grid
													item
													xs={12}
													sm={2}>
													<CustomSelect
														options={allCategories}
														label='Select Benefit Category'
														onChange={(e) => {
															setBeneCat(e.target.value);
															setSelectNo(i);
														}}
													/>
												</Grid>

												<Grid
													item
													xs={12}
													sm={2}>
													<CustomTariffSelect
														key={i}
														options={selectNo === i ? newBene : []}
														label='Select Benefit'
														onChange={(e) => handleBenefit(e, i, c)}
													/>
												</Grid>

												<Grid
													item
													xs={12}
													sm={2}
													key={i}>
													<input
														className=' is-small'
														value='Capitation'
														name={`servtype +${i}`}
														type='radio'
														onChange={(e) => handleServType(e, i, c)}
													/>
													<span>Capitation</span>
												</Grid>
												<Grid
													item
													xs={12}
													sm={2}
													key={i}>
													<input
														className=' is-small'
														name={`servtype +${i}`}
														value='Fee for Service'
														type='radio'
														onChange={(e) => handleServType(e, i, c)}
													/>

													<span>Fee for Service</span>
												</Grid>
												<Grid
													item
													xs={12}
													sm={2}
													key={i}>
													<input
														className=' is-small'
														name={`pay${i}`}
														value='Fee for Service'
														type='checkbox'
														onChange={(e) => copaySelect(e, i)}
														style={
															showCoPay === i
																? { marginBottom: '.6rem' }
																: { marginBottom: '0' }
														}
													/>
													<span>Co-Pay?</span>
													{showCoPay === i && sCoPay && (
														<Input
															className='input smallerinput is-small is-pulled-right '
															name={`copay +${i}`}
															type='text'
															onChange={(e) => handleCopay(e, i, c)}
															label='Co-pay Amount'
														/>
													)}
												</Grid>

												<Grid
													item
													xs={12}
													sm={2}
													key={i}>
													<input
														className='checkbox is-small'
														name={`authCode +${i}`}
														type='checkbox'
														onChange={(e) => handleAuthCode(e, i, c)}
													/>
													<span>Requires Pre-Auth?</span>
												</Grid>
											</Grid>
										</>
									);
								})}
							</Box>
						</Grid>
					</Box>
				</ModalBox>
			)}
		</Box>
	);
};

export const TariffView = (service) => {
	const [editing, setEditing] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: service.serviceName,
			comment: service.comment,
		},
	});
	const selected = service.service;
	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
				<FormsHeaderText text={service?.serviceName} />
				<Box>
					{!editing && (
						<GlobalCustomButton
							text='Edit'
							onClick={() => setEditing(true)}
						/>
					)}
					{editing && (
						<GlobalCustomButton
							text='Save Form'
							type='submit'
							color='success'
						/>
					)}
				</Box>
			</Box>
			<Grid
				container
				spacing={2}
				mt={1}>
				<Grid
					item
					xs={12}
					sm={4}>
					{!editing ? (
						<Input
							label='Service Name'
							value={selected?.serviceName}
							disabled
						/>
					) : (
						<Input
							label='Name'
							register={register('serviceName')}
						/>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={4}>
					{!editing ? (
						<Input
							label='Duration'
							value={selected?.duration}
							disabled
						/>
					) : (
						<Input
							label='Duration'
							register={register('duration')}
						/>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={4}>
					{!editing ? (
						<Input
							label='Status'
							value={selected?.status}
							disabled
						/>
					) : (
						<Input
							label='Status'
							register={register('status')}
						/>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}>
					{!editing ? (
						<Textarea
							label='Comment'
							value={selected?.comments}
							disabled
						/>
					) : (
						<Textarea
							label='Price'
							register={register('comment')}
						/>
					)}
				</Grid>
			</Grid>
		</Box>
	);
};
