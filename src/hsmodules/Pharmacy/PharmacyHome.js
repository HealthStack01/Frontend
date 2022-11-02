/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Pharmacy, {PharmacyList, PharmacyListStandalone} from "./Pharmacy";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";

export default function PharmacyHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const [open, setOpen] = useState(false);
  const {user, setUser} = useContext(UserContext);

  const [selectedClinic, setSelectedClinic] = useState(
    state.FrontDesk.selectedFrontDesk
  );

  const handleCloseModal = () => {
    state.showStoreModal = "modal";
    setState(state);
    console.log(state.showStoreModal);
  };

  useEffect(() => {
    // console.log("starting up Client module")
    if (!selectedClinic) {
      handleChangeClinic();
    }
    return () => {};
  }, []);

  const handleChangeClinic = async () => {
    await setShowModal(true);
    await setOpen(true);
    // console.log( showModal)
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSelectedStore(state.StoreModule.selectedStore);

    const newEmployeeLocation = {
      locationName: state.StoreModule.selectedStore.name,
      locationType: "Pharmacy",
      locationId: state.StoreModule.selectedStore._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.StoreModule.selectedStore]);

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Pharmacy Module</h1>
            <h2 className="subtitle">Have fun working today!</h2>
          </div>
          <div className="layout__content-main">
            <ModalBox open={open}>
              <PharmacyListStandalone
                standalone="true"
                closeModal={() => setOpen(false)}
              />
            </ModalBox>
            {children}
            <Outlet />
          </div>
        </div>
      </section>
    </section>
  );
}
