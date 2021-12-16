import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import BankToUserButton from "./components/BankToUserButton";
import UserToBankButton from "./components/UserToBankButton";

class App extends Component {
  constructor(props){
    super(props)
  }

  killKaboom() {
    const canvasTag = document.getElementsByTagName("CANVAS")[0];
    if (window.location.pathname !== "/game") {
      if (canvasTag) {
        canvasTag.remove();
        console.log("Killing Kaboom...");
      }
    }
  }

  componentDidUpdate() {
  }

  componentDidMount() {
  }

  render() {
    return (
      <div onClick={this.killKaboom}>
        <UserToBankButton />
        <BankToUserButton />
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
