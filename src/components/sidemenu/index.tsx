import React, { useState, useEffect } from 'react';
import MenuItem from '../menuitem';
import { Lists } from '../menuitem/style';
import { MainMenu, Sidemenu, TopSection } from './styles';

export const menuItems = [
  {
    name: 'Overview',
    exact: true,
    to: '/dashboard',
    iconClassName: 'bi bi-house-door',
  },
  {
    name: 'Client',
    exact: true,
    to: `/dashboard/clients`,
    iconClassName: 'bi bi-people',
    subMenus: [
      { name: 'Dashboard', to: '/dashboard/clients' },
      { name: 'Appointment', to: '/dashboard/clients/appointments' },
      { name: 'Client', to: '/dashboard/clients/client' },
    ],
  },
  {
    name: 'Clinic',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Appointment', to: '/' },
    ],
  },
  {
    name: 'Pharmacy',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-file-medical',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Bill client', to: '/' },
      { name: 'Bill Prescription Sent', to: '/' },
      { name: 'Payment', to: '/' },
      { name: 'Dispensary', to: '/' },
      { name: 'Store Inventory', to: '/' },
      { name: 'Product Entry', to: '/' },
      { name: 'POS', to: '/' },
    ],
  },
  {
    name: 'Laboratory',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-binoculars',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Bill client', to: '/' },
      { name: 'Bill Lab Orders Sent', to: '/' },
      { name: 'Payment', to: '/' },
      { name: 'Lab Result', to: '/' },
    ],
  },
  {
    name: 'Managed Care',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-alarm',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Complaints', to: '/' },
      { name: 'Bill Services', to: '/' },
      { name: 'Approvals', to: '/' },
      { name: 'Referrals', to: '/' },
      { name: 'Claims', to: '/' },
      { name: 'Recievables', to: '/' },
      { name: 'Collections', to: '/' },
      { name: 'Beneficiaries', to: '/' },
      { name: 'Organizations', to: '/' },
      { name: 'Price Lists', to: '/' },
    ],
  },
  {
    name: 'Finance',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-cash',
    subMenus: [
      { name: 'Dashboard', to: '/' },
      { name: 'Bill Services', to: '/' },
      { name: 'Payment', to: '/' },
      { name: 'Revenue', to: '/' },
      { name: 'Collections', to: '/' },
      { name: 'Services', to: '/' },
    ],
  },
  {
    name: 'Epidemiology',
    exact: true,
    to: `/`,
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
    to: `/dashboard/admin`,
    iconClassName: 'bi bi-person',
    subMenus: [
      { name: 'Dashboard', to: '/dashboard/admin' },
      { name: 'Bands', to: '/dashboard/admin/bands' },
      { name: 'Employees', to: '/dashboard/admin/employees' },
      { name: 'Location', to: '/dashboard/admin/location' },
    ],
  },
  {
    name: 'Logout',
    exact: true,
    to: `/`,
    iconClassName: 'bi bi-box-arrow-right',
  },
];

const SideMenu = () => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll('.sub-menu');
    }
  }, [inactive]);

  const removeActiveClassFromSubMenu = () => {};

  useEffect(() => {
    let menuItems = document.querySelectorAll('.menu-item');
    console.log(menuItems);

    menuItems.forEach(el => {
      el.addEventListener('click', e => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItems.forEach(el => el.classList.remove('active'));
        el.classList.toggle('active');
        console.log(next, 'click');

        if (next !== null) {
          next.classList.toggle('active');
        }
      });
    });
  }, []);

  useEffect(() => {}, []);

  return (
    <Sidemenu className='side-menu'>
      <TopSection>
        <h1>Your Company</h1>
        <i className='bi bi-list'></i>
      </TopSection>
      <MainMenu className='main-menu'>
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
};

export default SideMenu;
