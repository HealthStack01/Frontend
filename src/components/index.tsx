import {Box, Button, IconButton, Typography} from "@mui/material";
import keyBy from "lodash/keyBy";
import React, {useEffect, useState, useContext} from "react";
import {ObjectContext} from "../context";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import {Models} from "../hsmodules/app/Constants";
import Breadcrumbs from "./breadcrumb";
import GlobalCustomButton from "./buttons/CustomButton";
import useRepository from "./hooks/repository";
import LocationModal from "./inputs/LocationModal";
import LocationSelect from "./inputs/LocationSelect";
import ProfileMenu from "./profilemenu";
import {Profile, TopMenuWrapper} from "./styles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppNotifications from "./notifications/Notifications";
//import { avatar } from '../../assets/images/img_avatar.png';

const defaultList = [{code: "NG", label: "", location: ""}];

const TopMenu = () => {
  const [locationOptions, setLocationOptions] = useState(defaultList);
  const [locationsById, setLocationsById] = useState({});
  const {list, setFindQuery, facility, locationType, setLocation} =
    useRepository(Models.LOCATION);
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const {state, setState} = useContext(ObjectContext);

  const isOpen = state?.sideMenu?.open;

  //console.log(state);

  const closeSideMenu = () => {
    setState(prev => ({
      ...prev,
      sideMenu: {open: false},
    }));
  };

  const openSideMenu = () => {
    setState(prev => ({
      ...prev,
      sideMenu: {open: true},
    }));
  };

  const handleChangeLocation = (caseType: string) => {
    switch (caseType.toLowerCase()) {
      case "pharmacy":
        setState(prev => ({
          ...prev,
          StoreModule: {...prev.StoreModule, locationModal: true},
        }));
        break;

      case "client":
        setState(prev => ({
          ...prev,
          FrontDesk: {...prev.FrontDesk, locationModal: true},
        }));
        break;

      case "clinic":
        setState(prev => ({
          ...prev,
          ClinicModule: {...prev.ClinicModule, locationModal: true},
        }));
        break;

      case "epidemnology":
        setState(prev => ({
          ...prev,
          EpidemiologyModule: {...prev.EpidemiologyModule, locationModal: true},
        }));
        break;

      case "laboratory":
        setState(prev => ({
          ...prev,
          LaboratoryModule: {...prev.LaboratoryModule, locationModal: true},
        }));
        break;

      case "finance":
        setState(prev => ({
          ...prev,
          financeModule: {...prev.financeModule, locationModal: true},
        }));
        break;

      case "radiology":
        setState(prev => ({
          ...prev,
          RadiologyModule: {...prev.RadiologyModule, locationModal: true},
        }));
        break;

      case "inventory":
        setState(prev => ({
          ...prev,
          InventoryModule: {...prev.InventoryModule, locationModal: true},
        }));
        break;

      case "theatre":
        setState(prev => ({
          ...prev,
          TheatreModule: {...prev.TheatreModule, locationModal: true},
        }));
        break;

      case "ward":
        setState(prev => ({
          ...prev,
          WardModule: {...prev.WardModule, locationModal: true},
        }));
        break;

      default:
        break;
    }
  };

  /*                                                                                                                                                                                                                                          */

  /*  useEffect(() => {
    setSelectedLocation(null);
    setOpen(true);
    if (facility && locationType)
      setFindQuery({
        query: {
          facility: facility?._id,
          locationType,
          $sort: {
            name: 1,
          },
          $limit: 20,
        },
      });
  }, [facility, locationType]);
*/
  const handleSelectLocation = locationId => {
    setLocationOptions([]);
    setSelectedLocation(locationsById[locationId]);
    setLocation(locationsById[locationId]);
    setLocationOptions([
      ...locationOptions,
      {code: "NG", label: "No Location Selected", location: ""},
    ]);
  };

  return (
    <TopMenuWrapper>
      <div style={{display: "flex", alignItems: "center", flexWrap: "nowrap"}}>
        <Box mr={1.5} ml={-1}>
          {isOpen ? (
            <IconButton onClick={closeSideMenu}>
              <ArrowBackIcon sx={{fill: "#2d2d2d"}} />
            </IconButton>
          ) : (
            <IconButton onClick={openSideMenu}>
              <MenuIcon sx={{fill: "#2d2d2d"}} />
            </IconButton>
          )}
        </Box>

        <span className="breadcrumb">
          <Breadcrumbs />
        </span>
      </div>

      <Profile>
        {state.employeeLocation.locationName && (
          <Box sx={{display: "flex", alignItems: "center"}} mr={2}>
            <GlobalCustomButton
              sx={{
                color: "#000000",
                background: "#ffffff",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#ffffff",
                },
              }}
              onClick={() => handleChangeLocation(state.employeeLocation.case)}
            >
              <LocationOnIcon
                color="primary"
                fontSize="small"
                sx={{marginRight: "2px"}}
              />
              {`${state.employeeLocation.locationName} ${state.employeeLocation.locationType}`}
              <ArrowDropDownIcon fontSize="small" sx={{marginLeft: "5px"}} />
            </GlobalCustomButton>

            {/* <Button
              size="medium"
              variant="contained"
              sx={{textTransform: "capitalize", marginLeft: "10px"}}
              onClick={() =>
                handleChangeLocation(state.employeeLocation.locationType)
              }
            >
              Change {state.employeeLocation.locationType}
            </Button> */}
          </Box>
        )}

        <div className="profile-item">
          <AppNotifications />

          <ProfileMenu />
        </div>
      </Profile>
    </TopMenuWrapper>
  );
};

export default TopMenu;
