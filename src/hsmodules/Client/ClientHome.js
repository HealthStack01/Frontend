/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
/* import Store, {StoreList} from "./Clinic"; */
import {UserContext, ObjectContext} from "../../context";
import LocationSelect from "../../components/inputs/LocationSelect";
import LocationModal from "../../components/inputs/LocationModal";
import {Outlet, useNavigate} from "react-router-dom";
import FrontDesk, {FrontDeskList} from "./FrontDesk";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ModalBox from "../../components/modal";
import {toast} from "react-toastify";

export default function ClientHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const employeeLocations = user.currentEmployee.locations || [];
  const frontDesks = employeeLocations.filter(
    item => item.locationType === "Front Desk"
  );

  const location = state.FrontDesk.selectedFrontDesk._id
    ? state.FrontDesk.selectedFrontDesk
    : frontDesks[0];

  const [selectedClinic, setSelectedClinic] = useState(location);

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error(
      "You need to set up a Client Location to access the Client Module"
    );
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedClinic) return noLocation();
    const notSelected =
      selectedClinic && Object.keys(selectedClinic).length === 0;

    if (notSelected) {
      handleChangeFrontDesk();
    } else {
      const newEmployeeLocation = {
        locationName: selectedClinic.name,
        locationType: "Front Desk",
        locationId: selectedClinic._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "client",
      };

      const newClinicModule = {
        selectedFrontDesk: selectedClinic,
        show: "detail",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        FrontDesk: newClinicModule,
      }));
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
