import {createContext, useEffect, useState} from "react";
//import {useNavigate} from "react-router-dom";
import client from "./feathers";

export default function MyUserProvider({children}) {
  //const [data, setData] = useState(null)
  const [user, setUser] = useState(null);
  const [authenticatingUser, setAuthenticatingUser] = useState(true);

  //const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const resp = await client.reAuthenticate();
        console.log(resp);

        const user = {
          ...resp.user,
          currentEmployee: {...resp.user.employeeData[0]},
        };

        await setUser(user);

        setAuthenticatingUser(false);
        return;
      } catch (error) {
        console.log("User not authenticated", error);

        setAuthenticatingUser(false);
      }
    })();
  }, []);

  const {Provider} = UserContext;
  return (
    <Provider value={{user, setUser, authenticatingUser}}>{children}</Provider>
  );
}
export const UserContext = createContext();
export const ObjectContext = createContext();
export const MessageContext = createContext();
