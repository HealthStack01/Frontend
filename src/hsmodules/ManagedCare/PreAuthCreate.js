import { Box } from '@mui/material';
import React, { useState } from 'react';
import Input from '../../components/inputs/basic/Input';
import CustomSelect from '../../components/inputs/basic/Select';
import { useForm } from 'react-hook-form';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Textarea from '../../components/inputs/basic/Textarea';
import CustomTable from '../../components/customtable';
import { diagnosisSchema, serviceSchema } from './schema';

const PreAuthCreate = () => {
	const { register, handleSubmit, watch, errors } = useForm();
	const [open, setOpen] = useState(false);
	const [diagnosis, setDiagnosis] = useState({});
	const [povdiagnosis, setProvDiagnosis] = useState([]);
	const [service, setService] = useState({});

	const diagnosisData = [];
	const prevDiagnosisData = [];

	const submit = async data => {};
	return (
		<Box>
			<h2>Create PreAuthorization</h2>
			<form onSubmit={handleSubmit(submit)}>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: '4fr 1fr' },
						gap: '1rem',
						my: '1rem',
					}}>
					<Input
						placeholder='Enter for Patient name'
						register={register('beneficiary')}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
						<input type='checkbox' /> <label>Emergency</label>
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
						register={register('dischargedate')}
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
								{ label: 'Compliant 1', value: '1' },
								{ label: 'Compliant 2', value: '2' },
								{ label: 'Compliant 3', value: '3' },
								{ label: 'Compliant 4', value: '4' },
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
								diagnosisData.push(diagnosis);
								setDiagnosis([]);
							}}
							loading={false}>
							Save
						</GlobalCustomButton>
					</Box>
					<CustomTable
						title={''}
						columns={diagnosisSchema}
						data={[]}
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
							onClick={() => setOpen(true)}
							loading={false}>
							Add Provisional Diagnosis
						</GlobalCustomButton>
					</Box>

					<CustomTable
						title={''}
						columns={diagnosisSchema}
						data={diagnosisData}
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

				{/* Provisional Diagnosis Findings */}
				<Box sx={{ my: '2rem' }}>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<h3>Services</h3>
						<GlobalCustomButton
							onClick={() => setOpen(true)}
							loading={false}>
							Add Services
						</GlobalCustomButton>
					</Box>

					<CustomTable
						title={''}
						columns={serviceSchema}
						data={[]}
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

const AddService = ({ service, setService }) => {
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
				label='Treatment Plan'
				onChange={e => setService({ ...service, comment: e.target.value })}
			/>
		</Box>
	);
};

const AddDiagnosis = ({ service, setService }) => {
	return (
		<Box>
			<h2>Diagnosis</h2>
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
				label='Treatment Plan'
				onChange={e => setService({ ...service, comment: e.target.value })}
			/>
		</Box>
	);
};
