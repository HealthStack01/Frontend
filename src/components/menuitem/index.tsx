import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ListItem, Lists, MenuList } from './style';

interface MenuItemProps {
  name: string;
  subMenus: { name: string; to: string }[];
  onClick?: () => void;
  to: string;
  iconClassName?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  subMenus,
  onClick,
  iconClassName,
}) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <ListItem onClick={onClick}>
      <MenuList onClick={() => setExpand(!expand)} className="menu-item">
        <div className="menu-label">
          <div className="menu-label-right">
            <div className="menu-icon">
              <i className={iconClassName} />
            </div>
            <span style={{ fontSize: '0.75rem' }}>{name}</span>
          </div>

          {subMenus.length ? <i className="bi bi-chevron-down" /> : ''}
        </div>

        {subMenus && subMenus.length ? (
          <Lists className={`sub-menu ${expand ? 'active' : ''}`}>
            {subMenus.map((menu, index) => (
              <ListItem key={index}>
                <NavLink
                  to={menu.to}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                  }}
                >
                  {menu.name}
                </NavLink>
              </ListItem>
            ))}
          </Lists>
        ) : null}
      </MenuList>
    </ListItem>
  );
};

export default MenuItem;
