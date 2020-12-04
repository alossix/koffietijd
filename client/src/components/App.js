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

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .loggedin()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getUser = (userObj) => {
    setLoggedInUser(userObj);
  };

  fetchUser();

  if (loggedInUser) {
    return (
      <Router>
        <div className="App">
          <Nav userInSession={loggedInUser} />
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/add-roaster" exact component={AddRoaster} />
            <Route path="/add-coffee" exact component={AddCoffee} />
            <Route
              path="/signup"
              exact
              render={() => <Signup getUser={getUser} />}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
