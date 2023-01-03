/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import CustomTable from "../../components/customtable";
import CalendarGrid from "../../components/calender";
import ModalBox from "../../components/modal";

import LeadsCreate from "./components/lead/LeadCreate";
import LeadAssignStaff from "./components/lead/AssignTask";
import LeadDetail from "./components/lead/LeadDetailView";
//import OldLeadDetail from "./components/lead/LeadDetail";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box, Typography} from "@mui/material";
import client from "../../feathers";
import dayjs from "dayjs";
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
  const [currentView, setCurrentView] = useState("lists");

  const handleGoBack = () => {
    setCurrentView("lists");
  };

  return (
    <Box>
      {currentView === "lists" && (
        <LeadList
          openCreateModal={() => setCreateModal(true)}
          openDetailModal={() => setDetailModal(true)}
          showDetail={() => setCurrentView("detail")}
          showCreate={() => setCurrentView("create")}
        />
      )}

      {currentView === "detail" && <LeadDetail handleGoBack={handleGoBack} />}

      {currentView === "create" && (
        <LeadsCreate
          closeModal={() => setCreateModal(false)}
          handleGoBack={handleGoBack}
        />
      )}
      {/* 
      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create New Lead"
      >
        <LeadsCreate closeModal={() => setCreateModal(false)} />
      </ModalBox> */}
      {/* 
      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Lead Detail"
      >
        <LeadDetail closeModal={() => setDetailModal(false)} />
      </ModalBox> */}
    </Box>
  );
}

export function LeadList({openCreateModal, showCreate, showDetail}) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedClient, setSelectedClient] = useState(); //
  // eslint-disable-next-line
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);
  const dealServer = client.service("deal");

  const handleCreateNew = async () => {
    showCreate(true);
  };

  const delId = "63a38c888348d400163e51a6";

  const handleRow = async data => {
    setState(prev => ({
      ...prev,
      DealModule: {...prev.DealModule, selectedDeal: data},
    }));
    showDetail();
    //dealServer.remove(delId);
    console.log(data);
  };

  const handleSearch = val => {};

  const getFacilities = async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail_id;

    showActionLoader();

    const res =
      testId === facId
        ? await dealServer.find({})
        : await dealServer.find({
            query: {
              facilityId: facId,
            },
          });

    await setFacilities(res.data);
    //console.log(res.data);
    hideActionLoader();
  };

  const updateFacilities = async () => {
    const testId = "60203e1c1ec8a00015baa357";
    const facId = user.currentEmployee.facilityDetail_id;

    //showActionLoader();

    const res =
      testId === facId
        ? await dealServer.find({})
        : await dealServer.find({
            query: {
              facilityId: facId,
            },
          });

    await setFacilities(res.data);
    console.log(res.data);
    //hideActionLoader();
  };

  useEffect(() => {
    getFacilities();

    dealServer.on("created", obj => updateFacilities());
    dealServer.on("updated", obj => updateFacilities());
    dealServer.on("patched", obj => updateFacilities());
    dealServer.on("removed", obj => updateFacilities());
  }, []);

  const returnCell = status => {
    switch (status?.toLowerCase()) {
      case "open":
        return <span style={{color: "#17935C"}}>{status}</span>;

      case "pending":
        return <span style={{color: "#0364FF"}}>{status}</span>;

      case "closed":
        return <span style={{color: "red"}}>{status}</span>;

      default:
        break;
    }
  };

  const LeadSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row, i) => i + 1,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Customer Name",
      key: "sn",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.name}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
      style: {
        color: "#1976d2",
        textTransform: "capitalize",
      },
    },
    {
      name: "Customer Type",
      key: "type",
      description: "Enter Telestaff name",
      selector: row => row?.type,
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },

    {
      name: "Phone",
      key: "phone",
      description: "Enter name of Company",
      selector: row => row?.phone,
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },

    {
      name: "Email",
      key: "email",
      description: "Enter name of Company",
      selector: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.email}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "HIDDEN",
    },
    // {
    //   name: "Telestaff Name",
    //   key: "telestaff_name",
    //   description: "Enter Telestaff name",
    //   selector: row => row.telestaff_name,
    //   sortable: true,
    //   required: true,
    //   inputType: "TEXT",
    // },
    {
      name: "Probability",
      key: "probability",
      description: "Enter bills",
      selector: row => row?.dealinfo?.probability,
      sortable: true,
      required: true,
      inputType: "TEXT",
      center: true,
    },
    {
      name: "Date Submitted",
      key: "date",
      description: "Enter name of Disease",
      selector: (row, i) => dayjs(row?.createdAt).format("DD/MM/YYYY"),
      sortable: true,
      required: true,
      inputType: "DATE",
    },
    {
      name: "Status",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => returnCell(row?.dealinfo?.currStatus),
      sortable: true,
      required: true,
      inputType: "TEXT",
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: "Next Action",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => (
        <Typography
          sx={{fontSize: "0.75rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row?.dealinfo?.nextAction}
        </Typography>
      ),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Size",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => row?.dealinfo?.size,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Weight Forecast",
      key: "dealinfo",
      description: "Enter bills",
      selector: "status",
      cell: row => row?.dealinfo?.weightForecast,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <>
      <div className="level">
        <PageWrapper style={{flexDirection: "column", padding: "0.6rem 1rem"}}>
          <TableMenu>
            <div style={{display: "flex", alignItems: "center"}}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{margin: "0 10px", fontSize: "0.95rem"}}>Leads</h2>
            </div>

            <GlobalCustomButton onClick={handleCreateNew}>
              <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
              Add new Lead
            </GlobalCustomButton>
          </TableMenu>
          <div style={{width: "100%", overflow: "auto"}}>
            <CustomTable
              title={""}
              columns={LeadSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleRow}
              progressPending={loading}
              //conditionalRowStyles={conditionalRowStyles}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}
