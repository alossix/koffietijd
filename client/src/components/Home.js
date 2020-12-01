import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="home">
      <Link to="/add-roaster">Add a New Roaster</Link>
    </main>
  );
};

export default Home;
