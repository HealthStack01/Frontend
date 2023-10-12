/* eslint-disable */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import CustomTable from "../../customtable";
import GlobalCustomButton from "../../buttons/CustomButton";
import client from "../../../feathers";
import { ObjectContext, UserContext } from "../../../context";
import { PageWrapper } from "../../../ui/styled/styles";
import { TableMenu } from "../../../ui/styled/global";
import FilterMenu from "../../utilities/FilterMenu";
import dayjs from "dayjs";

const CheckInsList = ({ showDetail, showCreate, module }) => {
  const appointmentsServer = client.service("appointments");
  const [appointments, setAppointments] = useState([]);
  const { state, setState } = useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");
  const [isCheckedIn, setIsCheckedIn] = useState(true);

  const handleRow = (appointment) => {
    console.log(appointment);
    setState((prev) => ({
      ...prev,
      AppointmentModule: {
        ...prev.AppointmentModule,
        selectedAppointment: appointment,
      },
    }));

    showDetail();
  };

  const handleSearch = (val) => {
    let query = {
      //  facility: user.currentEmployee.facilityDetail._id,
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
      appointment_status: isCheckedIn ? "Checked In" : "Checked Out",
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };
    // if (state.employeeLocation.locationType !== "Front Desk") {
    //   query.locationId = state.employeeLocation.locationId;
    // }

    appointmentsServer
      .find({ query: query })
      .then((res) => {
        setAppointments(res.data);
        //setFacilities(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Searching Client, probable network issues " + err);
      });
  };

  const getAppointments = useCallback(async () => {
    setLoading(true);
    let query = {
      "hmo._id": user.currentEmployee.facilityDetail._id,
      appointment_status: isCheckedIn ? "Checked In" : "Checked Out",
      $limit: 100,
      $sort: {
        createdAt: -1,
      },
    };

    if (user.stacker) {
      return;
    } else {
      const res = await appointmentsServer.find({ query: query });

      setAppointments(res.data);
      setLoading(false);
      console.log(res.data);
    }
  }, [state.employeeLocation, isCheckedIn]);

  useEffect(() => {
    getAppointments();

    appointmentsServer.on("created", (obj) => getAppointments());
    appointmentsServer.on("updated", (obj) => getAppointments());
    appointmentsServer.on("patched", (obj) => getAppointments());
    appointmentsServer.on("removed", (obj) => getAppointments());
  }, [getAppointments]);

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
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Client Name",
      key: "firstname",
      description: "First Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Provider",
      key: "firstname",
      description: "First Name",
      selector: (row) => `${row.facilityDetail.facilityName}`,
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
      selector: (row) => dayjs(row.start_time).format("DD/MM/YYYY HH:mm"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Class",
      key: "classification",
      description: "Classification",
      selector: (row) => row.appointmentClass,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Location",
      key: "location",
      description: "Location",
      selector: (row) => row.location_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Type",
      key: "type",
      description: "Type",
      selector: (row) => row.appointment_type,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Status",
      selector: (row) => row.appointment_status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Reason",
      key: "reason",
      description: "Reason",
      selector: (row) => row.appointment_reason,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Practitioner",
      key: "practitioner",
      description: "Practitioner",
      selector: (row) => row.practitioner_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <div className="level">
      <PageWrapper style={{ flexDirection: "column", padding: "0.6rem 1rem" }}>
        <TableMenu>
          <div style={{ display: "flex", alignItems: "center" }}>
            {handleSearch && (
              <div className="inner-table">
                <FilterMenu onSearch={handleSearch} />
              </div>
            )}
            <h2 style={{ margin: "0 10px", fontSize: "0.95rem" }}>
              List of {isCheckedIn ? "Chekced-In" : "Checked-Out"} Patients
            </h2>
          </div>

          <>
            {isCheckedIn ? (
              <GlobalCustomButton onClick={() => setIsCheckedIn(false)}>
                View Checked Out List
              </GlobalCustomButton>
            ) : (
              <GlobalCustomButton onClick={() => setIsCheckedIn(true)}>
                View Checked In List
              </GlobalCustomButton>
            )}
          </>
        </TableMenu>
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 180px)",
            overflow: "auto",
          }}
        >
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
        </div>
      </PageWrapper>
    </div>
  );
};

export default CheckInsList;
