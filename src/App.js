import React from "react";
import "./dataBase.js";
import "./App.css";
import TwiterForm from "./components/twiterForm.jsx";
import TwiteeList from "./components/twiteeList.jsx";
import { AllData, saveTwitte } from "./dataBase.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twittes: [],
    };
  }

  async componentDidMount() {
    let item = await AllData();
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
    saveTwitte(twitee);
  }

  render() {
    return (
      <div className="App">
        <TwiterForm onNewTwitee={(twitee) => this.handleNewtwitee(twitee)} />
        <TwiteeList Twittes={this.state.twittes} />
      </div>
    );
  }
}

export default App;
