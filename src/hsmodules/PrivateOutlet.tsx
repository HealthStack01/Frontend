import {useContext, useEffect} from "react";
import {Navigate} from "react-router-dom";

import {GetUserLocation} from "../components/hooks/getUserLocation";

import {UserContext, ObjectContext} from "../context";
import Dashboard from "./Dashboard/Dashboard";

const PrivateOutlet = () => {
  // const { user: data } = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const {longitude, latitude} = GetUserLocation();

  const data = localStorage.getItem("user");
  const user = JSON.parse(data);

  useEffect(() => {
    setState(prev => ({
      ...prev,
      coordinates: {
        latitude,
        longitude,
      },
    }));
  }, [longitude, latitude, setState]);

  return user ? <Dashboard /> : <Navigate to="/" />;
};

export default PrivateOutlet;
