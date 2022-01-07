import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { signOutUser } from '../api/auth';
import '../styles/globals/navBar.scss';
function Navigation() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo" onClick={handleClick}>
          WELP
        </NavLink>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item active">
            <NavLink
              exact
              className="nav-links"
              onClick={handleClick}
              to="/addPost"
            >
              ADD PHOTO ID
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              exact
              to="/eContactView"
              className="nav-links"
              onClick={handleClick}
            >
              ADD CONTACT
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink
              exact
              to="/econtacts"
              className="nav-links"
              onClick={handleClick}
            >
              EMERGENCY CONTACTS
            </NavLink>
          </li>
        </ul>
        <button onClick={signOutUser} type="button" className="btn btn-warning">
          SignOut
        </button>
      </div>
    </nav>
  );
}
export default Navigation;
