import React from 'react';
import { NavLink } from "react-router-dom";

function NavMenu() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink activeClassName='selected-nav' className='nav-link' to="/home">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='selected-nav' className='nav-link' to="/about">About</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName='selected-nav' className='nav-link' to="/courses">Courses</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavMenu;