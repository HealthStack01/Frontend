/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import "react-datepicker/dist/react-datepicker.css";
import {Autocomplete, Box, Grid} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import BasicDatePicker from "../../components/inputs/Date";
import MuiCustomTimePicker from "../../components/inputs/Date/MuiTimePicker";
import BasicDateTimePicker from "../../components/inputs/DateTime";
import RadioButton from "../../components/inputs/basic/Radio";
import TextField from "@mui/material/TextField";
import {FormsHeaderText} from "../../components/texts";
import CustomSelect from "../../components/inputs/basic/Select";
import Textarea from "../../components/inputs/basic/Textarea";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
// eslint-disable-next-line
const searchfacility = {};

const DocumentationScheduleAppointment = ({closeModal}) => {
  const {state, setState} = useContext(ObjectContext);
  const {register, handleSubmit, setValue, control, reset} = useForm(); //, watch, errors, reset
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
  const {user} = useContext(UserContext); //,setUser
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
  const handleChangeType = async e => {
    await setAppointment_type(e.target.value);
  };

  const handleChangeStatus = async e => {
    await setAppointment_status(e.target.value);
  };

  const getSearchfacility = obj => {
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
  const getSearchfacility1 = obj => {
    setLocationId(obj._id);
    setChosen1(obj);

    if (!obj) {
      //"clear stuff"
      setLocationId();
      setChosen1();
    }
  };
  const getSearchfacility2 = obj => {
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
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    setShowModal(false),
      setState(prevstate => ({
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
      .then(res => {
        //console.log(JSON.stringify(res))
        setAppointment_type("");
        setAppointment_status("");
        setClientId("");
        setLocationId("");
        /*  setMessage("Created Client successfully") */
        setSuccess(true);
        setSuccess1(true);
        setSuccess2(true);
        toast.success(
          "Appointment created succesfully, Kindly bill patient if required"
        );
        setSuccess(false);
        setSuccess1(false);
        setSuccess2(false);
        // showBilling()
      })
      .catch(err => {
        toast.error("Error creating Appointment " + err);
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
      <Box
        sx={{
          width: "800px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <ClientSearch
                getSearchfacility={getSearchfacility}
                clear={success}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4} mb={1.5}>
              <EmployeeSearch
                getSearchfacility={getSearchfacility2}
                clear={success2}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <LocationSearch
                getSearchfacility={getSearchfacility1}
                clear={success1}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <RadioButton
                name="appointmentClass"
                register={register("appointmentClass", {required: true})}
                options={appClass}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{alignItems: "center"}}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <MuiCustomDatePicker
                name="start_time"
                label="Date"
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                control={control}
                name="type"
                options={[
                  "New",
                  "Followup",
                  "Readmission with 24hrs",
                  "Annual Checkup",
                  "Walk-in",
                ]}
                label="Appointment Type"
              />
              {/* <select
                name="type"
                value={type}
                onChange={handleChangeType}
                style={{
                  border: "1px solid #b6b6b6",
                  height: "38px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option defaultChecked></option>
                <option value="New">New</option>
                <option value="Followup">Followup</option>
                <option value="Readmission with 24hrs">
                  Readmission with 24hrs
                </option>
                <option value="Annual Checkup"></option>
                <option value="Walk in"></option>
              </select> */}
            </Grid>

            <Grid item xs={12} sm={12} md={4} lg={4}>
              <CustomSelect
                label="Appointment Status"
                control={control}
                name="appointment_status"
                options={[
                  ,
                  "Scheduled",
                  "Confirmed",
                  "Checked In",
                  "Vitals Taken",
                  "With Nurse",
                  "With Doctor",
                  "No Show",
                  "Cancelled",
                  "Billed",
                ]}
              />
              {/* <select
                name="appointment_status"
                value={appointment_status}
                onChange={handleChangeStatus}
                style={{
                  border: "1px solid #b6b6b6",
                  height: "38px",
                  borderRadius: "4px",
                  width: "100%",
                }}
              >
                <option defaultChecked> </option>
                <option value="Scheduled"></option>
                <option value="Confirmed"></option>
                <option value="Checked In"></option>
                <option value="Vitals Taken"></option>
                <option value="With Nurse"></option>
                <option value="With Doctor"></option>
                <option value="No Show"></option>
                <option value="Cancelled"></option>
                <option value="Billed">Billed</option>
              </select> */}
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Textarea
                label="Reason for Appointment"
                register={register("appointment_reason", {required: true})}
                type="text"
                placeholder="Write here...."
              />
            </Grid>
          </Grid>

          <Box sx={{display: "flex", alignItems: "center"}}>
            <GlobalCustomButton
              text="Submit"
              onClick={handleSubmit(onSubmit)}
              customStyles={{
                marginRight: "15px",
              }}
            />
            <GlobalCustomButton
              variant="outlined"
              color="error"
              text="Cancel"
              onClick={closeModal}
            />
          </Box>
        </form>
      </Box>
    </>
  );
};

export default DocumentationScheduleAppointment;

export function ClientSearch({id, getSearchfacility, clear, label}) {
  const ClientServ = client.service("client");
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
  const [val, setVal] = useState("");
  const {user} = useContext(UserContext);
  const {state} = useContext(ObjectContext);
  const [productModal, setProductModal] = useState(false);
  const [closeDropdown, setCloseDropdown] = useState(false);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(
      obj.firstname +
        " " +
        obj.middlename +
        " " +
        obj.lastname +
        " " +
        obj.gender +
        " " +
        obj.phone
    );

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
    setVal(val);
    if (val === "") {
      setShowPanel(false);
      getSearchfacility(false);
      return;
    }
    const field = "name"; //field variable

    if (val.length >= 3) {
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
          ],

          facility: user.currentEmployee.facilityDetail._id,
          //storeId: state.StoreModule.selectedStore._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(res => {
          console.log("product  fetched successfully");
          console.log(res.data);
          setFacilities(res.data);
          setSearchMessage(" product  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          toast({
            message: "Error creating ProductEntry " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  console.log(simpa);
  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      console.log("success has changed", clear);
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  // map faclilities and return the firstname and lastname
  const mapFacilities = () => {
    const allFacilities = facilities.map(facility => {
      return {
        value: facility._id,
        label: facility.firstname + " " + facility.lastname,
      };
    });
  };

  return (
    <div>
      {/* <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? 'is-active' : ''}`}
            style={{ width: '100%' }}
          >
            <div className="dropdown-trigger" style={{ width: '100%' }}>
              <DebouncedInput
                label={'Search for Client'}
                value={simpa}
                minLength={3}
                onBlur={handleBlur}
                onChangeValue={handleSearch}
                inputRef={inputEl}
                style={{ height: '38px' }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            <div className="dropdown-menu expanded" style={{ width: '100%' }}>
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => {
                      handleRow(facility), setCloseDropdown(true);
                    }}
                  >
                    <div style={{ cursor: 'pointer' }}>
                      {closeDropdown ? (
                        <></>
                      ) : (
                        <>
                          <span>{facility.firstname}</span>
                          <span className="padleft">{facility.middlename}</span>
                          <span className="padleft">{facility.lastname}</span>
                          <span className="padleft">
                            {' '}
                            {formatDistanceToNowStrict(new Date(facility.dob))}
                          </span>
                          <span className="padleft">{facility.gender}</span>
                          <span className="padleft">{facility.profession}</span>
                          <span className="padleft">{facility.phone}</span>
                          <span className="padleft">{facility.email}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <Autocomplete
        size="small"
        value={simpa}
        onChange={(event, newValue) => {
          handleRow(newValue);
          setSimpa("");
        }}
        id="free-solo-dialog-demo"
        options={facilities}
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.firstname;
        }}
        //isOptionEqualToValue={(option, value) => option.id === value.id}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        noOptionsText="No Client found"
        renderOption={(props, option) => (
          <li {...props} style={{fontSize: "0.75rem"}}>
            {option.firstname}, {option.middlename}, {option.lastname},{" "}
          </li>
        )}
        sx={{
          width: "100%",
        }}
        freeSolo={false}
        renderInput={params => (
          <TextField
            {...params}
            label={label || "Search for Client"}
            onChange={e => handleSearch(e.target.value)}
            ref={inputEl}
            sx={{
              fontSize: "0.75rem",
              backgroundColor: "#ffffff",
              "& .MuiInputBase-input": {
                height: "0.9rem",
              },
            }}
            InputLabelProps={{
              shrink: true,
              style: {color: "#2d2d2d"},
            }}
          />
        )}
      />
    </div>
  );
}
