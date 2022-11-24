/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext, ObjectContext } from '../../context';
import { format, formatDistanceToNowStrict } from 'date-fns';
import ReportCreate from './ReportCreate';
import PatientProfile from '../Client/PatientProfile';
import Encounter from '../Documentation/Documentation';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, InputBase } from '@mui/material';
import Textarea from '../../components/inputs/basic/Textarea';
import { toast } from 'react-toastify';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Input from '../../components/inputs/basic/Input';

/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

export default function RadiologyReport() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const BillServ = client.service('bills');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedOrders, setSelectedOrders] = useState([]); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <RadiologyOrderList openModal={openModal} setOpenModal={setOpenModal} />
      {/* {openModal && (
        <ModalBox
          open={state.financeModule.show === 'detail'}
          header
          onClose={() => setOpenModal(false)}
          width="fit-content"
        >
          <Grid container>
            <Grid item sm={6} p={1}>
              <RadiologyNoteCreate />
            </Grid>
            <Grid item sm={6}>
              <PatientProfile />
            </Grid>
          </Grid>
        </ModalBox>
      )} */}
    </section>
  );
}

export function RadiologyOrderList({ openModal, setOpenModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const BillServ = client.service('bills');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  const [selectedOrders, setSelectedOrders] = useState([]);
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [selectedFinance, setSelectedFinance] = useState('');
  const [expanded, setExpanded] = useState('');
  const [oldClient, setOldClient] = useState('');
  const navigate = useNavigate();

  const handleSelectedClient = async (Client) => {
    // await setSelectedClient(Client)
    const newClientModule = {
      selectedClient: Client,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handleChoseClient = async (client, e, order) => {
    setOldClient(client.clientname);
    let newClient = client.clientname;
    if (oldClient !== newClient) {
      //alert("New Client Onboard")
      //remove all checked clientsly
      selectedOrders.forEach((el) => (el.checked = ''));
      setSelectedOrders([]);
    }

    // console.log(e.target.checked)
    order.checked = e.target.checked;
    await handleSelectedClient(order.participantInfo.client);
    //handleMedicationRow(order)
    await setSelectedFinance(order);
    const newProductEntryModule = {
      selectedFinance: order,
      show: 'detail',
      state: e.target.checked,
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));

    //set of checked items
    if (e.target.checked) {
      await setSelectedOrders((prevstate) => prevstate.concat(order));
    } else {
      setSelectedOrders((prevstate) =>
        prevstate.filter((el) => el._id !== order._id)
      );
    }

    // console.log(selectedOrders)
  };
  const onRowClicked = async (order) => {
    setOpenModal(true);
    await setSelectedFinance(order);
    await handleSelectedClient(order.participantInfo.client);
    // grab report
    // if draft show create/modify
    //if final: show final
    // console.log(order)
    const newProductEntryModule = {
      selectedFinance: order,
      show: 'detail',
      report_status: order.report_status,
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
    navigate('/app/radiology/rad-details');
  };

  const handleCreate = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
    setOpenModal(true);
  };

  const handleSearch = (val) => {
    const field = 'name';
    //console.log(val)
    BillServ.find({
      query: {
        'participantInfo.paymentmode.detail.principalName': {
          $regex: val,
          $options: 'i',
        },
        /*  $or:[
                {
           
                } ,
                {
            'orderInfo.orderObj.clientname': {
                        $regex:val,
                        $options:'i'
                    
                    }
                }
                ], */

        //order_category:"Prescription",
        $or: [
          {
            'participantInfo.paymentmode.type': 'Cash',
          },
          {
            'participantInfo.paymentmode.type': 'Family Cover',
          },
        ],
        $or: [
          {
            'orderInfo.orderObj.order_category': 'Radiology Order',
          },
          {
            'orderInfo.orderObj.order_category': 'Radiology',
          },
        ],
        'orderInfo.orderObj.order_category': 'Radiology Order',
        'participantInfo.billingFacility':
          user.currentEmployee.facilityDetail._id,
        billing_status: 'Unpaid', // need to set this finally
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 20,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        // console.log(res)
        setFacilities(res.groupedOrder);
        setMessage(' ProductEntry  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        // console.log(err)
        setMessage(
          'Error fetching ProductEntry, probable network issues ' + err
        );
        setError(true);
      });
  };
  const getFacilities = async () => {
    // console.log("here b4 server")
    const findProductEntry = await BillServ.find({
      query: {
        /*  $or:[
                    {
                       'participantInfo.paymentmode.type':"Cash"
                    },
                    {
                       'participantInfo.paymentmode.type':"Family Cover"
                    }
                ], */
        'participantInfo.billingFacility':
          user.currentEmployee.facilityDetail._id,
        //'orderInfo.orderObj.order_category':"Radiology Order",
        $or: [
          {
            'orderInfo.orderObj.order_category': 'Radiology Order',
          },
          {
            'orderInfo.orderObj.order_category': 'Radiology',
          },
        ],
        // billing_status:"Unpaid",  // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 1000,
        $sort: {
          createdAt: -1,
        },
      },
    });

    //    console.log("bills", findProductEntry.data)
    await setFacilities(findProductEntry.data);
    //  await setState((prevstate)=>({...prevstate, currentClients:findProductEntry.groupedOrder}))
  };
  const handleRow = async (Client, e) => {
    // alert(expanded)
  };
  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
    BillServ.on('created', (obj) => getFacilities());
    BillServ.on('updated', (obj) => getFacilities());
    BillServ.on('patched', (obj) => getFacilities());
    BillServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, []);

  useEffect(() => {
    return () => {};
  }, [selectedOrders]);

  useEffect(() => {
    if (state.financeModule.show === 'create') {
      selectedOrders.forEach((el) => (el.checked = ''));
      setSelectedOrders([]);
    }
    return () => {};
  }, [state.financeModule.show]);

  // ######### DEFINE FUNCTIONS AND SCHEMA HERE
  const radReportSchema = [
    {
      name: 'S/No',
      key: 'sn',
      description: 'Enter serial number',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Date',
      key: 'createdAt',
      description: 'Enter date',
      selector: (row) => format(new Date(row.createdAt), 'dd/MM/yyyy HH:mm'),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Client',
      key: 'client',
      description: 'Enter client name',
      selector: (row) => {
        return row.orderInfo.orderObj.clientname;
      },
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Test',
      key: 'description',
      description: 'Enter test result details',
      selector: (row) => row.orderInfo.orderObj.order,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Amount',
      key: 'amount',
      description: 'Enter amount',
      selector: (row) => row.serviceInfo.price,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Billing Status',
      key: 'billing_status',
      description: 'Enter Payment Status',
      selector: (row) => row.billing_status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Report Status',
      key: 'report_status',
      description: 'Select facility',
      selector: (row) => row.report_status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      <PageWrapper style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}>
        <TableMenu>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
              Radiology Results
            </h2>
          </div>

          {/* {handleCreate && (
            <GlobalCustomButton text="Add new " onClick={handleCreate} />
          )} */}
        </TableMenu>

        <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
          <CustomTable
            title={''}
            columns={radReportSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={onRowClicked}
            progressPending={loading}
          />
        </div>
      </PageWrapper>
    </>
  );
}
