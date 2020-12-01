import React, { Children } from "react";
import "./dataBase.js";
import "./App.css";
import TwiterForm from "./components/twiterForm.jsx";
import TwiteeList from "./components/twiteeList.jsx";
import { getTweet, submitTweet } from "./dataBase.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Profile from "./components/profile.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twittes: [],
      loading: true,
    };
  }

  async componentDidMount() {
    let item = await getTweet();
    if (item.length > 0) {
      this.setState(() => {
        return {
          twittes: item,
        };
      });
    }
  }

  handleNewtwitee(twitee) {
    this.setState((state) => {
      return { twittes: [twitee, ...state.twittes] };
    });
    submitTweet(twitee);
  }

  render() {
    return (
      <Router>
        <nav className="nav-bar">
          <ul className="all-pages">
            <li>
              <NavLink exact to to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <TwiterForm
                onNewTwitee={(twitee) => this.handleNewtwitee(twitee)}
              />
              <TwiteeList Twittes={this.state.twittes} />
            </div>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
