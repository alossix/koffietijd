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
        console.log(`this is the response: ${response}`);
        setEmailState(email);
        setPasswordState(password);
        props.getUser(response);
        // props.history.push("/");
      })
      .catch((err) => console.error(`this is the error, login page 1: ${err}`));
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={formSubmitHandler}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            required
            onChange={(e) => setEmailState(e.target.value)}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(e) => setPasswordState(e.target.value)}
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
