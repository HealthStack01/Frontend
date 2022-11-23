/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import {Route, useNavigate, Link, NavLink} from "react-router-dom";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "bulma-toast";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import DatePicker from "react-datepicker";
import LocationSearch from "../helpers/LocationSearch";
import EmployeeSearch from "../helpers/EmployeeSearch";
import BillServiceCreate from "../Finance/BillServiceCreate";
import "react-datepicker/dist/react-datepicker.css";

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "../../components/customtable";
import Switch from "../../components/switch";
import {BsFillGridFill, BsList} from "react-icons/bs";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";
import {Box, Grid} from "@mui/material";
import DebouncedInput from "../Appointment/ui-components/inputs/DebouncedInput";
import {MdCancel} from "react-icons/md";

import LeadsCreate from "./components/lead/LeadCreate";
import LeadAssignStaff from "./components/lead/AssignTask";
import LeadDetail from "./components/lead/LeadDetailView";
import OldLeadDetail from "./components/lead/LeadDetail";
// eslint-disable-next-line
const searchfacility = {};

export default function Leads() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  return (
    <section className="section remPadTop">
      <LeadList
        openCreateModal={() => setCreateModal(true)}
        openDetailModal={() => setDetailModal(true)}
      />

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create New Lead"
      >
        <LeadsCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>

      {/* <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Assign Staff"
      >
        <LeadAssignStaff closeModal={() => setCreateModal(false)} />
      </ModalBox> */}

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Lead Detail"
      >
        <LeadDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </section>
  );
}

export function LeadList({openCreateModal, openDetailModal}) {
  // const { register, handleSubmit, watch, errors } = useForm();
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
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");

  const handleCreateNew = async () => {
    const newClientModule = {
      selectedAppointment: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      AppointmentModule: newClientModule,
    }));
    //console.log(state)
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    await setState(prevstate => ({...prevstate, ClientModule: newClient}));
    setShowModal(true);
  };

  const handleRow = async Client => {
    // setShowModal(true);
    // await setSelectedAppointment(Client);
    // const newClientModule = {
    //   selectedAppointment: Client,
    //   show: "detail",
    // };
    // await setState(prevstate => ({
    //   ...prevstate,
    //   AppointmentModule: newClientModule,
    // }));

    openDetailModal();
  };

  const handleSearch = val => {
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

    ClientServ.find({query: query})
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

      const findClient = await ClientServ.find({query: stuff});

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
      company_name: "Health Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
    {
      company_name: "Albert Health Stack",
      telestaff_name: "KTeejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
    {
      company_name: "DonaHealth Stack",
      telestaff_name: "9Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Inactive",
    },

    {
      company_name: "DaviHealth Stack",
      telestaff_name: "Teejay Tabor",
      probability: "70%",
      date: "11/9/2022",
      status: "Active",
    },
  ];

  const returnCell = status => {
    // if (status === "approved") {
    //   return <span style={{color: "green"}}>{status}</span>;
    // }
    // else if
    switch (status.toLowerCase()) {
      case "active":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "inactive":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  const LeadSchema = [
    {
      name: "Company Name",
      key: "sn",
      description: "Enter name of Company",
      selector: row => row.company_name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Telestaff Name",
      key: "telestaff_name",
      description: "Enter Telestaff name",
      selector: row => row.telestaff_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Probability Of Deal",
      key: "probability",
      description: "Enter bills",
      selector: row => row.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date of Submission",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => row.date,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => returnCell(row.status),
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
              style={{flexDirection: "column", padding: "0.6rem 1rem"}}
            >
              <TableMenu>
                <div style={{display: "flex", alignItems: "center"}}>
                  {handleSearch && (
                    <div className="inner-table">
                      <FilterMenu onSearch={handleSearch} />
                    </div>
                  )}
                  <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Lead</h2>
                </div>

                {handleCreateNew && (
                  <Button
                    style={{fontSize: "14px", fontWeight: "600"}}
                    label="Add new "
                    onClick={openCreateModal}
                  />
                )}
              </TableMenu>
              <div style={{width: "100%", height: "600px", overflow: "auto"}}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={LeadSchema}
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
