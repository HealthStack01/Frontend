<<<<<<< HEAD
import { createContext, useEffect, useState } from 'react';
import client from './feathers';
=======
import { createContext, useEffect, useState } from "react";
import client from "./feathers";
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

export default function MyUserProvider({ children }) {
  //const [data, setData] = useState(null)
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
<<<<<<< HEAD
  const [locationType, setLocationType] = useState('Front Desk');
=======
  const [locationType, setLocationType] = useState("Front Desk");
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

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
<<<<<<< HEAD
=======
  // const setLocationType =() => {
  //     console.log("location")
  // }
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255

  const { Provider } = UserContext;
  return (
    <Provider value={{ user, setUser, setLocationType }}>{children}</Provider>
  );
}
<<<<<<< HEAD

=======
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
export const UserContext = createContext();
export const ObjectContext = createContext();
export const MessageContext = createContext();
