import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import AddRoaster from "./AddRoaster";
import AddCoffee from "./AddCoffee";
import Signup from "./Signup";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/add-roaster" exact component={AddRoaster} />
          <Route path="/add-coffee" exact component={AddCoffee} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
