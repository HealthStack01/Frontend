import React, { useEffect, useState } from 'react';

import { Models } from '../../pages/app/Constants';
import Breadcrumbs from '../breadcrumb';
import useRepository from '../hooks/repository';
import LocationSelect from '../inputs/LocationSelect';
import { Avatar, Profile, TopMenuWrapper } from './styles';

const defaultList = [
  { code: 'NG', label: 'Lagos/Gbagada', location: 'Gbagada' },
  { code: 'NG', label: 'Lagos/Ikoyi', location: 'Ikoyi' },
  { code: 'NG', label: 'Ibadan', location: 'Ibadan' },
];

const TopMenu = ({ isOpen, handleClick }) => {
  const [locations, setLocations] = useState(defaultList);
  const { list, setFindQuery, facility, locationType, setLocationType } = useRepository(Models.LOCATION);

  useEffect(() => {
    setLocations(list.map(({ _id, name }) => ({ code: 'NG', label: name, location: _id })));
  }, [list]);

  useEffect(() => {
    setFindQuery({
      query: {
        facility: facility?._id,
        locationType,
        $sort: {
          name: 1,
        },
      },
    });
  }, [facility, locationType]);

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
          <LocationSelect locations={locations} onChange={setLocationType} />
        </div>

        <div className="profile-item">
          <i className="bi bi-bell-fill" />
          <Avatar src="/img_avatar.png" alt="" />
        </div>
      </Profile>
    </TopMenuWrapper>
  );
};

export default TopMenu;
