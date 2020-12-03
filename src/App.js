import React from "react";
import { ListTweets } from "./conteaxts/listTweets.js";
import { NewTweet } from "./conteaxts/newTweet.js";

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
  static updateTweet;
  constructor(props) {
    super(props);
    this.state = {
      twittes: [],
      loading: true,
    };
  }

  componentDidMount() {
    App.updateTweet = setInterval(async () => {
      let item = await getTweet();
      if (item.length > 0) {
        this.setState(() => {
          return {
            twittes: item,
          };
        });
      }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(App.updateTweet);
  }
  handleNewtwitee(twitee) {
    submitTweet(twitee);
  }

  render() {
    return (
      <Router>
        <nav className="nav-bar">
          <ul className="all-pages">
            <li>
              <NavLink exact to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/profile" activeClassName="active">
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <NewTweet.Provider
                value={{
                  setNewTweet: (tweet) => {
                    this.handleNewtwitee(tweet);
                  },
                }}
              >
                <TwiterForm />
              </NewTweet.Provider>
              <ListTweets.Provider
                value={{
                  twittes: this.state.twittes,
                }}
              >
                <TwiteeList />
              </ListTweets.Provider>
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
