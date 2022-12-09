/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom"; //Route, Switch,Link, NavLink,
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict} from "date-fns";
import ClientFinInfo from "../Client/ClientFinInfo";
import BillServiceCreate from "../Finance/BillServiceCreate";
import {AppointmentCreate} from "../Clinic/Appointments";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ClientBilledPrescription from "../Finance/ClientBill";
import "react-datepicker/dist/react-datepicker.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import {useForm} from "react-hook-form";
import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridWrapper,
  HeadWrapper,
} from "../app/styles";
import Input from "../../components/inputs/basic/Input";
import {Box, Portal, Button as MuiButton, Avatar} from "@mui/material";
import CustomTable from "../../components/customtable";
import ModalBox from "../../components/modal";
import "./../Complaints/complaint.css";
import ComplaintCreates from "../../hsmodules/ManagedCare/components/ComplaintCreates";

const searchfacility = {};

export default function Complaints() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [showModal, setShowModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  //const [showState,setShowState]=useState() //create|modify|detail
  const handleShowModal = () => {
    setShowModal(true);
    console.log("Show Modal");
  };

  const handleHideModal = () => {
    setShowModal(false);
  };
  const handleShowRegisteredModal = () => {};
  const handleHideRegisteredModal = () => {};

  return (
    <section className="section remPadTop">
      <div className="columns ">
        <div className="column is-6 ">
          {/* <ComplaintList showModal={handleShowModal} /> */}
          <ComplaintList openCreateModal={() => setCreateModal(true)} />
          <ComplaintDetail />
        </div>
        <div className="column is-6 ">
          {state.ClientModule.show === "detail" && <ComplaintDetail />}
          {state.ClientModule.show === "modify" && (
            <ComplaintModify Client={selectedClient} />
          )}
          <ModalBox
            open={createModal}
            onClose={() => setCreateModal(false)}
            header="New Complaint"
          >
            <ComplaintCreates closeModal={() => setCreateModal(false)} />
          </ModalBox>

          {/* <ModalBox open={showModal} setOpen={handleHideModal}>
            <ClientForm open={showModal} setOpen={handleHideModal} />
          </ModalBox> */}
        </div>
      </div>
    </section>
  );
}

export function ComplaintCreate({show, setShowModal}) {
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
                  onRowClicked={handleRow}
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

export function ComplaintList({openCreateModal}) {
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

  console.log("Users", user);
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

  const handleRowClicked = row => {
    setSelectedUser(row);
    setOpen(true);
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

    await setOpen(true);
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
    if (user.currentEmployee) {
      const findClient = await ClientServ.find({
        query: {
          "relatedfacilities.facility": user.currentEmployee.facilityDetail._id,
          $limit: limit,
          $skip: page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });
      if (page === 0) {
        await setFacilities(findClient.data);
      } else {
        await setFacilities(prevstate => prevstate.concat(findClient.data));
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

  // create user form
  const dummyComplaints = [
    {
      id: 0,
      name: "Teejay Teko",
      category: "Medic care",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      status: "Pending",
      date: "27-10-21",
    },
    {
      id: 1,
      name: "Teejay Teko",
      category: "Medic care",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      status: "Resolved",
      date: "27-10-21",
    },
    {
      id: 2,
      name: "Teejay Teko",
      category: "Medic care",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      status: "Pending",
      date: "27-10-21",
    },
    {
      id: 3,
      name: "Teejay Teko",
      category: "Medic care",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
      status: "Resolved",
      date: "27-10-21",
    },
  ];
  const navigate = useNavigate();

  return (
    <>
      {/* {user ? (
        <>
          <ModalBox open={open} onClose={handleCloseModal}>
            <ClientView
              user={selectedClient}
              open={open}
              setOpen={handleCloseModal}
            />
          </ModalBox>
          <Portal>
            <ClientForm />
          </Portal>
        </>
      ) : (
        <div>loading</div>
      )} */}
      <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
              Complaints List
            </h2>
          </div>

          {handleCreateNew && (
            <MuiButton
              variant="contained"
              sx={{
                width: "fit",
                textTransform: "capitalize",
                fontSize: "14px",
                fontWeight: "600",
              }}
              onClick={openCreateModal}
            >
              <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
             Add New Complaint
            </MuiButton>
          )}
        </TableMenu>

        <div
          style={{
            width: "80%",
            // height: 'calc(100vh - 90px)',
            height: "450px",
            overflow: "auto",
            margin: "0 auto",
          }}
        >
          {/* <CustomTable
                title={''}
                columns={ClientMiniSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              /> */}
          {dummyComplaints.map(data => (
             <Card sx={{ maxWidth: "100%",overflow: 'auto', margin:"2rem",boxShadow:'5px 5px 5px 5px rgba(0,0,0,0.12)'}} key={data.id} onClick={() => navigate("/app/complaints/detailComplaints")}>
             <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent:"space-between" }}>
                 <CardHeader
             avatar={
               <Avatar src="/img_avatar.png" alt=""  aria-label="recipe"/>
             }
             fontSize="16px" fontWeight="bold"
             title={
               <Typography variant="h1" fontSize="16px" fontWeight="bold" color="text.secondary">
                 {data.name}
             </Typography>
             }
             
             />
             <CardContent>
 
             <Typography variant="h1" fontSize="16px" fontWeight="bold" color="text.secondary">
             Category: {data.category}
             </Typography>
             <Typography style={{color: data.status == 'Pending' ? "#17935C" : "#F1A153", fontWeight: 700, margin: '0.5rem'}} variant="p">
               {data.status}
             </Typography>
             </CardContent>
             </Box>
            
 
             <CardContent>
             <Typography  variant="body2" fontSize="14px" color="black">
                {data.description}
             </Typography>
             </CardContent>
             <CardContent>
             <Typography variant="h1" fontSize="12px" fontWeight="bold" color="text.secondary">
                {data.date}
             </Typography>
             </CardContent>
             
             </Card>
          ))}
        </div>
      </PageWrapper>
    </>
  );
}

export function ComplaintDetail() {
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
  const {user, setUser} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  let Client = state.ClientModule.selectedClient;
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

  /*  useEffect(() => {
        Client =state.ClientModule.selectedClient
        return () => {
           
        }
    }, [billingModal]) */
  // return (
  //   <>
  //     <div className='card '>
  //       <div className='card-header'>
  //         <p className='card-header-title'>Client Details</p>
  //         {(user.currentEmployee?.roles.includes('Bill Client') ||
  //           user.currentEmployee?.roles.length === 0 ||
  //           user.stacker) && (
  //           <button
  //             className='button is-success is-small btnheight mt-2'
  //             onClick={showBilling}
  //           >
  //             Bill Client
  //           </button>
  //         )}
  //       </div>
  //       <div className='card-content vscrollable'>
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.firstname && (
  //               <div className='field'>
  //                 <p className='control has-icons-left has-icons-right'>
  //                   <label
  //                     className='label is-size-7 my-0 '
  //                     name='firstname'
  //                     type='text'
  //                   >
  //                     First Name{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0 '>
  //                     {Client.firstname}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-hospital'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}

  //             {Client.middlename && (
  //               <div className='field'>
  //                 <p className='control has-icons-left has-icons-right'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='middlename'
  //                     type='text'
  //                   >
  //                     {' '}
  //                     Middle Name{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.middlename}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-map-signs'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.lastname && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='lastname'
  //                     type='text'
  //                   >
  //                     Last Name
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.lastname}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className=' nop-user-md '></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.dob && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='dob'
  //                     type='text'
  //                   >
  //                     Date of Birth{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {new Date(Client.dob).toLocaleDateString('en-GB')}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.gender && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='gender'
  //                     type='text'
  //                   >
  //                     Gender{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.gender}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.maritalstatus && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='maritalstatus'
  //                     type='text'
  //                   >
  //                     Marital Status{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.maritalstatus}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.mrn && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='mrn'
  //                     type='text'
  //                   >
  //                     Medical Records Number{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.mrn}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.religion && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='religion'
  //                     type='text'
  //                   >
  //                     Religion{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.religion}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.profession && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='profession'
  //                     type='text'
  //                   >
  //                     Profession{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.profession}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.phone && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='phone'
  //                     type='text'
  //                   >
  //                     {' '}
  //                     Phone No
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.phone}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-phone-alt'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}

  //             {Client.email && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='email'
  //                     type='email'
  //                   >
  //                     Email{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.email}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         {Client.address && (
  //           <div className='field'>
  //             <p className='control has-icons-left'>
  //               <label
  //                 className='label is-size-7 my-0'
  //                 name='address'
  //                 type='text'
  //               >
  //                 Residential Address{' '}
  //               </label>
  //               <label className='is-size-7 my-0'>{Client.address}</label>
  //               <span className='icon is-small is-left'>
  //                 <i className='nop-envelope'></i>
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.city && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='city'
  //                     type='text'
  //                   >
  //                     Town/City{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.city}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.lga && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='lga'
  //                     type='text'
  //                   >
  //                     Local Govt Area{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.lga}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.state && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='state'
  //                     type='text'
  //                   >
  //                     State{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.state}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.country && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='country'
  //                     type='text'
  //                   >
  //                     Country{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.country}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.bloodgroup && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='bloodgroup'
  //                     type='text'
  //                   >
  //                     Blood Group{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.bloodgroup}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}

  //             {Client.genotype && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='genotype'
  //                     type='text'
  //                   >
  //                     Genotype{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.genotype}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.disabilities && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='disabilities'
  //                     type='text'
  //                   >
  //                     Disabilities{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.disabilities}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>

  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.allergies && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='allergies'
  //                     type='text'
  //                   >
  //                     Allergies{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.allergies}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.comorbidities && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='comorbidities'
  //                     type='text'
  //                   >
  //                     Co-mobidities{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.comorbidities}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         {Client.clientTags && (
  //           <div className='field'>
  //             <p className='control has-icons-left'>
  //               <label
  //                 className='label is-size-7 my-0'
  //                 name='clientTags'
  //                 type='text'
  //               >
  //                 Tags{' '}
  //               </label>
  //               <label className='is-size-7 my-0'>{Client.clientTags}</label>
  //               <span className='icon is-small is-left'>
  //                 <i className='nop-envelope'></i>
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //         {Client.specificDetails && (
  //           <div className='field'>
  //             <p className='control has-icons-left'>
  //               <label
  //                 className='label is-size-7 my-0'
  //                 name='specificDetails'
  //                 type='text'
  //               >
  //                 Specific Details about Client{' '}
  //               </label>
  //               <label className='is-size-7 my-0'>
  //                 {Client.specificDetails}
  //               </label>
  //               <span className='icon is-small is-left'>
  //                 <i className='nop-envelope'></i>
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //         <div className='field is-horizontal'>
  //           <div className='field-body'>
  //             {Client.nok_name && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='nok_name'
  //                     type='text'
  //                   >
  //                     Next of Kin Full Name
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.nok_name}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-clinic-medical'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.nok_phoneno && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='nok_phoneno'
  //                     type='text'
  //                   >
  //                     Next of Kin Phone Number
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.nok_phoneno}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-clinic-medical'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.nok_email && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='nok_email'
  //                     type='email'
  //                   >
  //                     Next of Kin Email{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>{Client.nok_email}</label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //             {Client.nok_relationship && (
  //               <div className='field'>
  //                 <p className='control has-icons-left'>
  //                   <label
  //                     className='label is-size-7 my-0'
  //                     name='nok_relationship'
  //                     type='text'
  //                   >
  //                     Next of Kin Relationship"{' '}
  //                   </label>
  //                   <label className='is-size-7 my-0'>
  //                     {Client.nok_relationship}
  //                   </label>
  //                   <span className='icon is-small is-left'>
  //                     <i className='nop-envelope'></i>
  //                   </span>
  //                 </p>
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //         <div className='field is-grouped  mt-2'>
  //           <p className='control'>
  //             <button
  //               className='button is-success is-small'
  //               onClick={handleEdit}
  //             >
  //               Edit Details
  //             </button>
  //           </p>
  //           <p className='control'>
  //             <button
  //               className='button is-info is-small'
  //               onClick={handleFinancialInfo}
  //             >
  //               Payment Info
  //             </button>
  //           </p>
  //           <p className='control'>
  //             <button
  //               className='button is-warning is-small'
  //               onClick={handleSchedule}
  //             >
  //               Schedule appointment
  //             </button>
  //           </p>
  //           {/*  <p className="control">
  //                   <button className="button is-danger is-small" >
  //                       Check into Clinic
  //                   </button>
  //               </p> */}
  //           <p className='control'>
  //             <button
  //               className='button is-link is-small'
  //               onClick={() => {
  //                 navigate('/app/clinic/encounter');
  //               }}
  //             >
  //               Attend to Client
  //             </button>
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //     <div className={`modal ${finacialInfoModal ? 'is-active' : ''}`}>
  //       <div className='modal-background'></div>
  //       <div className='modal-card'>
  //         <header className='modal-card-head'>
  //           <p className='modal-card-title'>Financial Information</p>
  //           <button
  //             className='delete'
  //             aria-label='close'
  //             onClick={handlecloseModal}
  //           ></button>
  //         </header>
  //         <section className='modal-card-body'>
  //           {/* <StoreList standalone="true" /> */}
  //           <ClientFinInfo closeModal={handlecloseModal} />
  //         </section>
  //         {/* <footer className="modal-card-foot">
  //               <button className="button is-success">Save changes</button>
  //               <button className="button">Cancel</button>
  //               </footer> */}
  //       </div>
  //     </div>

  //     <ModalBox
  //       open={billingModal}
  //       onClose={handlecloseModal1}
  //       header='Bill Client'
  //     >
  //       <BillServiceCreate closeModal={handlecloseModal1} />
  //     </ModalBox>

  //     <div className={`modal ${appointmentModal ? 'is-active' : ''}`}>
  //       <div className='modal-background'></div>
  //       <div className='modal-card'>
  //         <header className='modal-card-head'>
  //           <p className='modal-card-title'>Set Appointment</p>
  //           <button
  //             className='delete'
  //             aria-label='close'
  //             onClick={handlecloseModal2}
  //           ></button>
  //         </header>
  //         <section className='modal-card-body'>
  //           {/* <StoreList standalone="true" /> */}
  //           <AppointmentCreate closeModal={handlecloseModal2} />
  //         </section>
  //         {/* <footer className="modal-card-foot">
  //                   <button className="button is-success">Save changes</button>
  //                   <button className="button">Cancel</button>
  //                   </footer> */}
  //       </div>
  //     </div>
  //     <div className={`modal ${billModal ? 'is-active' : ''}`}>
  //       <div className='modal-background'></div>
  //       <div className='modal-card'>
  //         <header className='modal-card-head'>
  //           <p className='modal-card-title'>Set Appointment</p>
  //           <button
  //             className='delete'
  //             aria-label='close'
  //             onClick={handlecloseModal3}
  //           ></button>
  //         </header>
  //         <section className='modal-card-body'>
  //           {/* <StoreList standalone="true" /> */}
  //           <ClientBilledPrescription
  //             selectedClient={Client._id}
  //             closeModal={handlecloseModal3}
  //           />
  //         </section>
  //         {/* <footer className="modal-card-foot">
  //                   <button className="button is-success">Save changes</button>
  //                   <button className="button">Cancel</button>
  //                   </footer> */}
  //       </div>
  //     </div>
  //   </>
  // );
}

export function ComplaintModify() {
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
          <p className="card-header-title">Complaint Details-Modify</p>
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
