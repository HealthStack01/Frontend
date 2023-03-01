import { useContext, useState, useEffect } from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import Input from '../../../../components/inputs/basic/Input';
import ModalBox from '../../../../components/modal';
import { FormsHeaderText } from '../../../../components/texts';
import SLADescription from './SLADescription';
import { useForm } from 'react-hook-form';
import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
import CustomSelect from '../../../../components/inputs/basic/Select';
import GlobalCustomButton from '../../../../components/buttons/CustomButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LeadView } from '../lead/LeadDetailView';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import OutboxIcon from '@mui/icons-material/Outbox';
import ArticleIcon from '@mui/icons-material/Article';
import CustomerDetail, { PageCustomerDetail } from '../global/CustomerDetail';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { PageLeadDetailView } from '../global/LeadDetail';
import dayjs from 'dayjs';
import { ObjectContext, UserContext } from '../../../../context';
import {
	ProposalAttachDocument,
	SendProposalOrSLA,
} from '../proposal/ProposalCreate';
import CustomTable from '../../../../components/customtable';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { getBase64 } from '../../../helpers/getBase64';
import axios from 'axios';
import { getUploadUrl } from '../../../helpers/getUploadUrl';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import client from '../../../../feathers';

const CreateSLA = ({ handleGoBack }) => {
	const dealServer = client.service('deal');
	const emailServer = client.service('email');
	const { state, setState, showActionLoader, hideActionLoader } =
		useContext(ObjectContext);
	const { user } = useContext(UserContext);
	const [description, setDescription] = useState('');
	const [attachModal, setAttachModal] = useState(false);
	const [attachedDocs, setAttachedDocs] = useState([]);
	const [draftedSLA, setDraftedSLA] = useState(null);
	const [docViewModal, setDocviewModal] = useState(false);
	const [selectedDoc, setSelectedDoc] = useState({});
	const [sendModal, setSendModal] = useState(false);

	useEffect(() => {
		const sla = state.SLAModule.selectedSLA || null;
		console.log(sla);

		setDraftedSLA(sla);
		setDescription(sla.description || '');
		setAttachedDocs(sla.attachedFiles || []);

		return () => {
			setState((prev) => ({
				...prev,
				SLAModule: { ...prev.SLAModule, selectedSLA: {} },
			}));
			setDraftedSLA(null);
		};
	}, []);

	const handleAttachDoc = (document) => {
		setAttachedDocs((prev) => [document, ...prev]);
	};

	const attachedFileColumns = [
		{
			name: 'S/N',
			key: 'sn',
			description: 'Enter Date',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			width: '60px',
		},
		{
			name: 'Attached By',
			key: 'filename',
			description: 'Enter Date',
			selector: (row) => (
				<Typography
					sx={{
						fontSize: '0.8rem',
						whiteSpace: 'normal',
						color: '#1976d2',
						textTransform: 'capitalize',
					}}
					data-tag='allowRowEvents'>
					{row.createdByName}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
			width: '200px',
		},

		{
			name: 'File Name',
			key: 'filename',
			description: 'Enter Date',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal', color: '#1976d2' }}
					data-tag='allowRowEvents'>
					{row.fileName}
				</Typography>
			),

			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Date',
			//style: {color: "#0364FF"},
			key: 'date',
			description: 'Enter Date',
			selector: (row) => dayjs(row.createdAt).format('DD/MM/YYYY hh:mm  A '),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'File Type',
			key: 'doc_type',
			description: 'Enter Date',
			selector: (row) => row.fileType,
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'uppercase',
			},
		},

		{
			name: 'Comment',
			style: { color: '#0364FF' },
			key: 'doc_type',
			description: 'Enter Date',
			selector: (row) => (
				<Typography
					sx={{ fontSize: '0.8rem', whiteSpace: 'normal' }}
					data-tag='allowRowEvents'>
					{row.comment}
				</Typography>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},

		{
			name: 'Action',
			key: 'doc_type',
			description: 'Enter Date',
			selector: (row) => (
				<IconButton
					size='small'
					color='error'>
					<DeleteOutlineIcon fontSize='small' />
				</IconButton>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
			style: {
				textTransform: 'uppercase',
			},
		},
	];

	const handleCreateSLA = async (status) => {
		if (description === '' && attachedDocs.length === 0)
			return toast.error('You cannot send/save an empty SLA document');

		showActionLoader();
		const employee = user.currentEmployee;
		const currentDeal = state.DealModule.selectedDeal;

		if (attachedDocs.length > 0) {
			const promises = attachedDocs.map(async (doc) => {
				if (doc.isUploaded) {
					return doc;
				} else {
					const fileUrl = await getUploadUrl(doc.file);
					return {
						...doc,
						file: fileUrl,
						isUploaded: true,
					};
				}
			});

			const attachments = await Promise.all(promises);

			const document = {
				attachedFiles: attachments,
				description: description,
				createdAt: new Date(),
				dateSent: new Date(),
				createdBy: employee.userId,
				createdByName: `${employee.firstname} ${employee.lastname}`,
				customerName: currentDeal.name,
				customerEmail: currentDeal.email,
				customerPhone: currentDeal.phone,
				customerAddress: currentDeal.address,
				customerCity: currentDeal.city,
				customerLGA: currentDeal.lga,
				customerState: currentDeal.state,
				customerCountry: currentDeal.country,
				dealId: currentDeal._id,
				status: status,
				_id: uuidv4(),
			};

			const prevSLA = currentDeal.sla || [];

			const isDraft = Object.keys(draftedSLA).length > 0;

			const newSLA = isDraft
				? prevSLA.map((item) => {
						if (item._id === draftedSLA._id) {
							return {
								...item,
								description: description,
								attachedFiles: attachments,
								status: status,
								updatedAt: new Date(),
							};
						} else {
							return item;
						}
				  })
				: [document, ...prevSLA];

			// return console.log(newSLA);

			const documentId = currentDeal._id;
			await dealServer
				.patch(documentId, { sla: newSLA })
				.then((res) => {
					hideActionLoader();
					setState((prev) => ({
						...prev,
						DealModule: { ...prev.DealModule, selectedDeal: res },
					}));

					setAttachedDocs([]);
					setDescription('');
					if (status === 'Draft') {
						toast.success(
							`You have successfully Saved this SLA document as a Draft`,
						);
					} else {
						toast.success(`SLA document was succesfully sent`);
					}
				})
				.catch((err) => {
					hideActionLoader();
					if (status === 'Draft') {
						toast.error(`Sorry, Failed to Save SLA document as Draft. ${err}`);
					} else {
						toast.error(`Sorry, Failed to send SLA document. ${err}`);
					}
				});
		} else {
			const document = {
				attachedFiles: [],
				description: description,
				createdAt: new Date(),
				createdBy: employee.userId,
				createdByName: `${employee.firstname} ${employee.lastname}`,
				customerName: currentDeal.name,
				customerEmail: currentDeal.email,
				customerPhone: currentDeal.phone,
				customerAddress: currentDeal.address,
				customerCity: currentDeal.city,
				customerLGA: currentDeal.lga,
				customerState: currentDeal.state,
				customerCountry: currentDeal.country,
				dealId: currentDeal._id,
				status: status,
				_id: uuidv4(),
			};

			//console.log("no attachments");

			const prevSLA = currentDeal.sla || [];

			const isDraft = Object.keys(draftedSLA).length > 0;

			const newSLA = isDraft
				? prevSLA.map((item) => {
						if (item._id === draftedSLA._id) {
							return {
								...item,
								description: description,
								status: status,
								attachedFiles: [],
								updatedAt: new Date(),
							};
						} else {
							return item;
						}
				  })
				: [document, ...prevSLA];

			//return console.log(newSLA);

			const documentId = currentDeal._id;
			await dealServer
				.patch(documentId, { sla: newSLA })
				.then((res) => {
					hideActionLoader();
					setState((prev) => ({
						...prev,
						DealModule: { ...prev.DealModule, selectedDeal: res },
					}));

					setAttachedDocs([]);
					setDescription('');

					if (status === 'Draft') {
						toast.success(
							`You have successfully Saved this SLA document as a Draft`,
						);
					} else {
						toast.success(`SLA document was succesfully sent`);
					}
				})
				.catch((err) => {
					hideActionLoader();
					if (status === 'Draft') {
						toast.error(`Sorry, Failed to Save SLA document as Draft. ${err}`);
					} else {
						toast.error(`Sorry, Failed to send SLA document. ${err}`);
					}
				});
		}
	};

	const handleSendSLA = async (emailData) => {
		showActionLoader();
		const employee = user.currentEmployee;
		const currentDeal = state.DealModule.selectedDeal;
		const facility = user.currentEmployee.facilityDetail;

		if (attachedDocs.length > 0) {
			const promises = attachedDocs.map(async (doc) => {
				if (doc.isUploaded) {
					return doc;
				} else {
					const fileUrl = await getUploadUrl(doc.file);
					return {
						...doc,
						file: fileUrl,
						isUploaded: true,
					};
				}
			});

			const attachments = await Promise.all(promises);

			const document = {
				attachedFiles: attachments,
				description: description,
				createdAt: new Date(),
				dateSent: new Date(),
				createdBy: employee.userId,
				createdByName: `${employee.firstname} ${employee.lastname}`,
				customerName: currentDeal.name,
				customerEmail: currentDeal.email,
				customerPhone: currentDeal.phone,
				customerAddress: currentDeal.address,
				customerCity: currentDeal.city,
				customerLGA: currentDeal.lga,
				customerState: currentDeal.state,
				customerCountry: currentDeal.country,
				dealId: currentDeal._id,
				status: 'Sent',
				_id: uuidv4(),
			};

			const attachedHTML = `<br> <p>Find Below Attached Documents to this Email:   ${attachments.map(
				(item) => `<br> <a href=${item.file}>${item.fileName}</a> `,
			)}  </p>`;

			const emailDocument = {
				organizationId: facility._id,
				organizationName: facility.facilityName,
				html: description.concat(attachedHTML),
				text: '',
				status: 'pending',
				...emailData,
			};

			const prevSLA = currentDeal.sla || [];

			const isDraft = Object.keys(draftedSLA).length > 0;

			const newSLA = isDraft
				? prevSLA.map((item) => {
						if (item._id === draftedSLA._id) {
							return {
								...item,
								description: description,
								attachedFiles: attachments,
								status: 'Sent',
								updatedAt: new Date(),
							};
						} else {
							return item;
						}
				  })
				: [document, ...prevSLA];

			const documentId = currentDeal._id;
			await dealServer
				.patch(documentId, { sla: newSLA })
				.then((res) => {
					return emailServer.create(emailDocument).then((resp) => {
						hideActionLoader();
						setState((prev) => ({
							...prev,
							DealModule: { ...prev.DealModule, selectedDeal: res },
						}));

						setAttachedDocs([]);
						setDescription('');
						setSendModal(false);
						toast.success(`SLA was sent succesfully`);
					});
				})
				.catch((err) => {
					hideActionLoader();
					toast.error(`Sorry, Failed to send SLA. ${err}`);
				});
		} else {
			const document = {
				attachedFiles: [],
				description: description,
				createdAt: new Date(),
				createdBy: employee.userId,
				createdByName: `${employee.firstname} ${employee.lastname}`,
				customerName: currentDeal.name,
				customerEmail: currentDeal.email,
				customerPhone: currentDeal.phone,
				customerAddress: currentDeal.address,
				customerCity: currentDeal.city,
				customerLGA: currentDeal.lga,
				customerState: currentDeal.state,
				customerCountry: currentDeal.country,
				dealId: currentDeal._id,
				status: 'Sent',
				_id: uuidv4(),
			};

			const emailDocument = {
				organizationId: facility._id,
				organizationName: facility.facilityName,
				html: description,
				text: '',
				status: 'pending',
				...emailData,
			};

			const prevSLA = currentDeal.sla || [];

			const isDraft = Object.keys(draftedSLA).length > 0;

			const newSLA = isDraft
				? prevSLA.map((item) => {
						if (item._id === draftedSLA._id) {
							return {
								...item,
								description: description,
								// attachedFiles: attachments,
								status: 'Sent',
								updatedAt: new Date(),
							};
						} else {
							return item;
						}
				  })
				: [document, ...prevSLA];

			const documentId = currentDeal._id;
			await dealServer
				.patch(documentId, { sla: newSLA })
				.then((res) => {
					return emailServer.create(emailDocument).then((resp) => {
						hideActionLoader();
						setState((prev) => ({
							...prev,
							DealModule: { ...prev.DealModule, selectedDeal: res },
						}));

						setAttachedDocs([]);
						setDescription('');
						setSendModal(false);
						toast.success(`SLA was sent succesfully`);
					});
				})
				.catch((err) => {
					hideActionLoader();
					toast.error(`Sorry, Failed to send SLA. ${err}`);
				});
		}
	};

	const showSendModal = () => {
		if (description === '' && attachedDocs.length === 0)
			return toast.error('You cannot send/save an empty SLA');
		setSendModal(true);
	};

	const handleRow = (doc) => {
		console.log(doc);
		setSelectedDoc(doc);
		setDocviewModal(true);
	};

	return (
		<Box
			sx={{
				width: '100%',
			}}>
			<ModalBox
				open={docViewModal}
				onClose={() => setDocviewModal(false)}
				header={`View Document ${selectedDoc?.fileName}`}>
				<Box sx={{ width: '85vw', height: '85vh', position: 'relative' }}>
					{selectedDoc?.fileType === 'pdf' ? (
						<iframe
							src={selectedDoc?.file}
							title={selectedDoc?.fileName}
							style={{ width: '100%', height: '100%' }}
							// src={`https://docs.google.com/viewer?url=${selectedDoc?.file}&embedded=true`}
						/>
					) : (
						<iframe
							title={selectedDoc?.fileName}
							style={{ width: '100%', height: '100%' }}
							src={`https://view.officeapps.live.com/op/embed.aspx?src=${selectedDoc?.file}`}
						/>
					)}
				</Box>
			</ModalBox>

			<ModalBox
				open={sendModal}
				onClose={() => setSendModal(false)}
				header='Send SLA'>
				<SendProposalOrSLA handleSend={handleSendSLA} />
			</ModalBox>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					borderBottom: '1px solid #f8f8f8',
					backgroundColor: '#f8f8f8',
				}}
				mb={2}
				p={2}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
					}}
					gap={1}>
					<GlobalCustomButton onClick={handleGoBack}>
						<ArrowBackIcon />
						Go Back
					</GlobalCustomButton>

					<Typography
						sx={{
							fontSize: '0.95rem',
							fontWeight: '600',
						}}>
						Create SLA
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
					}}
					gap={1}>
					<GlobalCustomButton
						color='info'
						sx={{ marginRight: '10px' }}
						onClick={() => handleCreateSLA('Draft')}>
						<SaveAsIcon
							fontSize='small'
							sx={{ marginRight: '5px' }}
						/>
						Save as Draft
					</GlobalCustomButton>

					<GlobalCustomButton onClick={showSendModal}>
						<OutboxIcon
							fontSize='small'
							sx={{ marginRight: '5px' }}
						/>
						Send SLA
					</GlobalCustomButton>
				</Box>
			</Box>

			<Grid
				container
				spacing={2}
				p={2}>
				<Grid
					item
					lg={12}
					md={12}
					sm={12}>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							lg={12}
							md={12}
							small={12}>
							<PageCustomerDetail />
						</Grid>

						<Grid
							item
							lg={12}
							md={12}
							small={12}>
							<PageLeadDetailView />
						</Grid>
					</Grid>
				</Grid>

				<Grid
					item
					xs={12}>
					<Box
						sx={{ display: 'flex', justifyContent: 'space-between' }}
						mb={1.5}>
						<FormsHeaderText text='Attached Files' />

						<GlobalCustomButton onClick={() => setAttachModal(true)}>
							<AttachFileIcon fontSize='small' />
							Attach New File
						</GlobalCustomButton>
					</Box>

					<Box>
						<CustomTable
							columns={attachedFileColumns}
							data={attachedDocs}
							pointerOnHover
							highlightOnHover
							striped
							onRowClicked={handleRow}
							CustomEmptyData="You haven't Attached any file(s) yet..."
							progressPending={false}
						/>
					</Box>
				</Grid>

				<Grid
					item
					lg={12}
					md={12}
					sm={12}>
					<Box>
						<Box
							sx={{
								height: '40px',
								backgroundColor: '#0075D9',
								display: 'flex',
								alignItems: 'center',
								paddingLeft: '25px',
							}}>
							<Typography
								sx={{
									color: '#ffffff',
									fontWeight: '600',
								}}>
								SLA Description
							</Typography>
						</Box>
						<Box className='ck-edition-sla'>
							<CKEditor
								editor={ClassicEditor}
								data={description}
								onChange={(event, editor) => {
									const data = editor.getData();
									setDescription(data);
								}}
							/>
						</Box>
					</Box>
				</Grid>
			</Grid>

			<ModalBox
				open={attachModal}
				onClose={() => setAttachModal(false)}
				header='Attach File to SLA'>
				<ProposalAttachDocument
					closeModal={() => setAttachModal(false)}
					addAttachedFile={handleAttachDoc}
				/>
			</ModalBox>
		</Box>
	);
};

export default CreateSLA;
