import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton, Typography} from '@mui/material';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import SendIcon from "@mui/icons-material/Send";
import moment from 'moment';
import dayjs from 'dayjs';

export const getStaffColumns = (action, disableAction = false) => {
	const staffColumns = [
		{
			name: 'SN',
			key: 'sn',
			description: 'Enter Date',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '60px',
		},
		{
			name: 'Name',
			key: 'row',
			description: 'Enter Date',
			selector: row => row.name,
			sortable: true,
			required: true,
			inputType: 'DATE',
			style: {
				color: '#1976d2',
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Position',
			style: {color: '#0364FF'},
			key: 'contact_position',
			description: 'Enter Date',
			selector: row => (row.position ? row.position : '----------'),
			sortable: true,
			required: true,
			inputType: 'DATE',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Email',
			style: {color: '#0364FF'},
			key: 'contact_phone',
			description: 'Enter Date',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row.email}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Phone NO',
			key: 'contact_email',
			description: 'Enter Date',
			selector: row => row.phoneno,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Status',
			key: 'contact_email',
			description: 'Enter Date',
			selector: row => (row.active ? 'Active' : 'Inactive'),
			sortable: true,
			required: true,
			inputType: 'STRING',
			width: '80px',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'contact_email',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	return staffColumns;
};

export const getContactColumns = (action, disableAction, omit) => {
	const contactColumns = [
		{
			name: 'S/N',
			key: 'sn',
			description: '',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '50px',
		},
		{
			name: 'Name',
			key: 'contact_name',
			description: 'Enter Date',
			selector: row => row.name,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Position',
			style: {color: '#0364FF'},
			key: 'contact_position',
			description: 'Enter Date',
			selector: row => row.position,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Phone No',
			style: {color: '#0364FF'},
			key: 'contact_phone',
			description: 'Enter Date',
			selector: row => row.phoneno,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Email',
			key: 'contact_email',
			description: 'Enter Date',
			selector: row => row.email,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Status',
			key: 'contact_email',
			description: 'Enter Date',
			selector: row => (row.active ? 'Active' : 'Inactive'),
			sortable: true,
			required: true,
			inputType: 'STRING',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
			omit: omit,
		},
	];

	return contactColumns;
};

export const getTaskColumns = (action, disableAction) => {
	const contactColumns = [
		{
			name: 'SN',
			key: 'sn',
			description: 'Enter Date',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			width: '50px',
		},
		{
			name: 'Employee',
			key: 'employee',
			description: 'Enter Staff',
			selector: row => (
				<Typography
					sx={{
						fontSize: '0.8rem',
						whiteSpace: 'normal',
						textTransform: 'capitalize',
						color: '#1976d2',
					}}
					data-tag='allowRowEvents'>
					{row.employee.firstname} {row.employee.lastname}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Title',
			key: 'title',
			description: 'Enter Date',
			selector: row => row.title,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Status',
			style: {color: '#0364FF'},
			key: 'type',
			description: 'Enter Date',
			selector: row => row.status,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Priority',
			style: {color: '#0364FF'},
			key: 'priority',
			description: 'Enter Date',
			selector: row => row.priority,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'Information',
			key: 'information',
			description: 'Enter Date',
			selector: row => (
				<Typography
					sx={{fontSize: '0.8rem', whiteSpace: 'normal'}}
					data-tag='allowRowEvents'>
					{row.information}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	return contactColumns;
};

export const getAppointmentColumns = (action, disableAction) => {
	const contactColumns = [
		{
			name: 'Title',
			key: 'title',
			description: 'Enter Date',
			selector: row => row.title,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Type',
			style: {color: '#0364FF'},
			key: 'type',
			description: 'Enter Date',
			selector: row => row.type,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Priority',
			style: {color: '#0364FF'},
			key: 'priority',
			description: 'Enter Date',
			selector: row => row.priority,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Information',
			key: 'information',
			description: 'Enter Date',
			selector: row => row.information,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Del',
			width: '50px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	return contactColumns;
};

export const getUploadColumns = (action, disableAction) => {
	const uploadColumns = [
		{
			name: 'SN',
			key: 'sn',
			description: 'Enter Date',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			width: '50px',
		},
		{
			name: 'Uploaded By',
			key: 'sn',
			description: 'Enter Date',
			selector: (row, i) => row.uploadedByName,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},
		{
			name: 'File Name',
			key: 'file_name',
			description: 'Enter Date',
			selector: row => row.name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
				color: '#0364FF',
			},
		},

		{
			name: 'Upload Time',
			key: 'date',
			description: 'Enter Date',
			selector: row => dayjs(row.uploadedAt).format('DD/MM/YYYY hh:mm A'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Doc Type',
			style: {color: '#0364FF'},
			key: 'doc_type',
			description: 'Enter Date',
			selector: row => (row.docType === 'sla' ? 'SLA' : 'LOI'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Upload Type',
			style: {color: '#0364FF'},
			key: 'file_type',
			description: 'Enter Date',
			selector: row => row.type,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Del',
			width: '80px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	return uploadColumns;
};

export const getPlansColumns = (action, disableAction, omitDelete) => {
	const plansColumns = [
		// {
		//   name: "S/N",
		//   width: "50px",
		//   style: {color: "#0364FF"},
		//   key: "sn",
		//   description: "Enter Date",
		//   selector: (row, i) => i + 1,
		//   sortable: true,
		//   required: true,
		//   inputType: "TEXT",
		// },
		{
			name: 'Plan Name',
			key: 'file_name',
			description: 'Enter Date',
			selector: row => row.name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Plan Type',
			key: 'file_name',
			description: 'Enter Date',
			selector: row => row.type,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Date',
			style: {color: '#0364FF'},
			key: 'created_at',
			description: 'Enter Date',
			selector: row => moment(row.created_at).format('L'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Duration',
			style: {color: '#0364FF'},
			key: 'no_of_months',
			description: 'Enter Date',
			selector: row => `${row.length} ${row.calendrical}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Premium',
			style: {color: '#0364FF'},
			key: 'premium',
			description: 'Enter Date',
			selector: row => `${row.premium}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Number of Heads',
			style: {color: '#0364FF'},
			key: 'no_of_heads',
			description: 'Enter Date',
			selector: row => `${row.heads}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Amount(₦)',
			style: {color: '#0364FF'},
			key: 'amount',
			description: 'Enter Date',
			selector: row => row.amount,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		/* {
			name: 'Del',
			width: '80px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
			omit: omitDelete,
		}, */
	];

	return plansColumns;
};
export const getPlansListColumns = (action, disableAction, omitDelete) => {
	const plansListColumns = [
		// {
		//   name: "S/N",
		//   width: "50px",
		//   style: {color: "#0364FF"},
		//   key: "sn",
		//   description: "Enter Date",
		//   selector: (row, i) => i + 1,
		//   sortable: true,
		//   required: true,
		//   inputType: "TEXT",
		// },

		{
			name: 'Plan Type',
			key: 'file_name',
			description: 'Enter Date',
			selector: row => row.type,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'capitalize',
			},
		},

		{
			name: 'Date',
			style: {color: '#0364FF'},
			key: 'created_at',
			description: 'Enter Date',
			selector: row => moment(row.created_at).format('L'),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Duration',
			style: {color: '#0364FF'},
			key: 'no_of_months',
			description: 'Enter Date',
			selector: row => `${row.length} ${row.calendrical}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Premium',
			style: {color: '#0364FF'},
			key: 'premium',
			description: 'Enter Date',
			selector: row => `${row.premium}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Number of Heads',
			style: {color: '#0364FF'},
			key: 'no_of_heads',
			description: 'Enter Date',
			selector: row => `${row.heads}`,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Amount(₦)',
			style: {color: '#0364FF'},
			key: 'amount',
			description: 'Enter Date',
			selector: row => row.amount,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		/* {
			name: 'Del',
			width: '80px',
			center: true,
			key: 'action',
			description: 'Enter Date',
			selector: row => (
				<IconButton
					onClick={() => action(row)}
					disabled={disableAction}
					color='error'>
					<DeleteOutline fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
			omit: omitDelete,
		}, */
	];

	return plansListColumns;
};