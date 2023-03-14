/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Pharmacy, {PharmacyList, PharmacyListStandalone} from "./Pharmacy";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function PharmacyHome({children}) {
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);

<<<<<<< HEAD
  const [selectedStore, setSelectedStore] = useState(
    state.StoreModule.selectedStore
  );

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };
=======
  const employeeLocations = user.currentEmployee.locations || [];
  const pharmacyLocations = employeeLocations.filter(
    item => item.locationType === "Pharmacy"
  );

  const location = state.StoreModule.selectedStore._id
    ? state.StoreModule.selectedStore
    : pharmacyLocations[0];

  const [selectedStore, setSelectedStore] = useState(location);
>>>>>>> 6629424bb56c5124204d6f95a047225340175196

  const handleCloseModal = () => [
    setState(prev => ({
      ...prev,
      StoreModule: {...prev.StoreModule, locationModal: false},
    })),
  ];

  useEffect(() => {
<<<<<<< HEAD
    const notSelected = Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
=======
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
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
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
