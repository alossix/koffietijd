import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <div className="home-container">
        <div className="tagline">See the coffees!</div>
        <div className="why-koffietijd">
          <h2>Why Koffietijd?</h2>
          <p>The Amsterdam coffee roasters we love and miss need our help!</p>
        </div>
        <div className="signup-container">
          <Link to="/signup">
            Sign up to add your favorite Amsterdam coffee roaster!
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
