/* eslint-disable */
//import logo from './logo.svg';
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
/* import Home from './components/Home' */
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState, useContext, useEffect } from "react";
import { UserContext, ObjectContext } from "./context";
import MyUserProvider from "./context";
import client from "./feathers";

/* import 'bulma/css/bulma.css' */
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  const [state, setState] = useState({
    facilityModule: {
      show: "create",
      selectedFacility: {},
    },

    EmployeeModule: {
      show: "create",
      selectedEmployee: {},
    },
    ChartAccountModule: {
      show: "create",
      selectedAccount: {},
    },
    ExpenseModule: {
      show: "create",
      selectedExpense: {},
    },
    BankModule: {
      show: "create",
      selectedBank: {},
    },
    EpidemiologyModule: {
      show: "create",
      selectedEpid: {},
    },
    LocationModule: {
      show: "create",
      selectedLocation: {},
    },
    BandModule: {
      show: "create",
      selectedBand: {},
    },
    ProductModule: {
      show: "create",
      selectedProduct: {},
    },
    StoreModule: {
      show: "create",
      selectedStore: {},
    },
    InventoryModule: {
      show: "details",
      selectedInventory: {},
    },
    ProductEntryModule: {
      show: "create",
      selectedProductEntry: {},
    },
    ProductExitModule: {
      show: "create",
      selectedProductEntry: {},
    },
    ClinicModule: {
      show: "create",
      selectedClinic: {},
    },
    FrontDesk: {
      show: "create",
      selectedFrontDesk: {},
    },
    ClientModule: {
      show: "create",
      selectedClient: {},
    },
    DocumentClassModule: {
      show: "create",
      selectedDocumentClass: {},
    },
    WardModule: {
      show: "create",
      selectedWard: {},
    },
    AdmissionModule: {
      show: "create",
      selectedAdmission: {},
    },
    DischargeModule: {
      show: "create",
      selectedDischarge: {},
    },
    EndEncounterModule: {
      show: "",
      selectedEndEncounter: {},
    },
    AppointmentModule: {
      show: "create",
      selectedAppointment: {},
    },
    OrderModule: {
      show: "create",
      selectedOrder: {},
    },
    DispenseModule: {
      show: "create",
      selectedDispense: {},
    },
    DestinationModule: {
      show: "create",
      selectedDestination: {},
    },
    ManagedCareModule: {
      show: "create",
      selectedResource: {},
    },
    ManagedCare2Module: {
      show: "create",
      selectedResource: {},
    },
    medicationModule: {
      show: "create",
      selectedMedication: {},
    },
    ServicesModule: {
      show: "create",
      selectedServices: {},
    },
    financeModule: {
      show: "create",
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
      show: "create",
    },
    Beneficiary: {
      principal: {},
      dependent: [],
      others: {},
      show: "create",
    },
    currBeneficiary: "",
  });

  return (
    <ObjectContext.Provider value={{ state, setState }}>
      {/*  <UserContext.Provider value={{user,setUser}}> */}
      <MyUserProvider>
        <Router>
          <div className="App has-background-info">
            <Routes>
              <Route path="/signup" exact>
                <SignUp />
              </Route>
              <ProtectedRoute path="/app">
                <Home />
              </ProtectedRoute>
              <Route path="/" exact>
                <Login />
              </Route>
              <Route path="*">
                <div>404-not found</div>
              </Route>
            </Routes>
          </div>
        </Router>
      </MyUserProvider>
      {/* </UserContext.Provider> */}
    </ObjectContext.Provider>
  );
}

export default App;

// eslint-disable-next-line
const ProtectedRoute = ({ children, ...props }) => {
  // const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const check = async () => {
      if (!user) {
        (async () => {
          try {
            // First try to log in with an existing JWT
            const resp = await client.reAuthenticate();
            // console.log(resp)
            // const user1=await resp.user
            await setUser(resp.user);
            //navigate('/app')

            return;
          } catch (error) {
            // If that errors, log in with email/password
            // Here we would normally show a login page
            // to get the login information
            /* return await client.authenticate({
          strategy: 'local',
          email: 'hello@feathersjs.com',
          password: 'supersecret'
        }); */
            console.log(error);
          }
        })();
      }
    };
    check().then((resp) => {
      //console.log("testing")
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Route
      {...props}
      render={({ location }) => {
        return user /* fakeAuth.isAuthenticated === true */ ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
  /* user? <Route {...props}>{children}</Route>:<Redirect to='/'></Redirect> */
};
