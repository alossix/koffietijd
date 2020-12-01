import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import AddRoaster from "./AddRoaster";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route to="/" exact component={Home}></Route>
          <Route to="/add-roaster" exact component={AddRoaster}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
