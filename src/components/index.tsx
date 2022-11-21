import {Box, Button, Typography} from "@mui/material";
import keyBy from "lodash/keyBy";
import React, {useEffect, useState, useContext} from "react";
import {ObjectContext} from "../context";

import {Models} from "../hsmodules/app/Constants";
import Breadcrumbs from "./breadcrumb";
import useRepository from "./hooks/repository";
import LocationModal from "./inputs/LocationModal";
import LocationSelect from "./inputs/LocationSelect";
import ProfileMenu from "./profilemenu";
import {Profile, TopMenuWrapper} from "./styles";
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

  const handleChangeLocation = (location: string) => {
    switch (location.toLowerCase()) {
      case "finance":
        // setState(prev => ({
        //   ...prev,
        //   financeModule: {...prev.financeModule, selectedFinance: {}},
        // }));
        console.log("work in progress");
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
            <Typography
              sx={{color: "#000000"}}
            >{`@ ${state.employeeLocation.locationName} ${state.employeeLocation.locationType}`}</Typography>
            <Button
              size="medium"
              variant="contained"
              sx={{textTransform: "capitalize", marginLeft: "10px"}}
              onClick={() =>
                handleChangeLocation(state.employeeLocation.locationType)
              }
            >
              Change {state.employeeLocation.locationType}
            </Button>
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
