/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";
import CreateSLA from "./components/SLA/CreateSLA";
import {SLAList} from "./components/SLA/SLAList";
import {Box} from "@mui/material";
import SLADetail from "./components/SLA/SLADetails";
// eslint-disable-next-line

export default function SLA() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [createModal, setCreateModal] = useState(false);
  const [currentView, setCurrentView] = useState("lists");

  const handleGoBack = () => {
    setCurrentView("lists");
  };

  return (
    <Box>
      {currentView === "lists" && (
        <SLAList
          showDetail={() => setCurrentView("detail")}
          showCreate={() => setCurrentView("create")}
        />
      )}

      {currentView === "create" && <CreateSLA handleGoBack={handleGoBack} />}

      {currentView === "detail" && <SLADetail handleGoBack={handleGoBack} />}
    </Box>
  );
}
