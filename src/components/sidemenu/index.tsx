<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuItem from '../menuitem';
import { Lists } from '../menuitem/style';
import { MainMenu, Sidemenu, TopSection } from './styles';
=======
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

import MenuItem from "../menuitem";
import {Lists} from "../menuitem/style";
import {MainMenu, Sidemenu, TopSection} from "./styles";
>>>>>>> bb584317912526417cb57109d86115d0005b15d4

export const menuItems = [
  {
    name: 'Overview',
    exact: true,
<<<<<<< HEAD
    to: '/app',
    iconClassName: 'bi bi-house-door',
    subMenus: [{ name: 'Dashboard', to: '/app/overview/dashboard' }],
=======
    to: "/app",
    iconClassName: "bi bi-house-door",
    subMenus: [{name: "Dashboard", to: "/app/overview/dashboard"}],
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
  },
  {
    name: 'Client',
    exact: true,
    to: '/app/clients',
    iconClassName: 'bi bi-people',
    subMenus: [
<<<<<<< HEAD
      { name: 'Appointment', to: '/app/clients/appointments' },
      { name: 'Client', to: '/app/clients/clients' },
      { name: 'Dashboard', to: '/app/clients/dashboard' },
=======
      {name: "Appointment", to: "/app/clients/appointments"},
      {name: "Client", to: "/app/clients/clients"},
      {name: "Dashboard", to: "/app/clients/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Clinic',
    exact: true,
    to: '/app/clinic',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
<<<<<<< HEAD
      { name: 'Appointment', to: '/app/clinic/appointments' },
      { name: 'Check-In', to: '/app/clinic/checkin' },
      { name: 'Clinic List', to: '/app/clinic/clinics' },
      { name: 'Dashboard', to: '/app/clinic/dashboard' },
=======
      {name: "Appointment", to: "/app/clinic/appointments"},
      {name: "checkin", to: "/app/clinic/checkin"},
      {name: "Dashboard", to: "/app/clinic/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
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
<<<<<<< HEAD
      { name: 'Bill Client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders', to: '/app/laboratory/billlaborders' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/labresult' },
      { name: 'Dashboard', to: '/app/laboratory/dashboard' },
=======
      {name: "Bill Client", to: "/app/laboratory/billclient"},
      {name: "Bill Lab Orders", to: "/app/laboratory/billlaborders"},
      {name: "Payment", to: "/app/laboratory/payment"},
      {name: "Lab Result", to: "/app/laboratory/labresult"},
      {name: "Dashboard", to: "/app/laboratory/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },

  {
    name: 'Pharmacy',
    exact: true,
    to: '/app/pharmacy',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
<<<<<<< HEAD
      { name: 'Bill Client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/pharmacy/billprescription' },
      { name: 'Payment', to: '/app/pharmacy/payment' },
      { name: 'Dispensary', to: '/app/pharmacy/dispensary' },
      { name: 'Store Inventory', to: '/app/pharmacy/storeinventory' },
      { name: 'Product Entry', to: '/app/pharmacy/productentry' },
      { name: 'Issue Out', to: '/app/pharmacy/issueout' },
      { name: 'Requisiition', to: '/app/pharmacy/requisition' },
      { name: 'Transfer', to: '/app/pharmacy/transfer' },
      { name: 'Dashboard', to: '/app/pharmacy/dashboard' },
=======
      {name: "Bill Client", to: "/app/pharmacy/billclient"},
      {name: "Bill Prescription Sent", to: "/app/pharmacy/billprescription"},
      {name: "Payment", to: "/app/pharmacy/payment"},
      {name: "Dispensary", to: "/app/pharmacy/dispensary"},
      {name: "Store Inventory", to: "/app/pharmacy/storeinventory"},
      {name: "Product Entry", to: "/app/pharmacy/productentry"},
      {name: "Issue Out", to: "/app/pharmacy/issueout"},
      {name: "Requisiition", to: "/app/pharmacy/requisition"},
      {name: "Transfer", to: "/app/pharmacy/transfer"},
      {name: "Dashboard", to: "/app/pharmacy/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Finance',
    exact: true,
    to: '/app/finance',
    iconClassName: 'bi bi-cash',
    subMenus: [
<<<<<<< HEAD
      { name: 'Bill Services', to: '/app/finance/billservices' },
      { name: 'Payment', to: '/app/finance/payment' },
      { name: 'Revenue', to: '/app/finance/revenue' },
      { name: 'Collections', to: '/app/finance/collections' },
      { name: 'Services', to: '/app/finance/services' },
      { name: 'HMO Authorization', to: '/app/finance/hmoauthorization' },
      { name: 'Dashboard', to: '/app/finance/dashboard' },
=======
      {name: "Bill Services", to: "/app/finance/billservices"},
      {name: "Payment", to: "/app/finance/payment"},
      {name: "Revenue", to: "/app/finance/revenue"},
      {name: "Collections", to: "/app/finance/collections"},
      {name: "Services", to: "/app/finance/services"},
      {name: "HMO Authorization", to: "/app/finance/hmoauthorization"},
      {name: "Dashboard", to: "/app/finance/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
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
<<<<<<< HEAD
      { name: 'Bill Client', to: '/app/radiology/billservice' },
      { name: 'Checked-In', to: '/app/radiology/checkedin' },
      { name: 'Appointment', to: '/app/radiology/appointments' },
      { name: 'Bill Lab Orders', to: '/app/radiology/radiology-bill' },
      // {name: "Payment", to: "/app/radiology/payment"},
      { name: 'Lab Result', to: '/app/radiology/radiology-result' },
=======
      {name: "Bill Client", to: "/app/radiology/billservice"},
      {name: "Checked-In", to: "/app/radiology/checkedin"},
      {name: "Appointment", to: "/app/radiology/appointments"},
      {name: "Bill Lab Orders", to: "/app/radiology/radiology-bill"},
      // {name: "Payment", to: "/app/radiology/payment"},
      {name: "Lab Result", to: "/app/radiology/radiology-result"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
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
<<<<<<< HEAD
      { name: 'Bands', to: '/app/admin/bands' },
      { name: 'Employees', to: '/app/admin/employees' },
      { name: 'Location', to: '/app/admin/location' },
      { name: 'Dashboard', to: '/app/admin/dashboard' },
=======
      {name: "Bands", to: "/app/admin/bands"},
      {name: "Employees", to: "/app/admin/employees"},
      {name: "Location", to: "/app/admin/location"},
      {name: "Dashboard", to: "/app/admin/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Inventory',
    exact: true,
    to: '/app/inventory',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
<<<<<<< HEAD
      { name: 'Bill Client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/inventory/billprescription' },
      { name: 'Payment', to: '/app/inventory/payment' },
      { name: 'Dispensary', to: '/app/inventory/dispensary' },
      { name: 'Store Inventory', to: '/app/inventory/storeinventory' },
      { name: 'Product Entry', to: '/app/inventory/productentry' },
      { name: 'Issue Out', to: '/app/inventory/issueout' },
      { name: 'Requisiition', to: '/app/inventory/requisition' },
      { name: 'Transfer', to: '/app/inventory/transfer' },
      { name: 'Dashboard', to: '/app/inventory/dashboard' },
=======
      {name: "Bill Client", to: "/app/inventory/billservice"},
      {name: "Bill Prescription Sent", to: "/app/inventory/billprescription"},
      {name: "Payment", to: "/app/inventory/payment"},
      {name: "Dispensary", to: "/app/inventory/dispensary"},
      {name: "Store Inventory", to: "/app/inventory/storeinventory"},
      {name: "Product Entry", to: "/app/inventory/productentry"},
      {name: "Issue Out", to: "/app/inventory/issueout"},
      {name: "Requisiition", to: "/app/inventory/requisition"},
      {name: "Transfer", to: "/app/inventory/transfer"},
      {name: "Dashboard", to: "/app/inventory/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Communication',
    exact: true,
    to: '/app/communication',
    iconClassName: 'bi bi-rss',
    subMenus: [
<<<<<<< HEAD
      { name: 'Channel', to: '/app/communication/channel' },
      { name: 'Questionnaires', to: '/app/communication/questionnaires' },
      { name: 'Configuration', to: '/app/communication/configuration' },
      { name: 'Submissions', to: '/app/communication/submissions' },
=======
      {name: "Channel", to: "/app/communication/channel"},
      {name: "Questionnaires", to: "/app/communication/questionnaires"},
      {name: "Configuration", to: "/app/communication/configuration"},
      {name: "Submissions", to: "/app/communication/submissions"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Epidemiology',
    exact: true,
    to: '/app/communication',
    iconClassName: 'bi bi-rss',
    subMenus: [
<<<<<<< HEAD
      { name: 'Dashboard', to: '/app/epidemiology/dashboard' },
      { name: 'Case Definition', to: '/app/epidemiology/casedefinition' },
      { name: 'Signals', to: '/app/epidemiology/signal' },
      { name: 'Map', to: '/app/epidemiology/map' },
      { name: 'Dashboard', to: '/app/epidemiology/dashboard' },
=======
      {name: "Dashboard", to: "/app/epidemiology/dashboard"},
      {name: "Case Definition", to: "/app/epidemiology/casedefinition"},
      {name: "Signals", to: "/app/epidemiology/signal"},
      {name: "Map", to: "/app/epidemiology/map"},
      {name: "Dashboard", to: "/app/epidemiology/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },

  {
<<<<<<< HEAD
    name: 'Documentation',
    exact: true,
    to: '/app/documentation',
    iconClassName: 'bi bi-rss',
  },
  {
    name: 'Ward',
=======
    name: "Ward",
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    exact: true,
    to: '/app/ward',
    iconClassName: 'bi bi-person',
    subMenus: [
<<<<<<< HEAD
      { name: 'Admission', to: '/app/ward/admissions' },
      { name: 'In-Patient', to: '/app/ward/inpatients' },
      { name: 'Discharge', to: '/app/ward/discharge' },
      { name: 'Dashboard', to: '/app/ward/dashboard' },
=======
      {name: "Admission", to: "/app/ward/admissions"},
      {name: "In-Patient", to: "/app/ward/inpatients"},
      {name: "Discharge", to: "/app/ward/discharge"},
      {name: "Dashboard", to: "/app/ward/dashboard"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
    ],
  },
  {
    name: 'Theatre',
    exact: true,
    to: '/app/theatre',
    iconClassName: 'bi bi-person',
    subMenus: [
<<<<<<< HEAD
      { name: 'Appointment', to: '/app/theatre/theatre-appointments' },
      { name: 'Check In', to: '/app/theatre/theatre-checkedin' },
      { name: 'Bill Client', to: '/app/theatre/billservice' },
      { name: 'Bill Order Sent', to: '/app/theatre/theatre-bill' },
=======
      {name: "Appointment", to: "/app/theatre/theatre-appointments"},
      {name: "Check In", to: "/app/theatre/theatre-checkedin"},
      {name: "Bill Client", to: "/app/theatre/billservice"},
      {name: "Bill Order Sent", to: "/app/theatre/theatre-bill"},
>>>>>>> bb584317912526417cb57109d86115d0005b15d4
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

function SideMenu({isOpen}) {
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

<<<<<<< HEAD
    menuItems.forEach((el) => {
      el.addEventListener('click', () => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach((el) => el.classList.remove('active'));
        el.classList.toggle('active');
=======
    menuItems.forEach(el => {
      el.addEventListener("click", () => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach(el => el.classList.remove("active"));
        el.classList.toggle("active");
>>>>>>> bb584317912526417cb57109d86115d0005b15d4

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
