/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { useForm } from 'react-hook-form';
import { UserContext, ObjectContext } from '../../context';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import { Box, Grid, Typography } from '@mui/material';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import { FormsHeaderText } from '../../components/texts';
import Input from '../../components/inputs/basic/Input';
import TextArea from '../../components/inputs/basic/Textarea';
import { toast, ToastContainer } from 'react-toastify';
import { MdOutlineUpdate, MdEdit } from 'react-icons/md';
import CreateIcon from '@mui/icons-material/Create';

export default function FundsManagement() {
	const [currentView, setCurrentView] = useState('list');
	const [createModal, setCreateModal] = useState(false);

	const handleCreateModal = () => {
		setCreateModal(true);
	};

	const handleHideCreateModal = () => {
		setCreateModal(false);
	};

	return (
		<section className='section remPadTop'>
			{currentView === 'list' && (
				<FundsManagementList
					showTransactions={() => setCurrentView('transactions')}
					showCreateModal={handleCreateModal}
				/>
			)}
			{currentView === 'transactions' && (
				<FundsManagementDetails handleGoBack={() => setCurrentView('list')} />
			)}

			<ModalBox
				width='50%'
				overflow='hidden'
				open={createModal}
				onClose={handleHideCreateModal}
				header='Create Fund Management'>
				<FundsManagementCreate />
			</ModalBox>
		</section>
	);
}

export function FundsManagementCreate() {
	const { state, setState } = useContext(ObjectContext);
	const { register, handleSubmit, setValue, reset } = useForm();
	const FundMgtServ = client.service('fundmgt');
	const { user } = useContext(UserContext);

	const onSubmit = (data, e) => {
		e.preventDefault();

		data.organizationId = user.currentEmployee.facilityDetail._id;
		data.organizationName = user.currentEmployee.facilityDetail.facilityName;
		data.bank = data.bankName;
		data.accountType = data.accountType;
		data.accountNumber = data.accountNumber;
		data.sortcode = data.sortCode;
		data.description = data.description;
		data.currentBalance = data.currentBalance;
		data.Transactions = data.transactions;

		FundMgtServ.create(data)
			.then((res) => {
				toast.success(`Fund successfully created`);
				console.log(res);
				reset();
			})
			.catch((err) => {
				toast(`Error creating fund management, ${err}`);
				console.log(err);
			});
	};

	return (
		<>
			<ToastContainer theme='colored' />
			<div className='card '>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
					}}>
					<GlobalCustomButton onClick={handleSubmit(onSubmit)}>
						<AddCircleOutline
							sx={{ marginRight: '5px' }}
							fontSize='small'
						/>
						Create
					</GlobalCustomButton>
				</Box>
				<Grid
					container
					spacing={2}
					mt={1}>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Organisation Name'
							name='organizationName'
							defaultValue={user.currentEmployee.facilityDetail.facilityName}
							register={register('organizationName', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Account Number'
							name='accountNumber'
							register={register('accountNumber', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Bank Name'
							name='bankName'
							register={register('bankName', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Account Type'
							name='accountType'
							register={register('accountType', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Current Balance'
							name='currentBalance'
							register={register('currentBalance', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}
						md={6}>
						<Input
							label='Sort Code'
							name='sortCode'
							register={register('sortCode', { required: true })}
							type='text'
						/>
					</Grid>
					<Grid
						item
						xs={12}>
						<TextArea
							label='Description'
							name='description'
							register={register('description', { required: true })}
							type='text'
						/>
					</Grid>
				</Grid>
			</div>
		</>
	);
}

export function FundsManagementList({ showTransactions, showCreateModal }) {
	const { state, setState } = useContext(ObjectContext);
	const FundMgtServ = client.service('fundmgt');
	const [fundmgts, setFundmgts] = useState([]);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(UserContext);
	const [selectedFundMgt, setSelectedFundMgt] = useState();

	const handleCreateNew = async () => {
		showCreateModal();
	};

	const handleRow = async (FundMgt) => {
		await setSelectedFundMgt(FundMgt);

		const newFundMgtModule = {
			selectedEpid: FundMgt,
			show: 'detail',
		};
		await setState((prevstate) => ({
			...prevstate,
			ManagedCareModule: newFundMgtModule,
		}));
		// console.log(newFundMgtModule);
		showTransactions();
	};

	const handleSearch = (val) => {
		// const field = '';
		// console.log(val);
		FundMgtServ.find({
			query: {
				[field]: {
					$regex: val,
					$options: 'i',
				},
				organizationId: user.currentEmployee.facilityDetail._id || '',
				$limit: 50,
				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				// console.log(res);
				setFundmgts(res.data);
				// setMessage(' Case Definition  fetched successfully');
				// setSuccess(true);
			})
			.catch((err) => {
				// console.log(err);
				// setMessage('Error fetching Case Definition, probable network issues ' + err);
				// setError(true);
			});
	};

	const getFacilities = async () => {
		setLoading(true);
		if (user.currentEmployee) {
			const findFundMgt = await FundMgtServ.find({
				query: {
					organizationId: user.currentEmployee.facilityDetail._id,
					$limit: 50,
					$sort: {
						createdAt: -1,
					},
				},
			});

			await setFundmgts(findFundMgt.data);
			setLoading(false);
		} else {
			if (user.stacker) {
				const findFundMgt = await FundMgtServ.find({
					query: {
						$limit: 50,
						$sort: {
							facility: -1,
						},
					},
				});

				await setFundmgts(findFundMgt.data);
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		// if (user) {
		getFacilities();
		// } else {

		// }
		FundMgtServ.on('created', (obj) => getFacilities());
		FundMgtServ.on('updated', (obj) => getFacilities());
		FundMgtServ.on('patched', (obj) => getFacilities());
		FundMgtServ.on('removed', (obj) => getFacilities());
		return () => {};
	}, []);

	const FundsManagementSchema = [
		{
			name: 'S/N',
			key: 's_n',
			description: 'Enter s/n',
			selector: (row, i) => i + 1,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Account Name',
			key: 'accountname',
			description: 'Enter Account Name',
			selector: (row) => row.organizationName,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Bank Name',
			key: 'bankname',
			description: 'Enter Bank Name',
			selector: (row) => row.bank,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Account Number',
			key: 'accountNumber',
			description: 'Enter Account Number',
			selector: (row) => row.accountNumber,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Account Type',
			key: 'fundtype',
			description: 'Enter Account Type',
			selector: (row) => row.accountType,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Sort Code',
			key: 'sortcode',
			description: 'Enter Sort Code',
			selector: (row) => row.sortcode,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Current Balance',
			key: 'currentbalance',
			description: 'Enter Current Balance',
			selector: (row) => row.currentBalance,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Description',
			key: 'description',
			description: 'Enter Description',
			selector: (row) => row.description,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
	];

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
										Fund Management
									</h2>
								</div>

								{handleCreateNew && (
									<GlobalCustomButton onClick={handleCreateNew}>
										<AddCircleOutline
											sx={{ marginRight: '5px' }}
											fontSize='small'
										/>
										Add New
									</GlobalCustomButton>
								)}
							</TableMenu>
							<div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
								<CustomTable
									title={''}
									columns={FundsManagementSchema}
									data={fundmgts}
									pointerOnHover
									highlightOnHover
									striped
									onRowClicked={handleRow}
									progressPending={loading}
									//conditionalRowStyles={conditionalRowStyles}
								/>
							</div>
						</PageWrapper>
					</div>
				</>
			) : (
				<div>loading</div>
			)}
		</>
	);
}

export function FundsManagementDetails({ handleGoBack, isModal }) {
	const [editing, setEditing] = useState(false);
	const { register, control, handleSubmit } = useForm();
	const { state, setState } = useContext(ObjectContext);
	const FundMgtServ = client.service('fundmgt');

	const fundmgt = state.ManagedCareModule.selectedEpid;

	const onSubmit = async (data) => {
		data.organizationName = fundmgt.organizationName;
		data.organizationId = fundmgt.organizationId;
		data.bank = data.bankName;
		data.sortcode = data.sortCode;

		await FundMgtServ.patch(fundmgt._id, data)
			.then((res) => {
				// console.log(res);
				toast('fund management updated succesfully');
			})
			.catch((err) => {
				// console.log(err);
				toast(
					`Error updating fund management, probable network issues or ${err}`,
				);
			});
	};

	return (
		<>
			<Box pl='3rem'>
				<GlobalCustomButton onClick={handleGoBack}>
					<ArrowBackIcon
						fontSize='small'
						sx={{ marginRight: '5px' }}
					/>
					Back
				</GlobalCustomButton>
			</Box>
			<Box
				display='flex'
				gap='2rem'
				justifyContent='flex-end'
				alignItems='center'
				mb='2rem'
				px='3rem'>
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
						type='submit'
						onClick={handleSubmit(onSubmit)}>
						<MdOutlineUpdate
							sx={{ marginRight: '5px' }}
							fontSize='bold'
						/>
						Update
					</GlobalCustomButton>
				)}
			</Box>

			<Box
				container
				sx={{
					width: '100%',
					height: '100%',
					px: '3rem',
				}}>
				<Grid
					container
					spacing={1}>
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Organisation Name'
								name='organizationName'
								defaultValue={fundmgt.organizationName}
								register={register('organizationName', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Organisation Name'
								name='organizationName'
								defaultValue={fundmgt.organizationName}
								register={register('organizationName', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Account Number'
								name='accountNumber'
								defaultValue={fundmgt.accountNumber}
								register={register('accountNumber', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Account Number'
								name='accountNumber'
								register={register('accountNumber', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Bank Name'
								name='bankName'
								defaultValue={fundmgt.bank}
								register={register('bankName', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Bank Name'
								name='bankName'
								register={register('bankName', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Account Type'
								name='accountType'
								defaultValue={fundmgt.accountType}
								register={register('accountType', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Account Type'
								name='accountType'
								register={register('accountType', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Current Balance'
								name='currentBalance'
								defaultValue={fundmgt.currentBalance}
								register={register('currentBalance', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Current Balance'
								name='currentBalance'
								register={register('currentBalance', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Sort Code'
								name='sortCode'
								defaultValue={fundmgt.sortcode}
								register={register('sortCode', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}
							md={6}>
							<Input
								label='Sort Code'
								name='sortCode'
								register={register('sortCode', { required: true })}
								type='text'
							/>
						</Grid>
					)}
					{!editing ? (
						<Grid
							item
							xs={12}>
							<TextArea
								label='Description'
								name='description'
								defaultValue={fundmgt.description}
								register={register('description', { required: true })}
								type='text'
								disabled={!editing}
							/>
						</Grid>
					) : (
						<Grid
							item
							xs={12}>
							<TextArea
								label='Description'
								name='description'
								register={register('description', { required: true })}
								type='text'
							/>
						</Grid>
					)}
				</Grid>

				<Grid
					container
					spacing={1}
					mt='2rem'>
					<Grid
						item
						sx={12}
						sm={12}
						lg={5}>
						<CreditTransactions isModal={isModal} />
					</Grid>

					<Grid
						item
						sx={12}
						sm={12}
						md={7}
						lg={7}>
						<DebitTransactions isModal={isModal} />
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export const CreditTransactions = ({ isModal }) => {
	// eslint-disable-next-line
	const [facility, setFacility] = useState([]);
	const InventoryServ = client.service('subwallettransactions');
	const SubwalletServ = client.service('subwallet');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [balance, setBalance] = useState(0);

	const [accountType, setAccountType] = useState('credit');

	const clientSel = state.SelectedClient.client;
	const getSearchfacility = (obj) => {};

	useEffect(() => {
		setCurrentUser(user);
		////console.log(currentUser)
		return () => {};
	}, [user]);

	useEffect(() => {
		getaccountdetails();
		getBalance();
		return () => {};
	}, [clientSel]);

	const getaccountdetails = () => {
		InventoryServ.find({
			query: {
				facility: user.currentEmployee.facilityDetail._id,
				//IF SELECTED CLIENT IS FROM COLLECTIONS, CLIENT ID IS STORE IN client key but if Selected Client is from client, use the _id key
				client: clientSel.client || clientSel._id,

				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				setFacility(res.data);
			})
			.catch((err) => {
				toast('Error getting account details ' + err);
			});
	};

	const getBalance = async () => {
		const findProductEntry = await SubwalletServ.find({
			query: {
				client: clientSel.client || clientSel._id,
				organization: user.currentEmployee.facilityDetail._id,

				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			},
		});

		if (findProductEntry.data.length > 0) {
			await setBalance(findProductEntry.data[0].amount);
		} else {
			await setBalance(0);
		}
	};

	const creditData = [
		{
			date: '15-03-2022',
			amount: '5000',
			paymentmode: 'Cash',
		},
		{
			date: '15-03-2022',
			amount: '6000',
			paymentmode: 'Wallet',
		},
	];

	const creditSchema = [
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
			name: 'Date & Time',
			key: 'createdAt',
			description: 'Enter Date',
			selector: (row) => row.date,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		// {
		//   name: "Description",
		//   style: {color: "#0364FF", textTransform: "capitalize"},
		//   key: "description",
		//   description: "Enter Date",
		//   selector: row => (row.description ? row.description : "-----------"),
		//   sortable: true,
		//   required: true,
		//   inputType: "DATE",
		// },
		{
			name: 'Amount',
			key: 'amount',
			description: 'Enter Date',
			selector: (row) => row.amount,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
		{
			name: 'Mode',
			key: 'paymentmode',
			description: 'Enter Date',
			selector: (row) => row.paymentmode,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
	];

	const creditTransactions =
		facility && facility.filter((item) => item.category === 'credit');

	const totalCreditAmout =
		creditTransactions &&
		creditTransactions.reduce((n, { amount }) => n + amount, 0);
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				mb={1.5}>
				<FormsHeaderText
					text='Credit Transactions'
					color='#588157'
				/>
				<Box
					style={{
						minWidth: '200px',
						height: '40px',
						border: '1px solid #E5E5E5',
						display: 'flex',
						padding: '0 10px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					gap={1.5}>
					<Typography
						sx={{
							color: '#000000',
							fontSize: '14px',
							lineHeight: '21.86px',
						}}>
						Total Credit Amount:
					</Typography>

					<Typography
						sx={{
							fontWeight: '600',
							fontSize: '20px',
							color: '#386641',
						}}>
						<span>&#8358;</span>
						{totalCreditAmout}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					height: isModal ? 'calc(80vh - 160px)' : 'calc(100vh - 210px)',
					overflowY: 'auto',
				}}>
				<CustomTable
					title={''}
					columns={creditSchema}
					data={creditData}
					pointerOnHover
					highlightOnHover
					striped
					//onRowClicked={handleRow}
					progressPending={false}
				/>
			</Box>
		</Box>
	);
};

export const DebitTransactions = ({ isModal }) => {
	// eslint-disable-next-line
	const [facility, setFacility] = useState([]);
	const InventoryServ = client.service('subwallettransactions');
	const SubwalletServ = client.service('subwallet');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	const { state, setState } = useContext(ObjectContext);
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [balance, setBalance] = useState(0);

	const [accountType, setAccountType] = useState('credit');

	const clientSel = state.SelectedClient.client;
	const getSearchfacility = (obj) => {};

	useEffect(() => {
		setCurrentUser(user);
		////console.log(currentUser)
		return () => {};
	}, [user]);

	useEffect(() => {
		getaccountdetails();
		getBalance();
		return () => {};
	}, [clientSel]);

	const getaccountdetails = () => {
		InventoryServ.find({
			query: {
				facility: user.currentEmployee.facilityDetail._id,
				client: clientSel.client || clientSel._id,

				$sort: {
					createdAt: -1,
				},
			},
		})
			.then((res) => {
				setFacility(res.data);
			})
			.catch((err) => {
				toast('Error getting account details ' + err);
			});
	};

	const getBalance = async () => {
		const findProductEntry = await SubwalletServ.find({
			query: {
				client: clientSel.client || clientSel._id,
				organization: user.currentEmployee.facilityDetail._id,

				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			},
		});

		if (findProductEntry.data.length > 0) {
			await setBalance(findProductEntry.data[0].amount);
		} else {
			await setBalance(0);
		}
	};

	const debitData = [
		{
			date: '15-03-2022',
			description: 'Ciprotab',
			amount: '5000',
			paymentmode: 'Cash',
		},
		{
			date: '15-03-2022',
			description: 'Ciprotab',
			amount: '6000',
			paymentmode: 'Wallet',
		},
	];
	const debitColumns = [
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
			name: 'Date & Time',
			key: 'createdAt',
			description: 'Enter Date',
			selector: (row) => row.date,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '120px',
		},
		{
			name: 'Description',
			style: { color: '#0364FF' },
			key: 'description',
			description: 'Enter Date',
			selector: (row) => row.description,
			sortable: true,
			required: true,
			inputType: 'DATE',
		},
		{
			name: 'Amount',
			key: 'amount',
			description: 'Enter Date',
			selector: (row) => row.amount,
			sortable: true,
			required: true,
			inputType: 'NUMBER',
			width: '120px',
		},
		{
			name: 'Mode',
			key: 'paymentmode',
			description: 'Enter Date',
			selector: (row) => row.paymentmode,
			sortable: true,
			required: true,
			inputType: 'DATE',
			width: '120px',
		},
	];

	const debitTransactions =
		facility && facility.filter((item) => item.category === 'debit');

	const totalDebitAmout =
		debitTransactions &&
		debitTransactions.reduce((n, { amount }) => n + amount, 0);

	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
				mb={1.5}>
				<FormsHeaderText
					text='Debit Transactions'
					color='#e63946'
				/>
				<Box
					style={{
						minWidth: '200px',
						height: '40px',
						border: '1px solid #E5E5E5',
						display: 'flex',
						padding: '0 10px',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					gap={1.5}>
					<Typography
						sx={{
							color: '#000000',
							fontSize: '14px',
							lineHeight: '21.86px',
						}}>
						Total Debit Amount:
					</Typography>

					<Typography
						sx={{
							fontWeight: '600',
							fontSize: '20px',
							color: '#e63946',
						}}>
						<span>&#8358;</span>
						{totalDebitAmout}
					</Typography>
				</Box>
			</Box>

			<Box
				sx={{
					height: isModal ? 'calc(80vh - 160px)' : 'calc(100vh - 210px)',
					overflowY: 'auto',
				}}>
				<CustomTable
					title={''}
					columns={debitColumns}
					data={debitData}
					pointerOnHover
					highlightOnHover
					striped
					//onRowClicked={handleRow}
					progressPending={false}
				/>
			</Box>
		</Box>
	);
};
