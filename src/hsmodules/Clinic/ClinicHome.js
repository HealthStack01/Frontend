/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, ClinicList} from "./Clinic";
import {UserContext, ObjectContext} from "../../context";
import {Outlet, useNavigate} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import {toast} from "react-toastify";

export default function ClinicHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const employeeLocations = user.currentEmployee.locations || [];
  const clinics = employeeLocations.filter(
    item => item.locationType === "Clinic"
  );
  const location = state.ClinicModule.selectedClinic._id
    ? state.ClinicModule.selectedClinic
    : clinics[0];

  const [selectedClinic, setSelectedClinic] = useState(location);

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error(
      "You need to set up a Clinic Location to access the clinic Module"
    );
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedClinic) return noLocation();
    const notSelected =
      selectedClinic && Object.keys(selectedClinic).length === 0;

    if (notSelected) {
      handleChangeClinic();
    } else {
      const newEmployeeLocation = {
        locationName: selectedClinic.name,
        locationType: "Clinic",
        locationId: selectedClinic._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "clinic",
      };

      const newClinicModule = {
        selectedClinic: selectedClinic,
        show: "detail",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        ClinicModule: newClinicModule,
      }));
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedClinic(state.ClinicModule.selectedClinic);

    const newEmployeeLocation = {
      locationName: state.ClinicModule.selectedClinic.name,
      locationType: "Clinic",
      locationId: state.ClinicModule.selectedClinic._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "clinic",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.ClinicModule]);

  const handleChangeClinic = async () => {
    await setState(prev => ({
      ...prev,
      ClinicModule: {...prev.ClinicModule, locationModal: true},
    }));
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      ClinicModule: {...prev.ClinicModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="is-1"> Appointment sdchedule for patients for this clinic</div>
               <div className="is-1"> Communication Command Center</div>     */}
      <section className="hero is-info is-fullheight">
        <div className="layout__content-main">
          <ModalBox open={state.ClinicModule.locationModal}>
            <Box
              sx={{
                maxWidth: "600px",
                maxHeight: "80vh",
              }}
            >
              <ClinicList
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
