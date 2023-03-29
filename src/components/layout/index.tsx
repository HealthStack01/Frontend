import React from "react";

import AppRoutes from "../../hsmodules/routes";
import {LayoutWrapper} from "./styles";

function Layout() {
  return (
    <LayoutWrapper>
      <div className="layout__content">
        <div className="layout__content-main" style={{paddingTop: "60px"}}>
          <AppRoutes />
        </div>
      </div>
    </LayoutWrapper>
  );
}

export default Layout;
