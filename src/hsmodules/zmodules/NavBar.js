import React from 'react'
import {Route, Switch,   Link} from 'react-router-dom'

export default function NavBar() {
  
    const handleClick=()=>{
        console.log("show menu")
    }
    
    return (
        <div>
           <nav className="navbar is-small minHt has-background-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <div className="navbar-item is-4 "> <strong>Health Stack </strong> </div>
                    {/* <div className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                    </div> */}

                    <div role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={handleClick}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </div>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                    {/* <div className="navbar-item">
                        Home
                    </div>

                    <div className="navbar-item">
                        Documentation
                    </div> */}

                    
                    </div>

                    <div className="navbar-end">
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link">
                        Menu
                        </div>

                            <div className="navbar-dropdown">
                                <div className="navbar-item">
                                <Link to={`${url}`}>Landing Page</Link> 
                                </div>
                                <div className="navbar-item">
                                    Facility
                                </div>
                                <div className="navbar-item">
                                    Inventory
                                </div>
                                <div className="navbar-item">
                                    Front Desk
                                </div>
                                <hr className="navbar-divider" />
                                <div className="navbar-item">
                                   Sign Out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
