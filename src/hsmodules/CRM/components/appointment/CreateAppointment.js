import {useContext, useState} from 'react';
import {Box, Button, Chip, Grid} from '@mui/material';
import Input from '../../../../components/inputs/basic/Input';
import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
import {FacilitySearch} from '../../../helpers/FacilitySearch';
import {useForm} from 'react-hook-form';
import Textarea from '../../../../components/inputs/basic/Textarea';
import MuiCustomTimePicker from '../../../../components/inputs/Date/MuiTimePicker';
import MuiDateTimePicker from '../../../../components/inputs/DateTime/MuiDateTimePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import {ObjectContext, UserContext} from '../../../../context';
import client from '../../../../feathers';
import {toast} from 'react-toastify';
import CustomSelect from '../../../../components/inputs/basic/Select';
import {v4 as uuidv4} from 'uuid';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const ScheduleAppointment = ({closeModal}) => {
	const dealServer = client.service('deal');
	const {control, register, handleSubmit} = useForm({
		defaultValues: {
			status: 'scheduled',
		},
	});
	const {state, setState, showActionLoader, hideActionLoader} =
		useContext(ObjectContext);
	const {user} = useContext(UserContext);
	const [personName, setPersonName] = useState([]);
	const [contactIds, setContactIds] = useState([]);
	const [staffIds, setStaffsId] = useState([]);

	const contacts = state.DealModule.selectedDeal.contacts || [];
	const staffs = state.DealModule.selectedDeal.assignStaff || [];

	const handleContactChange = event => {
		const {value} = event.target;
		setContactIds(value);
	};

	const handleStaffChange = event => {
		const {value} = event.target;
		setStaffsId(value);
	};

	const createAppointment = async data => {
		showActionLoader();

		const currentDeal = state.DealModule.selectedDeal;
		const employee = user.currentEmployee;

		let document = {
			...data,
			customerName: currentDeal.name,
			customerEmail: currentDeal.email,
			customerPhone: currentDeal.phone,
			dealId: currentDeal._id,
			createdBy: employee.userId,
			createdByName: `${employee.firstname} ${employee.lastname}`,
			createdAt: new Date(),
			_id: uuidv4(),
			//status: "scheduled",
		};

		const selectedContacts = contactIds.map(id => {
			const contact = contacts.find(item => item._id === id);
			return contact;
		});

		const selectedStaffs = staffIds.map(id => {
			const staff = staffs.find(item => item._id === id);
			return staff;
		});

		document.contacts = selectedContacts;
		document.staffs = selectedStaffs;

		//console.log(document);

		const prevAppointments = currentDeal.appointments || [];

		const newAppointments = [document, ...prevAppointments];

		// return console.log(newAppointments);

		const documentId = currentDeal._id;
		await dealServer
			.patch(documentId, {appointments: newAppointments})
			.then(res => {
				hideActionLoader();
				//setContacts(res.contacts);
				setState(prev => ({
					...prev,
					DealModule: {...prev.DealModule, selectedDeal: res},
				}));
				closeModal();
				toast.success(
					`You have successfully Scheduled appointment for ${currentDeal.name}`,
				);

				//setReset(true);
			})
			.catch(err => {
				//setReset(false);
				hideActionLoader();
				toast.error(`Sorry, Failed to Schedule Appointment. ${err}`);
			});
	};

	//console.log(contacts);

	return (
		<Box sx={{width: '600px', maxHeight: '80vh'}}>
			<Grid
				container
				spacing={2}
				pt={1}>
				<Grid
					item
					xs={12}>
					<Input
						label='Appointment Title'
						register={register('title', {required: true})}
					/>
				</Grid>

				<Grid
					item
					xs={12}>
					<FormControl sx={{width: '100%'}}>
						<InputLabel id='demo-multiple-checkbox-label'>
							Select Staffs
						</InputLabel>
						<Select
							labelId='demo-multiple-checkbox-label'
							id='demo-multiple-checkbox'
							multiple
							value={staffIds}
							onChange={handleStaffChange}
							input={<OutlinedInput label='Select Staffs' />}
							renderValue={selected => (
								<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
									{selected.map(staffId => (
										<Chip
											size='small'
											sx={{fontSize: '0.7rem', textTransform: 'capitalize'}}
											key={staffId}
											label={staffs?.find(item => item._id === staffId).name}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{staffs.map(staff => (
								<MenuItem
									key={staff._id}
									value={staff._id}
									sx={{fontSize: '0.8rem'}}
									//disabled={staff.in}
								>
									<Checkbox
										checked={staffIds.includes(staff._id)}
										size='small'
										//disabled
									/>
									<ListItemText
										primaryTypographyProps={{
											fontSize: '0.8rem',
											textTransform: 'capitalize',
										}}
										primary={`${staff.name} - ${
											staff.position ? staff.position : 'No Position'
										} - ${staff.active ? 'Active' : 'Inactive'}`}
									/>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid
					item
					xs={12}>
					<FormControl sx={{width: '100%'}}>
						<InputLabel id='demo-multiple-checkbox-label'>
							Select Contacts
						</InputLabel>
						<Select
							labelId='demo-multiple-checkbox-label'
							id='demo-multiple-checkbox'
							multiple
							value={contactIds}
							onChange={handleContactChange}
							input={<OutlinedInput label='Select Contacts' />}
							renderValue={selected => (
								<Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
									{selected.map(contactId => (
										<Chip
											size='small'
											sx={{fontSize: '0.7rem'}}
											key={contactId}
											label={
												contacts?.find(item => item._id === contactId).name
											}
										/>
									))}
								</Box>
							)}
							MenuProps={MenuProps}>
							{contacts.map(contact => (
								<MenuItem
									key={contact._id}
									value={contact._id}
									sx={{fontSize: '0.8rem'}}>
									<Checkbox
										checked={contactIds.includes(contact._id)}
										size='small'
									/>
									<ListItemText
										primaryTypographyProps={{fontSize: '0.8rem'}}
										primary={`${contact.name} - ${contact.position}`}
									/>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid
					item
					xs={6}>
					<MuiDateTimePicker
						label='Date and Time'
						name='date'
						control={control}
						required
						important
					/>
				</Grid>

				<Grid
					item
					xs={6}>
					<CustomSelect
						label='Appointment Status'
						name='status'
						control={control}
						options={[
							'Scheduled',
							'Active',
							'Postponed',
							'Cancelled',
							'Suspended',
							'Aborted',
							'Completed',
						]}
						required
						important
					/>
				</Grid>

				<Grid
					item
					xs={12}>
					<Textarea
						label='Reason for Appointment'
						placeholder='Write here...'
						register={register('information')}
					/>
				</Grid>
			</Grid>

			<Box
				sx={{display: 'flex', alignItems: 'center'}}
				mt={2}>
				<Button
					variant='outlined'
					color='warning'
					size='small'
					sx={{
						textTransform: 'capitalize',
						marginRight: '15px',
					}}
					onClick={closeModal}>
					Cancel
				</Button>

				<Button
					size='small'
					variant='contained'
					sx={{textTransform: 'capitalize'}}
					onClick={handleSubmit(createAppointment)}>
					Submit
				</Button>
			</Box>
		</Box>
	);
};

export default ScheduleAppointment;
