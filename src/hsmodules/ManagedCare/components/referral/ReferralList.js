import React, { useState, useContext, useEffect, useCallback } from "react";
import client from "../../../../feathers";
import { UserContext, ObjectContext } from "../../../../context";
import { format, subDays, addDays } from "date-fns";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import { PageWrapper } from "../../../../ui/styled/styles";
import { TableMenu } from "../../../../ui/styled/global";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import CustomTable from "../../../../components/customtable";
import Switch from "../../../../components/switch";
import { BsFillGridFill, BsList } from "react-icons/bs";
import CalendarGrid from "../../../../components/calender";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";

export function ReferralList({ showDetail, showCreate, setSelectedReferral }) {
  const ReferralServ = client.service("referral");
  const [facilities, setFacilities] = useState([]);
  const { state, setState } = useContext(ObjectContext);
  const { user, setUser } = useContext(UserContext);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("list");
  const [referralListData, setReferralListData] = useState([]);

  const handleCreateNew = async () => {
    showCreate();
  };

  const handleRow = async (referral) => {
    setState((prev) => ({
      ...prev,
      ReferralModule: {
        ...prev.ReferralModule,
        selectedReferral: referral,
      },
      ClientModule: {
        ...prev.ClientModule,
        selectedClient: referral.client,
      },
    }));
    showDetail();
    setSelectedReferral(referral);
  };

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

    ReferralServ.find({ query: query })
      .then((res) => {
        console.log("===>>search referral data", { res });
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

  const getReferralList = useCallback(async () => {
    console.log("===>>>> getlist ", {});
    setLoading(true);
    if (user.currentEmployee) {
      let query = {
        source_orgId: user.currentEmployee.facilityDetail._id,
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      };
      const resp = await ReferralServ.find({ query: query });
      setReferralListData(resp.data);
      setLoading(false);
      // console.log("===>>>> response ", { resp });
    } else {
      if (user.stacker) {
        const resp = await ReferralServ.find({
          query: {
            $limit: 100,
            $sort: {
              createdAt: -1,
            },
          },
        });

        setReferralListData(resp.data);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    getReferralList();
  }, [getReferralList]);

  const activeStyle = {
    backgroundColor: "#0064CC29",
    border: "none",
    padding: "0 .8rem",
  };

  const dummyData = [
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },

    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
    {
      date: "27/10/21",
      patients_name: "Tejiri Tabor",
      policy_id: "234.75.43.01",
      referral_code: "324234 - AC",
      referral_provider: "Creek Hospital",
      destination_provider: "Creek Hospital",
      status: "Approved",
      reason_for_request: "Lorem ipsum dolor",
    },
  ];

  const ReferralSchemaold = [
    {
      name: "Date",
      key: "date",
      description: "Enter date",
      selector: (row) => row.date,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Patients Name",
      key: "patients_name",
      description: "Enter patients name",
      selector: (row) => row.patients_name,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy ID",
      key: "policy_id",
      description: "Enter policy ID",
      selector: (row) => row.policy_id,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Referral Code",
      key: "referral_code",
      description: "Enter referral code",
      selector: (row) => row.referral_code,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Referral Provider",
      key: "referral_provider",
      description: "Enter referral provider",
      selector: (row, i) => row.referral_provider,
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Destination Provider",
      key: "destination_provider",
      description: "Enter destination provider",
      selector: (row, i) => row.destination_provider,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter your status",
      selector: (row, i) => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Reason for Request",
      key: "reason_for_request",
      description: "Enter the reason for the request",
      selector: (row, i) => row.reason_for_request,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  const ReferralSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "sn",
      selector: (row, i) => i + 1,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Date",
      key: "date",
      description: "Enter date",
      selector: (row, i) => dayjs(row.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Patients Name",
      key: "patients_name",
      description: "Enter patients name",
      selector: (row) => `${row.client?.lastname} ${row.client?.firstname}`,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy ID",
      key: "policy_id",
      description: "Enter policy ID",
      selector: (row) => row.policy?._id,
      sortable: true,
      required: false,
      inputType: "TEXT",
    },
    {
      name: "Referral Code",
      key: "referralNo",
      description: "Enter referral code",
      selector: (row) => row.referralNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Referral Provider",
      key: "referral_provider",
      description: "Enter referral provider",
      selector: (row, i) => row.source_org?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Destination Provider",
      key: "destination_provider",
      description: "Enter destination provider",
      selector: (row, i) => row.dest_org?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Status",
      key: "status",
      description: "Enter your status",
      selector: (row, i) => row.status,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Reason for Request",
      key: "referralReason",
      description: "Enter the reason for the request",
      selector: (row, i) => row.referralReason,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];
  const conditionalRowStyles = [
    {
      when: (row) => row.status === "approved",
      style: {
        color: "red",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "ongoing",
      style: {
        color: "rgba(0,0,0,.54)",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "pending",
      style: {
        color: "pink",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.status === "declined",
      style: {
        color: "purple",
        backgroundColor: "green",
        "&:hover": {
          cursor: "pointer",
        },
      },
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
                    Referral
                  </h2>
                  {/* <DatePicker
                      selected={startDate}
                      onChange={(date) => handleDate(date)}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Filter By Date"
                      isClearable
                    /> */}
                  {/* <SwitchButton /> */}
                  {/* <Switch>
                      <button
                        value={value}
                        onClick={() => {
                          setValue('list');
                        }}
                        style={value === 'list' ? activeStyle : {}}
                      >
                        <BsList style={{ fontSize: '1rem' }} />
                      </button>
                      <button
                        value={value}
                        onClick={() => {
                          setValue('grid');
                        }}
                        style={value === 'grid' ? activeStyle : {}}
                      >
                        <BsFillGridFill style={{ fontSize: '1rem' }} />
                      </button>
                    </Switch> */}
                </div>

                {handleCreateNew && (
                  <GlobalCustomButton onClick={handleCreateNew}>
                    <AddCircleOutline
                      sx={{ marginRight: "5px" }}
                      fontSize="small"
                    />
                    Add New Referral
                  </GlobalCustomButton>
                )}
              </TableMenu>
              {value === "list" ? (
                <CustomTable
                  title={""}
                  columns={ReferralSchema}
                  data={referralListData}
                  pointerOnHover
                  highlightOnHover
                  striped
                  onRowClicked={handleRow}
                  progressPending={loading}
                />
              ) : (
                <CalendarGrid appointments={mapFacilities()} />
              )}
            </PageWrapper>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}
