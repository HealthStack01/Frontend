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
import InvoiceCreate from "./components/invoice/InvoiceCreate";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import InvoiceDetail from "./components/invoice/InvoiceDetail";
// eslint-disable-next-line
const searchfacility = {};

export default function Invoice() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState();
  const [selectedAppointment, setSelectedAppointment] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);

  return (
    <section className="section remPadTop">
      <InvoiceList
        openCreateModal={() => setCreateModal(true)}
        openDetailModal={() => setDetailModal(true)}
      />
      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create New Invoice"
      >
        <InvoiceCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Invoice Detail"
      >
        <InvoiceDetail />
      </ModalBox>
    </section>
  );
}

export function InvoiceList({openCreateModal, openDetailModal}) {
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
  };

  const handleRow = async Client => {
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
  //console.log(state.employeeLocation)

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
    ClientServ.on("created", obj => handleCalendarClose());
    ClientServ.on("updated", obj => handleCalendarClose());
    ClientServ.on("patched", obj => handleCalendarClose());
    ClientServ.on("removed", obj => handleCalendarClose());
    const newClient = {
      selectedClient: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ClientModule: newClient}));
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

    const findClient = await ClientServ.find({query: query});

    await setFacilities(findClient.data);
  };

  const handleDate = async date => {
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
      name: "Sulaiman Olaniran",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Active",
    },
    {
      name: "Albert Sulaiman Olaniran",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Active",
    },
    {
      name: "DonaSulaiman Olaniran",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
      status: "Inactive",
    },

    {
      name: "DaviSulaiman Olaniran",
      invoice_no: "HCI/INTERTEK/LAG",
      plan: "Family",
      amount: "500,000:00",
      unit: "50",
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

  const InvoiceSchema = [
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
      name: " Name",
      key: "name",
      description: "Enter name of Company",
      selector: row => row.name,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Invoice No",
      key: "invoice_no",
      description: "Enter Telestaff name",
      selector: row => row.invoice_no,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Plan",
      key: "plan",
      description: "Enter bills",
      selector: row => row.plan,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter name of Disease",
      selector: (row, i) => row.amount,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Unit Bought",
      key: "unit",
      description: "Enter name of Disease",
      selector: (row, i) => row.unit,
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
                  <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
                    Invoice
                  </h2>
                </div>

                <GlobalCustomButton onClick={openCreateModal}>
                  <AddCircleOutline
                    fontSize="small"
                    sx={{marginRight: "5px"}}
                  />
                  Create Invoice
                </GlobalCustomButton>
              </TableMenu>
              <div style={{width: "100%", height: "600px", overflow: "auto"}}>
                {value === "list" ? (
                  <CustomTable
                    title={""}
                    columns={InvoiceSchema}
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
