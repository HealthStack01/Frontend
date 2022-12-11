/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from "react";
import { Route, useNavigate, Link, NavLink } from "react-router-dom";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { toast } from "bulma-toast";
import { formatDistanceToNowStrict, format, subDays, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";
import GlobalCustomButton from '../../components/buttons/CustomButton';
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { PageWrapper } from "../../ui/styled/styles";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Switch from "../../components/switch";
import { BsFillGridFill, BsList } from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import { Box, Grid } from "@mui/material";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import { MdCancel } from "react-icons/md";
import { ClientSearch } from "../helpers/ClientSearch";
import Input from '../../components/inputs/basic/Input';
// eslint-disable-next-line
const searchfacility = {};

export default function VaccineProfile() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [showModal, setShowModal] = useState(false);

  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);



  const handleShowDetailModal = () => {
    setDetailModal(true);
  };

  const handleHideDetailModal = () => {
    setDetailModal(false);
  };
  const handleCreateModal = () => {
    setCreateModal(true);
  };

  const handleHideCreateModal = () => {
    setCreateModal(false);
  };
  const handleModifyModal = () => {
    setModifyModal(true);
  };

  const handleHideModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <section className="section remPadTop">
      <VaccineProfileList   showCreateModal={handleCreateModal}
      showDetailModal={handleShowDetailModal} />


       
    <ModalBox width="40vw" overflow="hidden"  open={createModal} onClose={handleHideCreateModal} header="Create Vaccine Profile">
          <VaccineProfileCreate />
        </ModalBox>

        <ModalBox width="40vw" open={detailModal} onClose={handleHideDetailModal} header="Vaccine Profile Detail">
          <VaccineProfileDetail showModifyModal={handleModifyModal} />
        </ModalBox>

    </section>
  );
}

export function VaccineProfileCreate() {
  const { state, setState } = useContext(ObjectContext);
  const { register, handleSubmit, setValue } = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState();
  const [locationId, setLocationId] = useState();
  const [practionerId, setPractionerId] = useState();
  const [type, setType] = useState();
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("appointments");
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  // const [appointment_reason,setAppointment_reason]= useState()
  const [appointment_status, setAppointment_status] = useState("");
  const [appointment_type, setAppointment_type] = useState("");
  const [billingModal, setBillingModal] = useState(false);

  const [chosen, setChosen] = useState();
  const [chosen1, setChosen1] = useState();
  const [chosen2, setChosen2] = useState();
  const appClass = ["On-site", "Teleconsultation", "Home Visit"];

  let appointee; //  =state.ClientModule.selectedClient
  /*  const getSearchfacility=(obj)=>{
        setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        })
    } */
  const handleChangeType = async (e) => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async (e) => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };
  const getSearchfacility1 = (obj) => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = (obj) => {
    setPractionerId(obj._id);
    setChosen2(obj);

    if (!obj) {
      //"clear stuff"
      setPractionerId();
      setChosen2();
    }
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
    setShowModal(false),
      setState((prevstate) => ({
        ...prevstate,
        AppointmentModule: {
          selectedAppointment: {},
          show: "list",
        },
      }));

    // data.createdby=user._id
    console.log(data);
    if (user.currentEmployee) {
      data.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
    }
    data.locationId = locationId; //state.ClinicModule.selectedClinic._id
    data.practitionerId = practionerId;
    data.appointment_type = appointment_type;
    // data.appointment_reason=appointment_reason
    data.appointment_status = appointment_status;
    data.clientId = clientId;
    data.firstname = chosen.firstname;
    data.middlename = chosen.middlename;
    data.lastname = chosen.lastname;
    data.dob = chosen.dob;
    data.gender = chosen.gender;
    data.phone = chosen.phone;
    data.email = chosen.email;
    data.practitioner_name = chosen2.firstname + " " + chosen2.lastname;
    data.practitioner_profession = chosen2.profession;
    data.practitioner_department = chosen2.department;
    data.location_name = chosen1.name;
    data.location_type = chosen1.locationType;
    data.actions = [
      {
        action: appointment_status,
        actor: user.currentEmployee._id,
      },
    ];
    console.log(data);

    ClientServ.create(data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast({
          message:
            "Appointment created succesfully, Kindly bill patient if required",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch((err) => {
        toast({
          message: "Error creating Appointment " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  useEffect(() => {
    getSearchfacility(state.ClientModule.selectedClient);

    /* appointee=state.ClientModule.selectedClient 
        console.log(appointee.firstname) */
    return () => {};
  }, [state.ClientModule.selectedClient]);

  /*   const showBilling = () =>{
        setBillingModal(true)
       //history.push('/app/finance/billservice')
        }
        const  handlecloseModal1 = () =>{
            setBillingModal(false)
            }


            const handleRow= async(Client)=>{
              //  await setSelectedClient(Client)
                const    newClientModule={
                    selectedClient:Client,
                    show :'detail'
                }
               await setState((prevstate)=>({...prevstate, ClientModule:newClientModule}))
            } */

  return (
    <>
     <Box display="flex" justifyContent="flex-end" mb={2}>
<GlobalCustomButton 
               onClick={handleSubmit(onSubmit)}
               
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Create
                </GlobalCustomButton>
</Box>
<form>
      <div>
      <Box sx={{color:"#0064CC",fontSize:"14px"}} pb="1rem">
              <h4>Vaccine Information</h4>
            </Box>
      
          <Grid container xs={12}>
           
          <Grid xs={6}>
          <Box mb="1rem">
          <Input 
      register={register("name", {required: true})} 
      name="name" type="text" label="Name of Vitamin"/>
          </Box>
          <Box mb="1rem">
          <Input 
      register={register("role", {required: true})} 
      name="role" type="text" label="Role Admintration"/>
      </Box>
          
          </Grid>
<Grid xs={6} pl="1rem">
<Box mb="1rem">
          <Input 
      register={register("dosage", {required: true})} 
      name="dosage" type="text" label="Dosage"/>
          </Box>
          <Box>
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Target Age Group"/>
          </Box>
</Grid>

          </Grid>
          <Box display="flex" justifyContent="flex-end" mb={2}>
<GlobalCustomButton 
               onClick={handleSubmit(onSubmit)}
               
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add New Dosage
                </GlobalCustomButton>
</Box>

</div>
<div>
<Box sx={{color:"#0064CC",fontSize:"14px"}} pb="1rem">
              <h4>Dosage</h4>
            </Box>
  <Grid container xs={12}>
    <Grid xs={6}>
    <Box pb="1rem">
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Minimum Age for Dose 1"/>
          </Box>
          <Box>
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Interval Between Dose 1 & Dose 2"/>
          </Box>    
    </Grid>
    <Grid xs={6} pl="1rem">
    <Box pb="1rem">
          <GlobalCustomButton 
               onClick={handleSubmit(onSubmit)}
               variant="outlined"
              
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add Dosage
                </GlobalCustomButton>
          </Box>
          <Box>
          <GlobalCustomButton 
               onClick={handleSubmit(onSubmit)}
                variant="outlined"
              
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add Dosage
                </GlobalCustomButton>
          </Box>
    </Grid>
  </Grid>
</div>
         
        </form>
      
    </>
  );
}

export function VaccineProfileList({showCreateModal, showDetailModal}) {
  const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ClientServ = client.service("appointments");
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
  const [value, setValue] = useState("list");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    await setState((prevstate) => ({ ...prevstate, ClientModule: newClient }));
    // setShowModal(true);
  };

  const handleRow = async (Client) => {
    // setShowModal(true);
    await setSelectedAppointment(Client);
    const newClientModule = {
      selectedAppointment: Client,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    showDetailModal();
  };
  //console.log(state.employeeLocation)

  const handleSearch = (val) => {
    const field = "firstname";
    //  console.log(val)

    let query = {
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
          appointment_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_status: {
            $regex: val,
            $options: "i",
          },
        },
        {
          appointment_reason: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_type: {
            $regex: val,
            $options: "i",
          },
        },
        {
          location_name: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_department: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_profession: {
            $regex: val,
            $options: "i",
          },
        },
        {
          practitioner_name: {
            $regex: val,
            $options: "i",
          },
        },
      ],
      facility: user.currentEmployee.facilityDetail._id, // || "",
      $limit: 20,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    ClientServ.find({ query: query })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Client  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error fetching Client, probable network issues " + err);
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
    ClientServ.on("created", (obj) => handleCalendarClose());
    ClientServ.on("updated", (obj) => handleCalendarClose());
    ClientServ.on("patched", (obj) => handleCalendarClose());
    ClientServ.on("removed", (obj) => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: "create",
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
        title: facility?.firstname + " " + facility?.lastname,
        start: format(new Date(facility?.start_time), "yyyy-MM-ddTHH:mm"),
        end: facility?.end_time,
        id: i,
      });
    });
    return mapped;
  };
  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      name: "Vitamin A",
      dosage: "0.5ml - 2-3days",
      role: "Intra-muscular oral",
      age: "At birth",
    },
    {
      name: "Vitamin A",
      dosage: "0.5ml - 2-3days",
      role: "Intra-muscular oral",
      age: "At birth",
    },
    {
      name: "Vitamin A",
      dosage: "0.5ml - 2-3days",
      role: "Intra-muscular oral",
      age: "At birth",
    },

    {
      name: "Vitamin A",
      dosage: "0.5ml - 2-3days",
      role: "Intra-muscular oral",
      age: "At birth",
    },
  ];

  const returnCell = (status) => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{ color: "#17935C" }}>{status}</span>;

      case "inactive":
        return <span style={{ color: "#0364FF" }}>{status}</span>;

      default:
        break;
    }
  };

  const VaccineSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "Name of Vaccine",
      key: "name",
      description: "Enter name of Vaccine",
      selector: (row) => row.name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Dosage",
      key: "dosage",
      description: "Enter bills",
      selector: (row) => row.dosage,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Role of Administration",
      key: "role",
      description: "Enter name of Disease",
      selector: (row, i) => row.role,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Targeted Age  Group",
      key: "age",
      description: "Enter name of Disease",
      selector: (row, i) => row.age,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <PageWrapper
              style={{ flexDirection: "column", padding: "0.6rem 1rem" }}
            >
              <TableMenu>
                <div style={{ display: "flex", alignItems: "center" }}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
                    Vaccine
                  </h2>
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton 
                  onClick={showCreateModal}
                  >
                    <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                  Add New
                  </GlobalCustomButton>
                )}
              </TableMenu>
              <div style={{ width: "100%", height: "600px", overflow: "auto" }}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={VaccineSchema}
                    data={dummyData}
                    pointerOnHover
                    highlightOnHover
                    striped
                    onRowClicked={handleRow}
                    progressPending={loading}
                    //conditionalRowStyles={conditionalRowStyles}
                  />
                ) : (
                  <CalendarGrid appointments={mapFacilities()} />
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


export function VaccineProfileDetail(){
  const { register, handleSubmit, watch, errors } = useForm();
  const [editing,setEditing] = useState(false)
  return(
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>

{!editing ?
  <GlobalCustomButton 
              
              onClick={() => setEditing(true)}
              >
                
              Edit
              </GlobalCustomButton>
              :
              <Box display="flex" gap="1rem">
               <GlobalCustomButton 
              
color="error"
 
 > 
 Delete
 </GlobalCustomButton>
 <GlobalCustomButton 
               color="success"
               
                > 
                Update
                </GlobalCustomButton>
              </Box>
              


}
</Box>


<form>
      <div>
      <Box sx={{color:"#0064CC",fontSize:"14px"}} pb="1rem">
              <h4>Vaccine Information</h4>
            </Box>
      
          <Grid container xs={12}>
           
          <Grid xs={6}>
{!editing ? <Box mb="1rem">
        <Input 
    register={register("name", {required: true})} 
    label="Name of Vaccine" defaultValue="Vitamin A" disabled={!editing}/>
        </Box>:  
        <Box mb="1rem">
          <Input 
      register={register("name", {required: true})} 
      name="name" type="text" label="Name of Vitamin"/>
          </Box> 
          }
       {!editing ? <Box mb="1rem">
           <Input 
       register={register("role", {required: true})} 
       defaultValue="Intra-muscular oral" label="Role Admintration" disabled={!editing}/>
           </Box> :   <Box mb="1rem">
          <Input 
      register={register("role", {required: true})} 
      name="role" type="text" label="Role Admintration"/>
      </Box> }
          
          </Grid>
<Grid xs={6} pl="1rem">
   {!editing ?   <Box mb="1rem">
          <Input 
      register={register("dosage", {required: true})} 
      defaultValue="0.5ml - 2-3days" label="Dosage" disabled={!editing}/>
          </Box>  :  <Box mb="1rem">
          <Input 
      register={register("dosage", {required: true})} 
      name="dosage" type="text" label="Dosage"/>
          </Box> }
      {!editing ?    <Box>
           <Input 
       register={register("age", {required: true})} 
       defaultValue="At birth" label="Target Age Group" disabled={!editing}/>
           </Box> :  <Box>
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Target Age Group"/>
          </Box> }
</Grid>

          </Grid>
          {!editing ? null :    <Box display="flex" justifyContent="flex-end" mb={2}>
<GlobalCustomButton 
               
               
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add New Dosage
                </GlobalCustomButton>
</Box> }

</div>
<div>
<Box sx={{color:"#0064CC",fontSize:"14px"}} pb="1rem">
              <h4>Dosage</h4>
            </Box>
  <Grid container xs={12}>
    <Grid xs={6}>
  {!editing ? <Box pb="1rem">
          <Input 
      register={register("age", {required: true})} 
      defaultValue="i dont know" label="Minimum Age for Dose 1" disabled={!editing}/>
          </Box> :<Box pb="1rem">
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Minimum Age for Dose 1"/>
          </Box>}
     {!editing ? <Box>
          <Input 
      register={register("age", {required: true})} 
     defaultValue="i donot know" label="Interval Between Dose 1 & Dose 2" disabled={!editing}/>
          </Box>    : <Box>
          <Input 
      register={register("age", {required: true})} 
      name="age" type="text" label="Interval Between Dose 1 & Dose 2"/>
          </Box>   } 
    </Grid>
    <Grid xs={6} pl="1rem">
   {!editing ? null : <Box pb="1rem">
          <GlobalCustomButton 
               
               variant="outlined"
              
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add Dosage
                </GlobalCustomButton>
          </Box> }
          {!editing ? null : <Box>
          <GlobalCustomButton 
              
                variant="outlined"
              
                >
                  <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
                Add Dosage
                </GlobalCustomButton>
          </Box> }
    </Grid>
  </Grid>
</div>
 </form>
    </div>
  )
}