import React, {useEffect, useState} from "react";
import "react-toastify/dist/ReactToastify.css";

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {AnimatePresence} from "framer-motion";
import gsap from "gsap";
import {BrowserRouter as Router} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {ThemeProvider} from "styled-components";
import MyUserProvider from "./context";
import {UserContext, ObjectContext} from "./context";
/* import { ObjectProvider, UserProvider } from './context/context'; */
import AppRoutes from "./hsmodules/routes";
import {GlobalStyle} from "./ui/styled/global";
import {darkTheme, lightTheme} from "./ui/styled/theme";

function App() {
  const [state, setState] = useState({
    facilityModule: {
      show: "list",
      selectedFacility: {},
    },

    EmployeeModule: {
      show: "list",
      selectedEmployee: {},
    },
    ChartAccountModule: {
      show: "list",
      selectedAccount: {},
    },
    ExpenseModule: {
      show: "list",
      selectedExpense: {},
    },
    BankModule: {
      show: "list",
      selectedBank: {},
    },
    EpidemiologyModule: {
      show: "list",
      selectedEpid: {},
    },
    LocationModule: {
      show: "list",
      selectedLocation: {},
    },
    BandModule: {
      show: "list",
      selectedBand: {},
    },
    ProductModule: {
      show: "list",
      selectedProduct: {},
    },
    StoreModule: {
      show: "list",
      selectedStore: {},
    },
    InventoryModule: {
      show: "details",
      selectedInventory: {},
    },
    ProductEntryModule: {
      show: "list",
      selectedProductEntry: {},
    },
    ProductExitModule: {
      show: "list",
      selectedProductEntry: {},
    },
    ClinicModule: {
      show: "list",
      selectedClinic: {},
    },
    FrontDesk: {
      show: "list",
      selectedFrontDesk: {},
    },
    ClientModule: {
      show: "list",
      selectedClient: {},
    },
    DocumentClassModule: {
      show: "list",
      selectedDocumentClass: {},
      encounter_right: false,
    },
    WardModule: {
      show: "list",
      selectedWard: {},
    },
    AdmissionModule: {
      show: "list",
      selectedAdmission: {},
    },
    DischargeModule: {
      show: "list",
      selectedDischarge: {},
    },
    EndEncounterModule: {
      show: "",
      selectedEndEncounter: {},
    },
    AppointmentModule: {
      show: "list",
      selectedAppointment: {},
    },
    OrderModule: {
      show: "list",
      selectedOrder: {},
    },
    DispenseModule: {
      show: "list",
      selectedDispense: {},
    },
    DestinationModule: {
      show: "list",
      selectedDestination: {},
    },
    ManagedCareModule: {
      show: "list",
      selectedResource: {},
    },
    ManagedCare2Module: {
      show: "list",
      selectedResource: {},
    },
    medicationModule: {
      show: "list",
      selectedMedication: {},
    },
    ServicesModule: {
      show: "list",
      selectedServices: {},
    },
    financeModule: {
      show: "list",
      state: "false",
      selectedFinance: {},
    },
    currentClients: [],
    showpanel: false,
    currDate: "",
    currDate2: "",
    labFormType: "",
    employeeLocation: {
      locationName: "",
      locationType: "",
      locationId: "",
      facilityId: "",
      facilityName: "",
    },
    NoteModule: {
      show: false,
      selectedNote: {},
    },
    SelectedClient: {
      client: {},
      show: "list",
    },
    Beneficiary: {
      principal: {},
      dependent: [],
      others: {},
      show: "list",
    },
    currBeneficiary: "",
  });

  useEffect(() => {
    gsap.to("body", 0, {css: {visibility: "visible"}});
  }, []);

  const [theme] = useState("light");
  //TODO:  Handle  with  appropriate button
  // const themeToggler = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light');
  // };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/*  <ObjectProvider>
          <UserProvider> */}
          <ObjectContext.Provider value={{state, setState}}>
            <MyUserProvider>
              <GlobalStyle />
              <AnimatePresence initial exitBeforeEnter>
                <Router>
                  <AppRoutes />
                </Router>
              </AnimatePresence>
              {/* </UserProvider>
        </ObjectProvider> */}
            </MyUserProvider>
          </ObjectContext.Provider>
          <ToastContainer limit={1} />
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
