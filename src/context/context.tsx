import React, {
  useState,
  createContext,
  useMemo,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';

interface UserContextProps {
  user?: any;
}

const userDefaultValues: UserContextProps = {
  user: null,
};

interface ObjectContextProps {
  facilityModule: { show: string; selectedFacility: {} };
  // epidiologyModule: { show: string; selectedEpid: {} };
  bandModule: { show: string; selectedBand: {} };
  locationModule: { show: string; selectedLocation: {} };
  employeeModule: { show: string; selectedEmployee: {} };
}

const objectDefaultValues: ObjectContextProps = {
  facilityModule: {
    show: 'lists',
    selectedFacility: {},
  },
  bandModule: {
    show: 'lists',
    selectedBand: {},
  },
  locationModule: {
    show: 'lists',
    selectedLocation: {},
  },
  employeeModule: {
    show: 'lists',
    selectedEmployee: {},
  },
};

export const UserContext = createContext<UserContextProps>(userDefaultValues);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const memoedValue = useMemo(() => ({ user, setUser }), [user]);
  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

export const ObjectContext = createContext({
  module: objectDefaultValues as Partial<ObjectContextProps>,
  setModule: {} as Dispatch<SetStateAction<Partial<ObjectContextProps>>>,
});

export const ObjectProvider = ({
  children,
  value = objectDefaultValues as ObjectContextProps,
}: {
  children: React.ReactNode;
  value?: Partial<ObjectContextProps>;
}) => {
  const [module, setModule] = useState(value);
  // const memoedValue = useMemo(() => ({ state }), [state]);

  return (
    <ObjectContext.Provider value={{ module, setModule }}>
      {children}
    </ObjectContext.Provider>
  );
};

export const useObjectState = () => {
  const context = useContext(ObjectContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateContext');
  }
  return context;
};
