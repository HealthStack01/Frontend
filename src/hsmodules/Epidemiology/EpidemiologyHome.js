/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, StoreListStandalone} from "./Signals";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function EpidemiologyHome({children}) {
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [storeModal, setStoreModal] = useState(false);

  const [selectedStore, setSelectedStore] = useState(
    state.StoreModule.selectedStore
  );

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  useEffect(() => {
    console.log("starting up epidemiology module");
    if (!selectedStore) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.StoreModule.selectedStore);
    const newEmployeeLocation = {
      locationName: state.StoreModule.selectedStore.name,
      locationType: state.StoreModule.selectedStore.locationType,
      locationId: state.StoreModule.selectedStore._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.StoreModule]);

  const handleChangeStore = async () => {
    await setStoreModal(true);
    // console.log(showModal);
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={storeModal}>
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "450px",
                }}
              >
                <StoreListStandalone
                  standalone={true}
                  closeModal={() => setStoreModal(false)}
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
