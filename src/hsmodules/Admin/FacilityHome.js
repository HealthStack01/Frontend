import React from "react";
import {Outlet} from "react-router-dom";

export default function FacilityHome({children}) {
  return (
    <>
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            {children}
            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
}
