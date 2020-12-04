import React, { useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmailState] = useState("");
  const [password, setPasswordState] = useState("");
  const service = new AuthService();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    service
      .login(email, password)
      .then((response) => {
        setEmailState(email);
        setPasswordState(password);
        props.getUser(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login-form">
      <form onSubmit={formSubmitHandler}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmailState(e)}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPasswordState(e)}
          ></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>Don't have an account?</p>
      <Link to={"/signup"}>Sign Up</Link>
    </div>
  );
};

export default Login;
