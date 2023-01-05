import {useState, useContext, useEffect, useCallback} from "react";
import {Box} from "@mui/system";
import {BsFillGridFill, BsList} from "react-icons/bs";
import DatePicker from "react-datepicker";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import FilterMenu from "../../../../components/utilities/FilterMenu";
import Switch from "../../../../components/switch";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import CalendarGrid from "../../../../components/calender";
import CustomTable from "../../../../components/customtable";
import {ObjectContext, UserContext} from "../../../../context";
import dayjs from "dayjs";
import MuiClearDatePicker from "../../../../components/inputs/Date/MuiClearDatePicker";
import client from "../../../../feathers";
import {toast} from "react-toastify";

var isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

const AppointmentList = ({openCreateModal, openDetailModal, isTab}) => {
  const dealServer = client.service("deal");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState("list");
  const [loading, setLoading] = useState(false);
  const [mapFacilities, setMapFacilities] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleSearch = async value => {
    if (isTab) {
      const appointments = state.DealModule.selectedDeal.appointments;

      const filteredAppointments = appointments.filter(appointment => {
        const searchVal = value.toLowerCase();
        if (
          appointment.customerName.toLowerCase().includes(searchVal) ||
          appointment.title.toLowerCase().includes(searchVal) ||
          appointment.status.toLowerCase().includes(searchVal) ||
          appointment.information.toLowerCase().includes(searchVal)
        ) {
          return appointment;
        }
      });

      setAppointments(filteredAppointments);
    } else {
      const testId = "60203e1c1ec8a00015baa357";
      const facId = user.currentEmployee.facilityDetail_id;

      const res =
        testId === facId
          ? await dealServer.find({})
          : await dealServer.find({
              query: {
                facilityId: facId,
              },
            });

      const deals = res.data;

      const promises = deals.map(async deal => deal.appointments || []);

      const appointmentsList = await Promise.all(promises);

      const finalAppointments = appointmentsList.flat(1);

      const filteredAppointments = finalAppointments.filter(appointment => {
        const searchVal = value.toLowerCase();
        if (
          appointment.customerName.toLowerCase().includes(searchVal) ||
          appointment.title.toLowerCase().includes(searchVal) ||
          appointment.status.toLowerCase().includes(searchVal) ||
          appointment.information.toLowerCase().includes(searchVal)
        ) {
          return appointment;
        }
      });

      setAppointments(filteredAppointments);
    }
  };

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

  const getAppointmentsForPage = useCallback(async () => {
    console.log("hello world");
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail._id;
    setLoading(true);

    const res =
      testId === facId
        ? await dealServer.find({})
        : await dealServer.find({
            query: {
              facilityId: facId,
            },
          });

    const deals = res.data;

    const promises = deals.map(async deal => deal.appointments || []);

    const appointmentsList = await Promise.all(promises);

    const totalAppointments = appointmentsList.flat(1);

    const finalAppointments = totalAppointments.filter(appointment => {
      if (dayjs(appointment.createdAt).isSameOrBefore(startDate, "day")) {
        return appointment;
      }
    });

    await setAppointments(finalAppointments);

    setLoading(false);
  }, [startDate]);

  useEffect(() => {
    if (isTab) {
      const appointemnts = state.DealModule.selectedDeal.appointments;
      const finalAppointments = appointemnts.filter(appointment => {
        if (dayjs(appointment.createdAt).isSameOrBefore(startDate, "day")) {
          return appointment;
        }
      });
      setAppointments(finalAppointments);
    } else {
      getAppointmentsForPage();
    }
  }, [
    state.DealModule.selectedDeal.appointments,
    getAppointmentsForPage,
    isTab,
    startDate,
  ]);

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
      name: "Date Created",
      key: "date",
      description: "Enter bills",
      selector: row => dayjs(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "150px",
    },
    {
      name: "Scheduled Date",
      key: "date",
      description: "Enter bills",
      selector: row => dayjs(row.date).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "150px",
    },
    {
      name: "Scheduled Time",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => dayjs(row.date).format("hh:mm A	"),
      sortable: true,
      required: true,
      inputType: "DATE",
      width: "150px",
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
      style: {
        textTransform: "capitalize",
      },
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

  const handleRow2 = data => {
    setState(prev => ({
      ...prev,
      CRMAppointmentModule: {
        ...prev.CRMAppointmentModule,
        selectedAppointment: data,
      },
    }));
    openDetailModal();
  };

  const handleRow = async data => {
    if (isTab) {
      setState(prev => ({
        ...prev,
        CRMAppointmentModule: {
          ...prev.CRMAppointmentModule,
          selectedAppointment: data,
        },
      }));
      openDetailModal();
      //showDetailView();
    } else {
      const id = data.dealId;
      await dealServer
        .get(id)
        .then(resp => {
          setState(prev => ({
            ...prev,
            DealModule: {...prev.DealModule, selectedDeal: resp},
            CRMAppointmentModule: {
              ...prev.CRMAppointmentModule,
              selectedAppointment: data,
            },
          }));
          //showDetailView();
          openDetailModal();
        })
        .catch(err => {
          toast.error("An error occured trying to view details of Appointment");
          console.log(err);
        });
      //console.log("is page");
    }
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

        {isTab && (
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
