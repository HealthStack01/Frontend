import {useState, useContext, useEffect} from "react";
import {Box} from "@mui/system";
import {BsFillGridFill, BsList} from "react-icons/bs";
import DatePicker from "react-datepicker";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import FilterMenu from "../../../../components/utilities/FilterMenu";
import Switch from "../../../../components/switch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CalendarGrid from "../../../../components/calender";
import CustomTable from "../../../../components/customtable";
import {ObjectContext} from "../../../../context";
import dayjs from "dayjs";
import MuiClearDatePicker from "../../../../components/inputs/Date/MuiClearDatePicker";

const dummyData = [
  {
    customer: "Tejiri Tabor",
    title: "HCI",
    date: "11/9/2022",
    time: "12:00",
    status: "Pending",
  },
  {
    customer: "Tejiri Tabor",
    title: "KHCI",
    date: "11/9/2022",
    time: "12:00",
    status: "Pending",
  },
  {
    customer: "Tejiri Tabor",
    title: "9HCI",
    date: "11/9/2022",
    time: "12:00",
    status: "Expired",
  },

  {
    customer: "Tejiri Tabor",
    title: "HCI",
    date: "11/9/2022",
    time: "12:00",
    status: "Expired",
  },
];

const AppointmentList = ({openCreateModal, openDetailModal}) => {
  const {state, setState} = useContext(ObjectContext);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("list");
  const [loading, setLoading] = useState(false);
  const [mapFacilities, setMapFacilities] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleSearch = () => {};

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return <span style={{color: "#ffbe0b"}}>{status}</span>;

      case "expired":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  const returnStatus = date => {};

  useEffect(() => {
    setAppointments(state.DealModule.selectedDeal.appointments);
  }, [state.DealModule.selectedDeal.appointments]);

  const appointmentColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Customer",
      key: "customerName",
      description: "Enter name of Company",
      selector: row => row.customerName,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Title",
      key: "title",
      description: "Enter Telestaff name",
      selector: row => row.title,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
      //center: true,
    },
    {
      name: "Information",
      key: "information",
      description: "Enter bills",
      selector: "status",
      cell: row => row.information,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Date",
      key: "date",
      description: "Enter bills",
      selector: row => dayjs(row.date).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "100px",
    },
    {
      name: "Time",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => dayjs(row.date).format("hh:mm A	"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "100px",
      //width: "80px",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter bills",
      selector: "status",
      cell: row => (row.status ? row.status : "Not Specified"),
      sortable: true,
      required: true,
      inputType: "TEXT",
      width: "120px",
    },
  ];

  const handleDate = async date => {
    setStartDate(date);
  };

  const handleCreateNew = () => {
    openCreateModal();
  };

  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      CRMAppointmentModule: {
        ...prev.CRMAppointmentModule,
        selectedAppointment: data,
      },
    }));
    openDetailModal();
  };

  return (
    <Box pl={2} pr={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={2}
      >
        <div style={{display: "flex", alignItems: "center"}}>
          {handleSearch && (
            <div className="inner-table">
              <FilterMenu onSearch={handleSearch} />
            </div>
          )}
          <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Appointment</h2>
          {/* <DatePicker
            selected={startDate}
            onChange={date => handleDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Filter By Date"
            isClearable
          /> */}

          <MuiClearDatePicker
            value={startDate}
            setValue={setStartDate}
            label="Filter By Date"
            format="dd/MM/yyyy"
          />

          <Switch>
            <button
              value={value}
              onClick={() => {
                setValue("list");
              }}
              style={value === "list" ? activeStyle : {}}
            >
              <BsList style={{fontSize: "1rem"}} />
            </button>
            <button
              value={value}
              onClick={() => {
                setValue("grid");
              }}
              style={value === "grid" ? activeStyle : {}}
            >
              <BsFillGridFill style={{fontSize: "1rem"}} />
            </button>
          </Switch>
        </div>

        {handleCreateNew && (
          <GlobalCustomButton onClick={handleCreateNew}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Schedule Appointment
          </GlobalCustomButton>
        )}
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "calc(100% - 200px)",
          overflow: "auto",
        }}
      >
        {value === "list" ? (
          <CustomTable
            title={""}
            columns={appointmentColumns}
            data={appointments}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            progressPending={loading}
          />
        ) : (
          <CalendarGrid appointments={mapFacilities} />
        )}
      </Box>
    </Box>
  );
};

export default AppointmentList;
