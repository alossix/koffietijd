import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <div className="signup-holder">
        <Link to="/signup">Sign up as a consumer or roaster</Link>
      </div>
    </main>
  );
};

export default Home;
