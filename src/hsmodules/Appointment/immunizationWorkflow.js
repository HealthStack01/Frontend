import React, { useState, useContext, useEffect, useRef } from 'react';
import { Route, Switch, Link, NavLink } from 'react-router-dom';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'react-toastify';
import { formatDistanceToNowStrict, format, subDays, addDays } from 'date-fns';
import DatePicker from 'react-datepicker';
import LocationSearch from '../helpers/LocationSearch';
import EmployeeSearch from '../helpers/EmployeeSearch';
import BillServiceCreate from '../Finance/BillServiceCreate';
import 'react-datepicker/dist/react-datepicker.css';
import { PageWrapper } from '../../ui/styled/styles';
import { TableMenu } from '../../ui/styled/global';
import FilterMenu from '../../components/utilities/FilterMenu';
import Button from '../../components/buttons/Button';
import CustomTable from '../../components/customtable';
import { AppointmentSchema } from '../Clinic/schema';
import { CustomButton } from '../../components/buttons/Button/base/styles';
import ModalBox from '../../components/modal';
import ModalHeader from './ui-components/Heading/modalHeader';
import { Box, Grid } from '@mui/material';
import DebouncedInput from '../Appointment/ui-components/inputs/DebouncedInput';
import { MdCancel } from 'react-icons/md';
import GlobalCustomButton from '../../components/buttons/CustomButton';
import Input from '../../components/inputs/basic/Input';
import BasicDateTimePicker from '../../components/inputs/DateTime';

export default function ImmunizationCheckIn() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [checkinpage, setCheckinpage] = useState('checkin');
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="section remPadTop">
      {checkinpage === 'checkin' && (
        <CheckIn
          pageView={checkinpage}
          setPageView={setCheckinpage}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {checkinpage === 'checkout' && (
        <CheckOut
          pageView={checkinpage}
          setPageView={setCheckinpage}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
      {showModal && (
        <ModalBox
          open={state.AppointmentModule.show === 'detail'}
          onClose={() => setShowModal(false)}
          header={
            checkinpage === 'checkin' ? 'Check In Details' : 'Check Out Details'
          }
        >
          <CheckDetails checkState={checkinpage} />
        </ModalBox>
      )}
    </section>
  );
}

export function CheckIn({ pageView, setPageView, showModal, setShowModal }) {
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
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);

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
  };

  const handleRow = async (Client) => {
    setShowModal(true);
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
      appointment_status: 'Checked In',
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
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        appointment_status: 'Checked In',
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== 'Front Desk') {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
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
  console.log(pageView, facilities);
  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
            >
              <TableMenu>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',

                    width: '100%',
                  }}
                >
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                    Checked In Clients
                  </h2>

                  <GlobalCustomButton
                    text={pageView === 'checkin' ? 'Check Out' : 'Check In'}
                    onClick={() => setPageView('checkout')}
                    customStyles={{
                      float: 'right',
                      marginLeft: 'auto',
                    }}
                  />
                </div>
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                <CustomTable
                  title={''}
                  columns={AppointmentSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
                />
              </div>
            </PageWrapper>
          </div>
          {/* <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Appointments"
                      minLength={3}
                      debounceTimeout={400}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>

              <div className="level-item">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => handleDate(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Filter By Date"
                  isClearable
                />
                <input name="filter_time"  ref={register ({ required: true })}  type="datetime-local" />
              </div>
            </div>
            <div className="level-item">
              {' '}
              <span className="is-size-6 has-text-weight-medium">
                Checked In Clients{' '}
              </span>
            </div>
            <div className="level-right">
                             <div className="level-item"> 
                                 <div className="level-item"><div className="button is-success is-small" onClick={handleCreateNew}>New</div></div>
                             </div>
                         </div>
          </div>
          <div className="table-container pullup ">
            <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
              <thead>
                <tr>
                  <th>
                    <abbr title="Serial No">S/No</abbr>
                  </th>
                  <th>
                    <abbr title="Time">Date/Time</abbr>
                  </th>
                  <th>First Name</th>
                  <th>
                    <abbr title="Last Name">Last Name</abbr>
                  </th>
                  <th>
                    <abbr title="Class">Classification</abbr>
                  </th>
                  <th>
                    <abbr title="Location">Location</abbr>
                  </th>
                  <th><abbr title="Phone">Phone</abbr></th>
                  
                  <th>
                    <abbr title="Type">Type</abbr>
                  </th>
                  <th>
                    <abbr title="Status">Status</abbr>
                  </th>
                  <th>
                    <abbr title="Reason">Reason</abbr>
                  </th>
                  <th>
                    <abbr title="Practitioner">Practitioner</abbr>
                  </th>
                  <th><abbr title="Actions">Actions</abbr></th>
                </tr>
              </thead>
              <tfoot></tfoot>
              <tbody>
                {facilities.map((Client, i) => (
                  <tr
                    key={Client._id}
                    onClick={() => handleRow(Client)}
                    className={
                      Client._id === (selectedAppointment?._id || null)
                        ? 'is-selected'
                        : ''
                    }
                  >
                    <th>{i + 1}</th>
                    <td>
                      <strong>
                        {format(
                          new Date(Client.start_time),
                          'dd-MM-yy HH:mm:ss'
                        )}
                      </strong>
                    </td>
                    <th>{Client.firstname}</th>
                    <td>{Client.middlename}</td>
                    <td>{Client.lastname}</td>
                     < td>{formatDistanceToNowStrict(new Date(Client.dob))}</td>
                     <td>{Client.gender}</td>
                     <td>{Client.phone}</td>
                    <td>{Client.appointmentClass}</td>
                    <td>
                      {Client.location_name} {Client.location_type}
                    </td>
                    <td>{Client.appointment_type}</td>
                    <td>{Client.appointment_status}</td>
                    <td>{Client.appointment_reason}</td>
                    <td>{Client.practitioner_name}</td>
                    <td><span   className="showAction"  >...</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
export function CheckOut({ pageView, setPageView, showModal, setShowModal }) {
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
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
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
  };

  const handleRow = async (Client) => {
    setShowModal(true);
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
      appointment_status: 'Checked Out',

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
    if (user.currentEmployee) {
      let stuff = {
        facility: user.currentEmployee.facilityDetail._id,
        appointment_status: 'Checked Out',
        // locationId:state.employeeLocation.locationId,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      // if (state.employeeLocation.locationType !== 'Front Desk') {
      //   stuff.locationId = state.employeeLocation.locationId;
      // }

      const findClient = await ClientServ.find({ query: stuff });

      await setFacilities(findClient.data);
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
    // if (state.employeeLocation.locationType !== 'Front Desk') {
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

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{
                flexDirection: 'column',
                padding: '0.6rem 1rem',
              }}
            >
              <TableMenu>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                    Checked Out Clients
                  </h2>
                  <GlobalCustomButton
                    text={pageView === 'checkin' ? 'Check Out' : 'Check In'}
                    onClick={() => setPageView('checkin')}
                    customStyles={{
                      float: 'right',
                      marginLeft: 'auto',
                    }}
                  />
                </div>
              </TableMenu>
              <div style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                <CustomTable
                  title={''}
                  columns={AppointmentSchema}
                  data={facilities}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
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
export function CheckDetails({ checkState }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [edit, setEdit] = useState(false);

  const Client = state.AppointmentModule.selectedAppointment;
  //const client=Client
  const handleEdit = async () => {
    const newClientModule = {
      selectedAppointment: Client,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    setEdit(true);
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'right',
        }}
        mb={2}
      >
        {/* <GlobalCustomButton
          onClick={handleEdit}
          text="Edit Appointment Details"
          customStyles={{
            marginRight: '5px',
          }}
        /> */}
      </Box>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="First Name"
            value={Client?.firstname}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Middle Name"
            value={Client?.middlename}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Last Name"
            value={Client?.lastname}
            disabled={edit ? false : true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Age"
            value={formatDistanceToNowStrict(new Date(Client.dob))}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Gender"
            value={Client.gender}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Phone Number"
            value={Client?.phone}
            disabled={edit ? false : true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} my={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Email"
            value={Client?.email}
            disabled={edit ? false : true}
          />
        </Grid>
      </Grid>
      <hr />
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Start Date"
            value={format(new Date(Client.start_time), 'dd/MM/yyyy HH:mm')}
            disabled={edit ? false : true}
          />
        </Grid>
        {checkState === 'checkout' && (
          <Grid item xs={12} md={4}>
            <Input
              label="End Date"
              value={format(new Date(Client?.updatedAt), 'dd/MM/yyyy HH:mm')}
              disabled={edit ? false : true}
            />
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          <Input
            label="Location"
            value={Client?.location_name}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Professional"
            value={`  ${Client.practitioner_name} (${Client.practitioner_profession})`}
            disabled={edit ? false : true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Status"
            value={Client?.appointment_status}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Class"
            value={Client?.appointmentClass}
            disabled={edit ? false : true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Input
            label="Appointment Type"
            value={Client?.appointment_type}
            disabled={edit ? false : true}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={1}>
        <Grid item xs={12} md={12}>
          <label className="label" htmlFor="appointment_reason">
            Reason for Appointment
          </label>
          <textarea
            className="input is-small"
            name="appointment_reason"
            value={Client?.appointment_reason}
            disabled={edit ? false : true}
            type="text"
            placeholder="Appointment Reason"
            rows="3"
            cols="50"
            style={{
              border: '1px solid #b6b6b6',
              borderRadius: '4px',
              color: ' #979DAC',
              width: '100%',
            }}
          >
            {' '}
          </textarea>
        </Grid>
        <Grid item xs={12} md={12}>
          {!edit && (
            <GlobalCustomButton text="Edit" onClick={() => setEdit(true)} />
          )}
          {edit && (
            <GlobalCustomButton text="Save" onClick={() => handleEdit()} />
          )}
        </Grid>
      </Grid>
    </>
  );
}
