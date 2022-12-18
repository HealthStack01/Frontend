import React, {useContext, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";

import {LayoutContent, LayoutWrapper} from "../../components/layout/styles";
import SideMenu from "../../components/sidemenu";
import TopMenu from "../../components";
import {UserContext, ObjectContext} from "../../context";

interface DashProps {
  children?: React.ReactNode | undefined;
}

const Dashboard: React.FC<DashProps> = ({children}) => {
  {
    const {state} = useContext(ObjectContext);
    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
      });
      document.title = "Health Stack - Dashboard";
    }, []);

    // const [isOpen, setIsOpen] = useState<Boolean>(false);
    const isOpen = state.sideMenu.open;
    return (
      <LayoutWrapper>
        <SideMenu isOpen={isOpen} />
        <LayoutContent>
          {/*  {locationType && ( */}
          <TopMenu />
          {/*  )} */}
          <div className="layout__content-main">
            {children}
            <Outlet />
          </div>
        </LayoutContent>
      </LayoutWrapper>
    );
  }
};

export default Dashboard;
