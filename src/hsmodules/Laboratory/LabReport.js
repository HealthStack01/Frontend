/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { format, formatDistanceToNowStrict } from 'date-fns';
import ReportCreate from './ReportCreate';
import PatientProfile from '../Client/PatientProfile';
import LaboratoryReportForm from '../clientForm/forms/laboratoryReportForm';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import ModalBox from '../../components/modal';
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

// Demo styles, see 'Styles' section below for some notes on use.

//import BillPrescriptionCreate from './BillPrescriptionCreate';

export default function LabReport() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  const [showState, setShowState] = useState(); /* create|modify|detail */
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

  const [reportFormModal, setReportFormModal] = useState(false);

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <LabOrderList openReportFormModal={setReportFormModal} />

      {reportFormModal && (
        <ModalBox
          open={state.financeModule.show === 'detail'}
          header
          onClose={() => setReportFormModal(false)}
          width={'100%'}
        >
          <LaboratoryReportForm />
        </ModalBox>
      )}

      {/* {state.financeModule.show === "detail" && <LaboratoryReportForm />} */}
      {/*   {(state.financeModule.show ==='detail')&& <LabNoteCreate /> } */}

      {/*  <div className="column is-3 "> <LabNoteCreate /> <ReportCreate />
                
                {(state.financeModule.show ==='detail')&&<PatientProfile />}
                </div> */}
    </section>
  );
}

export function LabOrderList({ openReportFormModal }) {
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

  const handleMedicationRow = async (order) => {
    openReportFormModal(true);
    await handleSelectedClient(order.orderInfo.orderObj.client);

    await setSelectedFinance(order);
    // grab report
    // if draft show create/modify
    //if final: show final
    console.log(order);
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
        // 'orderInfo.orderObj.order_category':"Lab Order",
        $or: [
          {
            'orderInfo.orderObj.order_category': 'Lab Order',
          },
          {
            'orderInfo.orderObj.order_category': 'Laboratory',
          },
        ],
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
        $or: [
          {
            'orderInfo.orderObj.order_category': 'Lab Order',
          },
          {
            'orderInfo.orderObj.order_category': 'Laboratory',
          },
        ],
        'participantInfo.billingFacility':
          user?.currentEmployee?.facilityDetail?._id,
        //'orderInfo.orderObj.order_category':"Lab Order",
        // billing_status:"Unpaid",  //need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 1000,
        $sort: {
          createdAt: -1,
        },
      },
    });

    console.log('lab bills', findProductEntry.data);
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
  const handleCreate = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));

    await openReportFormModal(true);
  };

  const labReportSchema = [
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
      validator: yup.string().required("Enter today's date"),
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
      validator: yup.string().required("Enter client's name"),
    },
    {
      name: 'Test',
      key: 'description',
      description: 'Enter test result details',
      selector: (row) => row.orderInfo.orderObj.order,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter details of lab results'),
    },
    {
      name: 'Amount',
      key: 'amount',
      description: 'Enter amount',
      selector: (row) => row.serviceInfo.price,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter amount'),
    },
    {
      name: 'Billing Status',
      key: 'billing_status',
      description: 'Enter Payment Status',
      selector: (row) => row.billing_status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter client payment status'),
    },
    {
      name: 'Report Status',
      key: 'report_status',
      description: 'Select facility',
      selector: (row) => row.report_status,
      sortable: true,
      required: true,
      inputType: 'TEXT',
      validator: yup.string().required('Enter Client Result Status'),
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
              Lab Result
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
            columns={labReportSchema}
            data={facilities}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleMedicationRow}
            progressPending={loading}
          />
        </div>
      </PageWrapper>
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
  //const ClientServ=client.service('labresults')
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const { state, setState } = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState('Draft');
  const ClientServ = client.service('labresults');
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = (obj) => {
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
      ClientServ.create(document)
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result created succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
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
        .then((res) => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: 'Lab Result updated succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch((err) => {
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

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Lab Result</p>
        </div>
        <div className="card-content vscrollable remPad1">
          <label className="label is-size-7">
            Client: {order.orderInfo.orderObj.clientname}
          </label>
          <label className="label is-size-7">
            Test: {order.serviceInfo.name}
          </label>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
