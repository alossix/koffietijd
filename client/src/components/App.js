import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import AddRoaster from "./AddRoaster";
import AddCoffee from "./AddCoffee";
import Signup from "./auth/Signup";
import Footer from "./Footer";
import AuthService from "./auth/auth-service";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import UserProfile from "./user/UserProfile";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .loggedin()
        .then(() => {
          setLoggedInUser(null);
        })
        .catch((err) => {
          setLoggedInUser(null);
        });
    }
  };
  fetchUser();

  const getUser = (userObj) => {
    setLoggedInUser(userObj);
  };

  return (
    <Router>
      <div className="App">
        <Nav userInSession={loggedInUser} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-roaster" exact component={AddRoaster} />
          <Route path="/add-coffee" exact component={AddCoffee} />
          <Route path="/" exact component={Home} />
          <Route
            path="/login"
            exact
            userInSession={loggedInUser}
            render={() => <Login getUser={getUser} />}
          />
          <Route
            path="/signup"
            exact
            render={() => <Signup getUser={getUser} />}
          />
          <ProtectedRoute
            userInSession={loggedInUser}
            path="/user"
            component={UserProfile}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
