/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, StoreListStandalone} from "./Labs";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function LaboratoryHome({children}) {
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(
    state.StoreModule.selectedStore
  );
  const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  useEffect(() => {
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
    await setShowModal(true);
    //console.log(showModal);
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Laboratory Module</h1>
            <h2 className="subtitle">Have fun working today!</h2>
          </div>
          <div className="layout__content-main">
            <ModalBox open={showModal}>
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "450px",
                }}
              >
                <StoreListStandalone
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
