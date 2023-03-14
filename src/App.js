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
import ActionLoader from "./components/action-loader/Action-Loader";

function App() {
  const [state, setState] = useState({
    CorporateModule: {
      selectedPolicy: {},
      selectedClaim: {},
      selectedBeneficiary: {},
    },
    ClaimsModule: {
      selectedClaim: {},
      selectedService: {},
    },
    PreAuthModule: {
      selectedPreAuth: {},
      selectedService: {},
    },
    CommunicationModule: {
      defaultEmail: {},
      configEmailModal: false,
    },
    NotificationModule: {
      selectedNotification: {},
    },

    PremiumModule: {
      selectedPremium: {},
      selectedPlans: [],
    },

    OrganizationModule: {
      selectedOrganization: {},
    },
    ComplaintModule: {
      selectedComplaint: {},
    },
    ProposalModule: {
      selectedProposal: {},
    },
    SLAModule: {
      selectedSLA: {},
    },
    BankAccountModule: {
      selectedBankAccount: {},
    },
    InvoiceModule: {
      selectedInvoice: {},
      selectedPlan: {},
      selectedBankAccount: {},
    },
    CRMAppointmentModule: {
      selectedAppointment: {},
    },
    DealModule: {
      selectedDeal: {},
    },
    TaskModule: {
      selectedTask: {},
    },

    ContactModule: {
      selectedContact: {},
    },
    StaffModule: {
      selectedStaff: {},
    },
    actionLoader: {
      open: false,
      message: "",
    },

    sideMenu: {
      open: true,
    },

    facilityModule: {
      show: "list",
      selectedFacility: {},
      currentFacility: {},
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
      selectedSignal: {},
      locationModal: false,
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
      locationModal: false,
    },
    RadiologyModule: {
      show: "list",
      selectedRadiology: {},
      locationModal: false,
    },
    LaboratoryModule: {
      show: "list",
      selectedLab: {},
      locationModal: false,
    },
    InventoryModule: {
      show: "list",
      selectedInventory: {},
      locationModal: false,
    },
    TheatreModule: {
      show: "list",
      selectedTheatre: {},
      locationModal: false,
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
      locationModal: false,
    },
    FrontDesk: {
      show: "list",
      selectedFrontDesk: {},
      locationModal: false,
    },
    ClientModule: {
      show: "list",
      selectedClient: {},
      clientPolicy: {},
      locationModule: false,
    },
    DocumentClassModule: {
      show: "list",
      selectedDocumentClass: {},
      encounter_right: false,
    },
    WardModule: {
      show: "list",
      selectedWard: {},
      locationModal: false,
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
      selectedCheckedIn: {},
      show: "list",
      selectedAppointment: {},
      selectedPatient: null,
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
    TariffModule: {
      show: "list",
      selectedContracts: {},
    },
    financeModule: {
      show: "list",
      state: "false",
      selectedFinance: {},
      locationModal: false,
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
      individuals: [],
      familyPolicies: [],
      individualPolicies: [],
      others: {},
      show: "list",
    },
    currBeneficiary: "",

    coordinates: {
      longitude: "",
      latitude: "",
    },
  });

  useEffect(() => {
    gsap.to("body", 0, {css: {visibility: "visible"}});
  }, []);

  const [theme] = useState("light");
  //TODO:  Handle  with  appropriate button
  // const themeToggler = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light');
  // };

  const showActionLoader = (message = "") => {
    setState(prev => ({
      ...prev,
      actionLoader: {open: true, message: message},
    }));
  };
  const hideActionLoader = () => {
    setState(prev => ({
      ...prev,
      actionLoader: {open: false, message: ""},
    }));
  };

  const toggleSideMenu = () => {
    setState(prev => ({
      ...prev,
      sideMenu: {open: !prev.sideMenu.open},
    }));
  };

  return (
    <>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {/*  <ObjectProvider>
          <UserProvider> */}
          <ObjectContext.Provider
            value={{
              state,
              setState,
              showActionLoader,
              hideActionLoader,
              toggleSideMenu,
            }}
          >
            <MyUserProvider>
              <GlobalStyle />
              <ActionLoader />
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
