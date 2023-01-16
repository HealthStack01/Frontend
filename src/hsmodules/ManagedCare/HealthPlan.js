import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '../../feathers';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import { addDays, format, subDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import CalendarGrid from '../../components/calender';
import CustomTable from '../../components/customtable';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import ModalBox from '../../components/modal';
import { FormsHeaderText } from '../../components/texts';
import FilterMenu from '../../components/utilities/FilterMenu';
import { ObjectContext, UserContext } from '../../context';
import { TableMenu } from '../../ui/styled/global';
import { PageWrapper } from '../../ui/styled/styles';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import SearchSelect from '../helpers/SearchSelect';
import CategorySearch from '../helpers/CategorySearch';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { toast } from 'react-toastify';

const searchfacility = {};

export default function HealthPlan({ standAlone }) {
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
				<HealthPlanList
					showModal={showModal}
					setShowModal={setShowModal}
					setSelectedClient={setSelectedPlan}
					standAlone={standAlone}
				/>
			)}
			{showModal === 1 && (
				<HealthPlanCreate
					showModal={showModal}
					setShowModal={() => setShowModal(0)}
				/>
			)}
			{showModal === 2 && (
				<HealthPlanDetails
					setShowModal={setShowModal}
					selectedPlan={selectedPlan}
					standAlone={standAlone}
				/>
			)}
		</section>
	);
}

export function HealthPlanCreate({ showModal, setShowModal }) {
	// Services
	const ServicesServ = client.service('billing');
	const BandsServ = client.service('bands');
	const HealthPlanServ = client.service('healthplan');

	//  States
	const { state, setState } = useContext(ObjectContext);
	const { register, handleSubmit, setValue, reset } = useForm();
	const { user } = useContext(UserContext); //,setUser
	const [showBenefit, setShowBenefit] = useState(false);
	const [benefittingplans, setBenefittingPlans] = useState([]);
	const [benefittingPlans1, setBenefittingPlans1] = useState([]);
	const [showCoPay, setShowCoPay] = useState(false);
	const [successService, setSuccessService] = useState(false);
	const [service, setService] = useState('');
	const [success2, setSuccess2] = useState(false);
	const [providerBand, setProviderBand] = useState([]);
	const [categoryname, setCategoryName] = useState('');
	const [chosen2, setChosen2] = useState();
	const [band, setBand] = useState('');
	const [productItem, setProductItem] = useState([]);
	const [frequency, setFrequency] = useState('');
	const [duration, setDuration] = useState('');
	const [limit, setLimit] = useState('');
	const [status, setStatus] = useState('');
	const [comments, setComments] = useState('');
	const [cap, setCap] = useState(false);
	const [planName, setPlanName] = useState('');
	const [planCategory, setPlanCategory] = useState('Individual');
	const [planType, setPlanType] = useState('');
	const [premium, setPremium] = useState('');
	const [indvidualLimit, setIndividualLimit] = useState('');
	const [familyLimit, setFamilyLimit] = useState('');
	const [providerNetwork, setProviderNetwork] = useState('');
	const [coverageArea, setCoverageArea] = useState('');
	const [individualPremium, setIndividualPremium] = useState('');
	const [familyPremium, setFamilyPremium] = useState('');
	const [capitation, setCapitation] = useState(false);
	const [copay, setCopay] = useState('');
	const [feeforService, setFeeforService] = useState(false);
	const [reqCopay, setReqCopay] = useState(false);
	const [serviceClass, setServiceClass] = useState('');
	const [reqAuthCode, setReqAuthCode] = useState(false);
	const [serviceUnavailable, setServiceUnavailable] = useState({
		status: false,
		name: '',
	});

	// **********************************Functions**********************************

	// get the benefitting plan for this paticular user
	const getBenfittingPlans = async () => {
		setBenefittingPlans1([]);
		if (user.currentEmployee) {
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
				findServices.groupedOrder[0].services.forEach(async (c) => {
					const newPlan = {
						name: c.name,
						checked: false,
					};
					await setBenefittingPlans1((prev) => prev.concat(c));
				});
			}
		}
	};
	// function to get the provider band
	const getProviderBand = async () => {
		if (user.currentEmployee) {
			const findServices = await BandsServ.find({
				query: {
					facility: user.currentEmployee.facilityDetail._id,
					bandType:
						user.currentEmployee.facilityDetail.facilityType === 'HMO'
							? 'Provider'
							: 'Company',
					$sort: {
						category: 1,
					},
				},
			});
			await setProviderBand(findServices.data);
			console.log(findServices);
		}
	};
	//  Function to handle change in the checkbox
	const handleChange = async (e, i, c) => {
		c.checked = !c.checked;
		const newPlan = {
			name: c.name,
			checked: false,
		};
		if (c.checked) {
			let planx = {
				name: c.name,
				serviceClass: '',
				feeforService: true,
				capitation: false,
				reqAuthCode: false,
				reqCopay: false,
				copay: '',
			};
			await setBenefittingPlans((prev) => [...prev, planx]);
		} else {
			await setBenefittingPlans((prevstate) =>
				prevstate.filter((el) => el.name !== c.name),
			);
		}
	};
	// Utility function to update the array
	const updateObjectInArray = (array, child) => {
		array.map((item, index) => {
			if (item.serviceClass !== child.serviceClass) {
				return item;
			}
			return {
				...child,
			};
		});
		return array;
	};
	// function to handle chnage of band
	const handleChangeMode = async (e) => {
		setBand(e.target.value);
		// let existingBand = productItem.filter((el) => el.band === e.target.value);
		// if (!existingBand.length > 0) {
		//   await setBand(e.target.value);
		// } else {
		//   toast.info(' This band already exist! Please choose another band ');
		//   return;
		// }
	};

	// function to handle which service class is selected
	const handleServType = async (e) => {
		if (e.target.value === 'Capitation') {
			setCapitation(true);
			setFeeforService(false);
			setServiceClass(e.target.value);
		} else {
			setCapitation(false);
			setFeeforService(true);
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
	const getSearchService = (obj) => {
		console.log(obj);
		setService(obj);
		setCategoryName(obj.category);
		if (!obj) {
			setService('');
			setCategoryName('');
		}
		setSuccessService(false);
	};
	// const getSearchfacility2 = (obj) => {
	// 	setCategoryName(obj.categoryname);
	// 	setChosen2(obj);

	// 	if (!obj) {
	// 		//"clear stuff"
	// 		setCategoryName('');
	// 		setChosen2();
	// 	}
	// };

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

	//  function to handle change in the check
	const handleCheck = async () => {
		if (!categoryname) {
			toast.warning('Enter Category!');
			return true;
		}
		console.log('unavailb:', serviceUnavailable.name);
		console.log('availb:', service.name);
		const resp = await HealthPlanServ.find({
			query: {
				name: serviceUnavailable.name || service.name, //source
				facility: user.currentEmployee.facilityDetail._id,
				category: categoryname,
			},
		});
		console.log(resp);
		if (resp.data.length > 0) {
			toast.info(
				'Service already exist. Kindly modify it ', //+ resp.data ,
			);
			return true;
		} else {
			return false;
		}
	};
	//  function to handle remove
	const handleRemove = (index, contract) => {
		console.log(index, contract);
		const newProductItem = productItem.filter(
			(ProductionItem, i) => i !== contract,
		);
		setProductItem(newProductItem);
		console.log(newProductItem);
	};
	const handleSave = async () => {
		console.log({
			service: service,
			category: categoryname,
			band: band,
			comment: comments,
			frequency: frequency,
			duration: duration,
			limit: limit,
			status: status,
		});
	};
	const handleClickProd = async () => {
		// let pricingInfo = {
		//   band,
		//   costprice,
		//   benefittingplans,
		// };

		// let productItemI = {
		//   name: service.name,
		//   categoryname,
		//   comments,
		//   pricingInfo,
		// };
		//  if (productItem.length>0){
		//Check that fields are filled appropriately
		// if (!costprice) {
		//   toast.warning('You need to enter price ');
		//   return;
		// }

		if (!service.name && !serviceUnavailable.name) {
			toast.warning('You need to enter service name ');
			return;
		}
		if (!categoryname) {
			toast.warning('You need to enter category ');
			return;
		}
		if (band === '') {
			toast.warning('You need to choose provider band ');
			return;
		}
		// if (!benefittingplans.length > 0) {
		// 	toast.warning('You need to add benefiting plan ');

		// 	return;
		// }
		let check = await handleCheck();
		if (check) {
			return;
		}
		let productItemI = {
			source_org: user.currentEmployee.facilityDetail._id,
			source_org_name: user.currentEmployee.facilityDetail.facilityName,
			dest_org: user.currentEmployee.facilityDetail._id,
			dest_org_name: user.currentEmployee.facilityDetail.facilityName,
			// price: costprice,
			billing_type:
				user.currentEmployee.facilityDetail.facilityType === 'HMO'
					? 'HMO'
					: 'Company',
			plans: [
				{
					capitation,
					copay,
					feeforService,
					reqCopay,
					serviceClass,
					reqAuthCode,
				},
			],
			comments: comments,
			capitation: cap,
			band: band,
			service: service,
			serviceName: serviceUnavailable.name || service.name,
			serviceId: service._id || '',
			category: categoryname,
			frequency: frequency,
			duration: duration,
			limit: limit,
			status: status,
		};
		console.log(productItemI);
		// await setCash('');

		// await setSuccess(false);
		setProductItem([...productItem, productItemI]);

		// setCostprice('');
		setBand('');
		setBenefittingPlans([]);
		setBenefittingPlans1([]);
		setCapitation(false);
		setCopay('');
		setFeeforService('');
		setReqCopay(false);
		setServiceClass('');
		setReqAuthCode(false);
		setShowCoPay(false);
		setServiceUnavailable({
			status: false,
			name: '',
		});
		getBenfittingPlans();
		console.log('done');

		// await setSuccess(true);
	};

	const onSubmit = async () => {
		// e.preventDefault();
		let check = await handleCheck();
		if (check) {
			console.log(check);
			return;
		}
		if (productItem.length >= 1) {
			let data = {
				organizationId: user.currentEmployee.facilityDetail._id,
				organizationName: user.currentEmployee.facilityDetail.facilityName,
				planName: planName,
				premiums: [
					{
						individualPremium: individualPremium,
						familyPremium: familyPremium,
					},
				],
				planCategory: planCategory,
				familyLimit: familyLimit,
				indvidualLimit: indvidualLimit,
				providerNetwork: providerNetwork,
				covrageArea: coverageArea,
				contracts: productItem,
			};
			//  console.log(data)

			HealthPlanServ.create(data)
				.then((res) => {
					setSuccessService(true);
					setSuccess2(true);
					toast.success('Health Plan created succesfully');
					setSuccess2(false);
					setSuccessService(false);
					setProductItem([]);
					setServiceUnavailable({
						status: false,
						name: '',
					});
					setShowModal(0);
				})
				.catch((err) => {
					toast.error('Error creating Services ' + err);
				});
		} else {
			toast.warning('You need to add Benefitting Plans ');
		}
	};

	// **********************************Effects**********************************
	useEffect(() => {
		getBenfittingPlans();
		getProviderBand();
	}, []);

	const tableData = [
		{
			service: 'Test Service',
			description: 'lorem ipsum dolor sit amet',
			fee: 'N20,000',
			status: 'Covered',
		},
		{
			service: 'Test Service',
			description: 'lorem ipsum dolor sit amet',
			fee: 'N20,000',
			status: 'Covered',
		},
	];
	const HealthPlanSchema = [
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
			name: 'Service Name',
			key: 'service',
			description: 'service',
			selector: (row) => row.service,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Description',
			key: 'description',
			description: 'Description',
			selector: (row) => row.description,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Price',
			key: 'fee',
			description: 'Fee',
			selector: (row) => row.fee,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Status',
			key: 'status',
			description: 'Status',
			selector: (row) => row.status,
			sortable: true,
			required: true,
			inputType: 'TEXT',
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
			selector: (row) =>
				row?.plans?.map((plan, i) => (
					<Typography
						sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
						data-tag='allowRowEvents'
						key={i}>
						<b>{plan?.serviceClass}</b>
						<br />
						<b>PreAuth?</b>: {plan?.reqAuthCode === true ? 'Yes' : 'No'}
						<br />
						<b>Co-Pay</b>: {plan.copay?.length > 0 ? `₦${plan?.copay}` : 'N/A'}
					</Typography>
				)),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Band',
			key: 'band',
			description: 'Band',
			selector: (row) => row?.band,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Category',
			key: 'category',
			description: 'Category',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.category}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Duration',
			key: 'duration',
			description: 'Duration',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.duration}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Frequency',
			key: 'frequency',
			description: 'Frequency',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.frequency}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Limit',
			key: 'limit',
			description: 'Limit',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.limit}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Status',
			key: 'status',
			description: 'Status',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.status}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		//  {
		//    name: 'Amount',
		//    key: 'price',
		//    description: 'Amount',
		//    selector: (row) => row?.price,
		//    sortable: true,
		//    required: true,
		//    inputType: 'TEXT',
		//  },
		{
			name: 'Billing type',
			key: 'billingtype',
			description: 'Billing type',
			selector: (row) => row?.billing_type,
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
	console.log(benefittingplans, productItem);
	return (
		<>
			<div
				className='card '
				style={{
					width: '98%',
					margin: '0 1rem',
					height: '88vh',
					overflowY: 'scroll',
				}}>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<FormsHeaderText text={'Create Health Plan'} />
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<GlobalCustomButton
							type='button'
							variant='contained'
							color='warning'
							onClick={() => setShowModal(0)}
							text='Back'
							customStyles={{ marginRight: '.8rem' }}
						/>

						<GlobalCustomButton
							type='submit'
							variant='contained'
							color='success'
							text='Save'
							onClick={handleSubmit(onSubmit)}
						/>
					</Box>
				</Box>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={4}>
							<Input
								name='plan'
								label='Name of Plan'
								onChange={(e) => setPlanName(e.target.value)}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}>
							<CustomSelect
								name='planCategory'
								label='Category'
								options={[
									{ value: 'Individual', label: 'Individual' },
									{ value: 'Family', label: 'Family' },
								]}
								onChange={(e) => setPlanCategory(e.target.value)}
							/>
						</Grid>
						{/* <Grid item xs={12} sm={4}>
              <CustomSelect
                name="planType"
                label="Type"
                options={[
                  { value: 'Individual', label: 'Individual' },
                  { value: 'Family', label: 'Family' },
                  { value: 'Both', label: 'Both' },
                ]}
                onChange={(e) => setPlanType(e.target.value)}
              />
            </Grid> */}
						{planCategory === 'Individual' ? (
							<Grid
								item
								xs={12}
								sm={4}>
								<Input
									name='planAmount'
									label={'Individual Amount'}
									onChange={(e) => setIndividualPremium(e.target.value)}
								/>
							</Grid>
						) : (
							<Grid
								item
								xs={12}
								sm={4}>
								<Input
									name='planAmount'
									label={'Family Amount'}
									onChange={(e) => setFamilyPremium(e.target.value)}
								/>
							</Grid>
						)}
						{planCategory === 'Individual' ? (
							<Grid
								item
								xs={12}
								sm={4}>
								<Input
									name='individualLimit'
									label='Individual Limit'
									onChange={(e) => setIndividualLimit(e.target.value)}
								/>
							</Grid>
						) : (
							<Grid
								item
								xs={12}
								sm={4}>
								<Input
									name='FamilyLimit'
									label='Family Limit'
									onChange={(e) => setFamilyLimit(e.target.value)}
								/>
							</Grid>
						)}

						<Grid
							item
							xs={12}
							sm={4}>
							<CustomSelect
								name='providerNetwork'
								label='Provider Network'
								options={[
									{ value: 'Standard', label: 'Standard' },
									{ value: 'Enhanced', label: 'Enhanced' },
								]}
								onChange={(e) => setProviderNetwork(e.target.value)}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={4}>
							<Input
								name='Coverage Area'
								label='Coverage Area'
								onChange={(e) => setCoverageArea(e.target.value)}
							/>
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}>
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									marginBottom: '1rem',
								}}>
								<FormsHeaderText text={'Benefits'} />
								<GlobalCustomButton
									type='button'
									variant='contained'
									color='secondary'
									onClick={() => setShowBenefit(true)}
									text='Add Benefit'
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
						</Grid>
					</Grid>
					{showBenefit && (
						<>
							<ModalBox
								open={showBenefit}
								onClose={() => setShowBenefit(false)}>
								<Box sx={{ width: '70vw' }}>
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}>
										<FormsHeaderText text={'Add Benefit'} />
										<GlobalCustomButton
											type='button'
											color='success'
											text={'Add'}
											onClick={handleClickProd}
										/>
									</Box>
									<Grid
										container
										spacing={2}
										my={2}>
										<Grid
											item
											xs={12}
											sm={6}>
											<SearchSelect
												getSearchService={getSearchService}
												placeholder='Search Service'
												clear={successService}
												notfound={notfound}
											/>
										</Grid>
										{/* <Grid
											item
											xs={12}
											sm={6}>
											<CategorySearch
												getSearchfacility={getSearchfacility2}
												clear={success2}
												label='Search Services Category'
											/>
										</Grid> */}
										<Grid
											item
											xs={12}
											sm={6}>
											<select
												name='bandType'
												value={band}
												onChange={(e) => handleChangeMode(e)}
												className='selectadd'
												style={{
													border: '1px solid #b6b6b6',
													height: '2.2rem',
													borderRadius: '4px',
													width: '100%',
												}}>
												<option value=''>
													{user.currentEmployee.facilityDetail.facilityType ===
													'HMO'
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
										<Grid
											item
											xs={12}
											sm={6}>
											<Input
												name='serviceDscrp'
												label='Description'
												onChange={(e) => setComments(e.target.value)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={3}>
											<Input
												name='frequency'
												label='Frequency'
												onChange={(e) => setFrequency(e.target.value)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={3}>
											<Input
												name='duration'
												label='Duration'
												onChange={(e) => setDuration(e.target.value)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={3}>
											<Input
												name='limit'
												label='Limit'
												onChange={(e) => setLimit(e.target.value)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={3}>
											<CustomSelect
												name='serviceStatus'
												label='Status'
												options={[
													{ value: 'Covered', label: 'Covered' },
													{ value: 'Not Covered', label: 'Not Covered' },
												]}
												onChange={(e) => setStatus(e.target.value)}
											/>
										</Grid>
										<Grid
											item
											xs={12}
											sm={12}>
											<Box>
												<Grid
													container
													spacing={2}
													mt={1}>
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
														mt={1}>
														{showCoPay && (
															<Input
																className='input smallerinput is-small is-pulled-right '
																value={benefittingplans.copay}
																onChange={(e) => handleCopay(e)}
																label='Co-pay Amount'
															/>
														)}
													</Grid>
												</Grid>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</ModalBox>
						</>
					)}
				</form>
			</div>
		</>
	);
}

export function HealthPlanList({
	showModal,
	setShowModal,
	setSelectedClient,
	standAlone,
}) {
	// const { register, handleSubmit, watch, errors } = useForm();
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	const ClientServ = client.service('appointments');
	const HealthPlanServ = client.service('healthplan');
	//const navigate=useNavigate()
	// const {user,setUser} = useContext(UserContext)
	const [facilities, setFacilities] = useState([]);
	// eslint-disable-next-line
	// eslint-disable-next-line
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const { user, setUser } = useContext(UserContext);
	const [startDate, setStartDate] = useState(new Date());
	const [selectedAppointment, setSelectedAppointment] = useState();
	const [loading, setLoading] = useState(false);
	const [value, setValue] = useState('list');

	const handleCreateNew = async () => {
		setShowModal(1);
	};

	const handleRow = async (Client) => {
		setShowModal(2);
		setSelectedClient(Client);
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
		getFacilities();
	}, []);

	const activeStyle = {
		backgroundColor: '#0064CC29',
		border: 'none',
		padding: '0 .8rem',
	};

	const returnCell = (status) => {
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

	const HealthPlanSchema = [
		{
			name: 'Name of Plan',
			key: 'name_of_plan',
			description: 'Enter name of plan',
			selector: (row) => row?.planName,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Category',
			key: 'category',
			description: 'Enter category series',
			selector: (row) => row?.planCategory,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Family Amount',
			key: 'premium',
			description: 'Family Annual',
			selector: (row) => row.premiums?.map((item) => `₦${item?.familyPremium}`),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Individual Amount',
			key: 'premium',
			description: 'Individual Annual',
			selector: (row) =>
				row.premiums?.map((item) => `₦${item?.individualPremium}`),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Provider Network',
			key: 'provider_network',
			description: 'Provider Network',
			selector: (row) => row?.providerNetwork?.map((item) => item),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Coverage Area',
			key: 'coverage_area',
			description: 'Coverage Area',
			selector: 'status',
			cell: (row) => row?.covrageArea?.map((item) => item),
			sortable: true,
			required: true,

			inputType: 'TEXT',
		},
	];
	console.log(facilities);
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
										Health Plan
									</h2>
								</div>

								{!standAlone && (
									<GlobalCustomButton
										text='Add new '
										onClick={handleCreateNew}
									/>
								)}
							</TableMenu>

							<CustomTable
								title={''}
								columns={HealthPlanSchema}
								data={facilities}
								pointerOnHover
								highlightOnHover
								striped
								onRowClicked={handleRow}
								progressPending={loading}
								//conditionalRowStyles={conditionalRowStyles}
							/>
						</PageWrapper>
					</div>
				</>
			) : (
				<div>loading</div>
			)}
		</>
	);
}

export function HealthPlanDetails({
	showModal,
	setShowModal,
	selectedPlan,
	standAlone,
}) {
	const [deny, setDeny] = useState(false);
	const [approve, setApprove] = useState(false);
	const [viewBenefit, setViewBenefit] = useState(false);
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
			selector: (row) =>
				row?.plans.map((plan, i) => (
					<Typography
						sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
						data-tag='allowRowEvents'
						key={i}>
						<b>{plan.name}</b>: {plan.serviceClass}
						<br />
						<b>PreAuth?</b>: {plan.reqAuthCode === true ? 'Yes' : 'No'}
						<br />
						<b>Co-Pay</b>: {plan.copay.length > 0 ? `₦${plan.copay}` : 'N/A'}
					</Typography>
				)),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Band',
			key: 'band',
			description: 'Band',
			selector: (row) => row?.band,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Category',
			key: 'category',
			description: 'Category',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.category}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Duration',
			key: 'duration',
			description: 'Duration',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.duration}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Frequency',
			key: 'frequency',
			description: 'Frequency',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.frequency}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Limit',
			key: 'limit',
			description: 'Limit',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.limit}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Status',
			key: 'status',
			description: 'Status',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.75rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row?.status}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		//  {
		//    name: 'Amount',
		//    key: 'price',
		//    description: 'Amount',
		//    selector: (row) => row?.price,
		//    sortable: true,
		//    required: true,
		//    inputType: 'TEXT',
		//  },
		{
			name: 'Billing type',
			key: 'billingtype',
			description: 'Billing type',
			selector: (row) => row?.billing_type,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

	return (
		<>
			<div
				className='card'
				style={{
					height: '88vh',
					overflowY: 'scroll',
					width: '98%',
					margin: '0 auto',
				}}>
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between' }}
					my={1}>
					<FormsHeaderText text={selectedPlan?.planName} />
					<GlobalCustomButton
						text='Back'
						color='warning'
						onClick={() => setShowModal(0)}
					/>
				</Box>
				{!standAlone && (
					<div style={{ backgroundColor: '#EBEBEB', padding: '.5rem 1rem' }}>
						<FormsHeaderText text={`Health Plan: ${selectedPlan?.planName}`} />
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={6}>
								<p>
									Created:{' '}
									{format(new Date(selectedPlan?.createdAt), 'dd MMM, yyyy')}
								</p>
							</Grid>
							<Grid
								item
								xs={6}>
								{/* <p style={{ textAlign: 'right' }}>
                Status: <span style={{ color: '#17935C' }}>Active</span>
              </p> */}
							</Grid>
						</Grid>
					</div>
				)}
				{!standAlone && (
					<div
						style={{
							marginTop: '10px',
							padding: '1rem',
							boxShadow:
								'0px 3px 3px -2px rgb(0 0 0 / 20%),0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
						}}>
						<Grid
							container
							spacing={2}
							style={{ alignItems: 'top' }}>
							{/* <Grid item xs={3}>
              <div style={{ marginLeft: 'auto' }}>
                <GlobalCustomButton
                  text="View Benefit"
                  customStyles={{ float: 'right' }}
                  onClick={() => setViewBenefit(true)}
                />
              </div>
            </Grid> */}
						</Grid>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={12}>
								<div
									style={{
										borderBottom: '1px solid #E4EAF0',
										margin: '1rem 0',
									}}></div>
							</Grid>
						</Grid>

						<p>Details</p>
						<Grid
							container
							spacing={2}>
							<Grid
								item
								xs={4}>
								<p>
									Name of Plan:
									{selectedPlan?.planName}
								</p>
							</Grid>
							{/* <Grid item xs={4}>
              <p>Plan Type: Test Plan</p>
            </Grid> */}
							<Grid
								item
								xs={4}>
								<p>
									Plan Category:
									{selectedPlan?.planCategory}
								</p>
							</Grid>
							{/* <Grid item xs={4}>
              <p>Premium Amount: 20,000</p>
            </Grid> */}
							<Grid
								item
								xs={4}>
								<p>
									Premium per Person per Annum : ₦
									{selectedPlan?.premiums[0]?.individualPremium}
								</p>
							</Grid>
							<Grid
								item
								xs={4}>
								<p>
									Premium per Family per Annum : ₦
									{selectedPlan?.premiums[0]?.familyPremium}
								</p>
							</Grid>
							<Grid
								item
								xs={4}>
								<p>Provider Network: {selectedPlan?.providerNetwork[0]}</p>
							</Grid>
							<Grid
								item
								xs={4}>
								<p>
									Coverage Area: {selectedPlan?.covrageArea.map((item) => item)}
								</p>
							</Grid>
						</Grid>
					</div>
				)}
				<div
					style={{
						width: '100%',
						height: 'auto',
						overflow: 'auto',
						marginTop: '1rem',
					}}>
					<FormsHeaderText text={'Benefit'} />
					<CustomTable
						tableData={''}
						columns={productItemSchema}
						data={selectedPlan?.contracts}
						pointerOnHover
						highlightOnHover
						striped
					/>
				</div>
			</div>
		</>
	);
}
