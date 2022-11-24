/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';
import { format, formatDistanceToNowStrict } from 'date-fns';
import DischargeCreate from './DischargeCreate';
import PatientProfile from '../Client/PatientProfile';
import { DischargeOrdersList } from '../Documentation/DischargeOrders';
import { PageWrapper } from './ui-components/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import { WardDischargedPatient } from './schema';
import ModalBox from '../../components/modal';
import ModalHeader from '../Appointment/ui-components/Heading/modalHeader';
import { MdCancel } from 'react-icons/md';
import { Box, Grid } from '@mui/material';
/* import {ProductCreate} from './Products' */
// eslint-disable-next-line
//const searchfacility={};

export default function Discharge() {
  //const {state}=useContext(ObjectContext) //,setState
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const OrderServ = client.service('order');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  console.log(showModal);
  /*  useEffect(() => {
        const updatedOne= state.currentClients.filter(el=>(JSON.stringify(el.client_id)===JSON.stringify(state.DispenseModule.selectedDispense.client_id)))
        console.log("udatedone", updatedOne)
        console.log("state", state.currentClients)
        handleRow(updatedOne)
         return () => {
             
         }
     }, []) */

  return (
    <section className="section remPadTop">
      <DischargeList showModal={showModal} setShowModal={setShowModal} />
      {showModal && (
        <ModalBox
          open={state.DischargeModule.show === 'detail'}
          header
          onClose={() => {
            setShowModal(false),
              setState((prevstate) => ({
                ...prevstate,
                AdmissionModule: {
                  selectedAdmission: {},
                  show: 'list',
                },
              }));
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <DischargeCreate />
            </Grid>
            <Grid item xs={6}>
              <PatientProfile />
            </Grid>
          </Grid>
        </ModalBox>
      )}
    </section>
  );
}

export function DischargeList({ showModal, setShowModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const OrderServ = client.service('order');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedDispense, setSelectedDispense] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [selectedMedication, setSelectedMedication] = useState('');
  const [loading, setLoading] = useState(false);

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

  const handleMedicationRow = async (ProductEntry) => {
    //handle selected single order
    //console.log("b4",state)
    setShowModal(true);
    //console.log("handlerow",ProductEntry)
    await handleSelectedClient(ProductEntry.client);

    await setSelectedMedication(ProductEntry);

    const newProductEntryModule = {
      selectedDischarge: ProductEntry,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DischargeModule: newProductEntryModule,
    }));
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const handleSearch = async (val) => {
    const field = 'name';
    console.log(val);
    OrderServ.find({
      query: {
        $or: [
          {
            order: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            order_status: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            clientname: {
              $regex: val,
              $options: 'i',
            },
          },
        ],
        order_category: 'Discharge Order',
        fulfilled: 'False',
        destination: user.currentEmployee.facilityDetail._id,
        destination_location: state.WardModule.selectedWard._id,
        order_status: 'Pending',
        // storeId:state.StoreModule.selectedStore._id,
        //facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 50,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(async (res) => {
        console.log(res);
        setFacilities(res.groupedOrder);
        // await setState((prevstate)=>({...prevstate, currentClients:res.groupedOrder}))
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
    console.log(user.currentEmployee.facilityDetail._id);
    const findProductEntry = await OrderServ.find({
      query: {
        order_category: 'Discharge Order',
        fulfilled: 'False',
        destination: user.currentEmployee.facilityDetail._id,

        destination_location: state.WardModule.selectedWard._id,
        order_status: 'Pending', // need to set this finally
        //storeId:state.StoreModule.selectedStore._id,
        //clientId:state.ClientModule.selectedClient._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    });

    console.log('updatedorder', findProductEntry.data);
    await setFacilities(findProductEntry.data);
    await setState((prevstate) => ({
      ...prevstate,
      currentClients: findProductEntry.data,
    }));
  };

  //1.consider using props for global data
  useEffect(() => {
    // console.log("started")
    getFacilities();
    OrderServ.on('created', (obj) => getFacilities());
    OrderServ.on('updated', (obj) => getFacilities());
    OrderServ.on('patched', (obj) => getFacilities());
    OrderServ.on('removed', (obj) => getFacilities());
    return () => {};
  }, []);

  const handleRow = async (ProductEntry) => {
    await setSelectedDispense(ProductEntry);

    const newProductEntryModule = {
      selectedDispense: ProductEntry,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  useEffect(() => {
    getFacilities();

    return () => {};
  }, [state.WardModule.selectedWard]);

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
                  <h2
                    style={{
                      marginLeft: '10px',
                      fontSize: '0.95rem',
                      width: '300px',
                    }}
                  >
                    Discharges
                  </h2>
                </div>
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                <CustomTable
                  title={''}
                  columns={WardDischargedPatient}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleMedicationRow}
                  progressPending={loading}
                />
              </div>
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
      {/* <div className="level">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <p className="control has-icons-left  ">
                <DebounceInput
                  className="input is-small "
                  type="text"
                  placeholder="Search Tests"
                  minLength={3}
                  debounceTimeout={400}
                  onChange={e => handleSearch(e.target.value)}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-search"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="level-item">
          {" "}
          <span className="is-size-6 has-text-weight-medium">
            Pending Discharges{" "}
          </span>
        </div>
        <div className="level-right">
                       <div className="level-item"> 
                            <div nclassName="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                        </div> 
                    </div>
      </div>
      <div className=" pullup">
        <div className=" is-fullwidth vscrollable pr-1">
          <table className="table is-striped  is-hoverable is-fullwidth is-scrollable mr-2">
            <thead>
              <tr>
                <th>
                  <abbr title="Serial No">S/No</abbr>
                </th>
                <th>
                  <abbr title="Date">Date</abbr>
                </th>
                <th>
                  <abbr title="Name">Name</abbr>
                </th>
                <th>
                  <abbr title="Order">Dischcharge Order</abbr>
                </th>
                <th>Fulfilled</th>
                <th>
                  <abbr title="Status">Status</abbr>
                </th>
                <th>
                  <abbr title="Requesting Physician">Requesting Physician</abbr>
                </th>
              </tr>
            </thead>
            <tbody>
              {facilities.map((order, i) => (
                <tr
                  key={order._id}
                  onClick={() => handleMedicationRow(order)}
                  className={
                    order._id === (selectedMedication?._id || null)
                      ? "is-selected"
                      : ""
                  }
                >
                  <th>{i + 1}</th>
                  <td>
                    <span>{format(new Date(order.createdAt), "dd-MM-yy")}</span>
                  </td>{" "}
                  {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/>
                  <th>
                    {order.client.firstname} {order.client.lastname}
                  </th>
                  <th>{order.order}</th>
                  <td>{order.fulfilled === "True" ? "Yes" : "No"}</td>
                  <td>{order.order_status}</td>
                  <td>{order.requestingdoctor_Name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
}

export function DispenseDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [selectedMedication, setSelectedMedication] = useState('');
  const [currentOrder, setCurrentOrder] = useState('');
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const ProductEntryServ=client.service('/ProductEntry')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);
  const OrderServ = client.service('order');
  /* const [ProductEntry, setProductEntry] = useState("")
    const [facilities, setFacilities] = useState("") */

  let ProductEntry = state.DispenseModule.selectedDispense;
  //const facilities=ProductEntry.orders

  const handleRow = async (ProductEntry) => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedMedication(ProductEntry);

    const newProductEntryModule = {
      selectedMedication: ProductEntry,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      medicationModule: newProductEntryModule,
    }));
    //console.log(state)
    // ProductEntry.show=!ProductEntry.show
  };

  const handleEdit = async (ProductEntry) => {
    const newProductEntryModule = {
      selectedDispense: ProductEntry,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  useEffect(() => {
    const client1 = state.currentClients.find((el) => {
      return (
        JSON.stringify(el.client_id) ===
        JSON.stringify(state.DispenseModule.selectedDispense)
      );
    });

    setCurrentOrder(client1);
    // console.log(client1)
    return () => {};
  }, []);

  /*  
     const setprod=async()=>{
        await setProductEntry(state.DispenseModule.selectedDispense)
    } */

  useEffect(() => {
    /* OrderServ.on('created', (obj)=>getFacilities())
        OrderServ.on('updated', (obj)=>getFacilities())
       
        OrderServ.on('removed', (obj)=>getFacilities()) */
    OrderServ.on('patched', (obj) => {
      //update state.DispenseModule.selectedDispense
      // console.log(obj.clientId)
      // console.log("currentClients",state.currentClients)
      const current1 = state.currentClients.find(
        (el) => JSON.stringify(el.client_id) === JSON.stringify(obj.clientId)
      );
      setCurrentOrder(current1);
      // console.log("currentone",current1)
    });

    return () => {};
  }, []);

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Dispense Details</p>
        </div>
        <div className="card-content vscrollable">
          {/* {JSON.stringify(ProductEntry.orders,2,10)} */}
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  {/* <th><abbr title="Client Name">Client Name</abbr></th> */}
                  {/* <th><abbr title="Number of Orders"># of Medication</abbr></th> */}
                  <th>
                    <abbr title="Date">Date</abbr>
                  </th>
                  <th>
                    <abbr title="Order">Medication</abbr>
                  </th>
                  <th>Fulfilled</th>
                  <th>
                    <abbr title="Status">Status</abbr>
                  </th>
                  <th>
                    <abbr title="Requesting Physician">
                      Requesting Physician
                    </abbr>
                  </th>

                  {/* <th><abbr title="Actions">Actions</abbr></th> */}
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {state.DispenseModule.selectedDispense.orders.map(
                  (order, i) => (
                    <tr
                      key={order._id}
                      onClick={() => handleRow(order)}
                      className={
                        order._id === (selectedMedication?._id || null)
                          ? 'is-selected'
                          : ''
                      }
                    >
                      <th>{i + 1}</th>
                      {/* <td>{ProductEntry.clientname}</td> 
                                                <td>{ProductEntry.orders.length}</td> */}
                      <td>
                        <span>
                          {format(new Date(order.createdAt), 'dd-MM-yy')}
                        </span>
                      </td>{' '}
                      {/* {formatDistanceToNowStrict(new Date(ProductEntry.createdAt),{addSuffix: true})} <br/> */}
                      <th>{order.order}</th>
                      <td>{order.fulfilled === 'True' ? 'Yes' : 'No'}</td>
                      <td>{order.order_status}</td>
                      <td>{order.requestingdoctor_Name}</td>
                      {/*  <td><span className="showAction"  >...</span></td> */}
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
