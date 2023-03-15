/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList} from "./Clinic";
import {UserContext, ObjectContext} from "../../context";
import {Outlet, useNavigate} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import Ward, {WardList} from "./Ward";
import {toast} from "react-toastify";

export default function WardHome({children}) {
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const employeeLocations = user.currentEmployee.locations || [];
  const wardLocations = employeeLocations.filter(
    item => item.locationType === "Ward"
  );

  const location = state.WardModule.selectedWard._id
    ? state.WardModule.selectedWard
    : wardLocations[0];

  const [selectedWard, setSelectedWard] = useState(location);

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error("You need to set up a Ward Location to access the Ward Module");
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedWard) return noLocation();
    const notSelected = selectedWard && Object.keys(selectedWard).length === 0;

    if (notSelected) {
      handleChangeWard();
    } else {
      const newEmployeeLocation = {
        locationName: selectedWard.name,
        locationType: "Ward",
        locationId: selectedWard._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "ward",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        WardModule: {
          ...prevstate.WardModule,
          selectedWard: selectedWard,
        },
      }));
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedWard(state.WardModule.selectedWard);

    const newEmployeeLocation = {
      locationName: state.WardModule.selectedWard.name,
      locationType: "Ward",
      locationId: state.WardModule.selectedWard._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "ward",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.WardModule.selectedWard]);

  const handleChangeWard = async () => {
    await setState(prev => ({
      ...prev,
      WardModule: {...prev.WardModule, locationModal: true},
    }));
    // console.log( showModal)
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      WardModule: {...prev.WardModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="is-1"> Appointment sdchedule for patients for this clinic</div>
               <div className="is-1"> Communication Command Center</div>     */}
      <section className="hero is-info is-fullheight">
        <div className="hero-body"></div>
        <div className="layout__content-main">
          <ModalBox open={state.WardModule.locationModal}>
            <Box
              sx={{
                maxWidth: "600px",
                maxHeight: "80vh",
              }}
            >
              <WardList
                standalone={true}
                closeModal={handleCloseLocationModal}
              />
            </Box>
          </ModalBox>
          {children}
          <Outlet />
        </div>
      </section>
    </section>
  );
}
