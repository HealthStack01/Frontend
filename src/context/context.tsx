import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

import { Views } from '../pages/app/Constants';
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
  dispensoryResource: {
    show: 'lists',
    selectedDispensory: {},
  },
  storeInventoryResource: {
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

  // Selected Documentation
  selectedDocumentation: '',

  // Communications
  channelResource: {
    show: 'lists',
    selectedChannel: {},
  },
  configurationResource: {
    show: 'lists',
    selectedConfiguration: {},
  },
  questionnaireResource: {
    show: 'lists',
    selectedQuestionnaire: {},
  },
  submissionResource: {
    show: 'lists',
    selectedSubmission: {},
  },
};

export const UserContext = createContext<UserContextProps>(userDefaultValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [facility, setFacility] = useState(null);
  const [location, setLocation] = useState({ name: 'Front Desk' });
  const [locationType, setLocationType] = useState('Front Desk');
  const memoedValue = useMemo(
    () => ({ user, setUser, facility, location, setLocation, locationType, setLocationType }),
    [user, location, locationType]
  );

  const authenticateUser = () => {
    return client
      .reAuthenticate()
      .then((resp) => {
        setUser({ ...resp.user });
        setFacility(resp.user.currentEmployee.facilityDetail);
      })
      .catch((error) => {
        console.error(`Cannot reauthenticate user with server at this time ${error}`);
        const savedUser = JSON.parse(localStorage.getItem('user'));
        setFacility(savedUser.currentEmployee.facilityDetail);
        setUser(savedUser);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>;
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

  return <ObjectContext.Provider value={{ resource, setResource }}>{children}</ObjectContext.Provider>;
}

export const useObjectState = () => {
  const context = useContext(ObjectContext);
  if (!context) {
    throw new Error('useObjectState must be used within a ObjectContext');
  }
  return context;
};
