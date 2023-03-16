/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, useNavigate, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import PaymentsIcon from '@mui/icons-material/Payments';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import Switch from '../../components/switch';
import { BsFillGridFill, BsList } from 'react-icons/bs';
import CalendarGrid from '../../components/calender';
import ModalBox from '../../components/modal';
import { Box, Grid, Typography } from '@mui/material';

import { MdCancel } from 'react-icons/md';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import MakeDeposit from '../Finance/Deposit';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { PaystackConsumer } from 'react-paystack';

// eslint-disable-next-line
const searchfacility = {};

export default function ProviderPayment() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [createModal, setCreateModal] = useState(false);
  const [payModal, setPayModal] = useState(false);

  return (
    <section className="section remPadTop">
      <ProviderPaymentList
        openCreateModal={() => setCreateModal(true)}
        setPayModal={setPayModal}
      />
      {payModal && (
        <ModalBox open={payModal} onClose={() => setPayModal(false)}>
          <ProviderPaymentCreate setPayModal={setPayModal} />
        </ModalBox>
      )}
    </section>
  );
}

export function ProviderPaymentList({ openCreateModal, setPayModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ClientServ = client.service('appointments');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('list');
  const [selectedClient, setSelectedClient] = useState();
  const [amount, setAmount] = useState(0);
  const [inselected, setInselected] = useState();

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    setShowModal(true);
  };

  const handleRow = async (Client) => {
    setSelectedClient(Client);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
  };
  //console.log(state.employeeLocation)

  const handleSearch = (val) => {
    const field = 'firstname';
    //  console.log(val)

    let query = {
      $or: [
        {
          firstname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          lastname: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          middlename: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_type: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          location_name: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: 'i',
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: 'i',
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== 'Front Desk') {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({ query: query })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(' Client  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage('Error fetching Client, probable network issues ' + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    console.log(user);
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== "Front Desk") {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
      console.log(findClient.data);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
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
    if (user) {
      handleCalendarClose();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on('created', (obj) => handleCalendarClose());
    ClientServ.on('updated', (obj) => handleCalendarClose());
    ClientServ.on('patched', (obj) => handleCalendarClose());
    ClientServ.on('removed', (obj) => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: 'create',
    };
    setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    return () => {};
  }, []);
  const handleCalendarClose = async () => {
    let query = {
      start_time: {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      },
      facility: user.currentEmployee.facilityDetail._id,

      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    const findClient = await ClientServ.find({ query: query });

    await setFacilities(findClient.data);
  };

  const handleDate = async (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (!!startDate) {
      handleCalendarClose();
    } else {
      getFacilities();
    }

    return () => {};
  }, [startDate]);
  //todo: pagination and vertical scroll bar

  const onRowClicked = () => {};

  const mapFacilities = () => {
    let mapped = [];
    facilities.map((facility, i) => {
      mapped.push({
        title: facility?.firstname + ' ' + facility?.lastname,
        start: format(new Date(facility?.start_time), 'yyyy-MM-ddTHH:mm'),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };

  const activeStyle = {
    backgroundColor: '#0064CC29',
    border: 'none',
    padding: '0 .8rem',
  };

  const dummyData = [
    {
      s_n: 'S/N',
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      amount: 10000,
      status: 'Approved',
    },
    {
      s_n: 'S/N',
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      amount: 10000,
      status: 'Approved',
    },
    {
      s_n: 'S/N',
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      amount: 10000,
      status: 'Approved',
    },

    {
      s_n: 'S/N',
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      amount: 10000,
      status: 'Approved',
    },
  ];

  const dummyData2 = [
    {
      s_n: 'S/N',
      _id: 1,
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      date_of_payment: '11/11/2022',
      amount: 50000,
      claim_id: '50',
      status: 'Approved',
    },
    {
      s_n: 'S/N',
      _id: 2,
      provider_name: 'Sulaiman Olaniran',
      billing_for_month: 'Family Plan',
      date_of_payment: '11/11/2022',
      amount: 10000,
      claim_id: '50',
      status: 'Approved',
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case 'approved':
        return <span style={{ color: '#17935C' }}>{status}</span>;

      case 'unapproved':
        return <span style={{ color: '#0364FF' }}>{status}</span>;

      default:
        break;
    }
  };
  const handlePay = () => {
    setPayModal(true);
  };
  const handleChoseClient = (client, e, amount) => {
    setAmount(amount);
  };
  const ProviderPaymentSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: 'HIDDEN',
      width: '80px',
    },
    {
      name: ' Provider Name',
      key: 'provider_name',
      description: 'Enter name of Provider',
      selector: (row) => row.provider_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Billing for Month',
      key: 'billing_for_month',
      description: 'Enter Billing for Month',
      selector: (row) => row.billing_for_month,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Amount',
      key: 'amount',
      description: 'Enter Amount',
      selector: (row, i) => row.amount,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Action',
      key: 'bills',
      description: 'Enter Grand Total',
      selector: (row) => (
        <GlobalCustomButton
          onClick={() => {
            handlePay(row);
          }}
          sx={{ marginRight: '15px' }}
        >
          <PaymentsIcon sx={{ marginRight: '3px' }} fontSize="small" />
          Pay
        </GlobalCustomButton>
      ),
      sortable: true,
      required: true,
      inputType: 'BUTTON',
    },
  ];

  const ProviderPaymentSchema2 = [
    {
      name: 'S/NO',
      width: '70px',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            //name={order._id}
            style={{ marginRight: '3px' }}
            onChange={(e) => {
              handleChoseClient(selectedClient, e, row.amount);
            }}
            checked={row.amount.checked}
          />
          {row.sn}
        </div>
      ),
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: ' Provider Name',
      key: 'provider_name',
      description: 'Enter name of Provider',
      selector: (row) => row.provider_name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Billing for Month',
      key: 'billing_for_month',
      description: 'Enter Billing for Month',
      selector: (row) => row.billing_for_month,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Amount',
      key: 'amount',
      description: 'Enter Amount',
      selector: (row, i) => row.amount,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Status',
      key: 'status',
      description: 'Enter bills',
      selector: 'status',
      cell: (row) => returnCell(row.status),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{ margin: '0 10px', fontSize: '0.95rem' }}>
                    Provider Payment
                  </h2>
                </div>
                {amount !== '' && (
                  <h2 style={{ marginLeft: '10px', fontSize: '0.9rem' }}>
                    Amount Due : <span>&#8358;</span>
                    {amount}
                  </h2>
                )}
                {amount !== '' && (
                  <GlobalCustomButton onClick={() => setPayModal(true)}>
                    <PaymentsIcon
                      sx={{ marginRight: '5px' }}
                      fontSize="small"
                    />
                    Make Payment
                  </GlobalCustomButton>
                )}
              </TableMenu>
              <div
                className="columns"
                style={{
                  display: 'flex',
                  width: '100%',
                  //flex: "1",
                  justifyContent: 'space-between',
                }}
              >
                <div
                  style={{
                    height: 'calc(100% - 70px)',
                    transition: 'width 0.5s ease-in',
                    width: selectedClient ? '49.5%' : '100%',
                  }}
                >
                  <CustomTable
                    title={''}
                    columns={ProviderPaymentSchema}
                    data={dummyData}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                </div>

                {selectedClient && (
                  <>
                    <div
                      style={{
                        height: 'calc(100% - 70px)',
                        width: '49.5%',
                        transition: 'width 0.5s ease-in',
                      }}
                    >
                      <CustomTable
                        title={''}
                        columns={ProviderPaymentSchema2}
                        data={dummyData2}
                        pointerOnHover
                        highlightOnHover
                        striped
                        onRowClicked={handleRow}
                        progressPending={loading}
                        //conditionalRowStyles={conditionalRowStyles}
                      />
                    </div>
                  </>
                )}
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

export function ProviderPaymentCreate({ openCreateModal, setPayModal }) {
  const [depositModal, setDepositModal] = useState(false);
  const [part, setPart] = useState(false);

  const handleChangeFull = async (e) => {
    // //console.log(medication)
    if (e.target.value === 'Part') {
      setPart(true);
    }

    if (e.target.value === 'Full') {
      setPart(false);
    }
  };
  return (
    <div style={{ width: '100%' }}>
      <ModalBox
        open={depositModal}
        onClose={() => setDepositModal(false)}
        header={`Make Deposit`}
      >
        <MakeDeposit balance={100000} />
      </ModalBox>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mb={2}
      >
        <Typography
          sx={{
            fontSize: '0.8rem',
            color: '2d2d2d',
          }}
        >
          Pay Bills for Sulaiman Olaniran
        </Typography>

        {/* <GlobalCustomButton onClick={() => setDepositModal(true)}>
          <LocalAtmIcon fontSize="small" sx={{ marginRight: '5px' }} />
          Make Deposit
        </GlobalCustomButton> */}
      </Box>

      <Box
        container
        sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}
        mb={2}
      >
        <Box
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            item
            sx={{
              width: '49%',
              height: '80px',
              border: '1px solid #E5E5E5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 15px',
            }}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceWalletIcon color="primary" /> Total Amount Due
            </Typography>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'red',
              }}
            >
              {' '}
              {/* &#8358;{totalamount.toFixed(2)} */}
            </Typography>
          </Box>

          <Box
            item
            sx={{
              width: '49%',
              height: '80px',
              border: '1px solid #E5E5E5',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 15px',
            }}
          >
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalanceIcon color="primary" /> Current Balance
            </Typography>
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '700',
                color: '2d2d2d',
              }}
            >
              {/* &#8358;{balance.toFixed(2)} */}
            </Typography>
          </Box>
        </Box>
      </Box>

      <div
        style={{
          backgroundColor: '#F8F8F8',
          padding: '7px',
          marginBottom: '15px',
          boxShadow: '0 3px 3px 0 rgb(3 4 94 / 20%)',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '2rem',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label className=" is-small">
              <input
                type="radio"
                name="fullPay"
                value="Full"
                checked={!part}
                onChange={(e) => {
                  handleChangeFull(e);
                }}
              />
              <span> Full </span>
            </label>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: '15px',
              }}
            >
              <div>
                <label className=" is-small">
                  <input
                    type="radio"
                    name="fullPay"
                    value="Part"
                    onChange={(e) => handleChangeFull(e)}
                  />
                  <span> Part </span>
                </label>
              </div>
              {part && (
                <div style={{ marginLeft: '15px', width: '200px' }}>
                  <Input
                    label="Amount"
                    type="text"
                    name="bulkpa"
                    placeholder="Enter amount"
                    // value={partBulk}
                    // onChange={(e) => handleBulkAmount(e)}
                  />
                </div>
              )}
            </div>
          </div>

          <div
            className="control"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: '14px',
            }}
          >
            <GlobalCustomButton
              // onClick={handlePayment}
              sx={{ marginRight: '15px' }}
            >
              <PaymentsIcon sx={{ marginRight: '5px' }} fontSize="small" />
              Pay
            </GlobalCustomButton>
          </div>
        </div>
      </div>

      <div className="card-content px-1 ">
        <GlobalCustomButton customStyles={{ marginRight: '.8rem' }}>
          <PaymentsIcon sx={{ marginRight: '5px' }} fontSize="small" />
          Pay
        </GlobalCustomButton>
        <GlobalCustomButton
          color="error"
          variant="outlined"
          onClick={() => setPayModal(false)}
        >
          Cancel
        </GlobalCustomButton>
      </div>
    </div>
  );
}
