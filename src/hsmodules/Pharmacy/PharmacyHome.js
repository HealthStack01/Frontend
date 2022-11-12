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

  const [selectedStore, setSelectedStore] = useState(
    state.StoreModule.selectedStore
  );

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  useEffect(() => {
    // console.log("starting up Client module")
    //alert(!selectedClinic);

    const noObject = Object.keys(selectedStore).length === 0;

    if (noObject) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  const handleChangeStore = async () => {
    await setShowModal(true);
  };

  useEffect(() => {
    setSelectedStore(state.StoreModule.selectedStore);

    const newEmployeeLocation = {
      locationName: state.StoreModule.selectedStore.name,
      locationType: "Pharmacy",
      locationId: state.StoreModule.selectedStore._id,
      facilityId: user.currentEmployee?.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
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
            <ModalBox open={showModal} onClick={() => setShowModal(false)}>
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "450px",
                }}
              >
                <PharmacyListStandalone
                  standalone={true}
                  closeModal={() => setShowModal(false)}
                />
              </Box>
            </ModalBox>
            {children}
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  );
}
