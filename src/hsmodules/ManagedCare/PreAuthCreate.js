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
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import SearchAsyncSelect from '../../components/async-select';
import dayjs from 'dayjs';
import RadioInput from '../../components/inputs/RadioInput';

const PreAuthCreate = ({ onClose }) => {
	const data = localStorage.getItem('user');
	const user = JSON.parse(data);

	const { register, handleSubmit } = useForm();
	const [open, setOpen] = useState(false);
	const [emergency, setEmergency] = useState(false);
	const [type, setType] = useState();
	const [patientType, setPatientType] = useState('In-patient');
	const [diagnosis, setDiagnosis] = useState({});
	const [compliantList, setCompliantlIST] = useState([]);
	const [client, setClient] = useState([]);
	const [providers, setProviders] = useState([]);
	const [provider, setProvider] = useState();
	const [patient, setPatient] = useState();
	const [provList, setProvlIST] = useState([]);
	const [serviceList, setServicelIST] = useState([]);
	const [provdiagnosis, setProvDiagnosis] = useState({});
	const [name, setName] = useState();

	let relatedfacilities = user.currentEmployee.facilityDetail;
	// Search fro client
	useEffect(() => {
		axios
			.get(
				`${baseuRL}/client?relatedfacilities.facility=${relatedfacilities._id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						authorization: `Bearer ${token}`,
					},
				},
			)
			.then(response => {
				setClient(response.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	});
	useEffect(() => {
		axios
			.get(`${baseuRL}/organizationclient`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				setProviders(response.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	});

	const [service, setService] = useState({ name: name });

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

	const submit = async data => {
		data.policyid = uuidv4();
		data.PAcode = uuidv4();
		data.preauthCode = uuidv4();
		data.beneficiary = patient;
		data.provider = provider;

		data.convo = [data.convo, data.treatmentPlan];
		data.services = {
			emergency: emergency,
			servcies: serviceList,
			provisionalDiagnosis: provList,
			compliantList: compliantList,
		};
		axios
			.post(`${baseuRL}/preauth`, data, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				toast.success(`You have successfully created a pre-authoorization`);
				onClose();
			})
			.catch(err => {
				toast.error(
					`Sorry, You are unable to create an pre-authorization ${err}`,
				);
			});
	};

	const clientOptions = () => {
		return client.map(c => ({
			label: `${c.firstname} ${c.lastname} ${dayjs(c.dob).format(
				'DD/MM/YYYY',
			)}`,
			value: c._id,
		}));
	};
	const providerOptions = () => {
		return providers.map(c => ({
			label: `${c.facilityDetail.facilityName}`,
			value: c._id,
		}));
	};

	const handleChange = patient => {
		setPatient(patient.value);
	};
	const handleChangeProvider = provider => {
		setProvider(provider.value);
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
						name={name}
						setName={setName}
					/>
				) : (
					<AddDiagnosis
						handleAddDiagnosis={handleAddDiagnosis}
						provdiagnosis={provdiagnosis}
						setProvDiagnosis={setProvDiagnosis}
					/>
				)}
			</ModalBox>
			<h2>Create PreAuthorization</h2>
			<form onSubmit={handleSubmit(submit)}>
				<ToastContainer theme='colored' />
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: '2fr 2fr 2fr' },
						gap: '1rem',
						my: '1rem',
					}}>
					<SearchAsyncSelect
						placeholder='Search for Patient'
						options={clientOptions()}
						onChange={handleChange}
					/>
					<SearchAsyncSelect
						placeholder='Search for Provider'
						options={providerOptions()}
						onChange={handleChangeProvider}
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
					<RadioInput
						options={[
							{ label: 'In-patient', value: 'In-patient' },
							{ label: 'Out of pocket', value: 'Out of pocket' },
						]}
						value={patientType}
						onChange={event => setPatientType(event.target.value)}
					/>

					{patientType !== 'In-patient' && (
						<Input
							type='date'
							label='Date of Admission'
							register={register('submissiondate')}
						/>
					)}
					{patientType !== 'In-patient' && (
						<Input
							type='date'
							label='Date of Discharge'
							register={register('approvedDate')}
						/>
					)}
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
						<Input
							label='Presenting Complaints'
							onChange={e =>
								setDiagnosis({ ...diagnosis, complaints: e.target.value })
							}
						/>
						<Input
							label='Duration'
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

export default PreAuthCreate;

const AddService = ({
	service,
	setService,
	handleAddService,
	name,
	setName,
}) => {
	const [services, setServices] = useState([]);

	useEffect(() => {
		axios
			.get(`${baseuRL}/tariff`, {
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`,
				},
			})
			.then(response => {
				setServices(response.data.data);
			})
			.catch(err => {
				console.log(err);
			});
	});

	const serviceOptions = () => {
		return services.map(c => ({
			label: `${c.band} `,
			value: c._id,
		}));
	};
	const handleChange = name => {
		setService({ ...service, item: name.value });
	};
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
				<SearchAsyncSelect
					placeholder='Search for Service'
					options={serviceOptions()}
					onChange={handleChange}
				/>
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
