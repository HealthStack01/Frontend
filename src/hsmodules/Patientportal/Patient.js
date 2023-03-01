/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict} from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import {AppointmentCreate} from "../Appointment/Appointments";
import InfiniteScroll from "react-infinite-scroll-component";
// eslint-disable-next-line
const searchfacility = {};

export default function Client() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-6 ">
          <ClientList />
        </div>
        <div className="column is-6 ">
          {state.ClientModule.show === "create" && <ClientCreate />}
          {state.ClientModule.show === "detail" && <ClientDetail />}
          {state.ClientModule.show === "modify" && (
            <ClientModify Client={selectedClient} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ClientCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

  // eslint-disable-next-line
  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
        setValue("facility", user.currentEmployee.facilityDetail._id,  {
            shouldValidate: true,
            shouldDirty: true
        })  */
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    ClientServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        toast({
          message: "Client created succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
      })
      .catch(err => {
        toast({
          message: "Error creating Client " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Create Client</p>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*  <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className=" is-small">Names</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {required: true})}
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="middlename"
                      type="text"
                      placeholder="Middle Name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {required: true})}
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                    />
                    <span className="icon is-small is-left">
                      <i className=" fas fa-user-md "></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className=" is-small">Biodata</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {required: true})}
                      name="dob"
                      type="text"
                      placeholder="Date of Birth"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="gender"
                      type="text"
                      placeholder="Gender"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="maritalstatus"
                      type="text"
                      placeholder="Marital Status"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="mrn"
                      type="text"
                      placeholder="Medical Records Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="religion"
                      type="text"
                      placeholder="Religion"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="profession"
                      type="text"
                      placeholder="Profession"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small is-danger"
                      {...register("x", {required: true})}
                      name="phone"
                      type="text"
                      placeholder=" Phone No"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-phone-alt"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small "
                      {...register("x")}
                      name="email"
                      type="email"
                      placeholder="Email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="clientTags"
                  type="text"
                  placeholder="Tags"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <p className=" is-small">Address</p>
            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="address"
                  type="text"
                  placeholder="Residential Address"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="city"
                      type="text"
                      placeholder="Town/City"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lga"
                      type="text"
                      placeholder="Local Govt Area"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="state"
                      type="text"
                      placeholder="State"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="country"
                      type="text"
                      placeholder="Country"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <p className=" is-small">Medical Data</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="bloodgroup"
                      type="text"
                      placeholder="Blood Group"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="genotype"
                      type="text"
                      placeholder="Genotype"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="allergies"
                      type="text"
                      placeholder="Allergies"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="comorbidities"
                      type="text"
                      placeholder="Co-mobidities"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input is-small"
                  {...register("x")}
                  name="specificDetails"
                  type="text"
                  placeholder="Specific Details about patient"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <p className=" is-small">Next of Kin Information</p>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_name"
                      type="text"
                      placeholder="Next of Kin Full Name"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_phoneno"
                      type="text"
                      placeholder="Next of Kin Phone Number"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_email"
                      type="email"
                      placeholder="Next of Kin Email"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_relationship"
                      type="text"
                      placeholder="Next of Kin Relationship"
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field  is-grouped mt-2">
              <p className="control">
                <button type="submit" className="button is-success is-small">
                  Save
                </button>
              </p>
              <p className="control">
                <button
                  className="button is-warning is-small"
                  onClick={e => e.target.reset()}
                >
                  Cancel
                </button>
              </p>
              {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export function ClientList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const handleRow = async Client => {
    await setSelectedClient(Client);
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
  };

  const handleSearch = val => {
    // eslint-disable-next-line
    const field = "firstname";
    console.log(val);
    ClientServ.find({
      query: {
        $or: [
          {
            firstname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            lastname: {
              $regex: val,
              $options: "i",
            },
          },
          {
            middlename: {
              $regex: val,
              $options: "i",
            },
          },
          {
            phone: {
              $regex: val,
              $options: "i",
            },
          },
          {
            clientTags: {
              $regex: val,
              $options: "i",
            },
          },
          {
            mrn: {
              $regex: val,
              $options: "i",
            },
          },
          {
            specificDetails: {
              $regex: val,
              $options: "i",
            },
          },
          {gender: val},
        ],

        facility: user.currentEmployee.facilityDetail._id, // || "",
        $limit: limit,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findClient = await ClientServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: limit,
          $skip: page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(prevstate => prevstate.concat(findClient.data));
      await setTotal(findClient.total);
      //console.log(user.currentEmployee.facilityDetail._id, state)
      //console.log(facilities)
      setPage(page => page + 1);
    } else {
      if (user.stacker) {
        const findClient = await ClientServ.find({
          query: {
            $limit: 20,
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
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
    }
    ClientServ.on("created", obj => rest());
    ClientServ.on("updated", obj => rest());
    ClientServ.on("patched", obj => rest());
    ClientServ.on("removed", obj => rest());
    return () => {};
    // eslint-disable-next-line
  }, []);
  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };
  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Clients"
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
                List of Clients{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-container pullup  vscrola" id="scrollableDiv">
            <InfiniteScroll
              dataLength={facilities.length}
              next={getFacilities}
              hasMore={total > facilities.length}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    <th>
                      <abbr title="Last Name">Last Name</abbr>
                    </th>
                    <th>First Name</th>
                    <th>
                      <abbr title="Middle Name">Middle Name</abbr>
                    </th>
                    <th>
                      <abbr title="Age">Age</abbr>
                    </th>
                    <th>
                      <abbr title="Gender">Gender</abbr>
                    </th>
                    <th>
                      <abbr title="Phone">Phone</abbr>
                    </th>
                    <th>
                      <abbr title="Email">Email</abbr>
                    </th>
                    <th>
                      <abbr title="Tags">Tags</abbr>
                    </th>
                    <th>
                      <abbr title="Actions">Actions</abbr>
                    </th>
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {facilities.map((Client, i) => (
                    <tr
                      key={Client._id}
                      onClick={() => handleRow(Client)}
                      className={
                        Client._id === (selectedClient?._id || null)
                          ? "is-selected"
                          : ""
                      }
                    >
                      <td>{i + 1}</td>
                      <th>{Client.lastname}</th>
                      <td>{Client.firstname}</td>
                      <td>{Client.middlename}</td>
                      <td>
                        {Client.dob && (
                          <>{formatDistanceToNowStrict(new Date(Client.dob))}</>
                        )}
                      </td>
                      <td>{Client.gender}</td>
                      <td>{Client.phone}</td>
                      <td>{Client.email}</td>
                      <td>{Client.clientTags}</td>
                      <td>
                        <span className="showAction">...</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClientDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const navigate = useNavigate();
  // eslint-disable-next-line

  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ClientServ=client.service('/Client')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Client = state.ClientModule.selectedClient;
  // eslint-disable-next-line
  const client = Client;
  const handleEdit = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const handleFinancialInfo = () => {
    setFinacialInfoModal(true);
  };
  const handlecloseModal = () => {
    setFinacialInfoModal(false);
  };

  const handlecloseModal1 = () => {
    setBillingModal(false);
  };

  const handlecloseModal2 = () => {
    setAppointmentModal(false);
  };

  const showBilling = () => {
    setBillingModal(true);
    //navigate('/app/finance/billservice')
  };

  const handleSchedule = () => {
    setAppointmentModal(true);
  };
  const handleBill = () => {
    setBillModal(true);
  };
  const handlecloseModal3 = () => {
    setBillModal(false);
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details</p>
          <button
            className="button is-success is-small btnheight mt-2"
            onClick={showBilling}
          >
            Bill Client
          </button>
        </div>
        <div className="card-content vscrollable">
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.firstname && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0 "
                      name="firstname"
                      type="text"
                    >
                      First Name{" "}
                    </label>
                    <label className="is-size-7 my-0 ">
                      {Client.firstname}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-hospital"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.middlename && (
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label
                      className="label is-size-7 my-0"
                      name="middlename"
                      type="text"
                    >
                      {" "}
                      Middle Name{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.middlename}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-map-signs"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lastname && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lastname"
                      type="text"
                    >
                      Last Name
                    </label>
                    <label className="is-size-7 my-0">{Client.lastname}</label>
                    <span className="icon is-small is-left">
                      <i className=" nop-user-md "></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.dob && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="dob"
                      type="text"
                    >
                      Date of Birth{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {new Date(Client.dob).toLocaleDateString("en-GB")}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.gender && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="gender"
                      type="text"
                    >
                      Gender{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.gender}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.maritalstatus && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="maritalstatus"
                      type="text"
                    >
                      Marital Status{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.maritalstatus}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.mrn && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="mrn"
                      type="text"
                    >
                      Medical Records Number{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.mrn}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.religion && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="religion"
                      type="text"
                    >
                      Religion{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.religion}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.profession && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="profession"
                      type="text"
                    >
                      Profession{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.profession}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.phone && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="phone"
                      type="text"
                    >
                      {" "}
                      Phone No
                    </label>
                    <label className="is-size-7 my-0">{Client.phone}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-phone-alt"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="email"
                      type="email"
                    >
                      Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {Client.address && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="address"
                  type="text"
                >
                  Residential Address{" "}
                </label>
                <label className="is-size-7 my-0">{Client.address}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.city && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="city"
                      type="text"
                    >
                      Town/City{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.city}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.lga && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="lga"
                      type="text"
                    >
                      Local Govt Area{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.lga}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.state && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="state"
                      type="text"
                    >
                      State{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.state}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.country && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="country"
                      type="text"
                    >
                      Country{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.country}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.bloodgroup && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="bloodgroup"
                      type="text"
                    >
                      Blood Group{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.bloodgroup}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}

              {Client.genotype && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="genotype"
                      type="text"
                    >
                      Genotype{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.genotype}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.disabilities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="disabilities"
                      type="text"
                    >
                      Disabilities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.disabilities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-body">
              {Client.allergies && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="allergies"
                      type="text"
                    >
                      Allergies{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.allergies}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.comorbidities && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="comorbidities"
                      type="text"
                    >
                      Co-mobidities{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.comorbidities}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          {Client.clientTags && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="clientTags"
                  type="text"
                >
                  Tags{" "}
                </label>
                <label className="is-size-7 my-0">{Client.clientTags}</label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          {Client.specificDetails && (
            <div className="field">
              <p className="control has-icons-left">
                <label
                  className="label is-size-7 my-0"
                  name="specificDetails"
                  type="text"
                >
                  Specific Details about Client{" "}
                </label>
                <label className="is-size-7 my-0">
                  {Client.specificDetails}
                </label>
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
          )}
          <div className="field is-horizontal">
            <div className="field-body">
              {Client.nok_name && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_name"
                      type="text"
                    >
                      Next of Kin Full Name
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_name}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_phoneno && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_phoneno"
                      type="text"
                    >
                      Next of Kin Phone Number
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_phoneno}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_email && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_email"
                      type="email"
                    >
                      Next of Kin Email{" "}
                    </label>
                    <label className="is-size-7 my-0">{Client.nok_email}</label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
              {Client.nok_relationship && (
                <div className="field">
                  <p className="control has-icons-left">
                    <label
                      className="label is-size-7 my-0"
                      name="nok_relationship"
                      type="text"
                    >
                      Next of Kin Relationship"{" "}
                    </label>
                    <label className="is-size-7 my-0">
                      {Client.nok_relationship}
                    </label>
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="field is-grouped  mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit Details
              </button>
            </p>
            <p className="control">
              <button
                className="button is-info is-small"
                onClick={handleFinancialInfo}
              >
                Financial Info
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleSchedule}
              >
                Schedule appointment
              </button>
            </p>
            {/*  <p className="control">
                    <button className="button is-danger is-small" >
                        Check into Clinic 
                    </button>
                </p> */}
            <p className="control">
              <button
                className="button is-link is-small"
                onClick={() => {
                  navigate("/app/clinic/encounter");
                }}
              >
                Attend to Client
              </button>
            </p>
          </div>
        </div>
      </div>
      <div className={`modal ${finacialInfoModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Financial Information</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientFinInfo closeModal={handlecloseModal} />
          </section>
          {/* <footer className="modal-card-foot">
                <button className="button is-success">Save changes</button>
                <button className="button">Cancel</button>
                </footer> */}
        </div>
      </div>

      <div className={`modal ${billingModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Bill Client</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal1}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <BillServiceCreate closeModal={handlecloseModal1} />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
      <div className={`modal ${appointmentModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Set Appointment</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal2}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <AppointmentCreate closeModal={handlecloseModal2} />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
      <div className={`modal ${billModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Set Appointment</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal3}
            ></button>
          </header>
          <section className="modal-card-body">
            {/* <StoreList standalone="true" /> */}
            <ClientBilledPrescription
              selectedClient={Client._id}
              closeModal={handlecloseModal3}
            />
          </section>
          {/* <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                    </footer> */}
        </div>
      </div>
    </>
  );
}

export function ClientModify() {
  const {register, handleSubmit, setValue, reset} = useForm(); //watch, errors,, errors
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ClientServ = client.service("client");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Client = state.ClientModule.selectedClient;

  useEffect(() => {
    setValue("firstname", Client.firstname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("middlename", Client.middlename, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lastname", Client.lastname, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("phone", Client.phone, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("email", Client.email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("dob", Client.dob, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("gender", Client.gender, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("profession", Client.profession, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("address", Client.address, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("city", Client.city, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("state", Client.state, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("country", Client.country, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_name", Client.nok_name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_email", Client.nok_email, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_phoneno", Client.nokphoneno, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("lga", Client.lga, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("bloodgroup", Client.bloodgroup, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("genotype", Client.genotype, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("disabilities", Client.disabilities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("specificDetails", Client.specificDetails, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("clientTags", Client.clientTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("mrn", Client.mrn, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("comorbidities", Client.comorbidities, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("allergies", Client.allergies, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClientModule}));
  };
  // eslint-disable-next-line
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Client successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Client deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Client, probable network issues "+ err )
          // setError(true)
          toast({
            message: "Error deleting Client, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    //  data.facility=Client.facility
    //console.log(data);

    ClientServ.patch(Client._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Client successfully")
        toast({
          message: "Client updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Client, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Client, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Client Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label className="label is-size-7">First Name </label>{" "}
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="firstname"
                      type="text"
                      placeholder="First Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-hospital"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left has-icons-right">
                    <label className="label is-size-7"> Middle Name </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="middlename"
                      type="text"
                      placeholder="Middle Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-map-signs"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Last Name</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lastname"
                      type="text"
                      placeholder="Last Name "
                    />
                    <span className="icon is-small is-left">
                      <i className=" nop-user-md "></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Date of Birth </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="dob"
                      type="text"
                      placeholder="Date of Birth "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Gender </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="gender"
                      type="text"
                      placeholder="Gender  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Marital Status </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="maritalstatus"
                      type="text"
                      placeholder="Marital Status  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Records Number </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="mrn"
                      type="text"
                      placeholder="Records Number  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Religion</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="religion"
                      type="text"
                      placeholder="Religion "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Profession </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="profession"
                      type="text"
                      placeholder="Profession"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Phone No</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="phone"
                      type="text"
                      placeholder=" Phone No "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-phone-alt"></i>
                    </span>
                  </p>
                </div>

                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Email </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="email"
                      type="email"
                      placeholder="Email  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">Residential Address </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="address"
                  type="text"
                  placeholder="Residential Address  "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Town/City </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="city"
                      type="text"
                      placeholder="Town/City  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Local Govt Area </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="lga"
                      type="text"
                      placeholder="Local Govt Area  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">State </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="state"
                      type="text"
                      placeholder="State"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Country </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="country"
                      type="text"
                      placeholder="Country  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Blood Group </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="bloodgroup"
                      type="text"
                      placeholder="Blood Group "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Genotype </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="genotype"
                      type="text"
                      placeholder="Genotype "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Disabilities </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="disabilities"
                      type="text"
                      placeholder="Disabilities  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Allergies </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="allergies"
                      type="text"
                      placeholder="Allergies  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Co-mobidities </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="comorbidities"
                      type="text"
                      placeholder="Co-mobidities "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">Tags </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="clientTags"
                  type="text"
                  placeholder="Tags "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field">
              <p className="control has-icons-left">
                <label className="label is-size-7">
                  Specific Details about client{" "}
                </label>
                <input
                  className="input is-small"
                  {...register("x")}
                  name="specificDetails"
                  type="text"
                  placeholder="Specific Details about client "
                />
                <span className="icon is-small is-left">
                  <i className="nop-envelope"></i>
                </span>
              </p>
            </div>
            <div className="field is-horizontal">
              <div className="field-body">
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">
                      Next of Kin Full Name
                    </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_name"
                      type="text"
                      placeholder="Next of Kin Full Name "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">Phone Number</label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_phoneno"
                      type="text"
                      placeholder=" "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-clinic-medical"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7">
                      Next of Kin Email{" "}
                    </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_email"
                      type="email"
                      placeholder="Next of Kin Email  "
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control has-icons-left">
                    <label className="label is-size-7"> Relationship </label>
                    <input
                      className="input is-small"
                      {...register("x")}
                      name="nok_relationship"
                      type="text"
                      placeholder="Next of Kin Relationship"
                    />
                    <span className="icon is-small is-left">
                      <i className="nop-envelope"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function InputSearch({getSearchfacility, clear}) {
  const ClientServ = client.service("client");
  // const facilityServ=client.service('facility')
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      ClientServ.find({
        query: {
          //service
          [field]: {
            $regex: val,
            $options: "i",
          },
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(res => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
