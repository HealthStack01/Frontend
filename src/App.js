import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import MyUserProvider from './context'
import {UserContext,ObjectContext} from './context'
/* import { ObjectProvider, UserProvider } from './context/context'; */
import AppRoutes from './hsmodules/routes';
import { GlobalStyle } from './ui/styled/global';
 import { darkTheme, lightTheme } from './ui/styled/theme';

function App() {

  const [state,setState] = useState({
    facilityModule:{
      show:'create',
      selectedFacility:{}
    },

    EmployeeModule:{
      show:'create',
      selectedEmployee:{}
    },
    ChartAccountModule:{
      show:'create',
      selectedAccount:{}
    },
    ExpenseModule:{
      show:'create',
      selectedExpense:{}
    },
    BankModule:{
      show:'create',
      selectedBank:{}
    },
    EpidemiologyModule:{
      show:'create',
      selectedEpid:{}
    },
    LocationModule:{
      show:'create',
      selectedLocation:{}
    },
    BandModule:{
      show:'create',
      selectedBand:{}
    },
    ProductModule:{
      show:'create',
      selectedProduct:{}
    },
    StoreModule:{
      show:'create',
      selectedStore:{}
    },
    InventoryModule:{
      show:'details',
      selectedInventory:{}
    },
    ProductEntryModule:{
      show:'create',
      selectedProductEntry:{}
    },
    ProductExitModule:{
      show:'create',
      selectedProductEntry:{}
    },
    ClinicModule:{
      show:'create',
      selectedClinic:{}
    },
    FrontDesk:{
      show:'create',
      selectedFrontDesk:{}
    },
    ClientModule:{
      show:'create',
      selectedClient:{}
    },
    DocumentClassModule:{
      show:'create',
      selectedDocumentClass:{}
    },
    WardModule:{
      show:'create',
      selectedWard:{}
    },
    AdmissionModule:{
      show:'create',
      selectedAdmission:{}
    },
    DischargeModule:{
      show:'create',
      selectedDischarge:{}
    },
    EndEncounterModule:{
      show:'',
      selectedEndEncounter:{}
    },
    AppointmentModule:{
      show:'create',
      selectedAppointment:{}
    },
    OrderModule:{
      show:'create',
      selectedOrder:{}
    },
    DispenseModule:{
      show:'create',
      selectedDispense:{}
    },
    DestinationModule:{
      show:'create',
      selectedDestination:{}
    },
    ManagedCareModule:{
      show:'create',
      selectedResource:{}
    },
    ManagedCare2Module:{
      show:'create',
      selectedResource:{}
    },
    medicationModule:{
      show:'create',
      selectedMedication:{}
    },
    ServicesModule:{
      show:'create',
      selectedServices:{}
    },
    financeModule:{
      show:'create',
      state:'false',
      selectedFinance:{}
    },
    currentClients:[],
    showpanel:false,
    currDate:"",
    currDate2:"",
    labFormType:"",
    employeeLocation:{
      locationName:"",
      locationType:"",
      locationId:"",
      facilityId:"",
      facilityName:""
    },
    NoteModule:{
      show:false,
      selectedNote:{}
    },
    SelectedClient:{
      client:{},
      show:'create'
    },
   Beneficiary:{
      principal:{},
      dependent:[],
      others:{},
      show:'create'
    },
    currBeneficiary:""



  })
  



  useEffect(() => {
    gsap.to('body', 0, { css: { visibility: 'visible' } });
  }, []);

  const [theme] = useState('light');
  //TODO:  Handle  with  appropriate button
  // const themeToggler = () => {
  //   theme === 'light' ? setTheme('dark') : setTheme('light');
  // };

  return (
    <>
   <ThemeProvider  theme={theme === 'light' ? lightTheme : darkTheme } > 
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>  */}
       {/*  <ObjectProvider>
          <UserProvider> */}
          <ObjectContext.Provider value={{state,setState}}>
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
      {/* </LocalizationProvider> */}
     </ThemeProvider> 
     </>
  );
}

export default App;
