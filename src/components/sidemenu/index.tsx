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
<<<<<<< HEAD
      { name: 'Appointment', to: '/app/clients/appointments' },
      { name: 'Client', to: '/app/clients/clients' },
=======
      { name: "Appointment", to: "/app/clients/appointments" },
      { name: "Clients", to: "/app/clients/clients" },
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    ],
  },
  {
    name: 'Clinic',
    exact: true,
<<<<<<< HEAD
    to: '/app/clinic',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Appointment', to: '/app/clinic/appointments' },
      { name: 'Check In', to: '/app/clinic/checkin' },
    ],
  },
  {
    name: 'Pharmacy',
    exact: true,
    to: '/app/pharmacy',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Bill client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/pharmacy/billprescription' },
      { name: 'Payment', to: '/app/pharmacy/payment' },
      { name: 'Dispensary', to: '/app/pharmacy/dispensary' },
      { name: 'Store Inventory', to: '/app/pharmacy/inventory' },
      { name: 'Product Entry', to: '/app/pharmacy/productentry' },
      { name: 'POS', to: '/app/pharmacy/pos' },
      { name: 'Requisition', to: 'app/pharmacy/requisition' },
      { name: 'Transfer', to: 'app/pharmacy/transfer' },
    ],
  },
  {
    name: 'Laboratory',
    exact: true,
    to: '/app/laboratory',
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      { name: 'Bill client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders Sent', to: '/app/laboratory/billlabsent' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/result' },
=======
    to: "/app/clinic",
    iconClassName: "bi bi-file-medical",
    subMenus: [
      { name: "Appointment", to: "/app/clinic/appointments" },
      { name: "checkin", to: "/app/clinic/checkin" },
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
    ],
  },
  {
    name: 'Managed Care',
    exact: true,
    to: '/app/managedCare',
    iconClassName: 'bi bi-alarm',
    subMenus: [
<<<<<<< HEAD
      { name: 'Claim Payment', to: '/app/managedCare/claimpayment' },
      { name: 'Claims', to: '/app/managedCare/claims' },
      { name: 'Referrals', to: '/app/managedCare/referrals' },
      { name: 'Check In', to: '/app/managedCare/checkin' },
      { name: 'Preauthorization', to: '/app/managedCare/preauthorization' },
      { name: 'Beneficiaries', to: '/app/managedCare/beneficiaries' },
      { name: 'Organizations', to: '/app/managedCare/organization' },
      { name: 'Tarrif', to: '/app/managedCare/tarrif' },
=======
      { name: "Bill Client", to: "/app/pharmacy/billclient" },
      { name: "Bill Prescription Sent", to: "/app/pharmacy/billprescription" },
      { name: "Payment", to: "/app/pharmacy/payment" },
      { name: "Dispensary", to: "/app/pharmacy/dispensary" },
      { name: "Store Inventory", to: "/app/pharmacy/storeinventory" },
      { name: "Product Entry", to: "/app/pharmacy/productentry" },
      { name: "Issue Out", to: "/app/pharmacy/issueout" },
      { name: "Requisiition", to: "/app/pharmacy/requisition" },
      { name: "Transfer", to: "/app/pharmacy/transfer" },
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
=======
      { name: "Bill Client", to: "/app/laboratory/billclient" },
      { name: "Bill Lab Orders", to: "/app/laboratory/billlaborders" },
      { name: "Payment", to: "/app/laboratory/payment" },
      { name: "Lab Result", to: "/app/laboratory/labresult" },
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
<<<<<<< HEAD
      { name: 'Channel', to: '/app/communication/channel' },
      { name: 'Questionnaires', to: '/app/communication/questionnaires' },
      { name: 'Configuration', to: '/app/communication/configuration' },
      { name: 'Submissions', to: '/app/communication/submissions' },
=======
      { name: "Dashboard", to: "/app/epidemiology/dashboard" },
      { name: "Case Definition", to: "/app/epidemiology/casedefinition" },
      { name: "Signals", to: "/app/epidemiology/signal" },
      { name: "Map", to: "/app/epidemiology/map" },
>>>>>>> 8df31333eb9e0ae2eaa5add5f2f2bee9e76b8255
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
