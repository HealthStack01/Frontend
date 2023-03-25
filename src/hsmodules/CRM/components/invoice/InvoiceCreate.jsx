import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../../components/inputs/basic/Input';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import GlobalCustomButton from '../../../../components/buttons/CustomButton';
import CustomSelect from '../../../../components/inputs/basic/Select';
import MuiCustomDatePicker from '../../../../components/inputs/Date/MuiDatePicker';
import { FormsHeaderText } from '../../../../components/texts';
import { ObjectContext, UserContext } from '../../../../context';
import client from '../../../../feathers';
import Plans from '../../Plans';
import { PageCustomerDetail } from '../global/CustomerDetail';
import { PageCreatePlan } from '../plans/CreatePlan';

const random = require('random-string-generator');

const InvoiceCreate = ({ closeModal, handleGoBack }) => {
	const dealServer = client.service('deal');
	const notificationsServer = client.service('notification');
	const { state, setState, showActionLoader, hideActionLoader } =
		useContext(ObjectContext);
	const { user } = useContext(UserContext);
	const [plans, setPlans] = useState([]);
	const [totalAmount, setTotalAmount] = useState(0);
	const [duration, setDuration] = useState('');

	const { register, control, setValue, reset, handleSubmit } = useForm();

	const handleAddNewPlan = plan => {
		setPlans(prev => [plan, ...prev]);
	};

	const handleRemovePlan = plan => {
		setPlans(prev => prev.filter(item => item._id !== plan._id));
	};

	const createInvoice = async data => {
		showActionLoader();
		const currentDeal = state.DealModule.selectedDeal;
		const employee = user.currentEmployee;

		const document = {
			...data,
			plans,
			createdAt: new Date(),
			dealId: currentDeal._id,
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
			status: 'Pending',
			_id: uuidv4(),
		};

		const notificationObj = {
			type: 'CRM',
			title: 'New Invoice Created For a Deal',
			description: `${employee.firstname} ${employee.lastname} Created a new Invoice with ${currentDeal.type} ${currentDeal.name} in CRM`,
			facilityId: employee.facilityDetail._id,
			sender: `${employee.firstname} ${employee.lastname}`,
			senderId: employee._id,
			pageUrl: '/app/crm/lead',
			priority: 'normal',
			dest_userId: currentDeal.assignStaff.map(item => item.employeeId),
		};

		//return console.log(document);

		const prevInvoices = currentDeal.invoices || [];

		const newInvoices = [document, ...prevInvoices];

		const documentId = currentDeal._id;
		await dealServer
			.patch(documentId, { invoices: newInvoices })
			.then(async res => {
				await notificationsServer.create(notificationObj);
				hideActionLoader();
				//setContacts(res.contacts);
				setState(prev => ({
					...prev,
					DealModule: { ...prev.DealModule, selectedDeal: res },
				}));
				//closeModal();
				reset({
					subscription_category: '',
					payment_option: '',
					payment_mode: '',
					invoice_number: random(12, 'uppernumeric'),
					date: new Date(),
					total_amount: 0,
				});
				setPlans([]);
				toast.success(`You have successfully Created a new Invoice`);

				//setReset(true);
			})
			.catch(err => {
				//setReset(false);
				hideActionLoader();
				toast.error(`Sorry, Failed to Create an Invoice. ${err}`);
			});
	};

	useEffect(() => {
		setValue('invoice_number', random(12, 'uppernumeric'));
		setValue('date', new Date());
		setValue('total_amount', 0);
	}, []);

	useEffect(() => {
		//console.log(plans[0]);
		const totalPlansSum = plans.reduce((accumulator, object) => {
			return Number(accumulator) + Number(object.amount);
		}, 0);

		setValue('total_amount', totalPlansSum);
	}, [plans]);

	return (
		<>
			<Box
				sx={{
					width: '100%',
				}}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderBottom: '1px solid #f8f8f8',
						backgroundColor: '#f8f8f8',
					}}
					p={2}>
					<GlobalCustomButton onClick={handleGoBack}>
						<ArrowBackIcon />
						Back
					</GlobalCustomButton>

					<Box
						sx={{
							display: 'flex',
						}}
						gap={1}>
						<GlobalCustomButton
							color='success'
							onClick={handleSubmit(createInvoice)}>
							Create Invoice
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
						<PageCustomerDetail />
					</Grid>

					<Grid
						item
						lg={12}
						md={12}
						sm={12}>
						<Box
							mb={1}
							sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<FormsHeaderText text='Invoice Information' />
						</Box>

						<Grid
							container
							spacing={1}
							mb={1.5}>
							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<MuiCustomDatePicker
									label='Date'
									disabled={true}
									control={control}
									name='date'
								/>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<Input
									label='Invoice Number'
									register={register('invoice_number')}
									disabled={true}
								/>
							</Grid>
							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<Input
									label='Total Amount'
									register={register('total_amount')}
									disabled={true}
									type='number'
								/>
							</Grid>

							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<CustomSelect
									label='Payment Mode'
									options={['Cash', 'Cheque', 'Transfer']}
									control={control}
									name='payment_mode'
									required
								/>
							</Grid>

							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<CustomSelect
									label='Payment Option'
									options={['Annually', 'Bi-Annually', 'Quarterly']}
									control={control}
									name='payment_option'
									required
								/>
							</Grid>

							<Grid
								item
								lg={2}
								md={3}
								sm={4}>
								<CustomSelect
									label='Subscribtion Category'
									options={['New', 'Renewal', 'Additional']}
									control={control}
									name='subscription_category'
									required
								/>
							</Grid>
						</Grid>

						<Box>
							<PageCreatePlan addNewPlan={handleAddNewPlan} />
						</Box>

						<Box
							mt={1}
							mb={1}>
							<Plans
								omitCreate={true}
								plans={plans}
								removePlan={handleRemovePlan}
							/>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
};

export default InvoiceCreate;

export const HealthPlanSearchSelect = ({ handleChange, clearValue }) => {
	const HealthPlanServ = client.service('healthplan');
	const [facilities, setFacilities] = useState([]);
	const { user, setUser } = useContext(UserContext);
	const [value, setValue] = useState('');

	const getFacilities = async () => {
		if (user.currentEmployee) {
			let stuff = {
				organizationId: user.currentEmployee.facilityDetail._id,
				// locationId:state.employeeLocation.locationId,
				$limit: 100,
				$sort: {
					createdAt: -1,
				},
			};

			const findHealthPlan = await HealthPlanServ.find({ query: stuff });

			await setFacilities(findHealthPlan.data);
		} else {
			if (user.stacker) {
				const findClient = await HealthPlanServ.find({
					query: {
						$limit: 100,
						$sort: {
							createdAt: -1,
						},
					},
				});

				await setFacilities(findClient.data);
			}
		}
	};

	useEffect(() => {
		getFacilities();
	}, []);

	const createNewOptions = async () => {
		const promises = facilities.map(item => {
			console.log(item.premiumns);
			const premiums = item.premiumns;
			premiums.map(prem => {
				return {
					...prem,
					planName: item.planName,
				};
			});
		});

		const data = await Promise.all(promises);

		console.log(data);
	};

	const finalOptions =
		facilities.length > 0
			? facilities.map(item => {
					// console.log(item);
					return item.premiums.map(prem => {
						return {
							...prem,
							planName: item.planName,
							planCategory: item.planCategory,
						};
					});
			  })
			: [];

	const onChange = data => {
		//setValue(`${data.planName} (${data.planType})`);
		setValue(data);
		handleChange(data);
	};

	return (
		<Autocomplete
			id='country-select-demo'
			sx={{ width: '100%' }}
			//value={value}
			onChange={(event, newValue, reason) => {
				if (reason === 'clear') {
					setValue('');
				} else {
					onChange(newValue);
				}
			}}
			options={finalOptions.flat(1)}
			//options={plans}
			groupBy={option => `${option.planName} (${option.planCategory})`}
			autoHighlight
			getOptionLabel={option => `${option.planName} (${option.planType})`}
			renderOption={(props, option) => (
				<Box
					component='li'
					{...props}
					sx={{ fontSize: '0.85rem' }}>
					{option.planType} - {option.premiumAmount}
				</Box>
			)}
			renderInput={params => (
				<TextField
					{...params}
					inputProps={{
						...params.inputProps,
						autoComplete: 'new-password', // disable autocomplete and autofill
					}}
					label={'Choose Your Plan'}
					//ref={inputEl}
					sx={{
						fontSize: '0.75rem',
						backgroundColor: '#ffffff',
						'& .MuiInputBase-input': {
							height: '0.9rem',
							fontSize: '0.8rem',
						},
					}}
					InputLabelProps={{
						Autocomplete: 'new-password',
						shrink: true,
						style: { color: '#2d2d2d' },
					}}
				/>
			)}
		/>
	);
};
