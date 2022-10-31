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
      { name: 'Clinic List', to: '/app/clinic/clinics' },
    ],
  },
  {
    name: 'Appointments',
    exact: true,
    to: '/app/global-appointment',
    iconClassName: 'bi bi-calendar',
  },
  {
    name: 'Laboratory',
    exact: true,
    to: '/app/laboratory',
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      { name: 'Bill Client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders', to: '/app/laboratory/billlaborders' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/labresult' },
    ],
  },

  {
    name: 'Pharmacy',
    exact: true,
    to: '/app/pharmacy',
    iconClassName: 'bi bi-file-medical',
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
      { name: 'Bill Services', to: '/app/finance/billservices' },
      { name: 'Payment', to: '/app/finance/payment' },
      { name: 'Revenue', to: '/app/finance/revenue' },
      { name: 'Collections', to: '/app/finance/collections' },
      { name: 'Services', to: '/app/finance/services' },
      { name: 'HMO Authorization', to: '/app/finance/hmoauthorization' },
    ],
  },
  {
    name: 'Radiology',
    exact: true,
    to: '/app/radiology',
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      // {name: "Home", to: "/app/radiology"},
      // {name: "Radiology", to: "/app/radiology/radiology"},
      { name: 'Bill Client', to: '/app/radiology/billservice' },
      { name: 'Checked-In', to: '/app/radiology/checkedin' },
      { name: 'Appointment', to: '/app/radiology/appointments' },
      { name: 'Bill Lab Orders', to: '/app/radiology/radiology-bill' },
      // {name: "Payment", to: "/app/radiology/payment"},
      { name: 'Lab Result', to: '/app/radiology/radiology-result' },
    ],
  },
  // {
  //   name: "Managed Care",
  //   exact: true,
  //   to: "/",
  //   iconClassName: "bi bi-bezier",
  //   subMenus: [
  //     {name: "Case Definition", to: "/app/epidemiology/case-definition"},
  //     {name: "Signals", to: "/app/epidemiology/signal"},
  //   ],
  // },
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
    name: 'Inventory',
    exact: true,
    to: '/app/inventory',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Bill Client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/inventory/billprescription' },
      { name: 'Payment', to: '/app/inventory/payment' },
      { name: 'Dispensary', to: '/app/inventory/dispensary' },
      { name: 'Store Inventory', to: '/app/inventory/storeinventory' },
      { name: 'Product Entry', to: '/app/inventory/productentry' },
      { name: 'Issue Out', to: '/app/inventory/issueout' },
      { name: 'Requisiition', to: '/app/inventory/requisition' },
      { name: 'Transfer', to: '/app/inventory/transfer' },
    ],
  },
  {
    name: 'Communication',
    exact: true,
    to: '/app/communication',
    iconClassName: 'bi bi-rss',
    subMenus: [
      { name: 'Channel', to: '/app/communication/channel' },
      { name: 'Questionnaires', to: '/app/communication/questionnaires' },
      { name: 'Configuration', to: '/app/communication/configuration' },
      { name: 'Submissions', to: '/app/communication/submissions' },
    ],
  },
  {
    name: 'Epidemiology',
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
    name: 'Documentation',
    exact: true,
    to: '/app/documentation',
    iconClassName: 'bi bi-rss',
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
