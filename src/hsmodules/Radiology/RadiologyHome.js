/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Radiology, {StoreList, StoreListStandalone} from "./Radiologys";
import {Outlet} from "react-router-dom";
import {UserContext, ObjectContext} from "../../context";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function RadiologyHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(
    state.RadiologyModule.selectedRadiology
  );
  const [showModal, setShowModal] = useState(false);

  // const handleCloseModal=()=>{
  //     state.showStoreModal  =  "modal"
  //     setState(state)
  //     console.log( state.showStoreModal)
  // }

  useEffect(() => {
    const notSelected = Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.RadiologyModule.selectedRadiology);
    const newEmployeeLocation = {
      locationName: state.RadiologyModule.selectedRadiology.name,
      locationType: state.RadiologyModule.selectedRadiology.locationType,
      locationId: state.RadiologyModule.selectedRadiology._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "radiology", //Added so can be used in the switch case function later to change location..
    };

    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.RadiologyModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      RadiologyModule: {...prev.RadiologyModule, locationModal: true},
    }));
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      RadiologyModule: {...prev.RadiologyModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.RadiologyModule.locationModal}>
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
