/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Theatre, {StoreList, StoreListStandalone} from "./Theatres";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function TheatreHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  // eslint-disable-next-line
  const [selectedStore, setSelectedStore] = useState(
    state.TheatreModule.selectedTheatre
  );
  const [showModal, setShowModal] = useState(false);

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
    setSelectedStore(state.TheatreModule.selectedTheatre);
    const newEmployeeLocation = {
      locationName: state.TheatreModule.selectedTheatre.name,
      locationType: state.TheatreModule.selectedTheatre.locationType,
      locationId: state.TheatreModule.selectedTheatre._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "theatre",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.TheatreModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      TheatreModule: {...prev.TheatreModule, locationModal: true},
    }));
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      TheatreModule: {...prev.TheatreModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.TheatreModule.locationModal}>
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
