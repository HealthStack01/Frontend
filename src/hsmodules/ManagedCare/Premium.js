/* eslint-disable */
import React, {useState, useContext, useEffect} from "react";
import client from "../../feathers";
import moment from "moment";
import {useForm} from "react-hook-form";
import {UserContext, ObjectContext} from "../../context";
import "react-datepicker/dist/react-datepicker.css";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import CustomTable from "../../components/customtable";
import CalendarGrid from "../../components/calender";
import {Box, Grid} from "@mui/material";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../components/texts";
import EditIcon from "@mui/icons-material/Edit";
import MuiCustomDatePicker from "../../components/inputs/Date/MuiDatePicker";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomSelect from "../../components/inputs/basic/Select";
import Input from "../../components/inputs/basic/Input";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import {Stack} from "@mui/system";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import {PageCustomerDetail} from "../CRM/components/global/CustomerDetail";
import PremiumnsListComponent from "./components/premiums/PremiumList";
import PremiumComponentDetail from "./components/premiums/PremiumDetail";
// import Plans from '../CRM/Plans';

const PremiumModule = ({isTab}) => {
  const [currentView, setCurrentView] = useState("lists");

  const handleGoBack = () => {
    setCurrentView("lists");
  };
  return (
    <Stack>
      {currentView === "lists" && (
        <PremiumnsListComponent
          showDetailView={() => setCurrentView("details")}
          isTab={isTab}
        />
      )}

      {/* {currentView === "details" && (
        <PremiumComponentDetail handleGoBack={handleGoBack} />
      )} */}
    </Stack>
  );
};

export default PremiumModule;
