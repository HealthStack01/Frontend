import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link, ListItem, Lists } from './style';

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
  to,
  iconClassName,
}) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <ListItem onClick={onClick}>
      <Link onClick={() => setExpand(!expand)} to={to} className='menu-item'>
        <div className='menu-label'>
          <div className='menu-label-right'>
            <div className='menu-icon'>
              <i className={iconClassName}></i>
            </div>
            <span>{name}</span>
          </div>

          {subMenus.length > 0 ? <i className='bi bi-chevron-down'></i> : ''}
        </div>

        {subMenus && subMenus.length > 0 ? (
          <Lists className={`sub-menu ${expand ? 'active' : ''}`}>
            {subMenus.map((menu, index) => (
              <ListItem key={index}>
                <NavLink
                  to={menu.to}
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  {menu.name}
                </NavLink>
              </ListItem>
            ))}
          </Lists>
        ) : null}
      </Link>
    </ListItem>
  );
};

export default MenuItem;
