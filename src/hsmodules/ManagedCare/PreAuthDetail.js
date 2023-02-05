import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import { useForm } from 'react-hook-form';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Textarea from '../../components/inputs/basic/Textarea';
import CustomTable from '../../components/customtable';
import { complaintSchema, diagnosisSchema, serviceSchema } from './schema';
import ModalBox from '../../components/modal';
import axios from 'axios';
import { baseuRL, token } from '../../utils/api';
import { toast, ToastContainer } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import SelectSearch from 'react-select-search';

const PreAuthDetail = ({ onClose, data }) => {
	let services = data?.services ? data?.services[0] : [];

	const { register, handleSubmit, reset } = useForm();
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState(data);
	const [emergency, setEmergency] = useState(false);
	const [type, setType] = useState();
	const [diagnosis, setDiagnosis] = useState({});
	const [compliantList, setCompliantlIST] = useState(
		services?.compliantList || [],
	);
	const [provList, setProvlIST] = useState(
		services?.provisionalDiagnosis || [],
	);
	const [serviceList, setServicelIST] = useState(services?.servcies || []);
	const [provdiagnosis, setProvDiagnosis] = useState({});
	const [service, setService] = useState({});

	const handleAddDiagnosis = () => {
		setProvlIST([...provList, provdiagnosis]);
		setProvDiagnosis([]);
		setOpen(false);
	};
	const handleAddService = () => {
		setServicelIST([...serviceList, service]);
		setService([]);
		setOpen(false);
	};

	console.log('Row', row);

	useEffect(() => {
		reset({
			policyid: data?.policyid,
			PAcode: data?.PAcode,
			convo: data?.convo,
			beneficiary: data?.beneficiary,
			hmopayer: data?.hmopayer,
			provider: data?.provider,
			patientstate: data?.patientstate,
			submissiondate: new Date(data?.submissiondate),
			approvedDate: data?.approvedDate,
			clinical_details: data?.clinical_details,
			treatmentPlan: data.convo && data.convo[0],
		});
	}, []);

	const submit = async data => {
		data.policyid = uuidv4();
		data.PAcode = uuidv4();
		data.preauthCode = uuidv4();
		data.convo = [data.convo, data.treatmentPlan];
		data.services = {
			emergency: emergency,
			servcies: serviceList,
			provisionalDiagnosis: provList,
			compliantList: compliantList,
		};
		axios
			.patch(`${baseuRL}/preauth/${row._id}`, data, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				toast.success(`You have successfully updated a pre-authoorization`);
				onClose();
			})
			.catch(err => {
				toast.error(
					`Sorry, You are unable to update an pre-authorization ${err}`,
				);
			});
	};

	return (
		<Box>
			<ModalBox
				open={open}
				onClose={() => setOpen(false)}>
				{type === 'services' ? (
					<AddService
						service={service}
						setService={setService}
						handleAddService={handleAddService}
					/>
				) : (
					<AddDiagnosis
						handleAddDiagnosis={handleAddDiagnosis}
						provdiagnosis={provdiagnosis}
						setProvDiagnosis={setProvDiagnosis}
					/>
				)}
			</ModalBox>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}>
				<h2>PreAuthorization Details</h2>
			</Box>
			<form onSubmit={handleSubmit(submit)}>
				<ToastContainer theme='colored' />
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: '2fr 2fr 2fr' },
						gap: '1rem',
						my: '1rem',
					}}>
					<Input
						placeholder='Enter for Patient name'
						register={register('beneficiary')}
					/>
					<Input
						placeholder='Enter for provider'
						register={register('provider')}
					/>
					<Input
						placeholder='Enter for HMO Payer'
						register={register('hmopayer')}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
						<input
							type='checkbox'
							onChange={() => setEmergency(!emergency)}
						/>{' '}
						<label>Emergency</label>
					</Box>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: 'repeat(3,1fr)' },
						gap: '1rem',
						my: '1rem',
					}}>
					<CustomSelect
						label='Patient Type'
						register={register('patientstate')}
						options={[
							{ label: 'In-patient', value: 'In-patient' },
							{ label: 'Out of pocket', value: 'Out of pocket' },
						]}
					/>
					<Input
						type='date'
						label='Date of Admission'
						register={register('submissiondate')}
					/>

					<Input
						type='date'
						label='Date of Discharge'
						register={register('approvedDate')}
					/>
				</Box>

				<Box>
					<h3>Compliants</h3>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', lg: 'repeat(2,1fr)' },
							gap: '1rem',
							my: '1rem',
						}}>
						<CustomSelect
							label='Presenting Complaints'
							options={[
								{ label: 'Compliant 1', value: 'Compliant 1' },
								{ label: 'Compliant 2', value: 'Compliant 2' },
								{ label: 'Compliant 3', value: 'Compliant 3' },
								{ label: 'Compliant 4', value: 'Compliant 4' },
							]}
							onChange={e =>
								setDiagnosis({ ...diagnosis, complaints: e.target.value })
							}
						/>
						<CustomSelect
							label='Duration'
							options={[
								{ label: '12 months ', value: '12' },
								{ label: '6 months ', value: '6' },
								{ label: '3 months ', value: '3' },
								{ label: '1 months ', value: '1' },
							]}
							onChange={e =>
								setDiagnosis({ ...diagnosis, duration: e.target.value })
							}
						/>
					</Box>

					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<GlobalCustomButton
							onClick={() => {
								// diagnosisData.push(diagnosis);

								setCompliantlIST([...compliantList, diagnosis]);
								setDiagnosis([]);
							}}
							loading={false}>
							Save
						</GlobalCustomButton>
					</Box>
					<CustomTable
						title={''}
						columns={complaintSchema}
						data={compliantList}
						pointerOnHover
						highlightOnHover
						striped
						loading={false}
					/>

					<Textarea
						label='Clinical Findings'
						register={register('clinical_details')}
					/>
				</Box>

				{/* Provisional Diagnosis Findings */}
				<Box sx={{ my: '2rem' }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3>Provisional Diagnosis</h3>
						<GlobalCustomButton
							onClick={() => {
								setOpen(true);
								setType('diagnosis');
							}}
							loading={false}>
							Add Provisional Diagnosis
						</GlobalCustomButton>
					</Box>

					<CustomTable
						title={''}
						columns={diagnosisSchema}
						data={provList}
						pointerOnHover
						highlightOnHover
						striped
						loading={false}
					/>

					<Textarea
						label='Treatment Plan'
						register={register('treatmentPlan')}
					/>
				</Box>

				{/* Services*/}
				<Box sx={{ my: '2rem' }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3>Services</h3>
						<GlobalCustomButton
							onClick={() => {
								setOpen(true);
								setType('services');
							}}
							loading={false}>
							Add Services
						</GlobalCustomButton>
					</Box>

					<CustomTable
						title={''}
						columns={serviceSchema}
						data={serviceList}
						pointerOnHover
						highlightOnHover
						striped
						loading={false}
					/>

					<Textarea
						label='Reason for Request'
						register={register('convo')}
					/>
				</Box>

				<GlobalCustomButton
					onClick={handleSubmit(submit)}
					loading={false}>
					Submit
				</GlobalCustomButton>
			</form>
		</Box>
	);
};

export default PreAuthDetail;

const AddService = ({ service, setService, handleAddService }) => {
	return (
		<Box>
			<h2>Service</h2>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: { xs: '1fr', lg: 'repeat(2,1fr)' },
					gap: '1rem',
					my: '1rem',
				}}>
				<Input
					label='Service'
					placeholder='Enter a Service'
					onChange={e => setService({ ...service, item: e.target.value })}
				/>
				<Input
					label='Unit Price'
					placeholder='Enter a Unit Price'
					onChange={e => setService({ ...service, unitPrice: e.target.value })}
				/>
				<Input
					label='Quantity'
					placeholder='Enter a quantity'
					onChange={e => setService({ ...service, quantity: e.target.value })}
				/>
				<Input
					label='Total Amount'
					placeholder='Enter a total amount'
					onChange={e => setService({ ...service, total: e.target.value })}
				/>
			</Box>
			<Textarea
				label='Comment'
				onChange={e => setService({ ...service, comment: e.target.value })}
			/>
			<GlobalCustomButton
				onClick={handleAddService}
				loading={false}>
				Submit
			</GlobalCustomButton>
		</Box>
	);
};

const AddDiagnosis = ({
	provdiagnosis,
	setProvDiagnosis,
	handleAddDiagnosis,
}) => {
	return (
		<Box>
			<h2>Diagnosis</h2>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: '1rem',
					my: '1rem',
				}}>
				<Input
					label='Diagnosis Type'
					placeholder='Enter a type'
					onChange={e =>
						setProvDiagnosis({ ...provdiagnosis, type: e.target.value })
					}
				/>
				<Input
					label='Code'
					placeholder='Enter Code'
					onChange={e =>
						setProvDiagnosis({ ...provdiagnosis, code: e.target.value })
					}
				/>

				<Textarea
					label='Comment'
					onChange={e =>
						setProvDiagnosis({ ...provdiagnosis, comment: e.target.value })
					}
				/>
			</Box>
			<GlobalCustomButton
				onClick={handleAddDiagnosis}
				loading={false}>
				Submit
			</GlobalCustomButton>
		</Box>
	);
};
