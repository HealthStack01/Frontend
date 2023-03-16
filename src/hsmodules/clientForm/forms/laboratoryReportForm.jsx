import { Grid } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import GlobalCustomButton from '../../../components/buttons/CustomButton';
import CheckboxInput from '../../../components/inputs/basic/Checkbox';
import Input from '../../../components/inputs/basic/Input/index';
import { InputBox } from '../../../components/inputs/basic/Input/styles';
import Textarea from '../../../components/inputs/basic/Textarea/index';
import ModalBox from '../../../components/modal';
import { ObjectContext, UserContext } from '../../../context';
import client from '../../../feathers';
import Encounter from '../../Documentation/Documentation';

export default function LaboratoryReportForm() {
	const { register, handleSubmit } = useForm();

	const { state, setState } = useContext(ObjectContext);

	const [choosenForm, setChoosenForm] = useState('');
	const [productModal, setProductModal] = useState(false);

	const formtype = [
		'Haematology',
		'Serology',
		'Biochemistry',
		'Microbiology',
		'Urine',
		'Urinalysis',
		'Stool',
		'HVS Culture',
		'Generic',
	];
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const handleChangeMode = value => {
		setChoosenForm(value);

		setState(prevstate => ({ ...prevstate, labFormType: value }));
	};

	console.log('STATE', state);

	useEffect(() => {
		if (order.resultDetail?.labFormType == null) {
			console.log('null');
			//setChoosenForm("unknown")
			setState(prevstate => ({ ...prevstate, labFormType: 'unknown' }));
		} else {
			console.log('not null');
			//setChoosenForm(state.financeModule.selectedFinance.resultDetail.labFormType)
			setState(prevstate => ({
				...prevstate,
				labFormType:
					state.financeModule.selectedFinance.resultDetail.labFormType,
			}));
		}
		if (order.resultDetail == null) {
			console.log('does not exist');
			// setChoosenForm("")
			setState(prevstate => ({ ...prevstate, labFormType: '' }));
		}

		return () => {};
	}, [order]);
	const showDocumentation = async value => {
		setProductModal(true);
	};
	const handlecloseModal = () => {
		setProductModal(false);
		// handleSearch(val)
	};
	// make text a ProperCase string
	const ProperCase = text => {
		return text
			.toLowerCase()
			.split(' ')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
	};
	console.log(formtype, choosenForm);

	return (
		<>
			<div className='card'>
				<Grid
					container
					spacing={2}
					sx={{
						alignItems: 'center',
					}}>
					<Grid
						item
						xs={12}
						md={6}>
						<p style={{ maxWidth: '200px', fontWeight: '700' }}>
							{ProperCase(
								` ${order.serviceInfo.name} for ${order.orderInfo.orderObj.clientname}`,
							)}
						</p>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<GlobalCustomButton
							text='Documentation'
							onClick={showDocumentation}
							customStyles={{
								float: 'right',
								marginLeft: 'auto',
							}}
							color='success'
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					sx={{
						alignItems: 'center',
					}}>
					<Grid
						item
						xs={12}
						md={6}>
						{bill_report_status === 'Pending' && (
							<div className='control mt-2 mr-2'>
								<div className='select is-small '>
									<select
										name='FormType'
										{...register('FormType')}
										onChange={e => handleChangeMode(e.target.value)}
										className='selectadd'
										style={{
											border: '1px solid #b6b6b6',
											height: '38px',
											borderRadius: '4px',
											width: '100%',
										}}>
										<option
											value=''
											defaultChecked>
											Choose Form{' '}
										</option>
										{formtype.map((option, i) => (
											<option
												key={i}
												value={option}>
												{' '}
												{option}
											</option>
										))}
									</select>
								</div>
							</div>
						)}
					</Grid>
				</Grid>
				<div className='card-content mb-0 vscrollable'>
					<div>
						{state.labFormType === 'Haematology' && <Haematology />}
						{state.labFormType === 'Serology' && <Serology />}
						{state.labFormType === 'Biochemistry' && <Biochemistry />}
						{state.labFormType === 'Microbiology' && <Microbiology />}
						{state.labFormType === 'Urine' && <Urine />}
						{state.labFormType === 'Urinalysis' && <Urinalysis />}
						{state.labFormType === 'Stool' && <Stool />}
						{state.labFormType === 'HVS Culture' && <HVS />}
						{state.labFormType === 'Generic' && <LabNoteGeneric />}
						{state.labFormType === 'unknown' && <LabNoteCreate />}
						{/* {state.labFormType === '' && <LabNoteCreate />} */}
					</div>
				</div>
			</div>
			{productModal && (
				<ModalBox
					open
					onClose={() => setProductModal(false)}>
					<Encounter standalone={true} />
				</ModalBox>
			)}
		</>
	);
}

export function Haematology() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);

	const [docStatus, setDocStatus] = useState('Draft');
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;
	const [hb, setHb] = useState('');
	const [pvc, setPvc] = useState('');
	const [wbc, setWbc] = useState('');
	const [rectics, setRectics] = useState('');
	const [esr, setEsr] = useState('');
	const [platelets, setPlatelets] = useState('');
	const [rbc, setRbc] = useState('');
	const [mcv, setMcv] = useState('');
	const [mchc, setMchc] = useState('');
	const [mch, setMch] = useState('');
	const [neutrophils, setNeutrophils] = useState('');
	const [lymphocytes, setLymphocytes] = useState('');
	const [monocytes, setMonocytes] = useState('');
	const [eosinophils, setEosinophils] = useState('');
	const [basophils, setBasophils] = useState('');

	// let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

	useEffect(() => {
		// setState((prevstate)=>({...prevstate, labFormType:value}))
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result created succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error creating Lab Result ' + err);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result updated succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error updating Lab Result ' + err);
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};
	const inputStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		padding: '0.9rem',
		width: '100%',
		height: '100%',
		borderRadius: ' 4px',
		border: '1.5px solid #BBBBBB',
		width: '100%',
		// on focus
		'&:focus': {
			border: '2px solid #0364FF',
		},
	};
	const labelStyle = {
		position: 'absolute',
		left: '1rem',
		top: '-0.5rem',
		padding: '0 0.25rem',
		backgroundColor: '#fff',
		transition: '0.4s',
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<p
				style={{ fontWeight: '700' }}
				className='label is-small'>
				HEAMATOLOGY
			</p>
			<Grid
				container
				spacing={1}
				mt={1}>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='hb'
							type='text'
							{...register('hb')}
							onChange={e => setHb(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='hb'
							style={
								hb
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							HB (G/DL), Range: 12-16
						</label>
					</InputBox>
					{hb < 12 || hb > 16 ? (
						<p style={{ color: 'red' }}>
							{hb < 12 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='pvc'
							type='text'
							{...register('pvc')}
							onChange={e => setPvc(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='pvc'
							style={
								pvc
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							PVC (%) Range: 36-45
						</label>
					</InputBox>
					{pvc < 36 || pvc > 45 ? (
						<p style={{ color: 'red' }}>
							{pvc < 36 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='wbc'
							type='text'
							{...register('wbc')}
							onChange={e => setWbc(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='wbc'
							style={
								wbc
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							WBC (CMM), Range: 3000-11000
						</label>
					</InputBox>
					{wbc < 3000 || wbc > 11000 ? (
						<p style={{ color: 'red' }}>
							{wbc < 3000 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='esr'
							type='text'
							{...register('esr')}
							onChange={e => setEsr(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='esr'
							style={
								esr
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							ESR (MM/HR), Range: 0.07
						</label>
					</InputBox>
					{esr < 0.07 ? (
						<p style={{ color: 'red' }}>
							<span>Low</span>
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='platelets'
							type='text'
							{...register('platelets')}
							onChange={e => setPlatelets(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='platelets'
							style={
								platelets
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							PLATELETS, Range: 150000-400000
						</label>
					</InputBox>
					{platelets < 150000 || platelets > 400000 ? (
						<p style={{ color: 'red' }}>
							{platelets < 150000 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='rectics'
							type='text'
							{...register('rectics')}
							onChange={e => setRectics(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='rectics'
							style={
								rectics
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							RECTICS (%), Range: 0.3
						</label>
					</InputBox>
					{rectics < 0.3 ? (
						<p style={{ color: 'red' }}>
							<span>Low</span>
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='rbc'
							type='text'
							{...register('rbc')}
							onChange={e => setRbc(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='rbc'
							style={
								rbc
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							RBC, Range: 4.6-12
						</label>
					</InputBox>
					{rbc < 4.6 || rbc > 12 ? (
						<p style={{ color: 'red' }}>
							{rbc < 4.6 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='mcv'
							type='text'
							{...register('mcv')}
							onChange={e => setMcv(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='mcv'
							style={
								mcv
									? { ...labelStyle, top: '-1rem', fontSize: '0.8rem' }
									: labelStyle
							}>
							MCV (FL), Range: 34-55
						</label>
					</InputBox>
					{mcv < 34 || mcv > 55 ? (
						<p style={{ color: 'red' }}>
							{mcv < 34 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='mchc'
							type='text'
							{...register('mchc')}
							onChange={e => setMchc(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='mchc'
							style={labelStyle}>
							MCHC (G/DL), Range: 31-34
						</label>
					</InputBox>
					{mchc < 31 || mchc > 34 ? (
						<p style={{ color: 'red' }}>
							{mchc < 31 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='mch'
							type='text'
							{...register('mch')}
							onChange={e => setMch(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='mch'
							style={labelStyle}>
							MCH, Range: 27-32
						</label>
					</InputBox>
					{mch < 27 || mch > 32 ? (
						<p style={{ color: 'red' }}>
							{mch < 27 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='neutrophils'
							type='text'
							{...register('neutrophils')}
							onChange={e => setNeutrophils(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='neutrophils'
							style={labelStyle}>
							NEUTROPHILS (%), Range: 40-70
						</label>
					</InputBox>
					{neutrophils < 40 || neutrophils > 70 ? (
						<p style={{ color: 'red' }}>
							{neutrophils < 40 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='lymphocytes'
							type='text'
							{...register('lymphocytes')}
							onChange={e => setLymphocytes(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='lymphocytes'
							style={labelStyle}>
							LYMPHOCYTES (%), Range: 20-50
						</label>
					</InputBox>
					{lymphocytes < 20 || lymphocytes > 50 ? (
						<p style={{ color: 'red' }}>
							{lymphocytes < 20 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='monocytes'
							type='text'
							{...register('monocytes')}
							onChange={e => setMonocytes(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='monocytes'
							style={labelStyle}>
							MONOCYTES (%), Range: 2-30
						</label>
					</InputBox>
					{monocytes < 2 || monocytes > 30 ? (
						<p style={{ color: 'red' }}>
							{monocytes < 2 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='eosinophils'
							type='text'
							{...register('eosinophils')}
							onChange={e => setEosinophils(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='eosinophils'
							style={labelStyle}>
							EOSINOPHILS (%), Range: 1-6
						</label>
					</InputBox>
					{eosinophils < 1 || eosinophils > 6 ? (
						<p style={{ color: 'red' }}>
							{eosinophils < 1 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<InputBox>
						<input
							name='basophils'
							type='text'
							{...register('basophils')}
							onChange={e => setBasophils(e.target.value)}
							style={inputStyle}
						/>
						<label
							htmlFor='basophils'
							style={labelStyle}>
							BASOPHILS (%), Range: 0-1
						</label>
					</InputBox>
					{basophils < 0 || basophils > 1 ? (
						<p style={{ color: 'red' }}>
							{basophils < 0 ? <span>Low</span> : <span>High</span>}
						</p>
					) : (
						<p style={{ color: 'green' }}>Normal</p>
					)}
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<Input
						label='Pro-Myelocyte'
						name='proMyelocyte'
						type='text'
						register={register('proMyelocyte')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<Input
						label='Meta-Myelocyte'
						name='metaMyelocyte'
						type='text'
						register={register('metaMyelocyte')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<Input
						label='Nucleated RBC'
						name='nucleatedRbc'
						type='text'
						register={register('nucleatedRbc')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<Input
						label='Genotype'
						name='genotype'
						type='text'
						register={register('genotype')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<Input
						label='Blood Group'
						name='bloodGroup'
						type='text'
						register={register('bloodGroup')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={12}>
					<Textarea
						placeholder='Recommendation'
						name='recommendation'
						type='text'
						register={register('recommendation')}
					/>
				</Grid>
				<Grid
					item
					xs={12}
					sm={2}>
					<input
						type='radio'
						name='status'
						value='Draft'
						checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
						onChange={e => {
							handleChangePart(e);
						}}
						disabled={bill_report_status === 'Final'}
						style={{
							margin: '1rem',
						}}
					/>
					<span
						style={{
							fontSize: '1rem',
						}}>
						{' '}
						Draft
					</span>
				</Grid>{' '}
				<Grid
					item
					xs={12}
					sm={2}>
					<input
						type='radio'
						name='status'
						value='Final'
						checked={reportStatus === 'Final'}
						onChange={e => handleChangePart(e)}
						disabled={bill_report_status === 'Final'}
						style={{
							margin: '1rem',
						}}
					/>
					<span
						style={{
							fontSize: '1rem',
						}}>
						{' '}
						Final{' '}
					</span>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				mt={1}>
				<Grid
					item
					xs={12}
					sm={12}>
					{bill_report_status !== 'Final' && (
						<GlobalCustomButton
							text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
							onClick={handleSubmit(onSubmit)}
							color='success'
						/>
					)}
				</Grid>
			</Grid>
		</form>
	);
}

export function Serology() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);

	const [docStatus, setDocStatus] = useState('Draft');
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result created succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error creating Lab Result ' + err);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p
					style={{ fontWeight: '700' }}
					className='label is-small'>
					SEROLOGY
				</p>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='HBsAG'
							name='hbsag'
							type='text'
							register={register('hbsag')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='HCV'
							name='hcv'
							type='text'
							register={register('hcv')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='VDRL'
							name='vdrl'
							type='text'
							register={register('vdrl')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='RPHA'
							name='rpha'
							type='text'
							register={register('rpha')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='COOMBS'
							name='coombs'
							type='text'
							register={register('coombs')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='A.S.O Titre'
							name='asoTitre'
							type='text'
							register={register('asoTitre')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='SLE'
							name='sle'
							type='text'
							register={register('sle')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}>
						<Input
							label='R.A Factor'
							name='raFactor'
							type='text'
							register={register('raFactor')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='B-HCG'
							name='bHcg'
							type='text'
							register={register('bHcg')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='MANTOUX'
							name='mantoux'
							type='text'
							register={register('mantoux')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Blood Preg. Test'
							name='bloodPregTest'
							type='text'
							register={register('bloodPregTest')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='XYZ'
							name='xyz'
							type='text'
							register={register('xyz')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={12}>
						<Textarea
							placeholder='Recommendation'
							name='Recommendation'
							type='text'
							register={register('Recommendation')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '0 1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Draft
						</span>
					</Grid>{' '}
					<Grid
						item
						xs={12}
						sm={6}>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '0 1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Final{' '}
						</span>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						{bill_report_status !== 'Final' && (
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						)}
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function Biochemistry() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);

	const [docStatus, setDocStatus] = useState('Draft');
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;
	const [glucoseFasting, setGlucoseFasting] = useState('');
	const [glucoseRandom, setGlucoseRandom] = useState('');
	const [urea, setUrea] = useState('');
	const [creatinine, setCreatinine] = useState('');
	const [uricAcid, setUricAcid] = useState('');
	const [sodium, setSodium] = useState('');
	const [potassium, setPotassium] = useState('');
	const [bicarbonate, setBicarbonate] = useState('');
	const [chloride, setChloride] = useState('');
	const [totalProtein, setTotalProtein] = useState('');
	const [albumin, setAlbumin] = useState('');
	const [tBilirubin, setTBilirubin] = useState('');
	const [dBillirubin, setDBillirubin] = useState('');
	const [cholesterol, setCholesterol] = useState('');
	const [triglycerides, setTriglycerides] = useState('');
	const [phos, setPhos] = useState('');
	const [calcium, setCalcium] = useState('');
	const [sgot, setSgot] = useState('');
	const [sgpt, setSgpt] = useState('');
	const [ogtt, setOgtt] = useState('');
	const [alkPhos, setAlkPhos] = useState('');
	const [acidPhos, setAcidPhos] = useState('');
	const [adh, setAdh] = useState('');
	const [apk, setApk] = useState('');
	const [amylase, setAmylase] = useState('');

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});
	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast({
				message:
					' Documentation data missing, requires location and facility details',
				type: 'is-danger',
				dismissible: true,
				pauseOnHover: true,
			});
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error creating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};

	const inputStyle = {
		position: 'absolute',
		top: '0',
		left: '0',
		padding: '0.9rem',
		width: '100%',
		height: '100%',
		borderRadius: ' 4px',
		border: '1.5px solid #BBBBBB',
		width: '100%',
		// on focus
		'&:focus': {
			border: '2px solid #0364FF',
		},
	};
	const labelStyle = {
		position: 'absolute',
		left: '1rem',
		top: '-0.5rem',
		padding: '0 0.25rem',
		backgroundColor: '#fff',
		transition: '0.4s',
		wordBreak: 'break-word',
	};
	return (
		<>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<p
						style={{ fontWeight: '700' }}
						className='label is-small'>
						BIOCHEMISTRY
					</p>
					<Grid
						container
						spacing={1}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='glucoseFasting'
									type='text'
									{...register('glucoseFasting')}
									onChange={e => setGlucoseFasting(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='glucoseFasting'
									style={labelStyle}>
									GLUCOSE (FASTING) (MG/DL), Range: 60-120
								</label>
							</InputBox>
							{glucoseFasting < 60 || glucoseFasting > 120 ? (
								<p style={{ color: 'red' }}>
									{glucoseFasting < 60 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='glucoseRandom'
									type='text'
									{...register('glucoseRandom')}
									onChange={e => setGlucoseRandom(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='glucoseRandom'
									style={labelStyle}>
									GLUCOSE (RANDOM) (MG/DL), Range: 60-180
								</label>
							</InputBox>
							{glucoseRandom < 60 || glucoseRandom > 180 ? (
								<p style={{ color: 'red' }}>
									{glucoseRandom < 60 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='urea'
									type='text'
									{...register('urea')}
									onChange={e => setUrea(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='urea'
									style={labelStyle}>
									UREA (MG/DL), Range: 10-55
								</label>
							</InputBox>
							{urea < 10 || urea > 55 ? (
								<p style={{ color: 'red' }}>
									{urea < 10 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='creatinine'
									type='text'
									{...register('creatinine')}
									onChange={e => setCreatinine(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='creatinine'
									style={labelStyle}>
									CREATININE (MG/DL), Range: 0.6-1.2
								</label>
							</InputBox>
							{creatinine < 0.6 || creatinine > 1.2 ? (
								<p style={{ color: 'red' }}>
									{creatinine < 0.6 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='uricAcid'
									type='text'
									{...register('uricAcid')}
									onChange={e => setUricAcid(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='uricAcid'
									style={labelStyle}>
									URIC ACID (MG/DL), Range: 2.5-7.7
								</label>
							</InputBox>
							{uricAcid < 2.5 || uricAcid > 7.7 ? (
								<p style={{ color: 'red' }}>
									{uricAcid < 2.5 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='sodium'
									type='text'
									{...register('sodium')}
									onChange={e => setSodium(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='sodium'
									style={labelStyle}>
									SODIUM (MMOL/L), Range: 135-150
								</label>
							</InputBox>
							{sodium < 135 || sodium > 150 ? (
								<p style={{ color: 'red' }}>
									{sodium < 135 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='potassium'
									type='text'
									{...register('potassium')}
									onChange={e => setPotassium(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='potassium'
									style={labelStyle}>
									POTASSIUM (MMOL/L), Range: 3.5-5.1
								</label>
							</InputBox>
							{potassium < 3.5 || potassium > 5.1 ? (
								<p style={{ color: 'red' }}>
									{potassium < 3.5 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='bicarbonate'
									type='text'
									{...register('bicarbonate')}
									onChange={e => setBicarbonate(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='bicarbonate'
									style={labelStyle}>
									BICARBONATE (MMOL/L), Range: 21-29
								</label>
							</InputBox>
							{bicarbonate < 21 || bicarbonate > 29 ? (
								<p style={{ color: 'red' }}>
									{bicarbonate < 21 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='chloride'
									type='text'
									{...register('chloride')}
									onChange={e => setChloride(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='chloride'
									style={labelStyle}>
									CHLORIDE (MMOL/L), Range: 98-107
								</label>
							</InputBox>
							{chloride < 98 || chloride > 107 ? (
								<p style={{ color: 'red' }}>
									{chloride < 98 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='totalProtein'
									type='text'
									{...register('totalProtein')}
									onChange={e => setTotalProtein(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='totalProtein'
									style={labelStyle}>
									TOTAL PROTEIN (G/DL), Range: 6.2-8.0
								</label>
							</InputBox>
							{totalProtein < 6.2 || totalProtein > 8.0 ? (
								<p style={{ color: 'red' }}>
									{totalProtein < 6.2 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='albumin'
									type='text'
									{...register('albumin')}
									onChange={e => setAlbumin(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='albumin'
									style={labelStyle}>
									ALBUMIN (G/DL), Range: 3.5-5.5
								</label>
							</InputBox>
							{albumin < 3.5 || albumin > 5.5 ? (
								<p style={{ color: 'red' }}>
									{albumin < 3.5 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='tbilirubin'
									type='text'
									{...register('tbilirubin')}
									onChange={e => setTBilirubin(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='tbilirubin'
									style={labelStyle}>
									TOTAL BILIRUBIN (Mg/DL), Range: 0.12
								</label>
							</InputBox>
							{tBilirubin < 0.12 ? (
								<p style={{ color: 'red' }}>
									<span>Low</span>
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='dbilirubin'
									type='text'
									{...register('dbilirubin')}
									onChange={e => setDBillirubin(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='dbilirubin'
									style={labelStyle}>
									DIRECT BILIRUBIN (Mg/100ML), Range: 0-0.4
								</label>
							</InputBox>
							{dBillirubin < 0 || dBillirubin > 0.4 ? (
								<p style={{ color: 'red' }}>
									{dBillirubin < 0 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='cholesterol'
									type='text'
									{...register('cholesterol')}
									onChange={e => setCholesterol(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='cholesterol'
									style={labelStyle}>
									CHOLESTEROL (MG/100ML), Range: 150-200
								</label>
							</InputBox>
							{cholesterol < 150 || cholesterol > 200 ? (
								<p style={{ color: 'red' }}>
									{cholesterol < 150 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='triglyceride'
									type='text'
									{...register('triglyceride')}
									onChange={e => setTriglycerides(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='triglyceride'
									style={labelStyle}>
									TRIGLYCERIDE (MG/100ML), Range: 100-150
								</label>
							</InputBox>
							{triglycerides < 100 || triglycerides > 150 ? (
								<p style={{ color: 'red' }}>
									{triglycerides < 100 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='phos'
									type='text'
									{...register('phos')}
									onChange={e => setPhos(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='phos'
									style={labelStyle}>
									PHOSPHORUS (MG/DL), Range: 2.5-4.5
								</label>
							</InputBox>
							{phos < 2.5 || phos > 4.5 ? (
								<p style={{ color: 'red' }}>
									{phos < 2.5 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='calcium'
									type='text'
									{...register('calcium')}
									onChange={e => setCalcium(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='calcium'
									style={labelStyle}>
									CALCIUM (MG/DL), Range: 8.8-10.2
								</label>
							</InputBox>
							{calcium < 8.8 || calcium > 10.2 ? (
								<p style={{ color: 'red' }}>
									{calcium < 8.8 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='sgot'
									type='text'
									{...register('sgot')}
									onChange={e => setSgot(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='sgot'
									style={labelStyle}>
									SGOT (U/L), Range: 0-46
								</label>
							</InputBox>
							{sgot < 0 || sgot > 46 ? (
								<p style={{ color: 'red' }}>
									{sgot < 0 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='sgpt'
									type='text'
									{...register('sgpt')}
									onChange={e => setSgpt(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='sgpt'
									style={labelStyle}>
									SGPT (U/L), Range: 0-49
								</label>
							</InputBox>
							{sgpt < 0 || sgpt > 49 ? (
								<p style={{ color: 'red' }}>
									{sgpt < 0 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='ogtt'
									type='text'
									{...register('ogtt')}
									onChange={e => setOgtt(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='ogtt'
									style={labelStyle}>
									OGTT (MG/DL), Range: 6-30
								</label>
							</InputBox>
							{ogtt < 6 || ogtt > 30 ? (
								<p style={{ color: 'red' }}>
									{ogtt < 6 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='alkphos'
									type='text'
									{...register('alkphos')}
									onChange={e => setAlkPhos(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='alkphos'
									style={labelStyle}>
									ALKALINE PHOSPHATASE (U/L), Range: 64-306
								</label>
							</InputBox>
							{alkPhos < 64 || alkPhos > 306 ? (
								<p style={{ color: 'red' }}>
									{alkPhos < 64 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='acidphos'
									type='text'
									{...register('acidphos')}
									onChange={e => setAcidPhos(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='acidphos'
									style={labelStyle}>
									ACID PHOSPHATASE (U/L), Range: 0-0.81
								</label>
							</InputBox>
							{acidPhos < 0 || acidPhos > 0.81 ? (
								<p style={{ color: 'red' }}>
									{acidPhos < 0 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='adh'
									type='text'
									{...register('adh')}
									onChange={e => setAdh(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='adh'
									style={labelStyle}>
									ADH (U/L), Range: 160-320
								</label>
							</InputBox>
							{adh < 160 || adh > 320 ? (
								<p style={{ color: 'red' }}>
									{adh < 160 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='apk'
									type='text'
									{...register('apk')}
									onChange={e => setApk(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='apk'
									style={labelStyle}>
									APK (U/L), Range: 15-130
								</label>
							</InputBox>
							{apk < 15 || apk > 130 ? (
								<p style={{ color: 'red' }}>
									{apk < 15 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={3}>
							<InputBox>
								<input
									name='amylase'
									type='text'
									{...register('amylase')}
									onChange={e => setAmylase(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='amylase'
									style={labelStyle}>
									AMYLASE (U/L), Range: 30-125
								</label>
							</InputBox>
							{amylase < 30 || amylase > 125 ? (
								<p style={{ color: 'red' }}>
									{amylase < 30 ? <span>Low</span> : <span>High</span>}
								</p>
							) : (
								<p style={{ color: 'green' }}>Normal</p>
							)}
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}>
							<InputBox>
								<input
									name='Recommendation'
									type='text'
									{...register('Recommendation')}
									onChange={e => setAmylase(e.target.value)}
									style={inputStyle}
								/>
								<label
									htmlFor='amylase'
									style={labelStyle}>
									Recommendation
								</label>
							</InputBox>
						</Grid>
						<Grid
							item
							xs={12}
							sm={1}>
							<input
								type='radio'
								name='status'
								value='Draft'
								checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
								onChange={e => {
									handleChangePart(e);
								}}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span
								style={{
									fontSize: '1rem',
								}}>
								{' '}
								Draft
							</span>
						</Grid>{' '}
						<Grid
							item
							xs={12}
							sm={1}>
							<input
								type='radio'
								name='status'
								value='Final'
								checked={reportStatus === 'Final'}
								onChange={e => handleChangePart(e)}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span
								style={{
									fontSize: '1rem',
								}}>
								{' '}
								Final{' '}
							</span>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							{bill_report_status !== 'Final' && (
								<GlobalCustomButton
									text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
									onClick={handleSubmit(onSubmit)}
									color='success'
								/>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
		</>
	);
}

export function Microbiology() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);

	const [docStatus, setDocStatus] = useState('Draft');
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result created succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error creating Lab Result ' + err);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result updated succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error updating Lab Result ' + err);
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};

	const checkBoxArray = [
		{
			name: 'urinalysisOrMicro',
			label: 'UrinalysisOrMicro',
			value: 'urinalysisOrMicro',
		},
		{
			name: 'stoolAnalysis',
			label: 'Stool Analysis',
			value: 'Stool Analysis',
		},
		{
			name: 'stoolOccult',
			label: 'Semen Analysis',
			value: 'Semen Analysis',
		},
		{ name: 'Finding', label: 'Finding', value: 'Recommendation' },
		{
			name: 'gramStain',
			label: 'Gram Stain',
			value: 'Gram Stain',
		},
		{
			name: 'znStain',
			label: 'ZN Stain',
			value: 'ZN Stain',
		},
		{
			name: 'mantouxTest',
			label: 'Mantoux Test',
			value: 'Mantoux Test',
		},
		{
			name: 'fungalStudies',
			label: 'Fungal Studies',
			value: 'Fungal Studies',
		},
		{
			name: 'urine',
			label: 'M/C/S Urine',
			value: 'M/C/S Urine',
		},
		{
			name: 'throatSwab',
			label: 'M/C/S Throat Swab',
			value: 'M/C/S Throat Swab',
		},
		{
			name: 'aspirateAndDischarge',
			label: 'C/S/PUS/Aspirate/Discharge',
			value: 'C/S/PUS/Aspirate/Discharge',
		},
		{
			name: 'woundSwab',
			label: 'C/S Wound Swab',
			value: 'C/S Wound Swab',
		},
		{
			name: 'semen',
			label: 'M/C/S Semen',
			value: 'M/C/S Semen',
		},
		{
			name: 'fluid',
			label: 'M/C/S Fluid',
			value: 'M/C/S Fluid',
		},
		{
			name: 'stool2',
			label: 'M/C/S Stool',
			value: 'M/C/S Stool',
		},
		{
			name: 'endocerviclSwab',
			label: 'C/S Endocervical Swab',
			value: 'C/S Endocervical Swab',
		},
		{
			name: 'hvs',
			label: 'M/C/S HVS',
			value: 'M/C/S HVS',
		},
		{
			name: 'sputum',
			label: 'M/C/S Sputum',
			value: 'M/C/S Sputum',
		},

		{
			name: 'csBld',
			label: 'C/S Blood',
			value: 'C/S Blood',
		},
		{
			name: 'microfilariaSkin',
			label: 'Microfilaria-Skin Snip',
			value: 'Microfilaria-Skin Snip',
		},
		{
			name: 'otherSwab',
			label: 'Other Swab (Specify)',
			value: 'Other Swab (Specify)',
		},
		{
			name: 'faecalOccultBld',
			label: 'Faecal Occult Blood',
			value: 'Faecal Occult Blood',
		},
		{
			name: 'salmoOrshigella',
			label: 'Recommalmonella/Shigellaendation',
			value: 'almonella/Shigella',
		},
	];
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p
					style={{ fontWeight: '700' }}
					className='label is-small'>
					MiCROBIOLOGY
				</p>

				<>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}>
						<CheckboxInput options={checkBoxArray} />
					</div>
				</>

				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						<Textarea
							placeholder='Recommendation'
							name='Recommendation'
							type='text'
							register={register('Recommendation')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Draft
						</span>
					</Grid>{' '}
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Final{' '}
						</span>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						{bill_report_status !== 'Final' && (
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						)}
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function Urine() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const [docStatus, setDocStatus] = useState('Draft');

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});
	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast.success('Lab Result created succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error creating Lab Result ' + err);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p
					style={{ fontWeight: '700' }}
					className='label is-small'>
					Urine
				</p>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Macroscopy'
							name='macroscopy'
							type='text'
							register={register('macroscopy')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Microscopy'
							name='microscopy'
							type='text'
							register={register('microscopy')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Pus Cells/hof'
							name='pusCellsOrhof'
							type='text'
							register={register('pusCellsOrhof')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='RBC/hpf'
							name='rbsOrHpf'
							type='text'
							register={register('rbsOrHpf')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Yeast Cells'
							name='yeastCells'
							type='text'
							register={register('yeastCells')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Bacteria'
							name='bacteria'
							type='text'
							register={register('bacteria')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Casts'
							name='casts'
							type='text'
							register={register('casts')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Epith Cells'
							name='epithCells'
							type='text'
							register={register('epithCells')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Crystals'
							name='crystals'
							type='text'
							register={register('crystals')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}>
						<Input
							label='T.V'
							name='tv'
							type='text'
							register={register('tv')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							label='Culture Yielded'
							name='cultureYielded'
							register={register('cultureYielded')}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							label='Malaria Parasite'
							name='malariaParasite'
							register={register('malariaParasite')}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							label='Recommendation'
							name='Recommendation'
							register={register('Recommendation')}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Draft
						</span>
					</Grid>{' '}
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Final{' '}
						</span>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						{bill_report_status !== 'Final' && (
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						)}
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function Urinalysis() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const [docStatus, setDocStatus] = useState('Draft');

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});
	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast({
				message:
					' Documentation data missing, requires location and facility details',
				type: 'is-danger',
				dismissible: true,
				pauseOnHover: true,
			});
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error creating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};

	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label className='label is-small'>URINALYSIS</label>
				<div className='columns'>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Appearance</label>
								<p className='control is-expanded'>
									<input
										name='appearance'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Color</label>
								<p className='control is-expanded'>
									<input
										name='color'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='columns'>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>PH</label>
								<p className='control is-expanded'>
									<input
										name='ph'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Protein</label>
								<p className='control is-expanded'>
									<input
										name='protein'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Sugar</label>
								<p className='control is-expanded'>
									<input
										name='sugar'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Ketones</label>
								<p className='control is-expanded'>
									<input
										name='ketones'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='columns'>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Blood</label>
								<p className='control is-expanded'>
									<input
										name='blood'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Billirubin</label>
								<p className='control is-expanded'>
									<input
										name='billirubin'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>S.G</label>
								<p className='control is-expanded'>
									<input
										name='sg'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Nitrite</label>
								<p className='control is-expanded'>
									<input
										name='nitrite'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='columns'>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Urobilin</label>
								<p className='control is-expanded'>
									<input
										name='urobilin'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Urobilinogen</label>
								<p className='control is-expanded'>
									<input
										name='urobilinogin'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
					<div className='column is-half'>
						<div className='field-body'>
							<div className='field is-flex'>
								<label className='label is-small mr-2'>Leucocyte</label>
								<p className='control is-expanded'>
									<input
										name='leucocyte'
										className='input is-small'
										type='text'
									/>
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className='field is-horizontal'>
					<div className='field-body'>
						<div className='field'>
							<div className='control has-icons-left has-icons-right'>
								<textarea
									className='textarea is-small'
									{...register('x')}
									name='Recommendation'
									type='text'
									placeholder='Recommendation'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='field'>
					<label className=' is-small'>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
						/>
						<span> Draft</span>
					</label>{' '}
					<br />
					<label className=' is-small'>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
						/>
						<span> Final </span>
					</label>
				</div>

				<div className='field  is-grouped mt-2'>
					<p className='control'>
						<GlobalCustomButton
							text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
							onClick={handleSubmit(onSubmit)}
							color='success'
							disabled={bill_report_status === 'Final'}
						/>
					</p>
					{/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
				</div>
			</form>
		</>
	);
}

export function Stool() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const [docStatus, setDocStatus] = useState('Draft');

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast({
				message:
					' Documentation data missing, requires location and facility details',
				type: 'is-danger',
				dismissible: true,
				pauseOnHover: true,
			});
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error creating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p
					style={{ fontWeight: '700' }}
					className='label is-small'>
					STOOL
				</p>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							placeholder='Macro'
							name='macro'
							type='text'
							register={register('macro')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							placeholder='Micro'
							name='micro'
							type='text'
							register={register('macro')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={4}>
						<Textarea
							placeholder='Culture'
							name='culture2'
							type='text'
							register={register('macro')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						<Textarea
							placeholder='Recommendation'
							name='Recommendation'
							type='text'
							register={register('Recommendation')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Draft
						</span>
					</Grid>{' '}
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Final{' '}
						</span>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						{bill_report_status !== 'Final' && (
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						)}
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function HVS() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const [docStatus, setDocStatus] = useState('Draft');

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast({
				message:
					' Documentation data missing, requires location and facility details',
				type: 'is-danger',
				dismissible: true,
				pauseOnHover: true,
			});
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error creating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangePart = async e => {
		console.log(e.target.value);
		setReportStatus(e.target.value);
	};

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p
					style={{ fontWeight: '700' }}
					className='label is-small'>
					HVS CULTURE
				</p>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label="Pus cells' hpf"
							name='pusCells'
							type='text'
							register={register('pusCells')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Rbcs/hpf'
							name='rbcsOrHpf'
							type='text'
							register={register('rbcsOrHpf')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Yeast Cells'
							name='yeastCells'
							type='text'
							register={register('yeastCells')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Bacteria'
							name='bacteria2'
							type='text'
							register={register('bacteria2')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Casts'
							name='casts'
							type='text'
							register={register('casts')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Epith Cells'
							name='epithCells2'
							type='text'
							register={register('epithCells2')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='Crystals'
							name='crystals2'
							type='text'
							register={register('crystals2')}
						/>
					</Grid>
					<Grid
						item
						xs={12}
						sm={3}>
						<Input
							label='T.V'
							name='tv2'
							type='text'
							register={register('tv2')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={1}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						<Textarea
							placeholder='Recommendation'
							name='Recommendation'
							type='text'
							register={register('Recommendation')}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Draft'
							checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
							onChange={e => {
								handleChangePart(e);
							}}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Draft
						</span>
					</Grid>{' '}
					<Grid
						item
						xs={12}
						sm={2}>
						<input
							type='radio'
							name='status'
							value='Final'
							checked={reportStatus === 'Final'}
							onChange={e => handleChangePart(e)}
							disabled={bill_report_status === 'Final'}
							style={{
								margin: '1rem',
							}}
						/>
						<span
							style={{
								fontSize: '1rem',
							}}>
							{' '}
							Final{' '}
						</span>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						sm={12}>
						{bill_report_status !== 'Final' && (
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						)}
					</Grid>
				</Grid>
			</form>
		</>
	);
}

export function LabNoteGeneric() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const dClientServ = client.service('clinicaldocument');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const { state, setState } = useContext(ObjectContext);

	const [docStatus, setDocStatus] = useState('Draft');
	const [reportStatus, setReportStatus] = useState('Draft');
	const ClientServ = client.service('labresults');
	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	const getSearchfacility = obj => {
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
		//setFacility(user.activeClient.FacilityId)//
		if (!user.stacker) {
			/*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
		}
	});

	const onSubmit = async data => {
		// e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		console.log(data);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					//

					setSuccess(true);
					toast.success('Lab Result created succesfully');
					setSuccess(false);
				})
				.catch(err => {
					toast.error(`Error creating Lab Result  + ${err}`);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					//

					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangeStatus = async e => {
		// await setAppointment_type(e.target.value)

		setDocStatus(e.target.value);

		//console.log(e.target.value)
	};
	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};

	return (
		<>
			<div className='card'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							<Input
								name='investigation'
								register={register('investigation')}
								type='text'
								placeholder='Investigation'
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							<Textarea
								name='finding'
								placeholder='Findings'
								register={register('finding')}
								type='text'
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							<Textarea
								name='recommendation'
								placeholder='Recommendation'
								register={register('recommendation')}
								type='text'
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={2}>
							<input
								type='radio'
								name='status'
								value='Draft'
								checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
								onChange={e => {
									handleChangePart(e);
								}}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span
								style={{
									fontSize: '1rem',
								}}>
								{' '}
								Draft
							</span>
						</Grid>{' '}
						<Grid
							item
							xs={12}
							sm={2}>
							<input
								type='radio'
								name='status'
								value='Final'
								checked={reportStatus === 'Final'}
								onChange={e => handleChangePart(e)}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span
								style={{
									fontSize: '1rem',
								}}>
								{' '}
								Final{' '}
							</span>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={2}>
							<GlobalCustomButton
								text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
								onClick={handleSubmit(onSubmit)}
								color='success'
							/>
						</Grid>
					</Grid>
				</form>
			</div>
		</>
	);
}

export function LabNoteCreate() {
	const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const ClientServ = client.service('labresults');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [reportStatus, setReportStatus] = useState('Draft');
	const { state, setState } = useContext(ObjectContext);

	const order = state.financeModule.selectedFinance;
	const bill_report_status = state.financeModule.report_status;

	const getSearchfacility = obj => {
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

	const onSubmit = async (data, e) => {
		e.preventDefault();
		setMessage('');
		setError(false);
		setSuccess(false);
		let document = {};
		// data.createdby=user._id
		//  console.log(data);
		if (user.currentEmployee) {
			document.facility = user.currentEmployee.facilityDetail._id;
			document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
		}
		document.documentdetail = data;
		document.documentType = 'Diagnostic Result';
		document.documentname = `${order.serviceInfo.name} Result`;
		// document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
		document.location =
			state.employeeLocation.locationName +
			' ' +
			state.employeeLocation.locationType;
		document.locationId = state.employeeLocation.locationId;
		document.client = order.orderInfo.orderObj.clientId;
		document.createdBy = user._id;
		document.createdByname = user.firstname + ' ' + user.lastname;
		document.status = reportStatus;
		document.billId = order._id;
		// document.formType=choosenForm
		//  console.log(document)
		//  console.log(order)

		if (
			document.location === undefined ||
			!document.createdByname ||
			!document.facilityname
		) {
			toast.error(
				' Documentation data missing, requires location and facility details',
			);
			return;
		}

		if (bill_report_status === 'Pending') {
			document.labFormType = state.labFormType;
			ClientServ.create(document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result created succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast.error('Error creating Lab Result ' + err);
				});
		}

		if (bill_report_status === 'Draft') {
			ClientServ.patch(order.resultDetail._id, document)
				.then(res => {
					setSuccess(true);
					toast({
						message: 'Lab Result updated succesfully',
						type: 'is-success',
						dismissible: true,
						pauseOnHover: true,
					});
					setSuccess(false);
				})
				.catch(err => {
					toast({
						message: 'Error updating Lab Result ' + err,
						type: 'is-danger',
						dismissible: true,
						pauseOnHover: true,
					});
				});
		}
		const newProductEntryModule = {
			selectedFinance: order,
			show: 'show',
			// report_status:order.report_status
		};
		await setState(prevstate => ({
			...prevstate,
			financeModule: newProductEntryModule,
		}));
	};

	const handleChangePart = async e => {
		console.log(e.target.value);
		await setReportStatus(e.target.value);
	};

	useEffect(() => {
		if (!order.resultDetail?.documentdetail) {
			setValue('Finding', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			setValue('Recommendation', '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			// setReportStatus(order.report_status)

			return;
		}
		if (order.report_status !== 'Pending') {
			console.log(order.resultDetail.documentdetail);

			Object.entries(order.resultDetail.documentdetail).map(
				([keys, value], i) =>
					setValue(keys, value, {
						shouldValidate: true,
						shouldDirty: true,
					}),
			);
		}

		return () => {};
	}, [order]);

	return (
		<>
			<div className='card'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							<Textarea
								name='Finding'
								placeholder='Findings'
								register={register('Finding')}
								type='text'
								disabled={bill_report_status === 'Final'}
								style={{
									cursor: bill_report_status === 'Final' && 'not-allowed',
								}}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={12}>
							<Textarea
								name='Recommendation'
								placeholder='Recommendation'
								register={register('Recommendation')}
								type='text'
								disabled={bill_report_status === 'Final'}
								style={{
									cursor: bill_report_status === 'Final' && 'not-allowed',
								}}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}
							sm={2}>
							<input
								type='radio'
								name='status'
								value='Draft'
								checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
								onChange={e => {
									handleChangePart(e);
								}}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span> Draft</span>
						</Grid>{' '}
						<Grid
							item
							xs={12}
							sm={2}>
							<input
								type='radio'
								name='status'
								value='Final'
								checked={reportStatus === 'Final'}
								onChange={e => handleChangePart(e)}
								disabled={bill_report_status === 'Final'}
								style={{
									margin: '0 1rem',
								}}
							/>
							<span> Final </span>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						mt={1}>
						<Grid
							item
							xs={12}
							sm={2}>
							{bill_report_status !== 'Final' && (
								<GlobalCustomButton
									text={bill_report_status === 'Pending' ? 'Save' : 'Update'}
									onClick={handleSubmit(onSubmit)}
									color='success'
								/>
							)}
						</Grid>
					</Grid>
				</form>
			</div>
		</>
	);
}
