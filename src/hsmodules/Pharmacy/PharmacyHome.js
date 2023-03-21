/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Pharmacy, {PharmacyList, PharmacyListStandalone} from "./Pharmacy";
import {UserContext, ObjectContext} from "../../context";
import {Outlet, useNavigate} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import {toast} from "react-toastify";

export default function PharmacyHome({children}) {
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const employeeLocations = user.currentEmployee.locations || [];
  const pharmacyLocations = employeeLocations.filter(
    item => item.locationType === "Pharmacy"
  );

  const location = state.StoreModule.selectedStore._id
    ? state.StoreModule.selectedStore
    : pharmacyLocations[0];

  const [selectedStore, setSelectedStore] = useState(location);

  const handleCloseModal = () => [
    setState(prev => ({
      ...prev,
      StoreModule: {...prev.StoreModule, locationModal: false},
    })),
  ];

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error(
      "You need to set up a Pharmacy Location to access the Pharmacy Module"
    );
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedStore) return noLocation();
    const notSelected =
      selectedStore && Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
    } else {
      const newEmployeeLocation = {
        locationName: selectedStore.name,
        locationType: "Pharmacy",
        locationId: selectedStore._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "pharmacy",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        StoreModule: {
          ...prevstate.StoreModule,
          selectedStore: selectedStore,
        },
      }));
    }
    return () => {};
  }, []);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      StoreModule: {...prev.StoreModule, locationModal: true},
    }));
  };

  useEffect(() => {
    setSelectedStore(state.StoreModule.selectedStore);

    const newEmployeeLocation = {
      locationName: state.StoreModule.selectedStore.name,
      locationType: "Pharmacy",
      locationId: state.StoreModule.selectedStore._id,
      facilityId: user.currentEmployee?.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "pharmacy",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.StoreModule.selectedStore]);

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.StoreModule.locationModal}>
              <PharmacyListStandalone
                standalone={true}
                closeModal={handleCloseModal}
              />
            </ModalBox>
            {children}
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  );
}
