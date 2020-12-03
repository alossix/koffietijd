import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <h3>I am signing up as a:</h3>
      <Link to="/signup-consumer">
        <div className="signup-consumer">
          <h4>Consumer</h4>
        </div>
      </Link>
      <Link to="signup-roaster">
        <div className="signup-roaster">
          <h4>Roaster</h4>
        </div>
      </Link>
    </div>
  );
};

export default Signup;
