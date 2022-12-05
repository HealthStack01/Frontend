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
import OldLeadDetail from "./components/lead/LeadDetail";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {Box} from "@mui/material";
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
        />
      )}

      {currentView === "detail" && <LeadDetail handleGoBack={handleGoBack} />}

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create New Lead"
      >
        <LeadsCreate closeModal={() => setCreateModal(false)} />
      </ModalBox>
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

export function LeadList({openCreateModal, openDetailModal, showDetail}) {
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
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    openCreateModal(true);
  };

  const handleRow = async data => {
    //openDetailModal();
    showDetail();
  };

  const handleSearch = val => {};

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
              data={dummyData}
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
