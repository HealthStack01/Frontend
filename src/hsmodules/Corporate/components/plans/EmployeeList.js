/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../../../context";
/* import ModuleList from "./ModuleList"; */
import {toast, ToastContainer} from "react-toastify";
import * as yup from "yup";
import {PageWrapper} from "../../../../ui/styled/styles";
import {TableMenu} from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
// import Button from "../../components/buttons/Button";
import CustomTable from "../../../../components/customtable";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
/* import Input from "../../components/inputs/basic/Input";
import Grid from "@mui/system/Unstable_Grid/Grid";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../../../components/modal";
import {BottomWrapper, GridWrapper} from "../app/styles";
import PasswordInput from "../../components/inputs/basic/Password";
import {createEmployeeSchema} from "./ui-components/schema";
import {yupResolver} from "@hookform/resolvers/yup";
import {EmployeeForm} from "./EmployeeForm";
import EmployeeView from "./EmployeeView"; */
import {Avatar, Box, Portal} from "@mui/material";
/* import ControlPointIcon from "@mui/icons-material/ControlPoint";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog"; */
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import {returnAvatarString} from "../../../helpers/returnAvatarString";


// eslint-disable-next-line
const searchfacility = {};

export default function EmployeeList() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedEmployee, setSelectedEmployee] = useState();
 /*  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false); */

  //const [showState,setShowState]=useState() //create|modify|detail

  

  return (
    <>
    

      {/* <EmployeeForm open={createModal} setOpen={handleHideCreateModal} /> */}


      <ListEmployee
        /* showCreateModal={handleCreateModal}
        showDetailModal={handleShowDetailModal} */
      />
    </>
  );
}



export function ListEmployee({selectedemployee, limit}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const EmployeeServ = client.service("employee");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedEmployee, setSelectedEmployee] = useState(); //
  // eslint-disable-next-line
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [plans, setPlans] = useState([]);
  const planRef=useRef([])

  const handleCreateNew = async () => {
    const newEmployeeModule = {
      selectedEmployee: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
    showCreateModal();
  };
  const handleRow = async Employee => {
    //console.log("b4",state)

    //console.log("handlerow",Employee)

    await setSelectedEmployee(Employee);

    const newEmployeeModule = {
      selectedEmployee: Employee,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
    //console.log(state)
    showDetailModal();
  };
  const handleRowClicked = row => {
    setSelectedEmployee(row);
    setOpen(true);

    const newEmployeeModule = {
      selectedEmployee: row,
      show: "detail",
    };
    setState(prevstate => ({
      ...prevstate,
      EmployeeModule: newEmployeeModule,
    }));
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSearch = val => {
    const field = "firstname";
    //console.log(val);
    EmployeeServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        facility: user.currentEmployee.facilityDetail._id,
        $limit: 1000,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then(res => {
        //console.log(res);
        setFacilities(res.data);
        setMessage(" Employee  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Employee, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    setLoading(true);
    if (user.currentEmployee) {
      const findEmployee = await EmployeeServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setFacilities(findEmployee.data);
      setLoading(false);
      //console.log("facilities", facilities);
    } else {
      if (user.stacker) {
        const findEmployee = await EmployeeServ.find({
          query: {
            $limit: 100,
            $sort: {
              facility: -1,
            },
          },
        });

        await setFacilities(findEmployee.data);
        setLoading(false);
      }
    }
  };

 

  useEffect(() => {
    
      getFacilities();
    
    return () => {};
  }, []);

  //todo: pagination and vertical scroll bar

  const handleChoseClient = (e, row) => {
    console.log(limit)
    
    
    // console.log(plans)
     if (e.target.checked) {
      if (planRef.current.length==limit){
        console.log(planRef.current.length,limit)
        toast.error("Limit for plan exceeded")
        return
      }
      // console.log("checked", row._id);
       row.assigned = true;
       setPlans(plans.concat(row)); // Concatenate and update the plans array
       planRef.current=planRef.current.concat(row)
       selectedemployee( planRef.current)
      // console.log(plans);
       //update facilities
     } else {
       //console.log("unchecked", row._id);
       row.assigned = false;
       setPlans(plans.filter((el) => el._id !== row._id)); // Filter and update the plans array
      // console.log(plans.length);
      planRef.current=planRef.current.filter((el) => el._id !== row._id)
       selectedemployee( planRef.current)
     }
   };

   const handleChoseClient2 = (e, row) => {
    // console.log(plans)
     if (e.target.checked) {
      // console.log("checked", row._id);
      row.assigned = false;
      setPlans(plans.filter((el) => el._id !== row._id));
      ; // Concatenate and update the plans array
      // console.log(plans);
       //update facilities
     } else {
      row.assigned = true;
      setPlans(plans.concat(row))
       //console.log("unchecked", row._id);
       // Filter and update the plans array
      // console.log(plans.length);
     }
   };

  const getEmployeeSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of employee",
      selector: (row, i) =>(
        <div style={{display: "flex", alignItems: "center"}}>
        <input
          type="checkbox"
          //name={order._id}
          style={{marginRight: "3px"}}
         onChange={e => handleChoseClient(e,row)}
         checked={row.chosen}
        />
        {row.sn}
        </div>
      ),
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
   
    {
      name: "Firstname",
      key: "firstname",
      description: "Enter firstname",
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Firstname"),
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Enter lastname",
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Lastname"),
      style: {
        textTransform: "capitalize",
      },
    },
   
    {
      name: "Phone number",
      key: "phone",
      description: "Enter phone number",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Phone number"),
    },
    {
      name: "Email",
      key: "email",
      description: "Enter Email",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your valid Email"),
    },
    {
      name: "Department",
      key: "facility",
      description: "Select facility",
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      //   defaultValue: facilityId,
      validator: yup.string().required("Facility not available"),
    },
    {
      name: "position",
      key: "department",
      description: "Enter department",
      selector: row => row.position,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Department"),
    },
   
  ];
  const getEmployeeSchema2 = [
    {
      name: "S/N",
      key: "sn",
      description: "Enter name of employee",
      selector: (row, i) =>(
        <div style={{display: "flex", alignItems: "center"}}>
        {/* <input
          type="checkbox"
          //name={order._id}
          style={{marginRight: "3px"}}
         onChange={e => handleChoseClient(e,row)}
         checked={row.chosen}
        /> */}
        {row.sn}
        </div>
      ),
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
   
    {
      name: "Firstname",
      key: "firstname",
      description: "Enter firstname",
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Firstname"),
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Enter lastname",
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Lastname"),
      style: {
        textTransform: "capitalize",
      },
    },
   
    {
      name: "Phone number",
      key: "phone",
      description: "Enter phone number",
      selector: row => row.phone,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Phone number"),
    },
    {
      name: "Email",
      key: "email",
      description: "Enter Email",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your valid Email"),
    },
    {
      name: "Department",
      key: "facility",
      description: "Select facility",
      selector: row => row.department,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      //   defaultValue: facilityId,
      validator: yup.string().required("Facility not available"),
    },
    {
      name: "position",
      key: "department",
      description: "Enter department",
      selector: row => row.position,
      sortable: true,
      required: true,
      inputType: "TEXT",
      validator: yup.string().required("Enter your Department"),
    },
   
  ];
  const sendlink = async data => {
    const employeeData = {
      ...data,
      createdby: user._id,
      facility: user.currentEmployee.facility,
      imageurl: "",
      roles: ["Communication"],
    };

    await EmployeeServ.create(employeeData)
      .then(res => {
        // toast.success(
        //   `Employee ${data.firstname} ${data.lastname} successfully created`
        // );
      })
      .catch(err => {
        toast.error(
          `Sorry, You weren't able to create an Employee ${data.firstname} ${data.lastname}. ${err}`
        );
      });
  };

  const sendlinkmx = async data => {
    showActionLoader();

    const promises = data.map(async item => {
      await createEmployee(item);
    });

    await Promise.all(promises);

    hideActionLoader();
    setUploadModal(false);
    toast.success(`Sucessfully created ${data.length} Employee(s)`);
  };

  return (
    <>
      {user ? (
        <>
        
         
          <PageWrapper
            style={{display:"flex", flexDirection: "column", padding: "0.6rem 1rem"}}
          >
            <TableMenu>
              <div style={{display: "flex", alignItems: "center" , }}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <div style={{display:"flex", flexDirection: "row", justify:"space-between"}}>
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                  List of Employees  
                </h2>
                <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
                    Selected Employees : {plans.length}
                </h2>
                </div>
              </div>

              
            </TableMenu>
            <div
              className="columns"
              style={{
                display: "flex",
                width: "100%",
                //flex: "1",
                justifyContent: "space-between",
              }}
            >
            <div
              style={{
                width: plans.length>0 ? "49.5%" : "100%",
                height: "calc(100vh - 170px)",
                overflow: "auto",
              }}
            >
              <CustomTable
                title={"List of "}
                columns={getEmployeeSchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
               /*  onRowClicked={handleRowClicked} */
                progressPending={loading}
              />
            </div>
         { plans.length>0 &&  <div
              style={{
                width: "49%",
                height: "calc(100vh - 10px)",
                overflow: "auto",
              }}
            >
              <CustomTable
                title={""}
                columns={getEmployeeSchema2}
                data={plans}
                pointerOnHover
                highlightOnHover
                striped
               /*  onRowClicked={handleRowClicked2} */
                progressPending={loading}
              />
            </div>}
           </div>
          </PageWrapper>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}




export function InputSearch({getSearchfacility, clear}) {
  const facilityServ = client.service("facility");
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
      facilityServ
        .find({
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
