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
<<<<<<< HEAD
  // eslint-disable-next-line
  const [selectedLab, setSelectedLab] = useState(
    state.LaboratoryModule.selectedLab
  );
  const [showModal, setShowModal] = useState(false);

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  useEffect(() => {
    const notSelected = Object.keys(selectedLab).length === 0;

    if (notSelected) {
      handleChangeStore();
=======

  const employeeLocations = user.currentEmployee.locations || [];
  const labLocations = employeeLocations.filter(
    item => item.locationType === "Laboratory"
  );

  const location = state.LaboratoryModule.selectedLab._id
    ? state.LaboratoryModule.selectedLab
    : labLocations[0];

  const [selectedLab, setSelectedLab] = useState(location);

  useEffect(() => {
    const notSelected = selectedLab && Object.keys(selectedLab).length === 0;

    if (notSelected) {
      handleChangeStore();
    } else {
      const newEmployeeLocation = {
        locationName: selectedLab.name,
        locationType: "Laboratory",
        locationId: selectedLab._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "laboratory",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        LaboratoryModule: {
          ...prevstate.LaboratoryModule,
          selectedLab: selectedLab,
        },
      }));
>>>>>>> 6629424bb56c5124204d6f95a047225340175196
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedLab(state.LaboratoryModule.selectedLab);
    const newEmployeeLocation = {
      locationName: state.LaboratoryModule.selectedLab.name,
      locationType: state.LaboratoryModule.selectedLab.locationType,
      locationId: state.LaboratoryModule.selectedLab._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "laboratory",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.LaboratoryModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      LaboratoryModule: {...prev.LaboratoryModule, locationModal: true},
    }));
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      LaboratoryModule: {...prev.LaboratoryModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.LaboratoryModule.locationModal}>
              <Box
                sx={{
                  maxWidth: "500px",
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
