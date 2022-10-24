import React from 'react'
import { Outlet } from 'react-router-dom';

export default function ReferralHome({children}) {
    return (
      <>
        <section className="hero is-info is-fullheight">
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">Referral Module</h1>
              <h2 className="subtitle">Have fun working today!</h2>
            </div>
            <div className="layout__content-main">
              {children}
              <Outlet />
            </div>
          </div>
        </section>
      </>
    );
}
