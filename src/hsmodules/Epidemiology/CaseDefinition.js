/* eslint-disable */
import React, {
	useState,
	useContext,
	useEffect,
	useRef,
	useCallback,
} from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
// import { format, formatDistanceToNowStrict } from 'date-fns';
// import ReportCreate from './ReportCreate';
// import PatientProfile from '../Client/PatientProfile';
// import { clinicalSignSchema, syptomSchema, labSchema } from './schema';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};
import { clinicalSignSchema, syptomSchema, labSchema } from './schema';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
// import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import CustomSelect from '../../components/inputs/basic/Select';
import TextArea from '../../components/inputs/basic/Textarea';
// import ModalBox from '../../components/modal';
import { Box } from '@mui/material';
import {
	// GrayWrapper,
	// DetailsWrapper,
	// GridWrapper,
	// BottomWrapper,
	PageWrapper,
} from './styles';
import Input from '../../components/inputs/basic/Input';
// import DataTable from 'react-data-table-component';
// import CheckboxInput from '../../components/inputs/basic/Checkbox';
// import CaseDefinitionForm from './CaseDefinationForm';
// import CaseDefinitionView from './CaseDefinationView';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ModalBox from '../../components/modal';
import { FormsHeaderText } from '../../components/texts';
import Textarea from '../../components/inputs/basic/Textarea';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdOutlineUpdate, MdEdit } from 'react-icons/md';
import CreateIcon from '@mui/icons-material/Create';

// import { TextArea } from 'semantic-ui-react';

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function CaseDefinition() {
	//const {state}=useContext(ObjectContext) //,setState
	// eslint-disable-next-line
	const [selectedProductEntry, setSelectedProductEntry] = useState();
	//const [showState,setShowState]=useState() //create|modify|detail
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	const BillServ = client.service('casedefinition');
	//const navigate=useNavigate()
	// const {user,setUser} = useContext(UserContext)
	const [facilities, setFacilities] = useState([]);
	// eslint-disable-next-line
	const [selectedOrders, setSelectedOrders] = useState([]); //
	// eslint-disable-next-line
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const { user, setUser } = useContext(UserContext);
	// const [modal, setModal] = useState(false);

	// const handleCloseCreateModal = () => {
	//   setModal(false);
	// };
	// const handleOpenCreateModal = () => {
	//   setModal(true);
	// };
	const [createModal, setCreateModal] = useState(false);
	const [detailModal, setDetailModal] = useState(false);
	const [modifyModal, setModifyModal] = useState(false);

	const handleShowDetailModal = () => {
		setDetailModal(true);
	};

	const handleHideDetailModal = () => {
		setDetailModal(false);
	};
	const handleCreateModal = () => {
		setCreateModal(true);
	};

	const handleHideCreateModal = () => {
		setCreateModal(false);
	};
	const handleModifyModal = () => {
		setModifyModal(true);
	};

	const handleHideModifyModal = () => {
		setModifyModal(false);
	};

	return (
		<section className='section remPadTop'>
			{/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

			<CaseDefinitionList
				showCreateModal={handleCreateModal}
				showDetailModal={handleShowDetailModal}
			/>

			<ModalBox
				width='75vw'
				overflow='hidden'
				open={createModal}
				onClose={handleHideCreateModal}
				header='Create CaseDefinition'>
				<CaseDefinitionCreate />
			</ModalBox>

			<ModalBox
				width='75vw'
				open={detailModal}
				onClose={handleHideDetailModal}
				header='CaseDefinition Detail'>
				<CaseDefinitionDetail showModifyModal={handleModifyModal} />
			</ModalBox>

			<ModalBox
				width='75vw'
				open={modifyModal}
				onClose={handleHideModifyModal}
				header='CaseDefinition Modify'>
				<CaseDefinitionModify />
			</ModalBox>
		</section>
	);
}

export function CaseDefinitionCreate() {
	const { register, handleSubmit, setValue, control } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const BandServ = client.service('casedefinition');
	//const history = useHistory()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const notificationTypeOptions = [
		'Immediate Notification',
		'Weekly',
		'Monthly',
	];
	const notifierOptions = [
		'Facility Focal Person',
		'DSNO',
		'Asst DSNO',
		'State Epidemiologist',
	];

	const [finding, setFinding] = useState('');
	const [findings, setFindings] = useState([]);
	const [findingreq, setFindingreq] = useState(false);

	const [symptom, setSymptom] = useState('');
	const [symptoms, setSymptoms] = useState([]);
	const [duration, setDuration] = useState('');
	const [sympreq, setSympreq] = useState(false);

	const [lab, setLab] = useState('');
	const [labs, setLabs] = useState([]);
	const [labvalue, setLabvalue] = useState('');
	/* const [sympreq,setSympreq] = useState(false) */
	const [observations, setObservations] = useState([]);
	const [mgtProtocol, setMgtProtocol] = useState('');
	const [notified, setNotified] = useState('');

	const getSearchfacility = (obj) => {
		setValue('facility', obj._id, {
			shouldValidate: true,
			shouldDirty: true,
		});
	};

	useEffect(() => {
		setCurrentUser(user);
		//console.log(currentUser)
		return () => {};
	}, [user]);

	//check user for facility or get list of facility
	useEffect(() => {
		//setFacility(user.activeBand.FacilityId)//
		if (!user.stacker) {
			setValue('facility', user.currentEmployee.facilityDetail._id, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	});
	const handleChecked = (e) => {
		// console.log(e.target.checked)
		setSympreq(e.target.checked);
	};

	const handleChecked2 = (e) => {
		// console.log(e.target.checked)
		setFindingreq(e.target.checked);
	};

	const onSubmit = async (data, e) => {
		e.preventDefault();
		/*  data.Presenting_Complaints=symptoms
      data.Clinical_Findings=findings */
		//data.LaboratoryConfirmation=labconfirms
		data.observations = [];
		data.disease = {
			name: data.disease,
			icdcode: '',
			icdver: '',
			snomed: '',
			snomedver: '',
		};

		if (data.notificationtype === '') {
			alert('Kindly choose notification type');
			return;
		}
		if (symptoms.length > 0) {
			let sympcollection = [];
			symptoms.forEach((el) => {
				let obs = {
					category: 'symptoms',
					name: el.symptom,
					duration: el.duration,
					/* note:"",
                  snomed:"" ,
                  response:"" , */
					required: el.sympreq,
					/* value:""  */
				};
				console.log(obs);
				sympcollection.push(obs);
				console.log(sympcollection);
			});
			data.observations = [...data.observations, ...sympcollection];
		}
		if (findings.length > 0) {
			let findingscollection = [];
			findings.forEach((el) => {
				let obs = {
					category: 'Signs',
					name: el.finding,
					/*  duration:el.duration , */
					/* note:"",
                  snomed:"" ,
                  response:"" , */
					required: el.findingreq,
					/* value:""  */
				};
				findingscollection.push(obs);
			});
			data.observations = [...data.observations, ...findingscollection];
		}
		if (labs.length > 0) {
			let labscollection = [];
			labs.forEach((el) => {
				let obs = {
					category: 'Laboratory',
					name: el.lab,
					/*  duration:el.duration , */
					/* note:"",
                  snomed:"" ,
                  response:"" , */
					/*  required:el.findingreq, */
					value: el.labvalue,
				};
				labscollection.push(obs);
			});
			data.observations = [...data.observations, ...labscollection];
		}
		let notifiedlist = [];
		notifiedlist.push(data.notifiedPerson);
		console.log(notifiedlist);
		data.notification_destination = notifiedlist[0];
		data.treatmentprotocol = mgtProtocol;
		// await setObservations((prev)=>([...prev, symp]))
		setMessage('');
		setError(false);
		setSuccess(false);
		// data.createdby=user._id
		console.log(data);
		if (user.currentEmployee) {
			data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
		}
		BandServ.create(data)
			.then((res) => {
				//console.log(JSON.stringify(res))
				e.target.reset();
				/*  setMessage("Created Band successfully") */
				setSuccess(true);
				/*   setAllergies([]) */
				setSymptoms([]);
				setFindings([]);
				setLabs([]);
				setMgtProtocol([]);
				toast({
					message: 'Band created succesfully',
					type: 'is-success',
					dismissible: true,
					pauseOnHover: true,
				});
				setSuccess(false);
			})
			.catch((err) => {
				toast({
					message: 'Error creating Band ' + err,
					type: 'is-danger',
					dismissible: true,
					pauseOnHover: true,
				});
			});
	};
	const handleAddSymptoms = () => {
		let newsymptom = {
			symptom,
			duration,
			sympreq,
		};
		console.log(newsymptom);
		setSymptoms((prev) => [...prev, newsymptom]);
		// setAllergy({})
		setSymptom('');
		setDuration('');
		setSympreq(false);
	};
	const handleAddFindings = () => {
		let newFinding = {
			finding,
			findingreq,
		};
		console.log(newFinding);
		setFindings((prev) => [...prev, newFinding]);
		// setAllergy({})
		setFinding('');
		setFindingreq(false);
	};
	const handleAddLabs = () => {
		let newLabs = {
			lab,
			labvalue,
		};
		console.log(newLabs);
		setLabs((prev) => [...prev, newLabs]);
		// setAllergy({})
		setLab('');
		setLabvalue('');
		/*  setFindingreq(false) */
	};
	const onDelete = (comp, i) => {
		//console.log(comp,i)
		setSymptoms((prevstate) => prevstate.filter((el, index) => index !== i));
	};
	const onDeleteFinding = (comp, i) => {
		//console.log(comp,i)
		setFindings((prevstate) => prevstate.filter((el, index) => index !== i));
	};
	const onDeleteLab = (comp, i) => {
		//console.log(comp,i)
		setLabs((prevstate) => prevstate.filter((el, index) => index !== i));
	};

	return (
		<>
			<form>
				<Box
					display='flex'
					justifyContent='flex-end'
					mb={2}>
					<GlobalCustomButton
						onClick={handleSubmit(onSubmit)}
						// onClick={showCreateModal}
					>
						<AddCircleOutline
							sx={{ marginRight: '5px' }}
							fontSize='small'
						/>
						Create
					</GlobalCustomButton>
				</Box>
				<Grid
					container
					gap='1rem'
					alignItems='center'>
					<Grid xs={3}>
						<Input
							register={register('disease', { required: true })}
							name='disease'
							type='text'
							label='Name of Disease'
						/>
					</Grid>
					<Grid xs={6}>
						<Input
							register={register('symptoms', { required: true })}
							name='symptoms'
							type='text'
							label='Symptoms'
						/>
					</Grid>
					<Grid xs={6}>
						<Input
							register={register('casedefinition', { required: true })}
							name='casedefinition'
							type='text'
							label='Case definition'
						/>
					</Grid>
					<Grid xs={4}>
						<Input
							register={register('signs', { required: true })}
							name='signs'
							type='text'
							label='Signs'
						/>
					</Grid>
					<Grid xs={5}>
						<Input
							register={register('lab', { required: true })}
							name='lab'
							type='text'
							label='Laboratory Confirmation'
						/>
					</Grid>
					<Grid xs={5}>
						<Input
							register={register('management', { required: true })}
							name='management'
							type='text'
							label='Management Protocol'
						/>
					</Grid>
					<Grid xs={4}>
						<CustomSelect
							label='Choose Person to Notify'
							name='notify'
							options={notifierOptions}
							register={register('notify')}
							control={control}
						/>
					</Grid>
					<Grid xs={4}>
						<CustomSelect
							label='Choose Notification Type'
							name='notificationType'
							options={notificationTypeOptions}
							register={register('notificationType')}
							control={control}
						/>
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function CaseDefinitionList({ showCreateModal, showDetailModal }) {
	// const { register, handleSubmit, watch, errors } = useForm();
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	const BandServ = client.service('casedefinition');
	//const navigate=useNavigate()
	// const {user,setUser} = useContext(UserContext)
	const [facilities, setFacilities] = useState([]);
	const [loading, setLoading] = useState(false);
	// eslint-disable-next-line
	const [selectedBand, setSelectedBand] = useState(); //
	// eslint-disable-next-line
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const { user, setUser } = useContext(UserContext);
	const [selectedUser, setSelectedUser] = useState();
	const [open, setOpen] = useState(false);

	//console.log('Case Defination>>>>', selectedUser);
	// const handleRowClicked = row => {
	//   setSelectedUser(row);
	//   setOpen(true);
	// };

	const handleCloseModal = () => {
		setOpen(false);
	};
	const handleCreateNew = async () => {
		const newBandModule = {
			selectedEpid: {},
			show: 'create',
		};
		await setState((prevstate) => ({
			...prevstate,
			EpidemiologyModule: newBandModule,
		}));
		openCreateModal();
		//console.log(state)
	};
	const handleRow = async (Band) => {
		//console.log("b4",state)

		//console.log("handlerow",Band)

		// await setSelectedBand(Band);

		// const newBandModule = {
		// 	selectedEpid: Band,
		// 	show: 'detail',
		// };
		// await setState((prevstate) => ({
		// 	...prevstate,
		// 	EpidemiologyModule: newBandModule,
		// }));
		// console.log(newBandModule);
		showDetailModal();
	};

	const handleSearch = (val) => {
		const field = 'disease.name';
		console.log(val);
		BandServ.find({
			query: {
				[field]: {
					$regex: val,
					$options: 'i',
				},
				facility: user.currentEmployee.facilityDetail._id || '',
				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				console.log(res);
				setFacilities(res.data);
				setMessage(' Band  fetched successfully');
				setSuccess(true);
			})
			.catch((err) => {
				console.log(err);
				setMessage('Error fetching Band, probable network issues ' + err);
				setError(true);
			});
	};

	const getFacilities = async () => {
		setLoading(true);
		if (user.currentEmployee) {
			const findBand = await BandServ.find({
				query: {
					facility: user.currentEmployee.facilityDetail._id,
					$limit: 200,
					$sort: {
						createdAt: -1,
					},
				},
			});

			await setFacilities(findBand.data);
			setLoading(false);
		} else {
			if (user.stacker) {
				const findBand = await BandServ.find({
					query: {
						$limit: 200,
						$sort: {
							facility: -1,
						},
					},
				});

				await setFacilities(findBand.data);
				setLoading(false);
			}
		}
		/*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Band  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Band, probable network issues "+ err )
                    setError(true)
                }) */
	};

	useEffect(() => {
		return () => {};
	}, []);

	useEffect(() => {
		if (user) {
			getFacilities();
		} else {
			/* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
		}
		BandServ.on('created', (obj) => getFacilities());
		BandServ.on('updated', (obj) => getFacilities());
		BandServ.on('patched', (obj) => getFacilities());
		BandServ.on('removed', (obj) => getFacilities());
		return () => {};
	}, []);

	const caseDefinitionData = [
		{
			diseaseName: 'Chikungunya',
			symptoms: 'Fever',
			casedefinition: 'Fever and severe athritis',
			signs: 'acute onset of fever',
			lab: 'For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper',
			management: 'it is rarely life-threatening',
			notify: 'Asst DSNO',
			notificationtype: 'Weekly',
		},
		{
			diseaseName: 'Chikungunya',
			symptoms: 'Fever',
			casedefinition: 'Fever and severe athritis',
			signs: 'acute onset of fever',
			lab: 'For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper',
			management: 'it is rarely life-threatening',
			notify: 'Asst DSNO',
			notificationtype: 'Weekly',
		},
		{
			diseaseName: 'Chikungunya',
			symptoms: 'Fever',
			casedefinition: 'Fever and severe athritis',
			signs: 'acute onset of fever',
			lab: 'For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper',
			management: 'it is rarely life-threatening',
			notify: 'Asst DSNO',
			notificationtype: 'Weekly',
		},
		{
			diseaseName: 'Chikungunya',
			symptoms: 'Fever',
			casedefinition: 'Fever and severe athritis',
			signs: 'acute onset of fever',
			lab: 'For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper',
			management: 'it is rarely life-threatening',
			notify: 'Asst DSNO',
			notificationtype: 'Weekly',
		},
		{
			diseaseName: 'Chikungunya',
			symptoms: 'Fever',
			casedefinition: 'Fever and severe athritis',
			signs: 'acute onset of fever',
			lab: 'For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper',
			management: 'it is rarely life-threatening',
			notify: 'Asst DSNO',
			notificationtype: 'Weekly',
		},
	];

	//todo: pagination and vertical scroll bar
	const caseDefinitionSchema = [
		{
			name: 'S/NO',
			key: 'sn',
			description: 'Enter name of Disease',
			selector: (row) => row.sn,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
			width: '70px',
		},
		{
			name: 'Name of Disease',
			key: 'name',
			description: 'Enter name of Disease',
			selector: (row) => row.diseaseName,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Symptoms',
			key: 'symptoms',
			description: 'Enter Symptoms',
			selector: (row) => row.symptoms,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Case Definition',
			key: 'casedefinition',
			description: 'Enter Case Definition',
			selector: (row) => row.casedefinition,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Signs',
			key: 'signs',
			description: 'Enter Signs',
			selector: (row) => row.signs,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Laboratory Confirmation',
			key: 'laboratory confirmation',
			description: 'Enter Laboratory Confirmation',
			selector: (row) => row.lab,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Management Protocol',
			key: 'management protocol',
			description: 'Enter Management Protocol',
			selector: (row) => row.management,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Person To Notify',
			key: 'notify',
			description: 'Enter Person To Notify',
			selector: (row) => row.notify,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Notification Type',
			key: 'notificationtype',
			description: 'Enter Notification Type',
			selector: (row) => row.notificationtype,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

	// console.log(facilities);

	return (
		<>
			{user ? (
				<>
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
									Case Definitions
								</h2>
							</div>

							{handleCreateNew && (
								<GlobalCustomButton onClick={showCreateModal}>
									<AddCircleOutline
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Add New
								</GlobalCustomButton>
							)}
						</TableMenu>

						<div
							style={{
								width: '100%',
								height: 'calc(100vh - 170px)',
								overflow: 'auto',
							}}>
							<CustomTable
								title={''}
								columns={caseDefinitionSchema}
								data={caseDefinitionData}
								pointerOnHover
								highlightOnHover
								striped
								onRowClicked={handleRow}
								// onRowClicked={handleRowClicked}
								progressPending={loading}
							/>
						</div>
					</PageWrapper>
				</>
			) : (
				<div>loading</div>
			)}
		</>
	);
}

export function CaseDefinitionDetail({ showModifyModal, casedefinition }) {
	const { register, control } = useForm(); //errors,
	// eslint-disable-next-line
	const [editing, setEditing] = useState(false); //,
	//const [success, setSuccess] =useState(false)
	// eslint-disable-next-line
	const [message, setMessage] = useState(''); //,
	//const BandServ=client.service('/Band')
	//const navigate=useNavigate()
	//const {user,setUser} = useContext(UserContext)
	const { state, setState } = useContext(ObjectContext);
	const notificationTypeOptions = [
		'Immediate Notification',
		'Weekly',
		'Monthly',
	];
	const notifierOptions = [
		'Facility Focal Person',
		'DSNO',
		'Asst DSNO',
		'State Epidemiologist',
	];

	const Band = state.EpidemiologyModule.selectedEpid;

	const handleEdit = async () => {
		const newBandModule = {
			EpidemiologyModule: Band,
			show: 'modify',
		};
		await setState((prevstate) => ({
			...prevstate,
			EpidemiologyModule: newBandModule,
		}));

		//console.log(state)
		showModifyModal();
	};

	return (
		<>
			<Box
				display='flex'
				gap='2rem'
				justifyContent='flex-end'
				alignItems='center'
				mb='2rem'>
				<GlobalCustomButton
					onClick={() => setConfirmDialog(true)}
					color='error'>
					<DeleteIcon
						fontSize='small'
						sx={{ marginRight: '5px' }}
					/>
					Delete
				</GlobalCustomButton>

				{!editing ? (
					<GlobalCustomButton
						onClick={() => {
							setEditing(!editing);
						}}>
						<CreateIcon
							fontSize='small'
							sx={{ marginRight: '5px' }}
						/>
						Edit
					</GlobalCustomButton>
				) : (
					<GlobalCustomButton
						color='success'
						type='submit'>
						<MdOutlineUpdate
							sx={{ marginRight: '5px' }}
							fontSize='bold'
						/>
						Update
					</GlobalCustomButton>
				)}
			</Box>
			<form>
				<Grid
					container
					gap='1rem'
					alignItems='center'>
					{!editing ? (
						<Grid xs={3}>
							<Input
								register={register('disease', { required: true })}
								name='disease'
								defaultValue='Chikungunya'
								label='Name of Disease'
							/>
						</Grid>
					) : (
						<Grid xs={3}>
							<Input
								register={register('disease', { required: true })}
								name='disease'
								type='text'
								label='Name of Disease'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid xs={6}>
							<Input
								register={register('symptoms', { required: true })}
								name='symptoms'
								defaultValue='Fever'
								label='Symptoms'
							/>
						</Grid>
					) : (
						<Grid xs={6}>
							<Input
								register={register('symptoms', { required: true })}
								name='symptoms'
								type='text'
								label='Symptoms'
							/>
						</Grid>
					)}

					{!editing ? (
						<Grid xs={6}>
							<Input
								register={register('casedefinition', { required: true })}
								name='casedefinition'
								defaultValue='Fever and severe athritis'
								label='Case Definition'
							/>
						</Grid>
					) : (
						<Grid xs={6}>
							<Input
								register={register('casedefinition', { required: true })}
								name='casedefinition'
								type='text'
								label='Case Definition'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid xs={4}>
							<Input
								register={register('signs', { required: true })}
								name='signs'
								defaultValue='acute onset of fever'
								label='Signs'
							/>
						</Grid>
					) : (
						<Grid xs={4}>
							<Input
								register={register('signs', { required: true })}
								name='signs'
								type='text'
								label='Signs'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid xs={5}>
							<Input
								register={register('lab', { required: true })}
								name='lab'
								defaultValue='For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper'
								label='Laboratory Confirmation'
							/>
						</Grid>
					) : (
						<Grid xs={5}>
							<Input
								register={register('lab', { required: true })}
								name='lab'
								type='text'
								label='Laboratory Confirmation'
							/>
						</Grid>
					)}

					{!editing ? (
						<Grid xs={5}>
							<Input
								register={register('management', { required: true })}
								name='management'
								defaultValue='For isolation and RT_PCR:Store at -80 or trnsport in fully charged dry shipper'
								label='Management Protocol'
							/>
						</Grid>
					) : (
						<Grid xs={5}>
							<Input
								register={register('management', { required: true })}
								name='management'
								type='text'
								label='Management Protocol'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid xs={5}>
							<CustomSelect
								label='Choose Person to Notify'
								name='notify'
								options={notifierOptions}
								defaultValue='Asst DSNO'
								register={register('notify')}
							/>
						</Grid>
					) : (
						<Grid xs={5}>
							<CustomSelect
								label='Choose Person to Notify'
								name='notify'
								options={notifierOptions}
								register={register('notify')}
								control={control}
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid xs={4}>
							<CustomSelect
								label='Choose Notification Type'
								name='notificationType'
								options={notificationTypeOptions}
								register={register('notificationType')}
								defaultValue='Weekly'
							/>
						</Grid>
					) : (
						<Grid xs={4}>
							<CustomSelect
								label='Choose Notification Type'
								name='notificationType'
								options={notificationTypeOptions}
								register={register('notificationType')}
								control={control}
							/>
						</Grid>
					)}
				</Grid>
			</form>
		</>
	);
}

export function CaseDefinitionModify() {
	const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
	// eslint-disable-next-line
	const [error, setError] = useState(false);
	// eslint-disable-next-line
	const [success, setSuccess] = useState(false);
	// eslint-disable-next-line
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const BandServ = client.service('casedefinition');
	const bandTypeOptions = ['Immediate Notification', 'Weekly', 'Monthly'];
	const notifierOptions = [
		'Facility Focal Person',
		'DSNO',
		'Asst DSNO',
		'State Epidemiologist',
	];

	const [finding, setFinding] = useState('');
	const [findings, setFindings] = useState([]);
	const [findingreq, setFindingreq] = useState(false);

	const [symptom, setSymptom] = useState('');
	const [symptoms, setSymptoms] = useState([]);
	const [duration, setDuration] = useState('');
	const [sympreq, setSympreq] = useState(false);

	const [lab, setLab] = useState('');
	const [labs, setLabs] = useState([]);
	const [labvalue, setLabvalue] = useState('');
	/* const [sympreq,setSympreq] = useState(false) */
	const [observations, setObservations] = useState([]);
	const [mgtProtocol, setMgtProtocol] = useState('');
	const [notified, setNotified] = useState('');
	//const navigate=useNavigate()
	// eslint-disable-next-line
	const { user } = useContext(UserContext);
	const { state, setState } = useContext(ObjectContext);

	const Band = state.EpidemiologyModule.selectedBand;

	const handleCancel = async () => {
		const newBandModule = {
			selectedBand: {},
			show: 'create',
		};
		await setState((prevstate) => ({
			...prevstate,
			BandModule: newBandModule,
		}));
		//console.log(state)
	};

	const handleAddSymptoms = () => {
		let newsymptom = {
			symptom,
			duration,
			sympreq,
		};
		console.log(newsymptom);
		setSymptoms((prev) => [...prev, newsymptom]);
		// setAllergy({})
		setSymptom('');
		setDuration('');
		setSympreq(false);
	};
	const handleAddFindings = () => {
		let newFinding = {
			finding,
			findingreq,
		};
		console.log(newFinding);
		setFindings((prev) => [...prev, newFinding]);
		// setAllergy({})
		setFinding('');
		setFindingreq(false);
	};
	const handleAddLabs = () => {
		let newLabs = {
			lab,
			labvalue,
		};
		console.log(newLabs);
		setLabs((prev) => [...prev, newLabs]);
		// setAllergy({})
		setLab('');
		setLabvalue('');
		/*  setFindingreq(false) */
	};

	const changeState = () => {
		const newBandModule = {
			selectedBand: {},
			show: 'create',
		};
		setState((prevstate) => ({ ...prevstate, BandModule: newBandModule }));
	};
	const handleDelete = async () => {
		let conf = window.confirm('Are you sure you want to delete this data?');

		const dleteId = Band._id;
		if (conf) {
			BandServ.remove(dleteId)
				.then((res) => {
					//console.log(JSON.stringify(res))
					reset();
					/*  setMessage("Deleted Band successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
					toast({
						message: 'Band deleted succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					changeState();
				})
				.catch((err) => {
					// setMessage("Error deleting Band, probable network issues "+ err )
					// setError(true)
					toast({
						message: 'Error deleting Band, probable network issues or ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
	};

	const onDeleteFinding = (comp, i) => {
		//console.log(comp,i)
		setFindings((prevstate) => prevstate.filter((el, index) => index !== i));
	};
	const onDeleteLab = (comp, i) => {
		//console.log(comp,i)
		setLabs((prevstate) => prevstate.filter((el, index) => index !== i));
	};

	const onSubmit = useCallback(
		(data, e) => {
			e.preventDefault();

			setSuccess(false);
			console.log(data);
			data.facility = Band.facility;
			//console.log(data);

			BandServ.patch(Band._id, data)
				.then((res) => {
					//console.log(JSON.stringify(res))
					// e.target.reset();
					// setMessage("updated Band successfully")
					toast({
						message: 'Band updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});

					changeState();
				})
				.catch((err) => {
					//setMessage("Error creating Band, probable network issues "+ err )
					// setError(true)
					toast({
						message: 'Error updating Band, probable network issues or ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		},
		[data],
	);

	return (
		<>
			<form>
				<Box
					display='flex'
					justifyContent='flex-end'
					gap={2}
					mb={2}>
					<GlobalCustomButton
						color='error'
						onClick={handleDelete}>
						<DeleteIcon
							sx={{ marginRight: '5px' }}
							fontSize='small'
						/>
						Delete
					</GlobalCustomButton>
					<GlobalCustomButton onClick={handleSubmit(onSubmit)}>
						<MdOutlineUpdate
							sx={{ marginRight: '5px' }}
							fontSize='bold'
						/>
						Update
					</GlobalCustomButton>
				</Box>
				<Grid
					container
					pb='1rem'
					alignItems='center'>
					<Grid xs={6}>
						<Box
							display='flex'
							gap={2}>
							<Grid xs={6}>
								<CustomSelect
									label='Choose Notification Type'
									name='status'
									options={bandTypeOptions}
									register={register('notificationtype')}
								/>
							</Grid>
							<Grid xs={6}>
								<Input
									register={register('disease', { required: true })}
									name='disease'
									type='text'
									label='Name of Disease'
								/>
							</Grid>
						</Box>
					</Grid>
					<Grid
						xs={6}
						pl={2}>
						<Box
							display='flex'
							justifyContent='space-between'
							mb={2}>
							<Box>
								<FormsHeaderText text='Symptoms' />
							</Box>
						</Box>
						<Box
							display='flex'
							justifyContent='space-between'
							gap={2}
							mb={2}>
							<Grid xs={5}>
								<Input
									//  register={register("symptoms", {required: true})}
									value={symptom}
									onChange={(e) => {
										setSymptom(e.target.value);
									}}
									name='symptoms'
									type='text'
									label='Symptoms'
								/>
							</Grid>
							<Grid xs={4}>
								<Input
									// register={register("durations", {required: true})}
									value={duration}
									onChange={(e) => {
										setDuration(e.target.value);
									}}
									name='durations'
									type='text'
									label='Durations'
								/>
							</Grid>
							<Box>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												value={sympreq}
												name='sympreq'
												onChange={(e) => {
													handleChecked(e);
												}}
											/>
										}
										label='Required'
									/>
								</FormGroup>
							</Box>
							<Box>
								<GlobalCustomButton
									onClick={handleAddSymptoms}
									variant='outlined'>
									<AddCircleOutline
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Add
								</GlobalCustomButton>
							</Box>
						</Box>
						<Box style={{ width: '100%', height: '100%', overflow: 'auto' }}>
							<CustomTable
								title={''}
								columns={syptomSchema}
								data={symptoms}
								pointerOnHover
								highlightOnHover
								striped
								CustomEmptyData='No Data'
							/>
						</Box>
					</Grid>
				</Grid>
				<Grid
					container
					alignItems='center'>
					<Grid xs={6}>
						<Box mb={2}>
							<Textarea
								label='Management Protocol'
								value={mgtProtocol}
								onChange={(e) => {
									setMgtProtocol(e.target.value);
								}}
								name='mgtProtocol'
								type='text'
							/>
						</Box>
						<Box>
							<CustomSelect
								label='Choose Person to Notify'
								name='notifiedPerson'
								options={notifierOptions}
								ref={register}
							/>
						</Box>
					</Grid>

					<Grid
						xs={6}
						pl={2}>
						<Box
							display='flex'
							gap={2}
							justifyContent='space-between'
							mb={2}>
							<Box>
								<FormsHeaderText text='Clinical Signs' />
							</Box>
						</Box>
						<Box
							display='flex'
							gap={2}
							justifyContent='space-between'
							mb={2}>
							<Grid xs={6}>
								<Input
									value={finding}
									onChange={(e) => {
										setFinding(e.target.value);
									}}
									label='Finding'
									name='finding'
									type='text'
									// register={register("durations", {required: true})}
								/>
							</Grid>
							<Box>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												value={findingreq}
												name='findingreq'
												onChange={(e) => {
													handleChecked2(e);
												}}
											/>
										}
										label='Required'
									/>
								</FormGroup>
							</Box>
							<Box>
								<GlobalCustomButton
									onClick={handleAddFindings}
									variant='outlined'>
									<AddCircleOutline
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Add
								</GlobalCustomButton>
							</Box>
						</Box>
						<Box style={{ width: '100%', height: '100%', overflow: 'auto' }}>
							<CustomTable
								title={''}
								columns={clinicalSignSchema}
								data={findings}
								onRowClicked={onDeleteFinding}
								pointerOnHover
								highlightOnHover
								striped
								CustomEmptyData='No Data'
							/>
						</Box>
					</Grid>

					<Grid
						xs={6}
						pl={2}
						mt={4}>
						<Box
							display='flex'
							justifyContent='space-between'
							mb={2}>
							<Box>
								<FormsHeaderText text='Laboratory Confirmation' />
							</Box>
						</Box>
						<Box
							display='flex'
							gap={2}
							mb={4}>
							<Grid xs={4}>
								<Input
									ref={register}
									name='LaboratoryConfirmation'
									type='text'
									label='Specify'
								/>
							</Grid>
							<Grid xs={4}>
								<Input
									// register={register("durations", {required: true})}
									value={lab}
									onChange={(e) => {
										setLab(e.target.value);
									}}
									name='lab'
									type='text'
									label='Lab'
								/>
							</Grid>
							<Grid xs={4}>
								<Input
									// register={register("durations", {required: true})}
									value={labvalue}
									onChange={(e) => {
										setLabvalue(e.target.value);
									}}
									name='lab value'
									type='text'
									label='Value'
								/>
							</Grid>
							<Box>
								<GlobalCustomButton
									onClick={handleAddLabs}
									variant='outlined'>
									<AddCircleOutline
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Add
								</GlobalCustomButton>
							</Box>
						</Box>
						<Box style={{ width: '100%', height: '100%', overflow: 'auto' }}>
							<CustomTable
								title={''}
								columns={labSchema}
								data={labs}
								onRowClicked={onDeleteLab}
								pointerOnHover
								highlightOnHover
								striped
								CustomEmptyData='No Data'
							/>
						</Box>
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function InputSearch({ getSearchfacility, clear }) {
	const facilityServ = client.service('facility');
	const [facilities, setFacilities] = useState([]);
	// eslint-disable-next-line
	const [searchError, setSearchError] = useState(false);
	// eslint-disable-next-line
	const [showPanel, setShowPanel] = useState(false);
	// eslint-disable-next-line
	const [searchMessage, setSearchMessage] = useState('');
	// eslint-disable-next-line
	const [simpa, setSimpa] = useState('');
	// eslint-disable-next-line
	const [chosen, setChosen] = useState(false);
	// eslint-disable-next-line
	const [count, setCount] = useState(0);
	const inputEl = useRef(null);

	const handleRow = async (obj) => {
		await setChosen(true);
		//alert("something is chaning")
		getSearchfacility(obj);

		await setSimpa(obj.facilityName);

		// setSelectedFacility(obj)
		setShowPanel(false);
		await setCount(2);
		/* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
		//console.log(state)
	};
	const handleBlur = async (e) => {
		if (count === 2) {
			console.log('stuff was chosen');
		}

		/*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
	};
	const handleSearch = async (val) => {
		const field = 'facilityName'; //field variable

		if (val.length >= 3) {
			facilityServ
				.find({
					query: {
						//service
						[field]: {
							$regex: val,
							$options: 'i',
						},
						$limit: 10,
						$sort: {
							createdAt: -1,
						},
					},
				})
				.then((res) => {
					console.log('facility  fetched successfully');
					setFacilities(res.data);
					setSearchMessage(' facility  fetched successfully');
					setShowPanel(true);
				})
				.catch((err) => {
					console.log(err);
					setSearchMessage(
						'Error searching facility, probable network issues ' + err,
					);
					setSearchError(true);
				});
		} else {
			console.log('less than 3 ');
			console.log(val);
			setShowPanel(false);
			await setFacilities([]);
			console.log(facilities);
		}
	};
	useEffect(() => {
		if (clear) {
			setSimpa('');
		}
		return () => {};
	}, [clear]);

	console.log(facilities);
	return (
		<div>
			<div className='field'>
				<div className='control has-icons-left  '>
					<div className={`dropdown ${showPanel ? 'is-active' : ''}`}>
						<div className='dropdown-trigger'>
							<DebounceInput
								className='input is-small '
								type='text'
								placeholder='Search Facilities'
								value={simpa}
								minLength={1}
								debounceTimeout={400}
								onBlur={(e) => handleBlur(e)}
								onChange={(e) => handleSearch(e.target.value)}
								inputRef={inputEl}
							/>
							<span className='icon is-small is-left'>
								<i className='fas fa-search'></i>
							</span>
						</div>
						{searchError && <div>{searchMessage}</div>}
						<div className='dropdown-menu'>
							<div className='dropdown-content'>
								{facilities.map((facility, i) => (
									<div
										className='dropdown-item'
										key={facility._id}
										onClick={() => handleRow(facility)}>
										<span>{facility.facilityName}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
