import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import client from '../feathers';

interface UserContextProps {
  user?: any;
}

const userDefaultValues: UserContextProps = {
  user: null,
};

interface ObjectContextProps {
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
}

const objectDefaultValues: ObjectContextProps = {
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
};

export const UserContext = createContext<UserContextProps>(userDefaultValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const memoedValue = useMemo(() => ({ user, setUser }), [user]);

  const authenticateUser = () => {
    client
      .reAuthenticate()
      .then((resp) => {
        setUser({ ...resp.user, stacker: true });
      })
      .catch((error) => {
        console.error(error);
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
