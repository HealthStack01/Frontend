import { createContext, useEffect, useState } from 'react';
import client from './feathers';

export default function MyUserProvider({ children }) {
  //const [data, setData] = useState(null)
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationType, setLocationType] = useState('Front Desk');

  useEffect(() => {
    (async () => {
      try {
        const resp = await client.reAuthenticate();
        //console.log(resp)
        await setUser(resp.user);
        /*   await setFacility(resp.user.currentEmployee.facilityDetail); */

        /* console.log("lastname:",  user.lastname)
            console.log("reauth tried")
            */
        return;
      } catch (error) {
        console.log(error);
        //navigate("/")
      }
    })();
  }, []);

  const { Provider } = UserContext;
  return (
    <Provider value={{ user, setUser, setLocationType }}>{children}</Provider>
  );
}

export const UserContext = createContext();
export const ObjectContext = createContext();
export const MessageContext = createContext();
