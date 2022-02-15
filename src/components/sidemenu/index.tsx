import React, { useEffect, useState } from 'react';

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
      { name: 'Dashboard', to: '/app/clients' },
      { name: 'Appointment', to: '/app/clients/appointments' },
      { name: 'Client', to: '/app/clients/clients' },
    ],
  },
  {
    name: 'Clinic',
    exact: true,
    to: '/app/clinic',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Dashboard', to: '/app/clinic' },
      { name: 'Appointment', to: '/app/clinic/appointments' },
    ],
  },
  {
    name: 'Pharmacy',
    exact: true,
    to: '/app/pharmacy',
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Dashboard', to: '/app/pharmacy' },
      { name: 'Bill client', to: '/app/pharmacy/billclient' },
      { name: 'Bill Prescription Sent', to: '/app/pharmacy/billsent' },
      { name: 'Payment', to: '/app/pharmacy/payment' },
      { name: 'Dispensary', to: '/app/pharmacy/dispensory' },
      { name: 'Store Inventory', to: '/app/pharmacy/inventory' },
      { name: 'Product Entry', to: '/app/pharmacy/productentry' },
      { name: 'POS', to: '/app/pharmacy/pos' },
    ],
  },
  {
    name: 'Laboratory',
    exact: true,
    to: '/app/laboratory',
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      { name: 'Dashboard', to: '/app/laboratory' },
      { name: 'Bill client', to: '/app/laboratory/billclient' },
      { name: 'Bill Lab Orders Sent', to: '/app/laboratory/billlabsent' },
      { name: 'Payment', to: '/app/laboratory/payment' },
      { name: 'Lab Result', to: '/app/laboratory/result' },
    ],
  },
  {
    name: 'Managed Care',
    exact: true,
    to: '/app/managedCare',
    iconClassName: 'bi bi-alarm',
    subMenus: [
      { name: 'Dashboard', to: '/app/managedCare' },
      { name: 'Claim Payment', to: '/app/managedCare/claimpayment' },
      { name: 'Claims', to: '/app/managedCare/claims' },
      { name: 'Referrals', to: '/app/managedCare/referrals' },
      { name: 'Check In', to: '/app/managedCare/checkin' },
      { name: 'Preauthorization', to: '/app/managedCare/preauthorization' },
      { name: 'Beneficiaries', to: '/app/managedCare/beneficiaries' },
      { name: 'Organizations', to: '/app/managedCare/organization' },
      { name: 'Tarrif', to: '/app/managedCare/tarrif' },
    ],
  },
  {
    name: 'Finance',
    exact: true,
    to: '/app/finance',
    iconClassName: 'bi bi-cash',
    subMenus: [
      { name: 'Dashboard', to: '/app/finance' },
      { name: 'Bill Services', to: '/app/finance/billservices' },
      { name: 'Payment', to: '/app/finance/payment' },
      { name: 'Revenue', to: '/app/finance/revenue' },
      { name: 'Collections', to: '/app/finance/collections' },
      { name: 'Services', to: '/app/finance/services' },
      { name: 'HMO Authorization', to: '/app/finance/hmoauthorization' },
    ],
  },
  {
    name: 'Epidemiology',
    exact: true,
    to: '/',
    iconClassName: 'bi bi-bezier',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Case Defination', to: '/' },
      { name: 'Signals', to: '/' },
    ],
  },
  {
    name: 'Admin',
    exact: true,
    to: '/app/admin',
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Dashboard', to: '/app/admin' },
      { name: 'Bands', to: '/app/admin/bands' },
      { name: 'Employees', to: '/app/admin/employees' },
      { name: 'Location', to: '/app/admin/location' },
    ],
  },
  {
    name: 'Logout',
    exact: true,
    to: '/',
    iconClassName: 'bi bi-box-arrow-right',
  },
];

function SideMenu() {
  const [inactive, setInactive] = useState(false);

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

  useEffect(() => {}, []);

  return (
    <Sidemenu className="side-menu">
      <TopSection>
        <h1>Your Company</h1>
        <i className="bi bi-list" />
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
