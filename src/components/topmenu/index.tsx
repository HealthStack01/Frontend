import keyBy from "lodash/keyBy";
import React, {useEffect, useState, useContext} from "react";
import {ObjectContext} from "../../context";

import {Models} from "../../hsmodules/app/Constants";
import Breadcrumbs from "../breadcrumb";
import useRepository from "../hooks/repository";
import LocationModal from "../inputs/LocationModal";
import LocationSelect from "../inputs/LocationSelect";
import ProfileMenu from "../profilemenu";
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

      <button>Hello World</button>

      <div>
        @ {state.employeeLocation.locationName}{" "}
        {state.employeeLocation.locationType}
      </div>

      <Profile>
        <div className="location-selector">
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
        </div>

        <div className="profile-item">
          <i className="bi bi-bell-fill" />

          <ProfileMenu />
        </div>
      </Profile>
    </TopMenuWrapper>
  );
};

export default TopMenu;
