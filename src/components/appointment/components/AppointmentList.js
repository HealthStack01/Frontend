/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import AddIcon from "@mui/icons-material/Add";
import {toast} from "react-toastify";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import CustomTable from "../../customtable";
import Switch from "../../switch";
import {BsFillGridFill, BsList} from "react-icons/bs";
import CalendarGrid from "../../calender";
import GlobalCustomButton from "../../buttons/CustomButton";
import client from "../../../feathers";
import {ObjectContext, UserContext} from "../../../context";
import MuiClearDatePicker from "../../inputs/Date/MuiClearDatePicker";
import {PageWrapper} from "../../../ui/styled/styles";
import {TableMenu} from "../../../ui/styled/global";
import FilterMenu from "../../utilities/FilterMenu";
import dayjs from "dayjs";

const AppointmentList = ({showDetail, showCreate, module}) => {
  const appointmentsServer = client.service("appointments");
  const [appointments, setAppointments] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");

  const handleRow = appointment => {
    setState(prev => ({
      ...prev,
      AppointmentModule: {
        ...prev.AppointmentModule,
        selectedAppointment: appointment,
      },
    }));

    showDetail();
  };

  const handleSearch = val => {
    let query = {
      facility: user.currentEmployee.facilityDetail._id,
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

    appointmentsServer
      .find({query: query})
      .then(res => {
        setAppointments(res.data);
        //setFacilities(res.data);
      })
      .catch(err => {
        console.log(err);
        toast.error("Error Searching Client, probable network issues " + err);
      });
  };

  const getAppointments = useCallback(async () => {
    setLoading(true);
    let query = {
      facility: user.currentEmployee.facilityDetail._id,
      $limit: 100,
      location_type: module,
      $sort: {
        createdAt: -1,
      },
    };
    if (state.employeeLocation.locationType !== "Front Desk") {
      query.locationId = state.employeeLocation.locationId;
    }

    if (startDate) {
      query.start_time = {
        $gt: subDays(startDate, 1),
        $lt: addDays(startDate, 1),
      };
    }

    if (user.stacker) {
      return;
    } else {
      const res = await appointmentsServer.find({query: query});
      setAppointments(res.data);
      setLoading(false);
    }
  }, [state.employeeLocation, startDate]);

  useEffect(() => {
    getAppointments();

    appointmentsServer.on("created", obj => getAppointments());
    appointmentsServer.on("updated", obj => getAppointments());
    appointmentsServer.on("patched", obj => getAppointments());
    appointmentsServer.on("removed", obj => getAppointments());
  }, [getAppointments]);

  const mapFacilities = () => {
    let mapped = [];
    appointments.map((facility, i) => {
      mapped.push({
        title: `Name: ${facility?.firstname} ${
          facility?.lastname
        }. Age: ${formatDistanceToNowStrict(
          new Date(facility?.dob)
        )}. Gender: ${facility?.gender}. Phone: ${facility?.phone}. Email: ${
          facility?.email
        }`,
        startDate: dayjs(facility.start_time).format("DD/MM/YYYY, hh:mm"),
        id: i,
        location: facility?.location_name,
        content: "Test",
      });
    });
    return mapped;
  };

  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const tableColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Client Name",
      key: "firstname",
      description: "First Name",
      selector: row => `${row.firstname} ${row.lastname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Appointment Time",
      key: "date",
      description: "Date/Time",
      selector: row => dayjs(row.start_time).format("DD/MM/YYYY HH:mm"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Class",
      key: "classification",
      description: "Classification",
      selector: row => row.appointmentClass,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Location",
      key: "location",
      description: "Location",
      selector: row => row.location_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Type",
      key: "type",
      description: "Type",
      selector: row => row.appointment_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: row => row.appointment_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Reason",
      key: "reason",
      description: "Reason",
      selector: row => row.appointment_reason,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Practitioner",
      key: "practitioner",
      description: "Practitioner",
      selector: row => row.practitioner_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div className="level">
      <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
        <TableMenu>
          <div style={{display: "flex", alignItems: "center"}}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>
              Appointments
            </h2>
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

          <GlobalCustomButton onClick={showCreate}>
            <AddIcon
              fontSize="small"
              sx={{
                marginRight: "5px",
              }}
            />
            Add New
          </GlobalCustomButton>
        </TableMenu>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 180px)",
            overflow: "auto",
          }}
        >
          {value === "list" ? (
            <CustomTable
              title={""}
              columns={tableColumns}
              data={appointments}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
            />
          ) : (
            <CalendarGrid appointments={mapFacilities()} />
          )}
        </div>
      </PageWrapper>
    </div>
  );
};

export default AppointmentList;
