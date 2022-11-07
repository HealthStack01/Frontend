/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
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
import ModalBox from './ui-components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { Box, Grid, InputBase } from '@mui/material';
import Input from '../../components/inputs/basic/Input/index';
import Textarea from '../../components/inputs/basic/Textarea/index';
import { toast } from 'react-toastify';

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
      {openModal && (
        <ModalBox
          open={state.financeModule.show === 'detail'}
          onClose={() => setOpenModal(false)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <RadiologyNoteCreate />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PatientProfile />
            </Grid>
          </Grid>
        </ModalBox>
      )}
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

          {handleCreate && (
            <Button
              style={{ fontSize: '14px', fontWeight: '600' }}
              label="Add new "
              onClick={handleCreate}
            />
          )}
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

export function RadiologyNoteCreate() {
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
  const [productModal, setProductModal] = useState(false);

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = (obj) => {
    setValue('facility', obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

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
          })
      );
    }

    return () => {};
  }, [order]);

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
    document.documentType = 'Radiology Result';
    document.documentname = `${data.Procedure} Result`; /* `${order.serviceInfo.name} Result` */
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
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast.warning(
        ' Documentation data missing, requires location and facility details'
      );
      return;
    }

    if (bill_report_status === 'Pending') {
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.success('Lab Result created succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.error('Error creating Lab Result ' + err);
        });
    }

    if (bill_report_status === 'Draft') {
      ClientServ.patch(order.resultDetail._id, document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast.success('Radiology Result updated succesfully');
          setSuccess(false);
        })
        .catch((err) => {
          toast.error('Error updating Radiology Result ' + err);
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: 'show',
      // report_status:order.report_status
    };
    await setState((prevstate) => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async (e) => {
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

      setValue('Finding', order.resultDetail.documentdetail.Finding, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue(
        'Recommendation',
        order.resultDetail.documentdetail.Recommendation,
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
      setReportStatus(order.report_status);
    }

    return () => {};
  }, [order]);
  const showDocumentation = async (value) => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };
  const ProperCase = (text) => {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ModalHeader
            text={ProperCase(
              `Radiology Result for ${order.orderInfo.orderObj.clientname} Ordered Test: ${order.serviceInfo.name}`
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
            style={{
              // width: '100%',
              margin: '2rem 0',
              backgroundColor: '#0364FF',
              fontSize: '18px',
              textAlign: 'right',
              marginLeft: 'auto',
            }}
          >
            Documentation
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              name="Procedure"
              type="text"
              register={register('Procedure', { required: true })}
              placeholder="Procedure"
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Clinical Indication"
              name="Clinical Indication"
              type="text"
              register={register('Clinical Indication', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Technique"
              name="Technique"
              type="text"
              register={register('Technique', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Comparison"
              name="Comparison"
              type="text"
              register={register('Comparison', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Finding"
              name="Finding"
              type="text"
              register={register('Finding', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Impression"
              name="Impression"
              type="text"
              register={register('Impression', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Textarea
              placeholder="Recommendation"
              name="recommendation"
              type="text"
              register={register('recommendation', { required: true })}
              disabled={bill_report_status === 'Final'}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === 'Draft' || reportStatus === 'Pending'}
              onChange={(e) => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === 'Final'}
              style={{
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
              }}
            >
              {' '}
              Draft
            </span>
          </Grid>{' '}
          <Grid item xs={12} sm={4}>
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === 'Final'}
              onChange={(e) => handleChangePart(e)}
              disabled={bill_report_status === 'Final'}
              style={{
                transform: 'scale(1.5)',
                margin: '1rem',
              }}
            />
            <span
              style={{
                fontSize: '1rem',
              }}
            >
              {' '}
              Final{' '}
            </span>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {bill_report_status !== 'Final' && (
              <Button
                type="submit"
                style={{
                  backgroundColor: '#0364FF',
                  width: '100%',
                  cursor: 'pointer',
                  marginTop: '1rem',
                  padding: '1rem',
                }}
              >
                {bill_report_status === 'Pending' ? 'Save' : 'Update'}
              </Button>
            )}
          </Grid>
        </Grid>
      </form>
      {productModal && (
        <ModalBox open onClose={() => setProductModal(false)}>
          <Encounter standalone={true} />
        </ModalBox>
      )}
      {/* <div className="card ">
        <div className="card-header">
          <p className="card-header-title">
            Radiology Result for {order.orderInfo.orderObj.clientname} Ordered
            Test: {order.serviceInfo.name}
          </p>
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showDocumentation}
          >
            Documentation
          </button>
        </div>
        <div className="card-content vscrollable remPad1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register('x')}
                      name="Procedure"
                      type="text"
                      placeholder="Procedure"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Clinical Indication"
                      type="text"
                      placeholder="Clinical Indication"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Technique"
                      type="text"
                      placeholder="Technique"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Comparison"
                      type="text"
                      placeholder="Comparison"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Finding"
                      type="text"
                      placeholder="Findings"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Impression"
                      type="text"
                      placeholder="Impression"
                      disabled={bill_report_status === 'Final'}
                    />
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <div className="control has-icons-left has-icons-right">
                    <textarea
                      className="textarea is-small"
                      {...register('x')}
                      name="Recommendation"
                      type="text"
                      placeholder="Recommendation"
                      disabled={bill_report_status === 'Final'}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="field">
              <label className=" is-small">
                <input
                  type="radio"
                  name="status"
                  value="Draft"
                  checked={
                    reportStatus === 'Draft' || reportStatus === 'Pending'
                  }
                  onChange={(e) => {
                    handleChangePart(e);
                  }}
                  disabled={bill_report_status === 'Final'}
                />
                <span> Draft</span>
              </label>{' '}
              <br />
              <label className=" is-small">
                <input
                  type="radio"
                  name="status"
                  value="Final"
                  checked={reportStatus === 'Final'}
                  onChange={(e) => handleChangePart(e)}
                  disabled={bill_report_status === 'Final'}
                />
                <span> Final </span>
              </label>
            </div>
            <div className="field  is-grouped mt-2">
              <p className="control">
                <button
                  type="submit"
                  className="button is-success is-small"
                  disabled={bill_report_status === 'Final'}
                >
                  {bill_report_status === 'Pending' ? 'Save' : 'Update'}
                </button>
              </p>
             
            </div>
          </form>
        </div>
      </div> */}
      {/* <div className={`modal ${productModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card  modalbkgrnd">
          <header className="modal-card-head  btnheight">
            <p className="modal-card-title">Documentation</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body modalcolor">
            <Encounter standalone="true" />
          </section>

        </div>
      </div> */}
    </>
  );
}
