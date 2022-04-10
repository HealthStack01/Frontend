import keyBy from 'lodash/keyBy';
import React, { useEffect, useState } from 'react';

import { Models } from '../../pages/app/Constants';
import Breadcrumbs from '../breadcrumb';
import useRepository from '../hooks/repository';
import LocationModal from '../inputs/LocationModal';
import LocationSelect from '../inputs/LocationSelect';
import ProfileMenu from '../profilemenu';
import { Profile, TopMenuWrapper } from './styles';
// import { avatar } from '../../assets/images/img_avatar.png';

const defaultList = [
  { code: 'NG', label: 'Lagos/Gbagada', location: 'Gbagada' },
  { code: 'NG', label: 'Lagos/Ikoyi', location: 'Ikoyi' },
  { code: 'NG', label: 'Ibadan', location: 'Ibadan' },
];

const TopMenu = ({ isOpen, handleClick }) => {
  const [locationOptions, setLocationOptions] = useState(defaultList);
  const [locationsById, setLocationsById] = useState({});
  const { list, setFindQuery, facility, locationType, setLocation } = useRepository(Models.LOCATION);
  const [selectedLocation, setSelectedLocation] = useState<any>();

  useEffect(() => {
    setLocationsById(keyBy(list, (obj: any) => obj._id));
    setLocationOptions(list.map(({ _id, name }) => ({ code: 'NG', label: name, location: _id })));
  }, [list]);

  useEffect(() => {
    setFindQuery({
      query: {
        facility: facility?._id,
        locationType: 'Front Desk',
        $sort: {
          name: 1,
        },
      },
    });
  }, [facility, locationType]);

  const handleSelectLocation = (locationId) => {
    setLocationOptions([]);
    setSelectedLocation(locationsById[locationId]);
    setLocation(locationsById[locationId]);
    setLocationOptions([...locationOptions]);
  };

  return (
    <TopMenuWrapper>
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap' }}>
        <span
          onClick={handleClick}
          style={{
            fontSize: '1.2rem',
            marginRight: '1rem',
            fontWeight: 'bold',
          }}
        >
          {!isOpen ? <i className="bi bi-list"></i> : <i className="bi bi-list" />}
        </span>
        <span className="breadcrumb">
          <Breadcrumbs />
        </span>
      </div>
      <Profile>
        <div className="location-selector">
          <LocationSelect
            defaultLocationId={selectedLocation?._id || ''}
            locations={locationOptions}
            onChange={handleSelectLocation}
          />
          {!selectedLocation && <LocationModal locations={locationOptions} onSelectLocation={handleSelectLocation} />}
        </div>

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
