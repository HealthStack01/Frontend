/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, StoreListStandalone} from "./Store";
import {UserContext, ObjectContext} from "../../context";
import {Outlet} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

export default function FinacneHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [storeModal, setStoreModal] = useState(false);

  const employeeLocations = user.currentEmployee.locations || [];
  const financeLocations = employeeLocations.filter(
    item => item.locationType === "Finance"
  );

  const location = state.financeModule.selectedFinance._id
    ? state.financeModule.selectedFinance
    : financeLocations[0];

  const [selectedStore, setSelectedStore] = useState(location);

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error(
      "You need to set a Finance Location to access the Finance Module"
    );
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedStore) return noLocation();
    const notSelected =
      selectedStore && Object.keys(selectedStore).length === 0;

    if (notSelected) {
      handleChangeStore();
    } else {
      const newEmployeeLocation = {
        locationName: selectedStore.name,
        locationType: "Finance",
        locationId: selectedStore._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "finance",
      };

      const newStoreModule = {
        selectedFinance: selectedStore,
        show: "detail",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        financeModule: newStoreModule,
      }));
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
      case: "finance",
    };

    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.financeModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      financeModule: {...prev.financeModule, locationModal: true},
    }));
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      financeModule: {...prev.financeModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.financeModule.locationModal}>
              <Box
                sx={{
                  maxWidth: "400px",
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
