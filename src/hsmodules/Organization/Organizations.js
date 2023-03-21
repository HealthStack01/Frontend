import {Box, Grid, Typography} from '@mui/material';
import dayjs from 'dayjs';
import {useState, useEffect, useContext, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import CustomTable from '../../components/customtable';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import {FormsHeaderText} from '../../components/texts';
import FilterMenu from '../../components/utilities/FilterMenu';
import {ObjectContext, UserContext} from '../../context';
import client from '../../feathers';
import {TableMenu} from '../../ui/styled/global';
import OrganizationBankAccount from './OrganizationBankAccount';
import EditIcon from '@mui/icons-material/Edit';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import {toast} from 'react-toastify';
import ModalBox from '../../components/modal';
import CheckboxGroup from '../../components/inputs/basic/Checkbox/CheckBoxGroup';
import {facilityTypes} from '../app/facility-types';
import {Nigeria} from '../app/Nigeria';
//import {OrganizationList} from "../ManagedCare/HIA";
import ViewCard from '../dashBoardUiComponent/@modules/@sections/ViewCard';

const OrganizationsPage = () => {
	const [tab, setTab] = useState('list');
	const [selectedOrganization, setSelectedOrganization] = useState(null);

	const handleShowOrgDetail = org => {
		setSelectedOrganization(org);
		setTab('detail');
	};

	return (
		<Box>
			{tab === 'list' && (
				<OrganizationsList selectOrganization={handleShowOrgDetail} />
			)}

			{tab === 'detail' && (
				<OrganizationDetails
					organization={selectedOrganization}
					goBack={() => setTab('list')}
				/>
			)}
		</Box>
	);
};

export default OrganizationsPage;

export const OrganizationsList = ({selectOrganization}) => {
	const facilityServ = client.service('facility');
	const [facilities, setFacilities] = useState([]);
	const [loading, setLoading] = useState(false);
	const {state, setState} = useContext(ObjectContext);

	const getFacilities = () => {
		setLoading(true);
		facilityServ
			.find({
				query: {
					$limit: 200,
					$sort: {
						createdAt: -1,
					},
				},
			})
			.then(res => {
				// console.log(res);
				setFacilities(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.log(err);
				setLoading(false);
			});
	};

	// const handleSearch = () => {};

	const handleSearch = val => {
		//console.log(val);
		facilityServ
			.find({
				query: {
					$or: [
						{
							facilityName: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							facilityOwner: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							facilityType: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							facilityCategory: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							facilityContactPhone: {
								$regex: val,
								$options: 'i',
							},
						},
						{
							facilityEmail: {
								$regex: val,
								$options: 'i',
							},
						},
					],

					$limit: 100,
					$sort: {
						createdAt: -1,
					},
				},
			})
			.then(res => {
				console.log(res);
				setFacilities(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		getFacilities();

		facilityServ.on('created', obj => getFacilities());
		facilityServ.on('updated', obj => getFacilities());
		facilityServ.on('patched', obj => getFacilities());
		facilityServ.on('removed', obj => getFacilities());
		return () => {};
	}, []);

	const facilitiesColumns = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'SN',
			selector: (row, i) => i + 1,
			sortable: true,
			inputType: 'HIDDEN',
			width: '60px',
		},
		{
			name: 'Organization Name',
			key: 'sn',
			description: 'Enter name of Company',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row?.facilityName}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				color: '#1976d2',
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Organization Owner',
			key: 'sn',
			description: 'Enter name of Company',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row?.facilityOwner}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Date Created',
			key: 'phone',
			description: 'Enter name of Company',
			selector: row => dayjs(row.createdAt).format('DD/MM/YYYY'),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Organization Type',
			key: 'phone',
			description: 'Enter name of Company',
			selector: row => row?.facilityType,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Category',
			key: 'phone',
			description: 'Enter name of Company',
			selector: row => row?.facilityCategory,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Phone Number',
			key: 'sn',
			description: 'Enter name of Company',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row?.facilityContactPhone}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Email Address',
			key: 'sn',
			description: 'Enter name of Company',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row?.facilityEmail}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Status',
			key: 'phone',
			description: 'Enter name of Company',
			selector: row => (row?.active ? 'Active' : 'Inactive'),
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			style: {
				textTransform: 'capitalize',
			},
		},
	];

	const handleRow = facility => {
		setState(prev => ({
			...prev,
			OrganizationModule: {
				...prev.OrganizationModule,
				selectedOrganization: facility,
			},
		}));
		selectOrganization(facility);
	};

	const conditionalRowStyles = [
		{
			when: row => !row.active,
			style: {
				backgroundColor: '#ffe3e0',
				color: 'white',
				'&:hover': {
					cursor: 'pointer',
				},
			},
		},
	];

	return (
		<Box
			pl={2}
			pr={2}>
			<TableMenu>
				<div style={{display: 'flex', alignItems: 'center'}}>
					{handleSearch && (
						<div className='inner-table'>
							<FilterMenu onSearch={handleSearch} />
						</div>
					)}
					<h2 style={{marginLeft: '10px', fontSize: '0.95rem'}}>
						List of Organizations on Healthstack
					</h2>
				</div>
			</TableMenu>

			<Box
				sx={{
					width: '100%',
					height: 'calc(100vh - 170px)',
					overflowY: 'auto',
				}}>
				<CustomTable
					title={''}
					columns={facilitiesColumns}
					data={facilities}
					pointerOnHover
					highlightOnHover
					striped
					onRowClicked={handleRow}
					progressPending={loading}
					conditionalRowStyles={conditionalRowStyles}
				/>
			</Box>
		</Box>
	);
};

export const OrganizationDetails = ({organization, goBack}) => {
	const facilityServer = client.service('facility');
	const {register, reset, handleSubmit, control, watch, setValue} = useForm();
	const {user, setUser} = useContext(UserContext);
	const {state, setState, showActionLoader, hideActionLoader} =
		useContext(ObjectContext);
	const [facility, setFacility] = useState({});
	const [edit, setEdit] = useState(false);
	const [logoAnchorEl, setLogoAnchorEl] = useState(null);
	const [modulesModal, setModulesModal] = useState(false);
	const [statsModal, setstatsModal] = useState(false);
	const [logoUploadModal, setLogoUploadModal] = useState(false);
	const [selectedType, setSelectedType] = useState(null);
	const [selectedState, setSelectedState] = useState(null);

	const currentOrganization = state.OrganizationModule.selectedOrganization;

	const facTypes = facilityTypes
		.map(item => item.type)
		.sort((a, b) => a.localeCompare(b));

	const type = watch('facilityType');

	useEffect(() => {
		setSelectedType(facilityTypes.find(item => item.type === type));
		setValue('facilityCategory', '');
	}, [type]);

	const states = Nigeria.map(obj => obj.state);

	//alphabetically arrange state
	const sortedStates = states.sort((a, b) => a.localeCompare(b));

	const watchedState = watch('facilityState');

	useEffect(() => {
		setSelectedState(Nigeria.find(item => item.state === watchedState));
		setValue('facilityCity', '');
		setValue('facilityLGA', '');
	}, [watchedState]);

	const getCurrentFacility = useCallback(async () => {
		showActionLoader();
		//console.log(user);
		const id = currentOrganization._id;
		await facilityServer
			.get(id)
			.then(resp => {
				console.log(resp);
				hideActionLoader();
				setFacility(resp);
				reset(resp);

				//console.log(resp);
			})
			.catch(err => {
				hideActionLoader();
				console.log(err);
			});
	}, []);

	useEffect(() => {
		getCurrentFacility();

		facilityServer.on('created', obj => getCurrentFacility());
		facilityServer.on('updated', obj => getCurrentFacility());
		facilityServer.on('patched', obj => getCurrentFacility());
		facilityServer.on('removed', obj => getCurrentFacility());

		return () => {};
	}, [getCurrentFacility]);

	const updateOrganization = async data => {
		showActionLoader();
		const employee = user.currentEmployee;
		const prevOrgDetail = currentOrganization;
		//console.log(prevOrgDetail);

		const newOrgDetail = {
			...prevOrgDetail,
			...data,
			updatedAt: dayjs(),
			updatedBy: employee.userId,
			updatedByName: `${employee.firstname} ${employee.lastname}`,
		};


		const documentId = prevOrgDetail._id;

		await facilityServer
			.patch(documentId, {...newOrgDetail})
			.then(resp => {
				reset(resp);
				setFacility(resp);
				hideActionLoader();

				setEdit(false);
				toast.success("You've succesfully updated your Organization Details");
			})
			.catch(error => {
				toast.error(`Error Updating your oragnization Details ${error}`);
				hideActionLoader();
				console.error(error);
			});
	};

	return (
		<Box pt={2}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				pl={2}
				pr={2}>
				<ModalBox
					open={modulesModal}
					onClose={() => setModulesModal(false)}
					header={`Organization Modules for ${currentOrganization.facilityName}`}>
					<OrganizationModules closeModal={() => setModulesModal(false)} />
				</ModalBox>


				<Box
					sx={{
						display: 'flex',
						gap: 2,
					}}>
					<FormsHeaderText text='Organization Detail' />
					<GlobalCustomButton onClick={goBack}>Go Back</GlobalCustomButton>
				</Box>

				<Box
					sx={{
						display: 'flex',
						gap: 2,
					}}>
				    <GlobalCustomButton onClick={() => setstatsModal(true)}>view Stats</GlobalCustomButton>
					<GlobalCustomButton
						color='secondary'
						onClick={() => setModulesModal(true)}>
						<AutoStoriesIcon
							sx={{marginRight: '5px'}}
							fontSize='small'
						/>
						Organization Modules
					</GlobalCustomButton>

					<GlobalCustomButton color='info'>
						<PeopleAltIcon
							sx={{marginRight: '5px'}}
							fontSize='small'
						/>{' '}
						Organization Employees
					</GlobalCustomButton>

					{!edit ? (
						<GlobalCustomButton onClick={() => setEdit(true)}>
							<EditIcon fontSize='small' />
							Edit Organization
						</GlobalCustomButton>
					) : (
						<>
							<GlobalCustomButton
								color='error'
								onClick={() => setEdit(false)}>
								{/* <EditIcon fontSize="small" /> */}
								Cancel Edit
							</GlobalCustomButton>

							<GlobalCustomButton
								color='success'
								onClick={handleSubmit(updateOrganization)}>
								{/* <EditIcon fontSize="small" /> */}
								Update Organaization
							</GlobalCustomButton>
						</>
					)}
				</Box>
			</Box>

			<Box p={2}>
				<Grid
					container
					spacing={2}
					mb={2}>
					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<Input
							register={register('facilityOwner')}
							label='Organization Owner'
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<Input
							register={register('facilityName')}
							label='Organization Name'
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<Input
							register={register('facilityContactPhone')}
							label='Phone Number'
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<Input
							register={register('facilityEmail')}
							label='Email Address'
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<CustomSelect
							label='Organization Type'
							control={control}
							name='facilityType'
							//errorText={errors?.facilityType?.message}
							options={facTypes}
							disabled={!edit}
							important
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						<CustomSelect
							label='Organization Category'
							control={control}
							name='facilityCategory'
							//required={"Select Organization Category"}
							// errorText={errors?.facilityCategory?.message}
							options={
								selectedType
									? selectedType?.categories?.sort((a, b) => a.localeCompare(b))
									: []
							}
							important
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={8}
						md={8}
						sm={12}
						xs={12}>
						<Input
							register={register('facilityAddress')}
							label='Organization Address'
							disabled={!edit}
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						{/* <Input
              register={register("facilityCountry")}
              label="Country"
              disabled={!edit}
            /> */}
						<CustomSelect
							label='Country'
							control={control}
							name='facilityCountry'
							//errorText={errors?.facilityCountry?.message}
							options={['Nigeria']}
							disabled={!edit}
							important
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						{/* <Input
              register={register("facilityState")}
              label="State"
              disabled={!edit}
            /> */}
						<CustomSelect
							label='State'
							control={control}
							name='facilityState'
							//errorText={errors?.facilityState?.message}
							options={sortedStates}
							disabled={!edit}
							important
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						{/* <Input
              register={register("facilityLGA")}
              label="LGA"
              disabled={!edit}
            /> */}

						<CustomSelect
							label='LGA'
							control={control}
							name='facilityLGA'
							disabled={!edit}
							//errorText={errors?.facilityLGA?.message}
							options={
								selectedState
									? selectedState.lgas.sort((a, b) => a.localeCompare(b))
									: []
							}
							important
						/>
					</Grid>

					<Grid
						item
						lg={4}
						md={6}
						sm={6}
						xs={12}>
						{/* <Input
              register={register("facilityCity")}
              label="City"
              disabled={!edit}
            /> */}

						<CustomSelect
							label='City'
							control={control}
							name='facilityCity'
							//  errorText={errors?.facilityCity?.message}
							options={
								selectedState
									? selectedState.lgas.sort((a, b) => a.localeCompare(b))
									: []
							}
							important
							disabled={!edit}
						/>
					</Grid>
				</Grid>
			</Box>

			<Box p={2}>
				<OrganizationBankAccount />
			</Box>
		</Box>
	);
};

export const OrganizationModules = ({closeModal}) => {
	const facilityServer = client.service('facility');
	const {control, reset, handleSubmit, setValue} = useForm();
	const {state, setState, showActionLoader, hideActionLoader} =
		useContext(ObjectContext);
	const {user, setUser} = useContext(UserContext);

	const currentOrganization = state.OrganizationModule.selectedOrganization;

	const modulelist = [
		'Accounting',
		'Admin',
		'Appointments',
		'Appt. Workflow',
		'Blood Bank',
		'Client',
		'Clinic',

		'Communication',
		'Complaints',
		'Corporate',
		'CRM',
		'Epidemiology',
		'Finance',
		'Immunization',
		'Inventory',
		'Laboratory',
		'Managed Care',
		'Market Place',
		'Patient Portal',
		'Pharmacy',
		'Radiology',
		'Referral',
		'Theatre',
		'Ward',
		'Engagement',
	];

	useEffect(() => {
		//hideActionLoader();
		const prevModules = currentOrganization.facilityModules || [];
		setValue('modules', prevModules);
	}, []);

	const updateModules = async data => {
		showActionLoader();
		const employee = user.currentEmployee;
		const prevOrgDetail = currentOrganization;
		//console.log(prevOrgDetail);

		const newOrgDetail = {
			...prevOrgDetail,
			updatedAt: dayjs(),
			updatedBy: employee.userId,
			updatedByName: `${employee.firstname} ${employee.lastname}`,
			facilityModules: data.modules,
		};

		//return console.log(newOrgDetail);

		const documentId = prevOrgDetail._id;

		await facilityServer
			.patch(documentId, {...newOrgDetail})
			.then(resp => {
				console.log(resp);
				hideActionLoader();
				// setUser(prev => ({
				//   ...prev,
				//   currentEmployee: {
				//     ...prev.currentEmployee,
				//     facilityDetail: newOrgDetail,
				//   },
				// }));
				toast.success("You've succesfully updated your Organization Modules");
			})
			.catch(error => {
				toast.error(`Error Updating your oragnization modules ${error}`);
				hideActionLoader();
				console.error(error);
			});
	};

	return (
		<Box sx={{width: '60vw'}}>
			<Box>
				<CheckboxGroup
					name='modules'
					control={control}
					options={modulelist}
					row
				/>
			</Box>

			<Box
				sx={{display: 'flex'}}
				gap={2}>
				<GlobalCustomButton
					color='error'
					onClick={closeModal}>
					Cancel
				</GlobalCustomButton>

				<GlobalCustomButton onClick={handleSubmit(updateModules)}>
					Update Modules
				</GlobalCustomButton>
			</Box>
		</Box>
	);
};
