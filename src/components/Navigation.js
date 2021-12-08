import React from 'react';
import { signOutUser } from '../api/auth';
import '../styles/globals/navBar.scss';

export default function Navigation() {
  return (
    <div className="navbar">
      <div className="leftSide">
        <div className="leftSidelinks">
          <a href="/">WELP</a>
        </div>
      </div>
      <div className="rightSide">
        <div className="rightSideLinks">
          <a href="/addPost">ADD PHOTO ID</a>
          <a href="/addContacts">ADD CONTACT</a>
          <a href="/emergencyContacts">EMERGENCY CONTACTS </a>
        </div>
        <button onClick={signOutUser} type="button" className="btn btn-primary">
          SignOut
        </button>
      </div>
    </div>
  );
}
