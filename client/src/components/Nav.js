import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import AuthService from "./auth/auth-service";

const Nav = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const service = new AuthService();

  const logOut = () => {
    service.logout().then(() => {
      setLoggedInUser(null);
      props.history.push("/");
    });
  };

  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  if (loggedInUser) {
    return (
      <nav className="nav">
        <NavLink to="/">
          <div className="nav-left">
            <div className="nav-logo-holder">
              <img
                className="nav-logo"
                src="/logo512.png"
                alt="koffietijd"
              ></img>
            </div>
            <div className="nav-h1-holder">
              <h1>koffietijd</h1>
            </div>
          </div>
        </NavLink>
        <div className="nav-right">
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button onClick={logOut}>Log Out</button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <NavLink to="/">
          <div className="nav-left">
            <div className="nav-logo-holder">
              <img
                className="nav-logo"
                src="/logo512.png"
                alt="koffietijd"
              ></img>
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
  }
};

export default withRouter(Nav);
