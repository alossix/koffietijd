import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <NavLink to="/">
        <div className="nav-left">
          <div className="nav-logo-holder">
            <img className="nav-logo" src="/logo512.png" alt="koffietijd"></img>
          </div>
          <div className="nav-h1-holder">
            <h1>koffietijd</h1>
          </div>
        </div>
      </NavLink>
      <div className="nav-right">
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Log in</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
