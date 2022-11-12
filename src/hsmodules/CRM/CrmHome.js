/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
// import ModalBox from "../../components/modal";
// import { Box } from "@mui/material";

export default function CRMHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [showModal, setShowModal] = useState(false);
  const {user, setUser} = useContext(UserContext);
  const [selectedClinic, setSelectedClinic] = useState();
  // state.ClinicModule.selectedClinic

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);
  // };

  //   useEffect(() => {
  //     console.log("starting up CRM module");
  //     if (!selectedClinic) {
  //       handleChangeClinic();
  //     }
  //     return () => {};
  //   }, []);

  //   useEffect(() => {
  //     setSelectedClinic(state.ClinicModule.selectedClinic);

  //     const newEmployeeLocation = {
  //       locationName: state.ClinicModule.selectedClinic.name,
  //       locationType: "Clinic",
  //       locationId: state.ClinicModule.selectedClinic._id,
  //       facilityId: user.currentEmployee.facilityDetail._id,
  //       facilityName: user.currentEmployee.facilityDetail.facilityName,
  //     };
  //     setState((prevstate) => ({
  //       ...prevstate,
  //       employeeLocation: newEmployeeLocation,
  //     }));
  //   }, [state.ClinicModule]);

  //   const handleChangeClinic = async () => {
  //     await setShowModal(true);
  // console.log( showModal)
  //   };

  return (
    <section className="section remPadTop">
      {/*  <div className="is-1"> Appointment sdchedule for patients for this clinic</div>
               <div className="is-1"> Communication Command Center</div>     */}
      <section className="hero is-info is-fullheight">
        <div className="layout__content-main">
          {/* <ModalBox open={showModal} onClick={() => setShowModal(false)}>
            <Box
              sx={{
                width: "600px",
                maxHeight: "450px",
              }}
            >
              <ClinicList
                standalone={true}
                closeModal={() => setShowModal(false)}
              />
            </Box>
          </ModalBox>
          {children} */}
          <Outlet />
        </div>
      </section>
    </section>
  );
}
