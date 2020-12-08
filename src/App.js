import React from "react";
import Deshborad from "./components/dashborad.jsx";
import SignIn from "./components/signin.jsx";
import "./App.css";
import SignUp from "./components/signup.jsx";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/profile";
import { AutoProvider } from "./conteaxts/AutoConeaxt";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AutoProvider>
        <div className="App">
          <Switch>
            <PrivateRoute exact path="/" component={Deshborad} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="/signUp" component={SignUp} />
            <Route path="/signin" component={SignIn} />
          </Switch>
        </div>
      </AutoProvider>
    </Router>
  );
};

export default App;
