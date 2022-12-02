import {useState} from "react";
import {Box} from "@mui/system";
import {BsFillGridFill, BsList} from "react-icons/bs";
import DatePicker from "react-datepicker";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import FilterMenu from "../../../../components/utilities/FilterMenu";
import Switch from "../../../../components/switch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CalendarGrid from "../../../../components/calender";
import CustomTable from "../../../../components/customtable";

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

const AppointmentList = ({openCreateModal}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("list");
  const [loading, setLoading] = useState(false);
  const [mapFacilities, setMapFacilities] = useState([]);

  const handleSearch = () => {};

  const returnCell = status => {
    switch (status.toLowerCase()) {
      case "pending":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "expired":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      default:
        break;
    }
  };

  const CrmAppointmentSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "70px",
    },
    {
      name: "Customer",
      key: "customer",
      description: "Enter name of Company",
      selector: row => row.customer,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    {
      name: "Title",
      key: "title",
      description: "Enter Telestaff name",
      selector: row => row.title,
      sortable: true,
      required: true,
      inputType: "TEXT",
      //width: "80px",
    },
    {
      name: "Date",
      key: "date",
      description: "Enter bills",
      selector: row => row.date,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Time",
      key: "time",
      description: "Enter name of Disease",
      selector: (row, i) => row.time,
      sortable: true,
      required: true,
      inputType: "DATE",
      //width: "80px",
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

  const handleRow = () => {};

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
          <DatePicker
            selected={startDate}
            onChange={date => handleDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Filter By Date"
            isClearable
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
            Create Appointment
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
            columns={CrmAppointmentSchema}
            data={dummyData}
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
