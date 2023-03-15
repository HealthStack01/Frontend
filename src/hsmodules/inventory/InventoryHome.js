/* eslint-disable */
import React, {useState, useEffect, useContext} from "react";
import Store, {StoreList, StoreListStandalone} from "./Store";
import {UserContext, ObjectContext} from "../../context";
import {Outlet, useNavigate} from "react-router-dom";
import ModalBox from "../../components/modal";
import {Box} from "@mui/material";
import {toast} from "react-toastify";

export default function InventoryHome({children}) {
  // const [activeModal, setActiveModal]=useState("modal is-active ")
  const {state, setState} = useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);

  const employeeLocations = user.currentEmployee.locations || [];
  const inventoryLocations = employeeLocations.filter(
    item => item.locationType === "Store"
  );

  const location = state.InventoryModule.selectedInventory._id
    ? state.InventoryModule.selectedInventory
    : inventoryLocations[0];

  const [selectedInventory, setSelectedStore] = useState(location);

  const navigate = useNavigate();

  const noLocation = () => {
    toast.error(
      "You need to set an Inventory Location to access the Inventory Module"
    );
    navigate("/app");
  };

  useEffect(() => {
    if (!selectedInventory) return noLocation();
    const notSelected =
      selectedInventory && Object.keys(selectedInventory).length === 0;

    if (notSelected) {
      handleChangeStore();
    } else {
      const newEmployeeLocation = {
        locationName: selectedInventory.name,
        locationType: "Store",
        locationId: selectedInventory._id,
        facilityId: user.currentEmployee.facilityDetail._id,
        facilityName: user.currentEmployee.facilityDetail.facilityName,
        case: "inventory",
      };

      const newStoreModule = {
        selectedInventory: selectedInventory,
        show: "detail",
      };

      setState(prevstate => ({
        ...prevstate,
        employeeLocation: newEmployeeLocation,
        InventoryModule: newStoreModule,
      }));
    }
    return () => {};
  }, []);

  useEffect(() => {
    setSelectedStore(state.InventoryModule.selectedInventory);
    const newEmployeeLocation = {
      locationName: state.InventoryModule.selectedInventory.name,
      locationType: "Store",
      locationId: state.InventoryModule.selectedInventory._id,
      facilityId: user.currentEmployee.facilityDetail._id,
      facilityName: user.currentEmployee.facilityDetail.facilityName,
      case: "inventory",
    };
    setState(prevstate => ({
      ...prevstate,
      employeeLocation: newEmployeeLocation,
    }));
  }, [state.InventoryModule]);

  const handleChangeStore = async () => {
    await setState(prev => ({
      ...prev,
      InventoryModule: {...prev.InventoryModule, locationModal: true},
    }));
    // console.log( showModal)
  };

  const handleCloseLocationModal = () => {
    setState(prev => ({
      ...prev,
      InventoryModule: {...prev.InventoryModule, locationModal: false},
    }));
  };

  return (
    <section className="section remPadTop">
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            <ModalBox open={state.InventoryModule.locationModal}>
              <Box
                sx={{
                  maxWidth: "600px",
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
