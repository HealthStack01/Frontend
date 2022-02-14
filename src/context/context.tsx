import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { Views } from '../components/app/Constants';
import client from '../feathers';

interface UserContextProps {
  user?: any;
  setUser?: (_user: any) => void;
}

const userDefaultValues: UserContextProps = {
  user: null,
};

interface ObjectContextProps {
  appointmentResource: { show: string; selectedAppointment: {} };
  clientResource: { show: string; selectedClient: {} };

  facilityResource: { show: string; selectedFacility: {} };
  // epidiologyModule: { show: string; selectedEpid: {} };

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
  dispensaryResource: { show: string; selectedDispensary: {} };
  storyInventoryResource: { show: string; selectedStoreInventory: {} };
  productEntryResource: { show: string; selectedProductEntry: {} };
  posResource: { show: string; selectedPOS: {} };
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
    show: 'lists',
    selectedFacility: {},
  },
  bandResource: {
    show: 'lists',
    selectedBand: {},
  },
  locationResource: {
    show: 'lists',
    selectedLocation: {},
  },
  employeeResource: {
    show: 'lists',
    selectedEmployee: {},
  },

  // Finance
  billServicesResource: {
    show: 'lists',
    selectedBillService: {},
  },
  paymentsResource: {
    show: 'lists',
    selectedPayment: {},
  },
  revenuesResource: {
    show: 'lists',
    selectedRevenue: {},
  },
  collectionsResource: {
    show: 'lists',
    selectedCollection: {},
  },
  servicesResource: {
    show: 'lists',
    selectedService: {},
  },
  hmoAuthorizationsResource: {
    show: 'lists',
    selectedHMOAuthorization: {},
  },

  // Pharmacy
  billClientResource: {
    show: 'lists',
    selectedBillClient: {},
  },
  billPrescriptionSentResource: {
    show: 'lists',
    selectedBillPrescriptionSent: {},
  },
  dispensaryResource: {
    show: 'lists',
    selectedDispensary: {},
  },
  storyInventoryResource: {
    show: 'lists',
    selectedStoreInventory: {},
  },
  productEntryResource: {
    show: 'lists',
    selectedProductEntry: {},
  },
  posResource: {
    show: 'lists',
    selectedPOS: {},
  },
};

export const UserContext = createContext<UserContextProps>(userDefaultValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const memoedValue = useMemo(() => ({ user, setUser }), [user]);

  const authenticateUser = () => {
    return client
      .reAuthenticate()
      .then((resp) => {
        console.log('user re-authenticated succesfully');
        setUser({ ...resp.user, currentEmployee: resp.user.employeeData[0] });
      })
      .catch((error) => {
        console.error(
          `Cannot reauthenticate user with server at this time ${error}`
        );
        const user = localStorage.getItem('user');
        setUser(JSON.parse(user));
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
