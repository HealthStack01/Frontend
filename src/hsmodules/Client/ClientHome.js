/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
/* import Store, {StoreList} from "./Clinic"; */
import {UserContext, ObjectContext} from "../../context";
import LocationSelect from "../../components/inputs/LocationSelect";
import LocationModal from "../../components/inputs/LocationModal";
import {Outlet} from "react-router-dom";
import FrontDesk, {FrontDeskList} from "./FrontDesk";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalBox from "../../components/modal";
import Button from "../../components/buttons/Button";

export default function ClientHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);
  // const { user, setUser } = useContext(UserContext);

  // console.log("Stored User", user);

  const [selectedClinic, setSelectedClinic] = useState(
    state.FrontDesk.selectedFrontDesk
  );

  useEffect(() => {
    const notSelected = Object.keys(selectedClinic).length === 0;

    if (notSelected) {
      handleChangeFrontDesk();
    }
    return () => {};
  }, []);

  const handleChangeFrontDesk = async () => {
    await setState(prev => ({
      ...prev,
      FrontDesk: {...prev.FrontDesk, locationModal: true},
    }));
  };

  const handleCloseLocationModule = () => {
    setState(prev => ({
      ...prev,
      FrontDesk: {...prev.FrontDesk, locationModal: false},
    }));
  };

  useEffect(() => {
    setSelectedClinic(state.FrontDesk.selectedFrontDesk);

    const newEmployeeLocation = {
      locationName: state.FrontDesk.selectedFrontDesk.name,
      locationType: "Front Desk",
      locationId: state.FrontDesk.selectedFrontDesk._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "client",
    };

    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.FrontDesk.selectedFrontDesk]);

  return (
    <div>
      <ModalBox open={state.FrontDesk.locationModal}>
        <Box
          sx={{
            maxWidth: "600px",
            maxHeight: "80vh",
          }}
        >
          <FrontDeskList
            standalone={true}
            closeModal={handleCloseLocationModule}
          />
        </Box>
      </ModalBox>

      {children}
      <Outlet />
    </div>
  );
}
