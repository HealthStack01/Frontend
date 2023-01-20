/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
// import {useFlutterwave, closePaymentModal} from "flutterwave-react-v3";
// import {PaystackConsumer} from "react-paystack";
import './main.css';
import RemitaPayment from 'react-remita';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { ProductCreate } from './Products';
import Encounter from '../Documentation/Documentation';
var random = require('random-string-generator');
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
//import Button from "../../components/buttons/Button";
import CustomTable from '../../components/customtable';
import { Box, Button, Grid, Typography } from '@mui/material';
import ModalBox from '../../components/modal';
import Input from '../../components/inputs/basic/Input';
import MakeDeposit from './Deposit';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FlutterWaveIcon, PaystackIcon } from './ui-components/Icons';
import WalletIcon from '@mui/icons-material/Wallet';
import RadioButton from '../../components/inputs/basic/Radio';
// import api from '../../utils/api';
import { v4 as uuidv4 } from 'uuid';
import PayWithWallet from '../PouchiiWallet/payWithWallet';

// eslint-disable-next-line
const searchfacility = {};

export default function PaymentCreatePage({ closeModal, handleGoBack }) {
	// const { register, handleSubmit,setValue} = useForm(); //, watch, errors, reset
	//const [error, setError] =useState(false)

	const [message, setMessage] = useState('');
	// eslint-disable-next-line
	const [facility, setFacility] = useState();
	const SubwalletTxServ = client.service('subwallettransactions');
	const SubwalletServ = client.service('subwallet');
	const OrderServ = client.service('order');
	const InvoiceServ = client.service('invoice');
	//const navigate=useNavigate()
	const { user } = useContext(UserContext); //,setUser
	// eslint-disable-next-line
	const [currentUser, setCurrentUser] = useState();
	const [type, setType] = useState('Bill');
	const [documentNo, setDocumentNo] = useState('');
	const [totalamount, setTotalamount] = useState(0);
	const [description, setDescription] = useState('');
	const [productId, setProductId] = useState('');
	const [source, setSource] = useState('');
	const [date, setDate] = useState('');
	const [name, setName] = useState('');
	const [inventoryId, setInventoryId] = useState('');
	const [baseunit, setBaseunit] = useState('');
	const [quantity, setQuantity] = useState('');
	const [sellingprice, setSellingPrice] = useState('');
	const [costprice, setCostprice] = useState(0);
	const [invquantity, setInvQuantity] = useState('');
	const [calcamount, setCalcAmount] = useState(0);
	const [productItem, setProductItem] = useState([]);
	const [billingId, setBilllingId] = useState('');
	const [changeAmount, setChangeAmount] = useState(true);
	const [paymentmode, setPaymentMode] = useState('Cash');
	const [paymentOptions, setPaymentOptions] = useState([]);
	const [billMode, setBillMode] = useState('');
	const [productModal, setProductModal] = useState(false);
	const [obj, setObj] = useState('');
	const [amountPaid, setAmountPaid] = useState(0);
	const [balance, setBalance] = useState(0);
	const [buttonState, setButtonState] = useState(false);
	const [partPay, setPartPay] = useState([]);
	const [part, setPart] = useState(false);
	const [partBulk, setPartBulk] = useState('');
	const [isPart, setIsPart] = useState(false);
	const [subWallet, setSubWallet] = useState();
	const [loading, setLoading] = useState(false);
	const [partTable, setPartTable] = useState([]);
	const [depositModal, setDepositModal] = useState(false);
	const [walletProfile, setWalletProfile] = useState([]);
	const [createModal, setCreateModal] = useState(false);
	const handleCreateModal = () => {
		setCreateModal(true);
	};

	const handleHideCreateModal = () => {
		setCreateModal(false);
	};

	//Remita Config
	const config = {
		key: 'QzAwMDA1NDIwMjB8MTEwMDUzNTMwNjc5fGNlZTQ2YWIyZTdhOTg0M2EwODNlNjQyOTllNjg1ZTY4NWU5MWFlNjVkMjVlMzdkM2Q5YjEzOWFlYjg2NWEwNzdiYzdiYzcxNzZiNTM5MWZjYzY3YzUwOTNlNTUyNDFlNjhlOGEyODJmNDVkMzBmNGUwYTM5YjhlMzZmOTkyN2E4', // enter your key here
		customerId: uuidv4(),
		firstName: source,
		lastName: '',
		email: '',
		amount: part ? partBulk : totalamount,
		narration: 'payment',
	};

	let data = {
		...config,
		onSuccess: function (response) {
			// function callback when payment is successful
			// console.log(response);
			toast.success('Payment Successful');
		},
		onError: function (response) {
			// function callback when payment fails
			// console.log(response);
			toast.error('Payment Failed');
		},
	};
	//Paystack Config

	// const config = {
	//   reference: new Date().getTime().toString(),
	//   email: "simpa@healthstack.africa",
	//   amount: part ? partBulk * 100 : totalamount * 100,
	//   publicKey: "pk_test_f8300ac84ffd54afdf49ea31fd3daa90ebd33275",
	// };

	// const componentProps = {
	//   ...config,
	//   text: "Make a Deposit",
	//   onSuccess: reference => handleSuccess(reference, amount),
	//   onClose: closeModal,
	// };

	// const handleSuccess = (amount, reference) => {
	//   let transactionDetails = amount;
	//   transactionDetails.amount = reference;
	//   // dispatch(saveTransactionRef(transactionDetails));
	//   // //console.log(transactionDetails, "AMOUNT");
	//   // return history("/business/payment");
	// };

	// //FLUTTERWAVE CONFIG
	// const configfw = {
	//   public_key: "FLWPUBK_TEST-2c01585fca911f2d419e051d15b76382-X",
	//   tx_ref: Date.now(),
	//   amount: part ? partBulk : totalamount,
	//   email: "simpa@healthstack.africa",
	//   currency: "NGN",
	//   payment_options: "card,mobilemoney,ussd",
	//   customer: {
	//     email: "simpa@healthstack.africa",
	//     phone_number: "070********",
	//     name: "john doe",
	//   },
	//   customizations: {
	//     title: "my Payment Title",
	//     description: "Payment for items in cart",
	//     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
	//   },
	// };

	// const handleFlutterPayment = useFlutterwave(configfw);

	const { state, setState } = useContext(ObjectContext);

	const inputEl = useRef(0);
	let calcamount1;
	let hidestatus;

	let medication = state.financeModule.selectedFinance;
	////console.log(state.financeModule.state)

	const handlecloseModal = () => {
		setProductModal(false);
		// handleSearch(val)
	};

	const handleChangeMode = async (value) => {
		////console.log(value)
		await setPaymentMode(value);
	};

	const [productEntry, setProductEntry] = useState({
		productitems: [],
		date,
		documentNo,
		type,
		totalamount,
		source,
	});

	const productItemI = {
		productId,
		name,
		quantity,
		sellingprice,
		amount: calcamount, //||qamount
		baseunit,
		costprice,
		billingId,
	};
	// consider batchformat{batchno,expirydate,qtty,baseunit}
	//consider baseunoit conversions
	const getSearchfacility = async (obj) => {
		await setObj(obj);
		if (!obj) {
			//"clear stuff"
			setProductId('');
			setName('');
			setBaseunit('');
			setInventoryId('');
			setSellingPrice('');
			setInvQuantity('');
			setDescription('');
			setCostprice('');
			// setCalcAmount(null)
			return;
		}

		setProductId(obj.productId);
		setName(obj.name);
		setBaseunit(obj.baseunit);
		setInventoryId(obj.inventoryId);
		setSellingPrice(obj.sellingprice); //modify this based on billing mode
		setInvQuantity(obj.quantity);
		setCostprice(obj.costprice);
		setBilllingId(obj.billingId);

		const contracts = obj.billingDetails.contracts;
		//const billingserv=client.service('billing')
		if (billMode.type === 'HMO Cover') {
			//paymentmode
			let contract = contracts.filter(
				(el) => el.source_org === billMode.detail.hmo,
			);
			//  //console.log(contract[0].price)
			setSellingPrice(contract[0].price);
			//  //console.log(sellingprice)
		}
		if (billMode.type === 'Company Cover') {
			//paymentmode
			let contract = contracts.filter(
				(el) => el.source_org === billMode.detail.company,
			);
			//   //console.log(contract[0].price)
			setSellingPrice(contract[0].price);
			//   //console.log(sellingprice)
		}

		/*  setValue("facility", obj._id,  {
             shouldValidate: true,
             shouldDirty: true
         }) */
	};

	useEffect(() => {
		setCurrentUser(user);
		////console.log(currentUser)
		return () => {};
	}, [user]);

	useEffect(() => {
		setProductEntry({
			date,
			documentNo,
			type,
			totalamount,
			source,
		});

		setCalcAmount(quantity * sellingprice);
		return () => {};
	}, [date]);

	const getFacilities = async () => {
		// //console.log("here b4 server")
		const findProductEntry = await SubwalletServ.find({
			query: {
				client: medication?.participantInfo?.client._id,
				organization: user.employeeData[0].facilityDetail._id,
				//storeId:state.StoreModule.selectedStore._id,
				//clientId:state.ClientModule.selectedClient._id,
				//$limit:100,
				$sort: {
					createdAt: -1,
				},
			},
		});
		//    //console.log(findProductEntry)

		// //console.log("balance", findProductEntry.data[0].amount)
		if (findProductEntry.data.length > 0) {
			setSubWallet(findProductEntry.data[0]);
			await setBalance(findProductEntry.data[0].amount);
		} else {
			await setBalance(0);
		}

		//  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
	};

	////console.log(state.financeModule);

	useEffect(() => {
		setSource(
			medication?.participantInfo?.client?.firstname +
				' ' +
				medication?.participantInfo?.client?.lastname,
		);
		setProductItem(state.financeModule.selectedBills);

		// const paymentoptions= []
		//const info = medication.participantInfo.client.paymentinfo
		//let billme={}
		getFacilities();

		return () => {};
	}, [state.financeModule]);

	const getTotal = async () => {
		setTotalamount(0);
		productItem.forEach((el) => {
			if (el.show === 'none') {
				if (el.billing_status === 'Unpaid') {
					setTotalamount(
						(prevtotal) => Number(prevtotal) + Number(el.serviceInfo.amount),
					);
				} else {
					setTotalamount(
						(prevtotal) => Number(prevtotal) + Number(el.paymentInfo.balance),
					);
				}
			}
			if (el.show === 'flex') {
				setTotalamount((prevtotal) => Number(prevtotal) + Number(el.partPay));
			}

			//
		});
	};

	useEffect(() => {
		//   //console.log(productItem)
		getTotal();
		return () => {};
	}, [productItem]);

	//initialize page
	useEffect(() => {
		// const medication =state.medicationModule.selectedMedication
		const today = new Date().toLocaleString();
		////console.log(today)
		setDate(today);
		const invoiceNo = random(6, 'uppernumeric');
		setDocumentNo(invoiceNo);

		getFacilities();
		SubwalletServ.on('created', (obj) => getFacilities());
		SubwalletServ.on('updated', (obj) => getFacilities());
		SubwalletServ.on('patched', (obj) => getFacilities());
		SubwalletServ.on('removed', (obj) => getFacilities());

		return async () => {
			const newProductEntryModule = {
				selectedBills: [],
				selectedFinance: {},
				show: 'create',
			};
			await setState((prevstate) => ({
				...prevstate,
				financeModule: newProductEntryModule,
			}));
			await setPartPay([]);
		};
	}, []);

	const handleChangePart = async (bill, e) => {
		// //console.log(bill, e.target.value)
		if (e.target.value === 'Part') {
			bill.show = 'flex';
			setPartPay((prev) => prev.concat(bill));
			setPartTable((prev) => prev.concat(bill));
		}

		if (e.target.value === 'Full') {
			bill.show = 'none';

			let item = await productItem.find((el) => el._id === bill._id);
			const payObj = {
				amount: item.paymentInfo.balance,
				mode: 'Full',
				date: new Date().toLocaleString(),
			};
			//item.partPay=""
			// item.paymentInfo.paymentDetails.push(payObj)
			item.proposedpayment = {
				balance: Number(item.paymentInfo.balance) - Number(payObj.amount),
				paidup: Number(item.paymentInfo.paidup) + Number(payObj.amount),
				amount: payObj.amount,
			};
			// item.paymentInfo.balance=item.paymentInfo.balance - item.paymentInfo.balance
			//  item.paymentInfo.paidup=Number(item.paymentInfo.paidup) + Number(payObj.amount)
			getTotal();
			setPartPay((prev) => prev.concat(bill));
			setPartTable((prev) => prev.filter((i) => i._id !== bill._id));
		}
	};

	const handleChangeFull = async (e) => {
		// //console.log(medication)
		if (e.target.value === 'Part') {
			setPart(true);
		}

		if (e.target.value === 'Full') {
			setPart(false);

			getTotal();
		}
	};

	const handlePartAmount = async (bill, e) => {
		let partAmount = e.target.value;
		// bill.partPay=partAmount
		//const itemList=productItem
		if (partAmount === '' || partAmount === 0) {
			toast.error('Please enter an amount as part payment');
			return;
		}
		let item = await productItem.find((el) => el._id === bill._id);
		item.partPay = partAmount;
		setPartPay((prev) => prev.concat(bill));
		//setProductItem(productItem)
	};

	const handleUpdate = async (bill, e) => {
		if (
			bill.partPay === '' ||
			bill.partPay === 0 ||
			bill.partPay === undefined
		) {
			toast.error('Please enter an amount as part payment');
			return;
		}
		// //console.log(bill)
		let item = await productItem.find((el) => el._id === bill._id);

		let partAmount = item.partPay;

		if (bill.show === 'flex') {
			const payObj = {
				amount: partAmount,
				mode: 'Part',
				date: new Date().toLocaleString(),
			};

			item.proposedpayment = {
				balance: Number(item.paymentInfo.balance) - Number(payObj.amount),
				paidup: Number(item.paymentInfo.paidup) + Number(payObj.amount),
				amount: payObj.amount,
			};
		}

		getTotal();
		setPartPay((prev) => prev.concat(bill));
		toast.success('Part payment updated successfully');
	};

	const handlePayment = async () => {
		//1. check if there is sufficient amount
		if (totalamount > balance) {
			toast.error(
				'Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid',
			);

			return;
		}

		productItem.forEach((el) => {
			if (!el.proposedpayment.amount) {
				toast.error('one or more bills do not have a payment method selected');
				return;
			}
		});

		//transform
		productItem.forEach((el) => {
			if (el.show === 'flex') {
				const payObj = {
					amount: el.proposedpayment.amount,
					mode: 'Part',
					date: new Date().toLocaleString(),
				};
				el.paymentInfo.paymentDetails.push(payObj);
			}

			if (el.show === 'none') {
				const payObj = {
					amount: el.proposedpayment.amount,
					mode: 'Full',
					date: new Date().toLocaleString(),
				};
				el.paymentInfo.paymentDetails.push(payObj);
			}
		});

		let allItems = productItem;

		allItems.forEach((el) => {
			el.paymentInfo.balance = el.proposedpayment.balance;
			el.paymentInfo.paidup = el.proposedpayment.paidup;
			el.paymentInfo.amountpaid = el.proposedpayment.amount;

			if (el.paymentInfo.balance === 0) {
				el.billing_status = 'Fully Paid';
			} else {
				el.billing_status = 'Part Payment';
			}
			el.show = 'none';
			el.checked = false;
			delete el.proposedpayment;
			delete el.partPay;
		});

		const obj = {
			clientId: medication.participantInfo.client._id, //sending money
			clientName: source,
			client: medication.participantInfo.client,
			facilityId: user.employeeData[0].facilityDetail._id,
			invoiceNo: documentNo,
			totalamount: totalamount,
			createdby: user._id,
			status: 'Fully Paid', //billid to be paid : ref invoice to pay
			bills: allItems,
			balance: balance,
			facilityName: user.employeeData[0].facilityDetail.facilityName,
			subwallet: subWallet,
			amountPaid: totalamount,
		};

		//console.log(obj)

		InvoiceServ.create(obj)
			.then(async (resp) => {
				setProductItem([]);
				toast.success('payment successful');
				const newProductEntryModule = {
					selectedBills: [],
					selectedFinance: {},
					show: 'create',
				};
				await setState((prevstate) => ({
					...prevstate,
					finance: newProductEntryModule,
				}));
			})
			.catch((err) => {
				toast.error('Error occurred with payment' + err);
			});
	};

	const handleBulkPayment = async () => {
		//1. check if there is sufficient amount

		let fraction = 1;

		if (part) {
			// apply fraction to all bills
			if (partBulk === '' || partBulk === 0 || partBulk === undefined) {
				toast.error('Please enter an amount as part payment');
				return;
			}

			if (partBulk > balance) {
				toast.error(
					'Amount entered greater than balance. Kindly top up account or reduce amount entered',
				);

				return;
			}

			fraction = +(partBulk / totalamount).toFixed(2);
			// //console.log(fraction)
			// //console.log(partBulk)

			productItem.forEach((el) => {
				// //console.log(el)

				const payObj = {
					amount: el.proposedpayment.amount * fraction,
					mode: 'Part',
					date: new Date().toLocaleString(),
				};
				//  el.paymentInfo.paymentDetails.push(payObj)
				el.proposedpayment = {
					balance: Number(el.paymentInfo.balance) - Number(payObj.amount),
					paidup: Number(el.paymentInfo.paidup) + Number(payObj.amount),
					amount: payObj.amount,
				};
			});
		}
		if (!part) {
			//check that balance can pay bills
			if (totalamount > balance) {
				toast.error(
					'Total amount due greater than money received. Kindly top up account or reduce number of bills to be paid',
				);

				return;
			}

			//pay all bills in full
			productItem.forEach((el) => {
				if (el.show === 'flex') {
					const payObj = {
						amount: el.proposedpayment.amount,
						mode: 'Part',
						date: new Date().toLocaleString(),
					};
					el.paymentInfo.paymentDetails.push(payObj);
				}

				if (el.show === 'none') {
					const payObj = {
						amount: el.proposedpayment.amount,
						mode: 'Full',
						date: new Date().toLocaleString(),
					};
					el.paymentInfo.paymentDetails.push(payObj);
				}
			});
		}

		let allItems = productItem;

		allItems.forEach((el) => {
			el.paymentInfo.balance = el.proposedpayment.balance;
			el.paymentInfo.paidup = el.proposedpayment.paidup;
			el.paymentInfo.amountpaid = el.proposedpayment.amount;

			if (el.paymentInfo.balance === 0) {
				el.billing_status = 'Fully Paid';
			} else {
				el.billing_status = 'Part Payment';
				setIsPart(true);
			}
			el.show = 'none';
			el.checked = false;
			delete el.proposedpayment;
			delete el.partPay;
		});

		//  //console.log(isPart)
		const obj = {
			clientId: medication.participantInfo.client._id, //sending money
			clientName: source,
			client: medication.participantInfo.client,
			facilityId: user.employeeData[0].facilityDetail._id,
			invoiceNo: documentNo,
			totalamount: totalamount,
			createdby: user._id,
			status: part ? 'Part Payment' : 'Fully Paid', //billid to be paid : ref invoice to pay
			bills: allItems,
			balance: balance,
			facilityName: user.employeeData[0].facilityDetail.facilityName,
			subwallet: subWallet,
			amountPaid: part ? partBulk : totalamount,
		};

		//  //console.log(obj.amountPaid)

		InvoiceServ.create(obj)
			.then(async (resp) => {
				setProductItem([]);
				toast.success('payment successful');
				const newProductEntryModule = {
					selectedBills: [],
					selectedFinance: {},
					show: 'create',
				};
				await setState((prevstate) => ({
					...prevstate,
					finance: newProductEntryModule,
				}));
				setPartBulk('');
				setPart(false);
				setIsPart(false);
			})
			.catch((err) => {
				toast.error('Error occurred with payment' + err);
			});

		//2. call single end point for billspayment?

		//2.1 create subwallet transaction- debit

		//2.2 update subwallet

		//2.3 mark orders as paid

		//2.4 mark bills as paid
	};

	const handleBulkAmount = (e) => {
		setPartBulk(e.target.value);
	};

	const paymentCreateSchema = [
		{
			name: 'S/NO',
			width: '60px',
			key: 'sn',
			description: 'Enter name of Disease',
			selector: (row) => row.sn,
			sortable: true,
			required: true,
			inputType: 'HIDDEN',
		},
		{
			name: 'Category',
			key: 'category',
			description: 'Enter Category',
			selector: (row) => <b>{row.orderInfo.orderObj.order_category}</b>,
			sortable: true,
			required: true,
			inputType: 'SELECT_TYPE',
		},
		{
			name: 'Description',
			key: 'description',
			description: 'Enter Description',
			selector: (row) => row.serviceInfo.name,
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Type',
			width: '200px',
			center: true,
			key: 'sn',
			description: 'Enter Type',
			selector: 'row',
			cell: (row) => (
				<Box>
					<RadioButton
						onChange={(e) => {
							handleChangePart(row, e);
						}}
						options={['Full', 'Part']}
						name={row._id}
					/>

					{partTable.find((i) => i._id === row._id) && (
						<div>
							<div style={{ marginBottom: '5px' }}>
								<Input
									type='text'
									name={row._id}
									placeholder='Amount'
									value={partBulk}
									onChange={(e) => handlePartAmount(row, e)}
								/>
							</div>
							<GlobalCustomButton
								onClick={(e) => handleUpdate(row, e)}
								color='secondary'>
								Update
							</GlobalCustomButton>
						</div>
					)}
				</Box>
			),
			sortable: true,
			required: true,
			inputType: 'TEXT',
		},
		{
			name: 'Amount',
			width: '200px',
			key: 'sn',
			description: 'Enter name of Disease',
			selector: (row) => (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ display: 'flex', marginBottom: '8px' }}>
						<b style={{ marginRight: '3px' }}>Balance Due:</b>{' '}
						{row.paymentInfo.balance.toFixed(2)}
					</div>
					<div style={{ display: 'flex', marginBottom: '8px' }}>
						<b style={{ marginRight: '3px' }}>Paid up:</b>{' '}
						{row.paymentInfo.paidup.toFixed(2)}
					</div>
					<div style={{ display: 'flex', marginBottom: '8px' }}>
						<b style={{ marginRight: '3px' }}>Amount:</b>{' '}
						{row.paymentInfo.amountDue.toFixed(2)}
					</div>
				</div>
			),
			sortable: true,
			required: true,
			inputType: 'NUMBER',
		},
	];

	return (
		<>
			<ModalBox
				open={createModal}
				onClose={handleHideCreateModal}
				header='Pay With Wallet'>
				<PayWithWallet amount={part ? partBulk : totalamount} />
			</ModalBox>
			<div style={{ width: '100%' }}>
				<ModalBox
					open={depositModal}
					onClose={() => setDepositModal(false)}
					header={`Make Deposit`}>
					<MakeDeposit balance={balance} />
				</ModalBox>

				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						borderBottom: '1px solid #f8f8f8',
						backgroundColor: '#f8f8f8',
					}}
					p={2}
					mb={2}>
					<GlobalCustomButton onClick={handleGoBack}>
						<ArrowBackIcon
							fontSize='small'
							sx={{ marginRight: '5px' }}
						/>
						Back
					</GlobalCustomButton>

					<Typography
						sx={{
							fontSize: '0.95rem',
							color: '2d2d2d',
						}}>
						Pay Bills for{' '}
						<span
							style={{
								textTransform: 'capitalize',
								fontWeight: '600',
								color: '#023e8a',
							}}>
							{source}
						</span>{' '}
						#{documentNo}
					</Typography>

					<Box>
						<GlobalCustomButton onClick={() => setDepositModal(true)}>
							<LocalAtmIcon
								fontSize='small'
								sx={{ marginRight: '5px' }}
							/>
							Make Deposit
						</GlobalCustomButton>
					</Box>
				</Box>

				<Box
					pl={2}
					pr={2}
					mb={2}>
					<Grid
						container
						spacing={1}>
						<Grid
							item
							xs={12}
							sm={12}
							md={7}
							lg={7}>
							<Box
								sx={{ display: 'flex' }}
								gap={1}
								mb={1}>
								<Box>
									<RadioButton
										name='fullPay'
										options={['Full', 'Part']}
										onChange={(e) => {
											handleChangeFull(e);
										}}
										value={part ? 'Part' : 'Full'}
									/>
								</Box>

								{part && (
									<Box style={{ marginLeft: '15px', width: '200px' }}>
										<Input
											label='Amount'
											type='text'
											name='bulkpa'
											placeholder='Enter amount'
											value={partBulk}
											onChange={(e) => handleBulkAmount(e)}
										/>
									</Box>
								)}
							</Box>

							<Box
								style={{
									display: 'flex',
									flexDirection: 'row',
								}}
								gap={1}>
								<GlobalCustomButton onClick={handleBulkPayment}>
									<PaymentsIcon
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Pay
								</GlobalCustomButton>

								<GlobalCustomButton
									sx={{
										backgroundColor: '#6c584c',
										'&:hover': { backgroundColor: '#6c584c;' },
									}}>
									<WalletIcon
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									Pay with Wallet
								</GlobalCustomButton>

								<GlobalCustomButton
									sx={{
										backgroundColor: '#023e8a',
										'&:hover': { backgroundColor: '#023e8a' },
									}}>
									<WalletIcon
										sx={{ marginRight: '5px' }}
										fontSize='small'
									/>
									<RemitaPayment
										remitaData={data}
										className='btn'
										text='Pay with Remita'
									/>
								</GlobalCustomButton>
								{/* <GlobalCustomButton
                  onClick={() => {
                    handleFlutterPayment({
                      callback: response => {
                        console.log(response);
                        closePaymentModal();
                      },
                      onClose: () => {
                        closeModal;
                      },
                    });
                  }}
                  sx={{
                    backgroundColor: "#2d3142",
                    color: "#ffffff",
                    "&:hover": {backgroundColor: "#2d3142"},
                  }}
                >
                  <FlutterWaveIcon />
                  Pay with Flutterwave
                </GlobalCustomButton>

                <PaystackConsumer {...componentProps}>
                  {({initializePayment}) => (
                    <GlobalCustomButton
                      onClick={() =>
                        initializePayment(handleSuccess, closeModal)
                      }
                      sx={{
                        backgroundColor: "#023e8a",
                        "&:hover": {backgroundColor: "#023e8a"},
                      }}
                    >
                      <PaystackIcon />
                      Pay with PayStack
                    </GlobalCustomButton>
                  )}
                </PaystackConsumer> */}
							</Box>
						</Grid>

						<Grid
							item
							xs={12}
							sm={12}
							md={5}
							lg={5}>
							<Box
								container
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'flex-end',
								}}
								gap={1}>
								<Box
									item
									sx={{
										minWidth: '200px',
										height: '80px',
										border: '1px solid #E5E5E5',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										padding: '0 15px',
									}}>
									<Typography sx={{ display: 'flex', alignItems: 'center' }}>
										<AccountBalanceWalletIcon color='primary' /> Total Amount
										Due
									</Typography>
									<Typography
										sx={{
											fontSize: '24px',
											fontWeight: '700',
											color: 'red',
										}}>
										{' '}
										&#8358;{totalamount.toFixed(2)}
									</Typography>
								</Box>

								<Box
									item
									sx={{
										minWidth: '100px',
										height: '80px',
										border: '1px solid #E5E5E5',
										display: 'flex',
										flexDirection: 'column',
										justifyContent: 'center',
										padding: '0 15px',
									}}>
									<Typography sx={{ display: 'flex', alignItems: 'center' }}>
										<AccountBalanceIcon color='primary' /> Current Balance
									</Typography>
									<Typography
										sx={{
											fontSize: '24px',
											fontWeight: '700',
											color: '#85BB65',
										}}>
										&#8358;{balance.toFixed(2)}
									</Typography>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>

				{productItem.length > 0 && (
					<Box
						pr={2}
						pl={2}
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
						gap={2}>
						<div
							style={{
								height: 'calc(100% - 300px)',
								width: '100%',
							}}>
							<CustomTable
								title={''}
								columns={paymentCreateSchema}
								data={productItem}
								pointerOnHover
								highlightOnHover
								striped
								onRowClicked={(row) => row}
								progressPending={loading}
							/>
							{/* 
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <GlobalCustomButton
                  disabled={!productItem.length > 0}
                  onClick={handlePayment}
                  sx={{marginRight: "15px"}}
                >
                  <PaymentsIcon sx={{marginRight: "5px"}} fontSize="small" />
                  Pay
                </GlobalCustomButton>
              </div> */}
						</div>
						<Box
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'flex-end',
							}}
							gap={1}>
							<GlobalCustomButton onClick={handlePayment}>
								<PaymentsIcon
									sx={{ marginRight: '5px' }}
									fontSize='small'
								/>
								Pay
							</GlobalCustomButton>

							<GlobalCustomButton
								sx={{
									backgroundColor: '#6c584c',
									'&:hover': { backgroundColor: '#6c584c;' },
								}}
								onClick={handleCreateModal}>
								<WalletIcon
									sx={{ marginRight: '5px' }}
									fontSize='small'
								/>
								Pay with Wallet
							</GlobalCustomButton>

							{/* <GlobalCustomButton
                onClick={() => {
                  handleFlutterPayment({
                    callback: response => {
                      console.log(response);
                      closePaymentModal();
                    },
                    onClose: () => {
                      closeModal;
                    },
                  });
                }}
                sx={{
                  backgroundColor: "#2d3142",
                  color: "#ffffff",
                  "&:hover": {backgroundColor: "#2d3142"},
                }}
              >
                <FlutterWaveIcon />
                Pay with Flutterwave
              </GlobalCustomButton>

              <PaystackConsumer {...componentProps}>
                {({initializePayment}) => (
                  <GlobalCustomButton
                    onClick={() => initializePayment(handleSuccess, closeModal)}
                    sx={{
                      backgroundColor: "#023e8a",
                      "&:hover": {backgroundColor: "#023e8a"},
                    }}
                  >
                    <PaystackIcon />
                    Pay with PayStack
                  </GlobalCustomButton>
                )}
             </PaystackConsumer> */}
							<GlobalCustomButton
								sx={{
									backgroundColor: '#023e8a',
									'&:hover': { backgroundColor: '#023e8a' },
								}}>
								<WalletIcon
									sx={{ marginRight: '5px' }}
									fontSize='small'
								/>
								<RemitaPayment
									remitaData={data}
									className='btn'
									text='Pay with Remita'
								/>
							</GlobalCustomButton>
						</Box>
					</Box>
				)}
			</div>
		</>
	);
}
