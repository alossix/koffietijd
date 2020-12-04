import React, { useState } from "react";
import AuthService from "./auth-service";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmailState] = useState("");
  const [firstName, setFirstNameState] = useState("");
  const [lastName, setLastNameState] = useState("");
  const [password, setPasswordState] = useState("");

  const service = new AuthService();

  const addUserHandler = (event) => {
    event.preventDefault();
    service
      .signup(email, firstName, lastName, password)
      .then((response) => {
        setEmailState(email);
        setPasswordState(password);
        props.getUser(response);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="signup-consumer">
      <form className="signup-consumer-form" onSubmit={addUserHandler}>
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
          First name:
          <input
            type="text"
            name="firstName"
            value={firstName}
            required
            onChange={(e) => setFirstNameState(e.target.value)}
          ></input>
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="lastName"
            value={lastName}
            required
            onChange={(e) => setLastNameState(e.target.value)}
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
      <p>Already have an account?</p>
      <Link to={"/"}>Log in</Link>
    </div>
  );
};

export default Signup;
