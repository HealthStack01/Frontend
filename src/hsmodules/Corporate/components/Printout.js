import { renderToStaticMarkup } from 'react-dom/server';
import {
	useRef,
	forwardRef,
	useState,
	useContext,
	useEffect,
	useCallback,
} from 'react';
import { Box, Typography, Grid, Avatar, Divider } from '@mui/material';
import CustomTable from '../../../components/customtable';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import GlobalCustomButton from '../../../components/buttons/CustomButton';
import client from '../../../feathers';
import { ObjectContext, UserContext } from '../../../context';
import { EmailsSourceList } from '../../CRM/components/deals/SendLink';
import SendIcon from '@mui/icons-material/Send';
import ModalBox from '../../../components/modal';
import { useForm } from 'react-hook-form';
import Input from '../../../components/inputs/basic/Input';
import { toast } from 'react-toastify';
import html2canvas from 'html2canvas';
import axios from 'axios';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import Textarea from '../../../components/inputs/basic/Textarea';

export const ProviderPrintout = ({ data, action }) => {
	const EmployeeServ = client.service('employee');
	const [emailModal, setEmailModal] = useState(false);
	const [screenshot, setScreenshot] = useState('');
	const [beneficiaries, setBeneficiaries] = useState([]);
	const printRef = useRef(null);
	const screenshotRef = useRef(null);
	const [userData, setUserData] = useState({});
	const { user } = useContext(UserContext);
	const { state, setState } = useContext(ObjectContext);
	const [imgSrc, setImgSrc] = useState(
		'https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg',
	);

	const screenshotPrintout = async () => {
		const canvas = await html2canvas(screenshotRef.current, {
			logging: true,
			letterRendering: 1,
			useCORS: true,
		});
		const image = canvas.toDataURL('image/png', 1.0);
		setScreenshot(image);
		setEmailModal(true);
	};

	const beneschema = [
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
			name: 'Beneficiary Name',
			key: 'beneficiaryname',
			description: 'Beneficiary Name',
			selector: (row) => `${row.firstname} ${row.lastname}`,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Policy Number',
			key: 'policynumber',
			description: 'Policy Number',
			selector: (row) => data?.policyNo,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Plan Name',
			key: 'planname',
			description: 'Plan Name',
			selector: (row) => data?.plan?.planName,
			sortable: true,
			inputType: 'HIDDEN',
		},
	];
	console.log('DATA', data);
	const beneList = () => {
		let list = [];
		list = [data?.principal, ...data?.dependantBeneficiaries];
		setBeneficiaries(list);
	};
	const handleData = async () => {
		const newData = {
			selectedData: data,
		};
		await setState((prev) => ({ ...prev, data: newData }));
	};
	const getUserData = useCallback(() => {
		const userId = user.currentEmployee._id;
		EmployeeServ.get({
			_id: userId,
		})
			.then((res) => {
				setUserData(res);
				console.log('USER DATA', res);
				//
			})
			.catch((err) => {
				console.log(err);
			});
	}, [user]);
	useEffect(() => {
		beneList();
		handleData();
		getUserData();
	}, [data]);
	const ImgStyled = styled('img')(({ theme }) => ({
		width: 150,
		height: 150,
		marginRight: theme.spacing(6.25),
		borderRadius: theme.shape.borderRadius,
	}));
	return (
		<Box style={{ width: '60vw' }}>
			<Box
				sx={{
					width: '100%',
					//height: "40px",
					display: 'flex',
				}}
				gap={2}
				mb={2}>
				<ReactToPrint
					trigger={() => (
						<GlobalCustomButton color='info'>Print Document</GlobalCustomButton>
					)}
					content={() => printRef.current}
				/>

				<GlobalCustomButton onClick={screenshotPrintout}>
					Send Via Email
				</GlobalCustomButton>
			</Box>

			<ModalBox
				open={emailModal}
				onClose={() => setEmailModal(false)}
				header='Send Via Email Address'>
				<SendViaEmail
					closeModal={() => setEmailModal(false)}
					screenshot={screenshot}
					data={data}
				/>
			</ModalBox>

			<Box sx={{ display: 'none' }}>
				<ComponentToPrint ref={printRef} />
			</Box>

			<Box
				sx={{ width: '100%', height: '100%' }}
				ref={screenshotRef}
				p={4}>
				<Grid
					container
					spacing={2}>
					<Grid
						item
						xs={12}
						md={6}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}>
							{/* Comapany Logo */}
							<Avatar
								sx={{ marginTop: '5px', marginRight: '10px' }}
								src={data?.organization?.facilitylogo}
								alt=''
							/>
							<h1>{data?.organizationName}</h1>
						</Box>
					</Grid>
					{/* Address */}
					<Grid
						item
						xs={12}
						md={6}
						style={{ textAlign: 'right' }}>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{data?.organizationName}
						</Typography>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{data?.organization?.facilityAddress},
						</Typography>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{`${data?.organization?.facilityLGA || ''} ${
								data?.organization?.facilityCity || ''
							} ${data?.organization?.facilityState || ''}`}
							,
						</Typography>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{data?.organization?.facilityContactPhone}
						</Typography>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{data?.organization?.facilityEmail}
						</Typography>
					</Grid>
				</Grid>
				{/* ***********************************Principal******************************************************* */}
				<Grid
					container
					spacing={2}>
					<Grid
						item
						xs={12}
						md={6}>
						{/* date */}
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{moment().format('DD/MM/YYYY')}
						</Typography>
						{/* Principal Name */}
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							{`${data?.principal?.firstname} ${data?.principal?.lastname}`},
						</Typography>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							Dear {data?.principal?.gender === 'Male' ? 'Sir' : 'Ma'},
						</Typography>
					</Grid>
				</Grid>
				{/* ***********************************Document Title******************************************************* */}
				<Box>
					<Typography
						sx={{
							fontSize: '1.2rem',
							color: '#000000',
							textDecoration: 'underline',
							margin: '1rem 0px',
							textAlign: 'center',
							fontWeight: 'bold',
						}}>
						{`${data?.organizationName?.toUpperCase()} POLICY DOCUMENT`}
					</Typography>
				</Box>
				{/* ***********************************Document Body******************************************************* */}
				<Box>
					<Typography
						sx={{ fontSize: '1rem', color: '#000000', marginBottom: '.5rem' }}>
						Kindly find enclosed, {data?.organizationName} Policy Details for
						the following beneficiaries registered on our scheme.
					</Typography>
					<CustomTable
						title={''}
						columns={beneschema}
						data={beneficiaries}
						pointerOnHover
						highlightOnHover
						striped
						onRowClicked={() => {}}
					/>
					<Box my={2}>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							<b> Start Date :</b>{' '}
							{moment(data?.validitystarts).format('DD/MM/YYYY')} <br />
							<b> End Date :</b>
							{moment(data?.validityEnds).format('DD/MM/YYYY')}
							<br />
							<b>Care Provider:</b>{' '}
							{data?.providers?.map((p, i) => {
								return (
									<Typography>
										{i + 1}. {p.organizationDetail?.facilityName}
									</Typography>
								);
							})}{' '}
							<br />
						</Typography>
					</Box>

					<Typography
						sx={{ fontSize: '1rem', color: '#000000', fontWeight: 'bold' }}>
						Should you require further clarification, kindly contact us on the
						following numbers {data?.organization?.facilityContactPhone}.
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Thank you.
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Yours faithfully,
					</Typography>
					<Box my={2}>
						<img
							src={userData?.signatureUrl}
							alt=''
							style={{
								width: '70px',
								height: 'auto',
							}}
						/>
						<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
							<b>{data?.approvedby?.employeename}</b> <br />
							{/* {`Lead, Fulfillment`} */}
						</Typography>
					</Box>
				</Box>
				<Box
					style={{
						marginTop: '1rem',
					}}>
					<Divider>Find below your Policy ID Card</Divider>
				</Box>
				<Box sx={{ maxWidth: '40%', margin: '1rem auto' }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						{/* Comapany Logo */}
						<Avatar
							sx={{ marginTop: '5px', marginRight: '10px' }}
							src={data?.organization?.facilitylogo}
							alt=''
						/>
						<h1>{data?.organizationName}</h1>
					</Box>
					<Grid
						container
						spacing={2}
						sx={{ alignItems: 'center' }}>
						<Grid
							item
							xs={12}
							md={8}>
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								NAME:{' '}
								<b>
									{`${data?.principal?.firstname} ${data?.principal?.lastname}`}
								</b>
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								POLICY NO: <b>{data?.policyNo}</b>
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								SEX: <b>{data?.principal?.gender}</b>
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								DATE OF BIRTH:{' '}
								<b>{moment(data?.principal?.dob).format('DD/MM/YYYY')}</b>
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								GENOTYPE: <b>{data?.principal?.genotype}</b>
								<Divider
									orientation='vertical'
									flexItem
								/>
							</Typography>
							<Divider />
							<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
								BLOOD GROUP: <b>{data?.bloodgroup}</b>
							</Typography>
						</Grid>
						<Grid
							item
							xs={12}
							md={4}>
							<Box sx={{ display: 'flex', justifyContent: 'center' }}>
								<ImgStyled
									src={
										data?.principal?.imageurl
											? data?.principal?.imageurl
											: imgSrc
									}
									alt='Profile Pic'
								/>
							</Box>
						</Grid>
					</Grid>
					<Typography
						sx={{ fontSize: '1rem', color: '#000000', textAlign: 'justify' }}
						mt={1}>
						The bearer of this card is a subscriber to
						{data?.organizationName} and entitled to receive appropriate medical
						care from his primary care provider and other referral centres as
						may be necessary.
					</Typography>
					<Typography
						sx={{ fontSize: '1rem', color: '#000000', textAlign: 'justify' }}
						mt={1}>
						This card MUST be presented at the point of service and remains the
						property of {data?.organizationName}.
					</Typography>
					<Typography
						sx={{ fontSize: '1rem', color: '#000000' }}
						mt={1}>
						In the event of an emergency, kindly contact
						{data?.organizationName}
					</Typography>
					<Typography
						sx={{ fontSize: '1rem', color: '#000000' }}
						mt={1}>
						{`${data?.organization?.facilityAddress} ${
							data?.organization?.facilityLGA || ''
						} ${data?.organization?.facilityCity || ''} ${
							data?.organization?.facilityState || ''
						}`}
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						CALL center: {data?.organization?.facilityContactPhone}
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						EMAIL: {data?.organization?.facilityEmail}
					</Typography>
					<Box>
						<Box sx={{ width: '70px', height: 'auto', float: 'right' }}>
							<img
								src={userData?.signatureUrl}
								alt=''
								style={{
									width: '100%',
									height: 'auto',
								}}
							/>
							<Divider></Divider>
							<b>{userData?.profession}</b>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

const ComponentToPrint = forwardRef(({ action }, ref) => {
	const { state, setState } = useContext(ObjectContext);
	const [beneficiaries, setBeneficiaries] = useState([]);

	const data = state?.data?.selectedData;

	console.log('selectedData', data);
	const beneschema = [
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
			name: 'Beneficiary Name',
			key: 'beneficiaryname',
			description: 'Beneficiary Name',
			selector: (row) => `${row.firstname} ${row.lastname}`,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Policy Number',
			key: 'policynumber',
			description: 'Policy Number',
			selector: (row) => data?.policyNo,
			sortable: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Plan Name',
			key: 'planname',
			description: 'Plan Name',
			selector: (row) => data?.plan?.planName,
			sortable: true,
			inputType: 'HIDDEN',
		},
	];
	const beneList = () => {
		let list = [];
		list = [data?.principal, ...data?.dependantBeneficiaries];
		setBeneficiaries(list);
	};
	useEffect(() => {
		setTimeout(() => {
			beneList();
		}, 2000);
	}, []);
	return (
		<Box
			sx={{ width: '100%', height: '100%' }}
			p={4}
			ref={ref}>
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					md={6}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}>
						{/* Comapany Logo */}
						<Avatar
							sx={{ marginTop: '5px', marginRight: '10px' }}
							src={data?.organization?.facilitylogo}
							alt=''
						/>
						<h1>{data?.organizationName}</h1>
					</Box>
				</Grid>
				{/* Address */}
				<Grid
					item
					xs={12}
					md={6}
					style={{ textAlign: 'right' }}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{data?.organizationName}
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{data?.organization?.facilityAddress},
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{`${data?.organization?.facilityLGA || ''} ${
							data?.organization?.facilityCity || ''
						} ${data?.organization?.facilityState || ''}`}
						,
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{data?.organization?.facilityContactPhone}
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{data?.organization?.facilityEmail}
					</Typography>
				</Grid>
			</Grid>
			{/* ***********************************Principal******************************************************* */}
			<Grid
				container
				spacing={2}>
				<Grid
					item
					xs={12}
					md={6}>
					{/* date */}
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{moment().format('DD/MM/YYYY')}
					</Typography>
					{/* Principal Name */}
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						{`${data?.principal?.firstname} ${data?.principal?.lastname}`},
					</Typography>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						Dear {data?.principal?.gender === 'Male' ? 'Sir' : 'Ma'},
					</Typography>
				</Grid>
			</Grid>
			{/* ***********************************Document Title******************************************************* */}
			<Box>
				<Typography
					sx={{
						fontSize: '1.2rem',
						color: '#000000',
						textDecoration: 'underline',
						margin: '1rem 0px',
						textAlign: 'center',
						fontWeight: 'bold',
					}}>
					{`${data?.organizationName?.toUpperCase()} POLICY DOCUMENT`}
				</Typography>
			</Box>
			{/* ***********************************Document Body******************************************************* */}
			<Box>
				<Typography
					sx={{ fontSize: '1rem', color: '#000000', marginBottom: '.5rem' }}>
					Kindly find enclosed, {data?.organizationName} Policy Details for the
					following beneficiaries registered on our scheme.
				</Typography>
				<CustomTable
					title={''}
					columns={beneschema}
					data={beneficiaries}
					pointerOnHover
					highlightOnHover
					striped
					onRowClicked={() => {}}
				/>
				<Box my={2}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						<b> Start Date :</b>{' '}
						{moment(data?.validitystarts).format('DD/MM/YYYY')} <br />
						<b> End Date :</b>
						{moment(data?.validityEnds).format('DD/MM/YYYY')}
						<br />
						<b>Care Provider:</b>{' '}
						{data?.providers?.map((p, i) => {
							return (
								<Typography>
									{i + 1}. {p.organizationDetail?.facilityName}
								</Typography>
							);
						})}{' '}
						<br />
					</Typography>
				</Box>

				<Typography
					sx={{ fontSize: '1rem', color: '#000000', fontWeight: 'bold' }}>
					Should you require further clarification, kindly contact us on the
					following numbers {data?.organization?.facilityContactPhone}.
				</Typography>
				<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
					Thank you.
				</Typography>
				<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
					Yours faithfully,
				</Typography>
				<Box
					sx={{ display: 'flex', justifyContent: 'space-between' }}
					my={2}>
					<Typography sx={{ fontSize: '1rem', color: '#000000' }}>
						<b>{data?.approvedby?.employeename}</b> <br />
						{/* {`Lead, Fulfillment`} */}
					</Typography>
					<Divider>Find below your Policy ID Card</Divider>
				</Box>
			</Box>
		</Box>
	);
});

export const SendViaEmail = ({ closeModal, screenshot, data }) => {
	const emailServer = client.service('email');
	const { user } = useContext(UserContext);
	const { state, showActionLoader, hideActionLoader } =
		useContext(ObjectContext);
	const [emailsModal, setEmailModals] = useState(true);
	const [selectedEmail, setSelectedEmail] = useState('');
	const [destinationEmail, setDestinationEmail] = useState('');
	const [toEmailModal, setToEmailModal] = useState(false);

	const {
		register,
		setValue,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(() => {
		//const deal = state.DealModule.selectedDeal.email;
		reset({
			to: destinationEmail,
			name: user.currentEmployee.facilityDetail.facilityName,
			subject: `${data?.organizationName?.toUpperCase()} POLICY DOCUMENT`,
			from: selectedEmail,
		});
	}, [selectedEmail, destinationEmail]);

	const handleSelectEmail = (email) => {
		setSelectedEmail(email);
		setEmailModals(false);
	};

	const handleSelectDestinationEmail = (email) => {
		setDestinationEmail(email);
		setToEmailModal(false);
	};

	const handleSendEmail = async (data) => {
		const facility = user.currentEmployee.facilityDetail;
		showActionLoader();

		const token = localStorage.getItem('feathers-jwt');
		axios
			.post(
				'https://hsbackend.azurewebsites.net/upload',
				{ uri: screenshot },
				{ headers: { Authorization: `Bearer ${token}` } },
			)
			.then(async (res) => {
				const imageUrl = res.data.url;

				const document = {
					organizationId: facility._id,
					organizationName: facility.facilityName,
					html: `<img src="${imageUrl}" alt="" >`,
					//attachments: attachments,
					text: data.message,
					status: 'pending',
					...data,
				};

				await emailServer
					.create(document)
					.then((res) => {
						hideActionLoader();
						closeModal();
						toast.success(`The Document was sent successfully`);
					})
					.catch((err) => {
						hideActionLoader();
						console.log(err);
						toast.error(`Sorry, Failed to send Document ${err}`);
					});
			})
			.catch((err) => {
				toast.error(`Sorry, failed to send Document ${err}`);
			});

		//return console.log(document);
	};
	useEffect(() => {
		if (data) {
			setDestinationEmail(data?.principal?.email);
		}
	}, [data]);

	return (
		<Box
			sx={{
				width: '60vw',
			}}>
			<ModalBox
				open={emailsModal}
				//onClose={() => setEmailModals(false)}
				header='Plese Select Your Email Source'>
				<EmailsSourceList selectEmail={handleSelectEmail} />
			</ModalBox>

			<Box
				sx={{ display: 'flex', justifyContent: 'flex-end' }}
				mb={2}
				mt={-1}
				gap={1.5}>
				<GlobalCustomButton
					sx={{ marginTop: '5px' }}
					color='success'
					onClick={() => setEmailModals(true)}>
					Change Source Email
				</GlobalCustomButton>

				<GlobalCustomButton
					sx={{ marginTop: '5px' }}
					color='secondary'
					onClick={() => setToEmailModal(true)}>
					Change Destination Email
				</GlobalCustomButton>
			</Box>

			<Grid
				container
				spacing={1}
				mb={2}>
				<Grid
					item
					lg={6}
					md={6}
					sm={6}>
					<Input
						important
						label='Name'
						register={register('name', { require: 'Please enter Name' })}
						errorText={errors?.name?.message}
					/>
				</Grid>

				<Grid
					item
					lg={6}
					md={6}
					sm={6}>
					<Input
						important
						label='Subject'
						register={register('subject', { require: 'Please enter Subject' })}
						errorText={errors?.subject?.message}
					/>
				</Grid>

				<Grid
					item
					lg={6}
					md={6}
					sm={6}
					gap={1}>
					<Input
						important
						label='From'
						register={register('from', { require: 'Please Add Source Email' })}
						errorText={errors?.from?.message}
						disabled
					/>
				</Grid>

				<Grid
					item
					lg={6}
					md={6}
					sm={6}>
					<Input
						important
						label='To'
						register={register('to', {
							require: 'Please Enter Destination Email',
						})}
						errorText={errors?.to?.message}
					/>
				</Grid>
				<Grid
					item
					lg={12}
					md={12}
					sm={12}>
					<Textarea
						label='Message'
						register={register('message')}
						errorText={errors?.message?.message}
					/>
				</Grid>
			</Grid>

			<Box>
				<GlobalCustomButton onClick={handleSubmit(handleSendEmail)}>
					Send Policy Via Email
					<SendIcon
						fontSize='small'
						sx={{ marginLeft: '4px' }}
					/>
				</GlobalCustomButton>
			</Box>
		</Box>
	);
};
