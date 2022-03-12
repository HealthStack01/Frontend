import React from 'react';

import Breadcrumbs from '../breadcrumb';
import { Avatar, Profile, TopMenuWrapper } from './styles';
// import { avatar } from '../../assets/images/img_avatar.png';

function TopMenu({ isOpen, handleClick }) {
  return (
    <TopMenuWrapper>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          onClick={handleClick}
          style={{
            fontSize: '1.2rem',
            marginRight: '1rem',
            fontWeight: 'bold',
          }}
        >
          {!isOpen ? <i className="bi bi-x"></i> : <i className="bi bi-list" />}
        </span>
        <Breadcrumbs />
      </div>
      <Profile>
        <span>
          @workspace.com
          {/* Pass employee location context */}
        </span>
        <i className="bi bi-bell-fill" />
        <Avatar src="/img_avatar.png" alt="" />
      </Profile>
    </TopMenuWrapper>
  );
}

export default TopMenu;
