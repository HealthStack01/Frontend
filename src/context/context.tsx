import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Views } from '../pages/app/Constants';
import { FormType } from '../pages/app/schema/util';
import client from './feathers';

interface UserContextProps {
  user?: any;
  setUser?: (_user: any) => void;
  facility?: any;
  location?: any;
  setLocation?: (_location: any) => void;
  locationType?: any;
  setLocationType?: (_locationType: any) => void;
}

const userDefaultValues: UserContextProps = {
  user: null,
};

interface ObjectContextProps {
  appointmentResource: { show: string; selectedAppointment: {} };
  clientResource: { show: string; selectedClient: {} };

  facilityResource: { show: string; selectedFacility: {} };
  // epidiologyModule: { show: string; selectedEpid: {} };
  caseDefinitionResource: { show: string; selectedCaseDefinition };
  signalResource: { show: string; selectedSignal };

  // Admin Module
  bandResource: { show: string; selectedBand: {} };
  locationResource: { show: string; selectedLocation: {} };
  employeeResource: { show: string; selectedEmployee: {} };

  // Finance Module
  billServicesResource: { show: string; selectedBillService: {} };
  paymentsResource: { show: string; selectedPayment: {} };
  revenuesResource: { show: string; selectedRevenue: {} };
  collectionsResource: { show: string; selectedCollection: {} };
  servicesResource: { show: string; selectedService: {} };
  hmoAuthorizationsResource: { show: string; selectedHMOAuthorization: {} };

  // Pharmacy Module
  billClientResource: { show: string; selectedBillClient: {} };
  billPrescriptionSentResource: {
    show: string;
    selectedBillPrescriptionSent: {};
  };
  dispensoryResource: { show: string; selectedDispensory: {} };
  storeInventoryResource: { show: string; selectedStoreInventory: {} };
  productEntryResource: { show: string; selectedProductEntry: {} };
  posResource: { show: string; selectedPOS: {} };
  selectedDocumentation: string;

  //
  configurationResource: { show: string; selectedConfiguration: any };
  channelResource: { show: string; selectedChannel: any };
  questionnaireResource: { show: string; selectedQuestionnaire: any };
  submissionResource: { show: string; selectedSubmission: any };
}

const objectDefaultValues: ObjectContextProps = {
  // lient
  appointmentResource: {
    show: Views.LIST,
    selectedAppointment: {},
  },
  clientResource: {
    show: Views.LIST,
    selectedClient: {},
  },

  //Admin
  facilityResource: {
    show: FormType.LIST,
    selectedFacility: {},
  },
  bandResource: {
    show: FormType.LIST,
    selectedBand: {},
  },
  locationResource: {
    show: FormType.LIST,
    selectedLocation: {},
  },
  employeeResource: {
    show: FormType.LIST,
    selectedEmployee: {},
  },

  // Finance
  billServicesResource: {
    show: FormType.LIST,
    selectedBillService: {},
  },
  paymentsResource: {
    show: FormType.LIST,
    selectedPayment: {},
  },
  revenuesResource: {
    show: FormType.LIST,
    selectedRevenue: {},
  },
  collectionsResource: {
    show: FormType.LIST,
    selectedCollection: {},
  },
  servicesResource: {
    show: FormType.LIST,
    selectedService: {},
  },
  hmoAuthorizationsResource: {
    show: FormType.LIST,
    selectedHMOAuthorization: {},
  },

  // Pharmacy
  billClientResource: {
    show: FormType.LIST,
    selectedBillClient: {},
  },
  billPrescriptionSentResource: {
    show: FormType.LIST,
    selectedBillPrescriptionSent: {},
  },
  dispensoryResource: {
    show: FormType.LIST,
    selectedDispensory: {},
  },
  storeInventoryResource: {
    show: FormType.LIST,
    selectedStoreInventory: {},
  },
  productEntryResource: {
    show: FormType.LIST,
    selectedProductEntry: {},
  },
  posResource: {
    show: FormType.LIST,
    selectedPOS: {},
  },

  // Selected Documentation
  selectedDocumentation: '',

  //Epidemiology
  caseDefinitionResource: {
    show: FormType.LIST,
    selectedCaseDefinition: {},
  },
  signalResource: { show: FormType.LIST, selectedSignal: {} },

  // Communications
  channelResource: {
    show: FormType.LIST,
    selectedChannel: {},
  },
  configurationResource: {
    show: FormType.LIST,
    selectedConfiguration: {},
  },
  questionnaireResource: {
    show: FormType.LIST,
    selectedQuestionnaire: {},
  },
  submissionResource: {
    show: FormType.LIST,
    selectedSubmission: {},
  },
};

export const UserContext = createContext<UserContextProps>(userDefaultValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [facility, setFacility] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationType, setLocationType] = useState('Front Desk');
  const navigate = useNavigate();

  const memoedValue = useMemo(
    () => ({
      user,
      setUser,
      facility,
      location,
      setLocation,
      locationType,
      setLocationType,
    }),
    [user, location, locationType],
  );

  const authenticateUser = () => {
    return client
      .reAuthenticate()
      .then((resp) => {
        setUser({ ...resp.user });
        setFacility(resp.user.currentEmployee.facilityDetail);
      })
      .catch((error) => {
        console.warn(
          `Cannot reauthenticate user with server at this time ${error}`,
        );
        const userString = localStorage.getItem('user');
        if (userString) {
          const savedUser = userString && JSON.parse(userString);
          setFacility(savedUser.currentEmployee.facilityDetail);
          setUser(savedUser);
        } else {
          toast.info('Please login');
          navigate('/');
        }
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

export const ObjectContext = createContext({
  resource: objectDefaultValues as Partial<ObjectContextProps>,
  setResource: {} as Dispatch<SetStateAction<Partial<ObjectContextProps>>>,
});

export function ObjectProvider({
  children,
  value = objectDefaultValues as ObjectContextProps,
}: {
  children: React.ReactNode;
  value?: Partial<ObjectContextProps>;
}) {
  const [resource, setResource] = useState(value);
  // const memoedValue = useMemo(() => ({ state }), [state]);

  return (
    <ObjectContext.Provider value={{ resource, setResource }}>
      {children}
    </ObjectContext.Provider>
  );
}

export const useObjectState = () => {
  const context = useContext(ObjectContext);
  if (!context) {
    throw new Error('useObjectState must be used within a ObjectContext');
  }
  return context;
};
