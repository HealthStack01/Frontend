import React from 'react';

import Breadcrumbs from '../breadcrumb';
import LocationSelect from '../inputs/LocationSelect';
import { Avatar, Profile, TopMenuWrapper } from './styles';

function TopMenu({ isOpen, handleClick }) {
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
          <LocationSelect />
        </div>

        <div className="profile-item">
          <i className="bi bi-bell-fill" />
          <Avatar src="/img_avatar.png" alt="" />
        </div>
      </Profile>
    </TopMenuWrapper>
  );
}

export default TopMenu;
