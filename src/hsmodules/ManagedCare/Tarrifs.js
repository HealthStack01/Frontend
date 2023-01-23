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
import { SelectHealthPlan } from '../helpers/FacilitySearch';

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
			key: 'service',
			description: 'Service Name',
			selector: (row) => row?.serviceName,
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
					<b>Capitation?</b>: {row?.capitation === true ? 'Yes' : 'No'}
					<br />
					<b>Fee for Service?</b>:{row?.feeForService === true ? 'Yes' : 'No'}
					<br />
					<b>PreAuth?</b>: {row?.reqPA === true ? 'Yes' : 'No'}
					<br />
					<b>Co-Pay</b>:{' '}
					{row?.copayDetail !== '' && row?.copayDetail !== undefined
						? `₦${row?.copayDetail}`
						: 'N/A'}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Price',
			key: '`',
			description: '`',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.price}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		// {
		// 	name: 'Category',
		// 	key: 'category',
		// 	description: 'Category',
		// 	selector: (row) => (
		// 		<Typography
		// 			sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
		// 			data-tag='allowRowEvents'>
		// 			{row?.category}
		// 		</Typography>
		// 	),
		// 	sortable: true,
		// 	required: true,
		// 	inputType: 'TEXT',
		// },
		// {
		// 	name: 'Duration',
		// 	key: 'duration',
		// 	description: 'Duration',
		// 	selector: (row) => (
		// 		<Typography
		// 			sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
		// 			data-tag='allowRowEvents'>
		// 			{row?.duration}
		// 		</Typography>
		// 	),
		// 	sortable: true,
		// 	required: true,
		// 	inputType: 'TEXT',
		// },
		// {
		// 	name: 'Frequency',
		// 	key: 'frequency',
		// 	description: 'Frequency',
		// 	selector: (row) => (
		// 		<Typography
		// 			sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
		// 			data-tag='allowRowEvents'>
		// 			{row?.frequency}
		// 		</Typography>
		// 	),
		// 	sortable: true,
		// 	required: true,
		// 	inputType: 'TEXT',
		// },
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
				facility: user.currentEmployee.facilityDetail._id,
				$limit: 20,
				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				console.log(res);
				setFacilities(res.groupedOrder);
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

	useEffect(() => {
		// console.log("starting...")
		setBenefittingPlans1([]);
		setFacilityId(user.currentEmployee.facilityDetail._id);
		setName(user.currentEmployee.facilityDetail.facilityName);
		setOrgType(user.currentEmployee.facilityDetail.facilityType);
		getProviderBand();
		return () => {};
	}, []);

	// function to handle which service class is selected
	const handleServType = async (e) => {
		if (e.target.value === 'Capitation') {
			setCapitation(true);
			setFeeForService(false);
			setServiceClass(e.target.value);
		} else {
			setCapitation(false);
			setFeeForService(true);
			setServiceClass(e.target.value);
		}
	};

	const handleCopay = async (e) => {
		setCopay(e.target.value);
		setReqCopay(true);
	};

	const handleAuthCode = async (e) => {
		setReqAuthCode(true);
	};

	const handleClickProd = async () => {
		let seviceItem = {
			serviceName: service.name,
			serviceId: service._id,
			plans: selectedPlan,
			benefits: selectedPlan.map((item) => item.benefits),
			price: parseFloat(costprice),
			coPay: reqCopay,
			copayDetail: copay,
			capitation: capitation,
			feeForService: feeForService,
			reqPA: reqAuthCode,
			comments: comments,
		};
		console.log(seviceItem);
		setProductItem([...productItem, seviceItem]);
		setService('');
		setCostprice('');
		setCopay('');
		setCapitation(false);
		setFeeForService(false);
		setReqAuthCode(false);
		setReqCopay(false);
		setSelectedPlan([]);
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

	const handleBenefit = (e) => {
		setBenefittingPlans((prevstate) => prevstate.concat(plan));
		setPlan('');
	};

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
					<b>Capitation?</b>: {row?.capitation === true ? 'Yes' : 'No'}
					<br />
					<b>Free for Service?</b>:{row?.feeforService === true ? 'Yes' : 'No'}
					<br />
					<b>PreAuth?</b>: {row?.reqAuthCode === true ? 'Yes' : 'No'}
					<br />
					<b>Co-Pay</b>: {row?.copay !== '' ? `₦${row?.copay}` : 'N/A'}
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
			name: 'Comment',
			key: 'comment',
			description: 'Comment',
			selector: (row) => row?.comments,
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
	console.log(productItem);
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
						text='Add'
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
					onClose={() => setShowService(false)}>
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
							<Input
								label='Price'
								onChange={(e) => setCostprice(e.target.value)}
							/>
						</Grid>
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
						<Grid
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
							sm={12}>
							<Textarea
								label='Comments'
								onChange={(e) => setComments(e.target.value)}
							/>
						</Grid>
						<Box sx={{ width: '95%' }}>
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
						</Box>
					</Grid>
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
