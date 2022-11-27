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
    state.EpidemiologyModule.selectedEpid
  );

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  useEffect(() => {
    const notSelected = Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.EpidemiologyModule.selectedEpid);

    const newEmployeeLocation = {
      locationName: state.EpidemiologyModule.selectedEpid.name,
      locationType: state.EpidemiologyModule.selectedEpid.locationType,
      locationId: state.EpidemiologyModule.selectedEpid._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "epidemnology",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.EpidemiologyModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      EpidemiologyModule: {...prev.EpidemiologyModule, locationModal: true},
    }));
    // console.log(showModal);
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      EpidemiologyModule: {...prev.EpidemiologyModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.EpidemiologyModule.locationModal}>
              <Box
                sx={{
                  maxWidth: "600px",
                  maxHeight: "80vh",
                }}
              >
                <StoreListStandalone
                  standalone={true}
                  closeModal={handleCloseLocationModal}
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
