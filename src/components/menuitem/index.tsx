import React, {useState, useContext} from "react";
import {Link} from "react-router-dom";
import {NavLink} from "react-router-dom";
import {UserContext} from "../../context";

import {ListItem, Lists, MenuList} from "./style";

interface MenuItemProps {
  name: string;
  subMenus: {name: string; to: string}[];
  onClick?: () => void;
  to: string;
  iconClassName?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  name,
  subMenus,
  onClick,
  iconClassName,
  to,
}) => {
  const [expand, setExpand] = useState<boolean>(false);
  const {user} = useContext(UserContext);

  const sortedSubMenus = subMenus.sort((a, b) => a.name.localeCompare(b.name));

  const roles = user?.currentEmployee?.roles || [];

  const isOrgAdmin = roles.includes("Admin") || [];

  const isCorporate =
    user.currentEmployee.facilityDetail.facilityType === "Corporate"
      ? true
      : false;

  //console.log(isOrgAdmin);

  const rolesSubMenu = isOrgAdmin
    ? sortedSubMenus
    : sortedSubMenus.filter(item => {
        if (roles.includes(`${name} ${item.name}`)) {
          return item;
        } else if (item.name === "Dashboard") {
          return item;
        }
      });

  const orgTypeSubMenu = isCorporate
    ? rolesSubMenu.filter(
        item => item.name !== "Location" && item.name !== "Bands"
      )
    : rolesSubMenu;

  return (
    <NavLink
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
      }}
    >
      <ListItem onClick={onClick}>
        <MenuList className="menu-item">
          <div className="menu-label" onClick={() => setExpand(prev => !prev)}>
            <div className="menu-label-right">
              <div className="menu-icon">
                <i className={iconClassName} />
              </div>
              <span style={{fontSize: "0.75rem"}}>{name}</span>
            </div>

            {subMenus.length ? <i className="bi bi-chevron-down" /> : ""}
          </div>

          {subMenus && subMenus.length ? (
            <Lists className={`sub-menu ${expand ? "active" : ""}`}>
              {orgTypeSubMenu.map((menu, index) => (
                <ListItem key={index}>
                  <NavLink
                    to={menu.to}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontSize: "0.9rem",
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
    </NavLink>
  );
};

export default MenuItem;
