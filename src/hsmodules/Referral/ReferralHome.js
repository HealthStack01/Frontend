import React from "react";
import {Outlet} from "react-router-dom";

export default function ReferralHome({children}) {
  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="layout__content-main">
            {children}
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
