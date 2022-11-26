import {Box, Button, Typography} from "@mui/material";
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
//import { avatar } from '../../assets/images/img_avatar.png';

const defaultList = [{code: "NG", label: "", location: ""}];

const TopMenu = ({isOpen, handleClick}) => {
  const [locationOptions, setLocationOptions] = useState(defaultList);
  const [locationsById, setLocationsById] = useState({});
  const {list, setFindQuery, facility, locationType, setLocation} =
    useRepository(Models.LOCATION);
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const {state, setState} = useContext(ObjectContext);

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
        <span
          onClick={handleClick}
          style={{
            fontSize: "1.2rem",
            marginRight: "1rem",
            fontWeight: "bold",
          }}
        >
          {!isOpen ? (
            <i className="bi bi-list"></i>
          ) : (
            <i className="bi bi-list" />
          )}
        </span>
        <span className="breadcrumb">
          <Breadcrumbs />
        </span>
      </div>

      <Profile>
        {/* <div className="location-selector">
          <LocationSelect
            defaultLocationId={selectedLocation?._id || ""}
            locations={locationOptions}
            onChange={handleSelectLocation}
          />
          {
            <LocationModal
              locations={locationOptions}
              onSelectLocation={handleSelectLocation}
              open={open}
              setOpen={setOpen}
            />
          }
        </div> */}

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
          <i className="bi bi-bell-fill" />
          {/* <Avatar src="/img_avatar.png" alt="" /> */}
          <ProfileMenu />
        </div>
      </Profile>
    </TopMenuWrapper>
  );
};

export default TopMenu;
