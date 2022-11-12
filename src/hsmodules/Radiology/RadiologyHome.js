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
    state.StoreModule.selectedStore
  );
  const [showModal, setShowModal] = useState(false);

  // const handleCloseModal=()=>{
  //     state.showStoreModal  =  "modal"
  //     setState(state)
  //     console.log( state.showStoreModal)
  // }

  useEffect(() => {
    if (!selectedStore) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.StoreModule.selectedStore);
    const newEmployeeLocation = {
      locationName: state.StoreModule.selectedStore.name,
      locationType: state.StoreModule.selectedStore.locationType,
      locationId: state.StoreModule.selectedStore._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.StoreModule]);

  const handleChangeStore = async () => {
    await setShowModal(true);
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={showModal}>
              <Box
                sx={{
                  width: "600px",
                  maxHeight: "450px",
                }}
              >
                <StoreListStandalone
                  standalone={true}
                  closeModal={() => setShowModal(false)}
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
