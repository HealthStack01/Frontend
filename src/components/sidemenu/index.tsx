import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuItem from '../menuitem';
import { Lists } from '../menuitem/style';
import { MainMenu, Sidemenu, TopSection } from './styles';

export const menuItems = [
  {
    name: 'Overview',
    exact: true,
    to: '/app',
    iconClassName: 'bi bi-house-door',
  },
  {
    name: 'Client',
    exact: true,
    to: '/app/clients',
    iconClassName: 'bi bi-people',
    subMenus: [
      { name: 'Appointment', to: '/app/clients/appointments' },
      { name: 'Clients', to: '/app/clients/clients' },
    ],
  },
  {
    name: 'Clinic',
    exact: true,
    to: '/app/clinic',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Appointment', to: '/app/clinic/appointments' },
      { name: 'checkin', to: '/app/clinic/checkin' },
    ],
  },
  {
    name: 'Managed Care',
    exact: true,
    to: '/app/managedCare',
    iconClassName: 'bi bi-alarm',
    subMenus: [
      { name: 'Bill Client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/pharmacy/billprescription' },
      { name: 'Payment', to: '/app/pharmacy/payment' },
      { name: 'Dispensary', to: '/app/pharmacy/dispensary' },
      { name: 'Store Inventory', to: '/app/pharmacy/storeinventory' },
      { name: 'Product Entry', to: '/app/pharmacy/productentry' },
      { name: 'Issue Out', to: '/app/pharmacy/issueout' },
      { name: 'Requisiition', to: '/app/pharmacy/requisition' },
      { name: 'Transfer', to: '/app/pharmacy/transfer' },
    ],
  },
  {
    name: 'Finance',
    exact: true,
    to: '/app/finance',
    iconClassName: 'bi bi-cash',
    subMenus: [
      { name: 'Bill Client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders', to: '/app/laboratory/billlaborders' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/labresult' },
    ],
  },
  {
    name: 'Epidemiology',
    exact: true,
    to: '/',
    iconClassName: 'bi bi-bezier',
    subMenus: [
      { name: 'Case Definition', to: '/app/epidemiology/case-definition' },
      { name: 'Signals', to: '/app/epidemiology/signal' },
    ],
  },
  {
    name: 'Admin',
    exact: true,
    to: '/app/admin',
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Bands', to: '/app/admin/bands' },
      { name: 'Employees', to: '/app/admin/employees' },
      { name: 'Location', to: '/app/admin/location' },
    ],
  },
  {
    name: 'Communication',
    exact: true,
    to: '/app/communication',
    iconClassName: 'bi bi-rss',
    subMenus: [
      { name: 'Dashboard', to: '/app/epidemiology/dashboard' },
      { name: 'Case Definition', to: '/app/epidemiology/casedefinition' },
      { name: 'Signals', to: '/app/epidemiology/signal' },
      { name: 'Map', to: '/app/epidemiology/map' },
    ],
  },
  {
    name: 'Ward',
    exact: true,
    to: '/app/ward',
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Admission', to: '/app/ward/admissions' },
      { name: 'In-Patient', to: '/app/ward/inpatients' },
      { name: 'Discharge', to: '/app/ward/discharge' },
    ],
  },
  {
    name: 'Theatre',
    exact: true,
    to: '/app/theatre',
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Appointment', to: '/app/theatre/theatre-appointments' },
      { name: 'Check In', to: '/app/theatre/theatre-checkedin' },
      { name: 'Bill Client', to: '/app/theatre/billservice' },
      { name: 'Bill Order Sent', to: '/app/theatre/theatre-bill' },
    ],
  },
  {
    name: 'Logout',
    exact: true,
    to: '/',
    action: () => {
      localStorage.setItem('user', '');
    },
    iconClassName: 'bi bi-box-arrow-right',
  },
];

function SideMenu({ isOpen }) {
  const [inactive, setInactive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll('.sub-menu');
    }
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {};

  useEffect(() => {
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach((el) => {
      el.addEventListener('click', () => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove('active'));
        el.classList.toggle('active');

        if (next !== null) {
          next.classList.toggle('active');
        }
      });
    });
  }, []);

  return (
    <Sidemenu className={`side-menu ${!isOpen ? '' : 'hide'}`}>
      <TopSection>
        <h4>Our Hospital</h4>
      </TopSection>
      <MainMenu className="main-menu">
        <Lists>
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              subMenus={menuItem.subMenus || []}
              iconClassName={menuItem.iconClassName}
              onClick={() => {
                if (menuItem.action) {
                  menuItem.action();
                }
                if (menuItem.to && !menuItem.subMenus) {
                  navigate(menuItem.to);
                }
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </Lists>
      </MainMenu>
    </Sidemenu>
  );
}

export default SideMenu;
