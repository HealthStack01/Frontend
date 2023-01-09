/* eslint-disable */

import React, {useState, useContext, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import api from "../../utils/api";
import {DebounceInput} from "react-debounce-input";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {formatDistanceToNowStrict} from "date-fns";
import ClientFinInfo from "./ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
var random = require("random-string-generator");
// import { AppointmentCreate } from "../Clinic/Appointments";
import InfiniteScroll from "react-infinite-scroll-component";
import ClientBilledPrescription from "../Finance/ClientBill";
import ClientGroup from "./ClientGroup";
import DatePicker from "react-datepicker";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from "uuid";
import short from "short-uuid";

import dayjs from "dayjs";

import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {ClientMiniSchema} from "./schema";
import {useForm} from "react-hook-form";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
} from "../app/styles";
import Input from "../../components/inputs/basic/Input";
import {
  Box,
  Portal,
  Grid,
  Button as MuiButton,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import ClientView from "./ClientView";
import ClientForm from "./ClientForm";
import CircleChart from "../dashBoardUiComponent/charts/CircleChart";
import AreaChart from "../dashBoardUiComponent/charts/AreaChart";
import BasicDatePicker from "../../components/inputs/Date";
import CustomSelect from "../../components/inputs/basic/Select";
import {AppointmentCreate} from "./Appointments";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import ClientListDateFilter from "./DateFilter";
import MuiClearDatePicker from "../../components/inputs/Date/MuiClearDatePicker";
import {getBase64} from "../helpers/getBase64";
import {FileUploader} from "react-drag-drop-files";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import axios from "axios";

// eslint-disable-next-line
const searchfacility = {};

export default function Client() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [showModal, setShowModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  const handleShowRegisteredModal = () => {};
  const handleHideRegisteredModal = () => {};

  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-6 ">
          <ClientList
            openCreateModal={() => setCreateModal(true)}
            openDetailModal={handleOpenDetailModal}
          />
        </div>
        <div className="column is-6 ">
          {/* {state.ClientModule.show === 'detail' && <ClientDetail />} */}
          {state.ClientModule.show === "modify" && (
            <ClientModify Client={selectedClient} />
          )}
          <ModalBox
            open={createModal}
            onClose={() => setCreateModal(false)}
            header="Create a New Client/Patient"
          >
            <ClientForm closeModal={() => setCreateModal(false)} />
          </ModalBox>

          <ModalBox
            open={detailModal}
            onClose={() => setDetailModal(false)}
            header="Client Detail"
          >
            <ClientDetail
              closeModal={() => setDetailModal(false)}
              closeDetailModal={() => setDetailModal(false)}
            />
          </ModalBox>
        </div>
      </div>
    </section>
  );
}

export function ClientCreate({open, setOpen}) {
  const [showRegisteredModel, setShowRegisteredModal] = useState(false);

  const {register, handleSubmit} = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
    },
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [facility, setFacility] = useState();
  const ClientServ = client.service("client");
  const mpiServ = client.service("mpi");
  // const { user } = useContext(UserContext);

  // use local storage

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  const [billModal, setBillModal] = useState(false);
  const [patList, setPatList] = useState([]);
  const [dependant, setDependant] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [date, setDate] = useState();

  const submit = (data, e) => {
    e.preventDefault();

    setSuccess(false);

    ClientServ.create(data)
      .then(res => {
        toast({
          message: "Client created succesfully",
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
          message: "Error creating Client, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  // eslint-disable-next-line

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDate = async date => {
    setDate(date);
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, []);

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
  }, []);

  const checkClient = () => {
    const data = getValues();
    data.dob = date;
    const obj = {
      firstname: data.firstname,
      middlename: data.middlename,
      lastname: data.lastname,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
    };
    /* find if there is a match with the paramters entered
          run search if 
            1.phone no alone or  
            2.email alone or 
            3.both is entered
            4. all other 5 parameters
        */
    let query = {};

    if (!!data.phone) {
      query.phone = data.phone;
      checkQuery(query);
    }

    if (!!data.email) {
      query.email = data.email;
      checkQuery(query);
    }

    if (!!data.firstname && !!data.lastname && !!data.gender && !!data.dob) {
      // console.log("simpa")
      data.middlename = data.middlename || "";
      (query.gender = data.gender),
        (query.dob = data.dob),
        (query.$or = [
          {
            firstname: data.firstname,
            lastname: data.lastname,
            middlename: data.middlename,
          },
          {
            firstname: data.firstname,
            lastname: data.middlename,
            middlename: data.lastname,
          },
          {
            firstname: data.middlename,
            lastname: data.lastname,
            middlename: data.firstname,
          },
          {
            firstname: data.middlename,
            lastname: data.firstname,
            middlename: data.lastname,
          },
          {
            firstname: data.lastname,
            lastname: data.firstname,
            middlename: data.middlename,
          },
          {
            firstname: data.lastname,
            lastname: data.middlename,
            middlename: data.firstname,
          },
        ]);
      checkQuery(query);
    }
  };

  const checkQuery = query => {
    setPatList([]);
    if (
      !(
        query &&
        Object.keys(query).length === 0 &&
        query.constructor === Object
      )
    ) {
      ClientServ.find({query: query})

        .then(res => {
          console.log(res);
          if (res.total > 0) {
            // alert(res.total)
            setPatList(res.data);
            setBillModal(true);
            return;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleBill = () => {
    setBillModal(true);
  };

  const handlecloseModal3 = () => {
    setBillModal(false);
  };

  const choosen = async client => {
    //update client with facilities
    /*   if (client.facility !== user.currentEmployee.facilityDetail._id ){ //check taht it is not in list of related facilities
           
        
        //create mpi record
        const newPat = {
            client: client._id,
            facility:user.currentEmployee.facilityDetail._id,
            mrn:client.mrn,
            clientTags:client.clientTags,
            relfacilities:client.relatedfacilites
           }
           await mpiServ.create(newPat)
        } */
    //reset form
    //toast niotification
    //cash payment
  };

  const dupl = client => {
    toast({
      message: "Client previously registered in this facility",
      type: "is-danger",
      dismissible: true,
      pauseOnHover: true,
    });
    reset();
    setPatList([]);
  };

  const reg = async client => {
    if (
      client.relatedfacilities.findIndex(
        el => el.facility === user.currentEmployee.facilityDetail._id
      ) === -1
    ) {
      //create mpi record
      const newPat = {
        client: client._id,
        facility: user.currentEmployee.facilityDetail._id,
        mrn: client.mrn,
        clientTags: client.clientTags,
        relfacilities: client.relatedfacilities,
      };
      //console.log(newPat)
      await mpiServ
        .create(newPat)
        .then(resp => {
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch(err => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    //reset form
    reset();
    setPatList([]);
    //cash payment
  };

  const depen = client => {
    setDependant(true);
  };

  const onSubmit = async (data, e) => {
    setLoading(true);
    if (!date) {
      toast({
        message: "Please enter Date of Birth! ",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });

      return;
    }
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    checkClient();
    if (patList.length > 0) {
      if (!dependant) {
        return;
      }
      //alert("something"+","+ patList.length)
      //let confirm = window.confirm("Is this person a dependant with parent phone number?")
      // setOption(confirm)
      setPatList([]);
    }
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }

    let confirm = window.confirm(
      `You are about to register a new patient ${data.firstname}  ${data.middlename} ${data.lastname} ?`
    );
    if (confirm) {
      data.dob = date;
      await ClientServ.create(data)
        .then(res => {
          //console.log(JSON.stringify(res))
          e.target.reset();
          /*  setMessage("Created Client successfully") */
          setSuccess(true);
          setLoading(false);
          toast({
            message: "Client created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
          setPatList([]);
          setDependant(false);
          setDate();
        })
        .catch(err => {
          toast({
            message: "Error creating Client " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
          setPatList([]);
          setDependant(false);
          setLoading(false);
        });
    }
  };

  const users = [{sn: 1, lastname: "Dupe", firstname: "Ojo", age: 24}];

  const ClientRegisteredSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",

      selector: row => row.sn,
      sortable: true,
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",

      selector: row => row.lastname,
      sortable: true,
      required: true,
    },

    {
      name: "First Name",
      key: "firstname",
      description: "First Name",

      selector: row => row.firstname,
      sortable: true,
      required: true,
    },

    {
      name: "Age",
      key: "age",
      description: "age",

      selector: row => row.age,
      sortable: true,
      required: true,
    },

    {
      name: "Gender",
      key: "gender",
      description: "Gender",

      selector: row => row.gender,
      sortable: true,
      required: true,
    },

    {
      name: "Phome",
      key: "phone",
      description: "phone",

      selector: row => row.phone,
      sortable: true,
      required: true,
    },

    {
      name: "Email",
      key: "email",
      description: "Enter your name",

      selector: row => row.email,
      sortable: true,
      required: true,
    },
    {
      name: "Action",
      cell: row => {
        return (
          <Box sx={{display: "flex", gap: 2}}>
            <Button label="Duplicate" />
            <Button label="Register" />
            <Button label="Dependent" />
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Portal>
        <ModalBox
          open={showRegisteredModel}
          // onClose={handleHideRegisteredModal}
        >
          <div className={`modal ${billModal ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card modalbkgrnd z10">
              <header className="modal-card-head selectadd">
                <p className="modal-card-title redu">
                  Similar Client Already Exist?
                </p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handlecloseModal3}
                ></button>
              </header>
              <section className="modal-card-body">
                <CustomTable
                  title="Clients"
                  columns={ClientRegisteredSchema}
                  data={users}
                />
              </section>
            </div>
          </div>
        </ModalBox>
      </Portal>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Create Client</p>
        </div>
        <div className="card-content vscrollable remPad1">
          {/*  <p className=" is-small">
                    Kindly search Client list before creating new Clients!
                </p> */}
        </div>
      </div>
    </>
  );
}

export function ClientList({openCreateModal, openDetailModal}) {
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
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  const [filterEndDate, setFilterEndDate] = useState(new Date());
  const containerScrollRef = useRef(null);
  // eslint-disable-next-line
  // const { user, setUser } = useContext(UserContext);

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  // end
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(50);
  const [total, setTotal] = useState(0);
  const [selectedUser, setSelectedUser] = useState();
  const [open, setOpen] = useState(false);
  const handleCreateNew = async () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));
    openCreateModal(true);
    //console.log(state)
  };

  const handleCloseModal = () => {
    setOpen(false);
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

    //await setOpen(true);
    openDetailModal();
  };

  const handleSearch = val => {
    // eslint-disable-next-line
    const field = "firstname";
    //console.log(val);
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
            email: {
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

        "relatedfacilities.facility": user.currentEmployee.facilityDetail._id, // || "",
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
    // setState(prev => ({
    //   ...prev,
    //   actionLoader: {open: true},
    // }));
    setLoading(true);
    if (user.currentEmployee) {
      const findClient = await ClientServ.find({
        query: {
          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id,
          $limit: limit,
          $skip: page * limit,
          // createdAt: filterEndDate,
          // createdAt: {
          //   $gt: subDays(filterEndDate, 1),
          //   $lt: addDays(filterEndDate, 1),
          // },
          $sort: {
            createdAt: -1,
          },
        },
      });
      if (page === 0) {
        //console.log(findClient.data);
        await setFacilities(findClient.data);
        setLoading(false);
        // setState(prev => ({
        //   ...prev,
        //   actionLoader: {open: false},
        // }));
      } else {
        await setFacilities(prevstate => prevstate.concat(findClient.data));
        // setState(prev => ({
        //   ...prev,
        //   actionLoader: {open: false},
        // }));
        setLoading(false);
      }

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
        setLoading(false);
        // setState(prev => ({
        //   ...prev,
        //   actionLoader: {open: false},
        // }));
      }
    }
  };

  useEffect(() => {
    if (user) {
      //getFacilities()
      rest();
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
  }, [filterEndDate]);

  const rest = async () => {
    // console.log("starting rest")
    // await setRestful(true)
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    //await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    //  await setRestful(false)
  };

  useEffect(() => {
    //console.log(facilities)
    return () => {};
  }, [facilities]);
  //todo: pagination and vertical scroll bar

  // create user form

  const conditionalRowStyles = [
    {
      when: row => row.alive === false,
      style: {
        backgroundColor: "pink",
        color: "white",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  ];

  const handleOnTableScroll = () => {
    if (containerScrollRef.current) {
      const {scrollTop, scrollHeight, clientHeight} =
        containerScrollRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        // TO SOMETHING HERE
        console.log("Reached bottom");
      }
    }
  };

  return (
    <>
      {user ? (
        <>
          <ModalBox open={open} onClose={handleCloseModal} width="75%">
            <ClientView
              user={selectedClient}
              open={open}
              setOpen={handleCloseModal}
            />
          </ModalBox>

          {/* <ModalBox
            open={dateFilterModal}
            onClose={() => setDateFilterModal(false)}
            header="Filter Client By End Date"
          >
            <ClientListDateFilter
              startDate={filterStartDate}
              setStartDate={setFilterStartDate}
              endDate={filterEndDate}
              setEndDate={setFilterEndDate}
              filterByDate={handleFilterByDate}
            />
          </ModalBox> */}
          {/* 
          <Portal>
            <ClientForm />
          </Portal> */}

          <PageWrapper
            style={{flexDirection: "column", padding: "0.6rem 1rem"}}
          >
            <TableMenu>
              <Box style={{display: "flex", alignItems: "center"}} gap={1}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}

                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  List of Clients
                </h2>

                <Box>
                  <MuiClearDatePicker
                    value={filterEndDate}
                    setValue={setFilterEndDate}
                  />
                  {/* {dateFilter ? (
                    <Box sx={{dispay: "flex"}} gap={1}>
                      <GlobalCustomButton
                        onClick={() => setDateFilterModal(true)}
                        sx={{marginRight: "10px"}}
                      >
                        {dayjs(filterStartDate).format("DD/MM/YYYY")} -{" "}
                        {dayjs(filterEndDate).format("DD/MM/YYYY")}
                      </GlobalCustomButton>

                      <GlobalCustomButton
                        onClick={() => setDateFilter(false)}
                        color="error"
                      >
                        Clear Date Filter
                      </GlobalCustomButton>
                    </Box>
                  ) : (
                    <GlobalCustomButton
                      onClick={() => setDateFilterModal(true)}
                    >
                      Filter by Date
                    </GlobalCustomButton>
                  )} */}
                </Box>
              </Box>
              <GlobalCustomButton onClick={handleCreateNew}>
                <PersonAddIcon fontSize="small" sx={{marginRight: "5px"}} />
                Create New Client
              </GlobalCustomButton>
            </TableMenu>

            <div
              style={{
                width: "100%",
                height: "calc(100vh - 160px)",
                overflow: "auto",
              }}
              ref={containerScrollRef}
              onScroll={handleOnTableScroll}
            >
              <CustomTable
                title={""}
                columns={ClientMiniSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                conditionalRowStyles={conditionalRowStyles}
                progressPending={loading}
                CustomEmptyData={<Typography>No Client Found...</Typography>}
              />
            </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ClientDetail({closeDetailModal}) {
  const navigate = useNavigate();
  // eslint-disable-next-line

  const [error, setError] = useState(false); //,
  const [finacialInfoModal, setFinacialInfoModal] = useState(false);
  const [billingModal, setBillingModal] = useState(false);
  const [billModal, setBillModal] = useState(false);
  const [appointmentModal, setAppointmentModal] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [reactivateConfirm, setReactivateConfirm] = useState(false);
  const [updatingClient, setUpdatingClient] = useState(false);
  // eslint-disable-next-line

  const [message, setMessage] = useState("");
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const [editClient, setEditClient] = useState(false);

  const ClientServ = client.service("client");

  const [success, setSuccess] = useState(false);

  const {register, handleSubmit, setValue, reset, control} = useForm();

  const [anchorEl, setAnchorEl] = useState(null);
  const [imageUploadModal, setImageUploadModal] = useState(false);

  let Client = state.ClientModule.selectedClient;

  console.log(Client);

  // eslint-disable-next-line

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleOpenOptions = event => {
    setAnchorEl(event.currentTarget);
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

  //console.log(Client);

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
    setValue("nok_relationship", Client.nok_relationship, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("nok_phoneno", Client.nok_phoneno, {
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
    setValue("religion", Client.religion, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("maritalstatus", Client.maritalstatus, {
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
  }, []);

  const handleCancel = async () => {
    const newClientModule = {
      selectedClient: Client,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ClientModule: newClientModule,
    }));

    setEditClient(false);
    //console.log(state)
  };

  const changeState = () => {
    const newClientModule = {
      selectedClient: {},
      show: "create",
    };

    setState(prevstate => ({...prevstate, ClientModule: newClientModule}));
  };

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Client._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then(res => {
          reset();

          toast({
            message: "Client deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          toast({
            message: "Error deleting Client, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const handleDeactivateClient = () => {
    setState(prev => ({
      ...prev,
      actionLoader: {open: true, message: "Deactivating Client"},
    }));
    setSuccess(false);

    const newData = {...Client, active: false};

    ClientServ.patch(Client._id, newData)
      .then(res => {
        setConfirmDialog(false);
        setState(prev => ({
          ...prev,
          actionLoader: {open: false, message: ""},
        }));
        toast.success("Client Deactivated succesfully");

        changeState();
        closeDetailModal();
      })
      .catch(err => {
        setState(prev => ({
          ...prev,
          actionLoader: {open: false, message: ""},
        }));
        setConfirmDialog(false);
        toast.error(
          `Error Deactivating Client, probable network issues or ${err}`
        );
      });
  };

  const handleReactivateClient = () => {
    setSuccess(false);
    setState(prev => ({
      ...prev,
      actionLoader: {open: true, message: "Reactivating Client"},
    }));

    const newData = {...Client, active: true};

    ClientServ.patch(Client._id, newData)
      .then(res => {
        setState(prev => ({
          ...prev,
          actionLoader: {open: false, message: ""},
        }));
        setReactivateConfirm(false);
        toast.success("Client Reactivated succesfully");

        changeState();
        closeDetailModal();
      })
      .catch(err => {
        setState(prev => ({
          ...prev,
          actionLoader: {open: false, message: ""},
        }));
        setReactivateConfirm(false);
        toast.error(
          `Error Reactivating Client, probable network issues or ${err}`
        );
      });
  };

  const handleCreateWallet = async () => {
    try {
      const res = await api.post("/register?scheme=4865616c7468737461636b", {
        firstName: Client.firstname,
        lastName: Client.lastname,
        phoneNumber: Client.phone,
        password: `K%${short.generate()}`,
      });
      console.log(res);
      toast.success("Wallet Created Successfully");
      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  };

  const onSubmit = data => {
    // e.preventDefault();
    setUpdatingClient(true);

    setSuccess(false);

    ClientServ.patch(Client._id, data)
      .then(res => {
        setUpdatingClient(false);
        toast.success("Client updated succesfully");
        changeState();
        closeDetailModal();
      })
      .catch(err => {
        setUpdatingClient(false);
        toast.error(`Error updating Client, probable network issues or ${err}`);
      });
  };

  return (
    <>
      <ModalBox
        open={imageUploadModal}
        onClose={() => setImageUploadModal(false)}
        header="Upload Patient Image"
      >
        <UpdateClientPassport
          closeModal={() => setImageUploadModal(false)}
          selectedClient={Client}
        />
      </ModalBox>

      <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        message={`Are you sure you want to Deactivate Client ${Client.firstname} ${Client.middlename} ${Client.lastname}?`}
        type="danger"
        confirmationAction={handleDeactivateClient}
        customActionButtonText="Deactive Client"
      />

      <CustomConfirmationDialog
        open={reactivateConfirm}
        cancelAction={() => setReactivateConfirm(false)}
        message={`Are you sure you want to Reactivate Client ${Client.firstname} ${Client.middlename} ${Client.lastname}?`}
        type="update"
        confirmationAction={handleReactivateClient}
        customActionButtonText="Reactivate Client"
      />
      <Box
        sx={{
          width: "80vw",
          maxHeight: "80vh",
          // overflowY: "auto",
        }}
      >
        {Client.active ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            mb={2}
          >
            <Box>
              <IconButton onClick={handleOpenOptions}>
                <Avatar
                  sx={{width: 68, height: 68}}
                  //src={facility?.facilitylogo}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseOptions}
                anchorOrigin={{horizontal: "right", vertical: "center"}}
              >
                {/* <MenuItem>View Logo</MenuItem> */}
                <MenuItem>Remove Image</MenuItem>
                <MenuItem
                  onClick={() => {
                    setImageUploadModal(true);
                    handleCloseOptions();
                  }}
                >
                  Change Image
                </MenuItem>
              </Menu>
            </Box>

            <Box>
              {!editClient && (
                <GlobalCustomButton
                  text="Edit Details"
                  onClick={() => setEditClient(true)}
                  customStyles={{
                    marginRight: "5px",
                  }}
                  color="success"
                />
              )}
              {(user.currentEmployee?.roles.includes("Client Bill Client") ||
                user.currentEmployee?.roles.length === 0 ||
                user.stacker) && (
                <GlobalCustomButton
                  text="Bill Client"
                  onClick={showBilling}
                  customStyles={{
                    marginRight: "5px",
                  }}
                  color="info"
                />
              )}

              <GlobalCustomButton
                sx={{
                  marginRight: "5px",
                }}
                onClick={handleCreateWallet}
              >
                Create Wallet
              </GlobalCustomButton>

              <GlobalCustomButton
                text="Payment Information"
                onClick={handleFinancialInfo}
                customStyles={{
                  marginRight: "5px",
                }}
                color="secondary"
              />
              <GlobalCustomButton
                text="Schedule Appointment"
                onClick={handleSchedule}
                sx={{
                  marginRight: "5px",
                  backgroundColor: "#ee9b00",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#ee9b00",
                  },
                }}
              />
              <GlobalCustomButton
                text="Attend to Client"
                onClick={() => {
                  navigate("/app/general/documentation");
                }}
                customStyles={{
                  marginRight: "5px",
                }}
                color="success"
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
            mb={2}
          >
            <GlobalCustomButton
              color="success"
              onClick={() => setReactivateConfirm(true)}
            >
              Re-Activate Client
            </GlobalCustomButton>
          </Box>
        )}

        <Box>
          <form>
            <Grid container spacing={1}>
              {(Client.firstname || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    register={register("firstname")}
                    label="First Name"
                    important
                    //defaultValue={Client.firstname}
                    disabled={!editClient}
                  />
                </Grid>
              )}
              {(Client.middlename || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    register={register("middlename")}
                    label="Middle Name"
                    //defaultValue={Client.middlename}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.lastname || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Last Name"
                    important
                    //defaultValue={Client.lastname}
                    register={register("lastname")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.dob || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <MuiCustomDatePicker
                    control={control}
                    label="Date of Birth"
                    name="dob"
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.gender || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <CustomSelect
                    label="Gender"
                    name="gender"
                    control={control}
                    options={[
                      {label: "Male", value: "male"},
                      {label: "Female", value: "female"},
                    ]}
                    disabled={!editClient}
                    //errorText={errors?.gender?.message}
                  />
                </Grid>
              )}

              {(Client.maritalstatus || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <CustomSelect
                    label="Marital Status"
                    name="maritalstatus"
                    control={control}
                    options={[
                      {label: "Single", value: "Single"},
                      {label: "Married", value: "Married"},
                      {label: "Widowed", value: "Widowed"},
                      {
                        label: "Divorced/Seperated",
                        value: "Divorced/Seperated",
                      },
                    ]}
                    disable={!editClient}
                    //errorText={errors?.gender?.message}
                  />
                </Grid>
              )}

              {(Client.mrn || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Medical Record Number"
                    //defaultValue={Client.mrn}
                    register={register("mrn")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.religion || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Religion"
                    //defaultValue={Client.religion}
                    register={register("religion")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.profession || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Profession"
                    //defaultValue={Client.profession}
                    disabled={!editClient}
                    register={register("profession")}
                  />
                </Grid>
              )}

              {(Client.phone || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Phone Number"
                    //defaultValue={Client.phone}
                    disabled={!editClient}
                    register={register("phone")}
                  />
                </Grid>
              )}

              {(Client.email || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Email Address"
                    //defaultValue={Client.email}
                    disabled={!editClient}
                    register={register("email")}
                  />
                </Grid>
              )}

              {(Client.address || editClient) && (
                <Grid item lg={6} xs={8} sm={12}>
                  <Input
                    label="Residential Address"
                    //defaultValue={Client.address}
                    disabled={!editClient}
                    register={register("address")}
                  />
                </Grid>
              )}

              {(Client.city || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Town/City"
                    //defaultValue={Client.city}
                    disabled={!editClient}
                    register={register("city")}
                  />
                </Grid>
              )}

              {(Client.lga || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Local Govt Area"
                    //defaultValue={Client.lga}
                    disabled={!editClient}
                    register={register("lga")}
                  />
                </Grid>
              )}

              {(Client.state || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="State"
                    //defaultValue={Client.state}
                    disabled={!editClient}
                    register={register("state")}
                  />
                </Grid>
              )}

              {(Client.country || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Country"
                    //defaultValue={Client.country}
                    register={register("country")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.bloodgroup || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Blood Group"
                    //defaultValue={Client.bloodgroup}
                    register={register("bloodgroup")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.genotype || editClient) && (
                <Grid item lg={3} md={4} sm={6}>
                  <Input
                    label="Genotype"
                    //defaultValue={Client.genotype}
                    register={register("genotype")}
                    disabled={!editClient}
                  />
                </Grid>
              )}

              {(Client.disabilities || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Disabilities"
                    //defaultValue={Client.disabilities}
                    disabled={!editClient}
                    register={register("disabilities")}
                  />
                </Grid>
              )}

              {(Client.allergies || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Allergies"
                    //defaultValue={Client.allergies}
                    disabled={!editClient}
                    register={register("allergies")}
                  />
                </Grid>
              )}

              {(Client.comorbidities || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Co-mobidities"
                    //defaultValue={Client.comorbidities}
                    disabled={!editClient}
                    register={register("comorbidities")}
                  />
                </Grid>
              )}

              {(Client.clientTags || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Tags"
                    //defaultValue={Client.clientTags}
                    disabled={!editClient}
                    register={register("clientTags")}
                  />
                </Grid>
              )}

              {(Client.specificDetails || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Specific Details about Client"
                    //defaultValue={Client.specificDetails}
                    disabled={!editClient}
                    register={register("specificDetails")}
                  />
                </Grid>
              )}

              {(Client.nok_name || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Next of Kin Fullname"
                    //defaultValue={Client.nok_name}
                    disabled={!editClient}
                    register={register("nok_name")}
                  />
                </Grid>
              )}

              {(Client.nok_phoneno || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Next of Kin Phone Number"
                    //defaultValue={Client.nok_phoneno}
                    disabled={!editClient}
                    register={register("nok_phoneno")}
                  />
                </Grid>
              )}

              {(Client.nok_relationship || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Next of Kin Relationship"
                    //defaultValue={Client.nok_relationship}
                    disabled={!editClient}
                    register={register("nok_relationship")}
                  />
                </Grid>
              )}

              {(Client.nok_email || editClient) && (
                <Grid item lg={4} md={6} sm={12}>
                  <Input
                    label="Next of Kin Email Address"
                    //defaultValue={Client.nok_email}
                    disabled={!editClient}
                    register={register("nok_email")}
                  />
                </Grid>
              )}
            </Grid>
          </form>
        </Box>

        {editClient && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
            mt={2}
            gap={1}
          >
            <GlobalCustomButton
              text="Update Client"
              onClick={handleSubmit(onSubmit)}
              loading={updatingClient}
              customStyles={{
                marginRight: "5px",
              }}
              color="secondary"
            />

            {Client.active ? (
              <GlobalCustomButton
                color="error"
                onClick={() => setConfirmDialog(true)}
              >
                Deactivate Client
              </GlobalCustomButton>
            ) : (
              <GlobalCustomButton
                color="success"
                onClick={() => setReactivateConfirm(true)}
              >
                Re-Activate Client
              </GlobalCustomButton>
            )}

            <GlobalCustomButton
              text="Cancel"
              onClick={handleCancel}
              color="warning"
            />
          </Box>
        )}
      </Box>

      {/* <CustomConfirmationDialog
        open={confirmDialog}
        cancelAction={() => setConfirmDialog(false)}
        confirmAction={handleSubmit(onSubmit)}
        type="update"
      /> */}

      <ModalBox
        open={finacialInfoModal}
        onClose={handlecloseModal}
        header="Financial Information"
      >
        <ClientFinInfo closeModal={handlecloseModal} />
      </ModalBox>

      <ModalBox
        open={billingModal}
        onClose={handlecloseModal1}
        header="Bill Client"
      >
        <BillServiceCreate closeModal={handlecloseModal1} />
      </ModalBox>

      <ModalBox
        open={appointmentModal}
        onClose={handlecloseModal2}
        header="Set Appointment"
      >
        <AppointmentCreate
          closeModal={handlecloseModal2}
          openBill={setBillingModal}
        />
      </ModalBox>

      <ModalBox
        open={billModal}
        onClose={handlecloseModal3}
        header="Set Appointment"
      >
        <ClientBilledPrescription
          selectedClient={Client._id}
          closeModal={handlecloseModal3}
        />
      </ModalBox>
    </>
  );
}

const UploadComponent = ({}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "1px dashed gray",
        cursor: "pointer",
        borderRadius: "7.5px",
      }}
    >
      <FileUploadOutlinedIcon />
      <Typography>Select Logo Image or Drag and Drop here</Typography>
    </Box>
  );
};

export const UpdateClientPassport = ({closeModal, selectedClient}) => {
  const facilityServer = client.service("facility");
  const ClientServ = client.service("client");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const [file, setFile] = useState(null);

  const handleChange = file => {
    //console.log(file);
    //setFile(file);

    getBase64(file)
      .then(res => {
        //console.log(res);
        setFile(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleUploadLogo = async () => {
    if (file === null) return toast.error("Please select an Image to upload");
    showActionLoader();
    const token = localStorage.getItem("feathers-jwt");
    axios
      .post(
        "https://healthstack-backend.herokuapp.com/upload",
        {uri: file},
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(async res => {
        const imageUrl = res.data.url;
        //const employee = user.currentEmployee;

        const newClient = {
          ...selectedClient,
          imageUrl: imageUrl,
        };

        const documentId = selectedClient._id;

        await ClientServ.patch(documentId, newClient)
          .then(res => {
            hideActionLoader();
            toast.success("Patient Image Updated succesfully");
          })
          .catch(err => {
            hideActionLoader();

            toast.error(
              `Error Updating Patient Image, probable network issues or ${err}`
            );
          });
      })
      .catch(error => {
        hideActionLoader();
        toast.error(
          `An error occured whilst updating your Patient Image ${error}`
        );
        console.log(error);
      });
  };

  return (
    <Box sx={{width: "400px", maxHeight: "80vw"}}>
      {file ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={file}
            alt="logo"
            style={{width: "200px", height: "auto", display: "block"}}
          />
        </Box>
      ) : (
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="upload"
          types={["jpeg", "png", "jpg"]}
          children={<UploadComponent />}
        />
      )}

      <Box sx={{display: "flex"}} gap={2} mt={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleUploadLogo} disabled={file === null}>
          Upload Image
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

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
  }, []);

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
                      {...register("firstname")}
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
                      {...register("middlename")}
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
                      {...register("lastname")}
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
                      {...register("dob")}
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
                      {...register("gender")}
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
                      {...register("maritalstatus")}
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
                      {...register("mrn")}
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
                      {...register("religion")}
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
                      {...register("profession")}
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
                      {...register("phone")}
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
                      {...register("email")}
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
                  {...register("address")}
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
                      {...register("city")}
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
                      {...register("lga")}
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
                      {...register("state")}
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
                      {...register("country")}
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
                      {...register("bloodgroup")}
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
                      {...register("genotype")}
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
                      {...register("disabilities")}
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
                      {...register("allergies")}
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
                      {...register("comorbities")}
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
                  {...register("clientTags")}
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
                  {...register("specificDetails")}
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
                      {...register("nok_name")}
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
                      {...register("nok_phoneno")}
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
                      {...register("nok_email")}
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
                      {...register("nok_relationship")}
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
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
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
