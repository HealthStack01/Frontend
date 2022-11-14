/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, StoreListStandalone} from "./Store";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";

export default function FinacneHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [storeModal, setStoreModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(
    state.financeModule.selectedFinance
  );

  // const handleCloseModal = () => {
  //   state.showStoreModal = "modal";
  //   setState(state);
  //   console.log(state.showStoreModal);

  useEffect(() => {
    const notSelected = Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.financeModule.selectedFinance);

    const newEmployeeLocation = {
      locationName: state.financeModule.selectedFinance.name,
      locationType: "Finance",
      locationId: state.financeModule.selectedFinance._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
    };

    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.financeModule]);

  const handleChangeStore = async () => {
    await setStoreModal(true);
    // console.log(showModal);
  };
  // };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={storeModal}>
              <Box
                sx={{
                  width: "600px",
                  height: "400px",
                }}
              >
                <StoreListStandalone
                  standalone={true}
                  closeModal={() => setStoreModal(false)}
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
