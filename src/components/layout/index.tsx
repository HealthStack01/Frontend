import React, { useState } from 'react';
import AppRoutes from '../../routes/routes';
import SideMenu from '../sidemenu';
import TopMenu from '../topmenu';
import { LayoutWrapper } from './styles';

function Layout() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <LayoutWrapper>
      {/* <SideMenu /> */}
      <div className="layout__content">
        {/* <TopMenu isOpen={isOpen} handleClick={setIsOpen(!isOpen)} /> */}
        <div className="layout__content-main">
          <AppRoutes />
        </div>
      </div>
    </LayoutWrapper>
  );
}

export default Layout;
