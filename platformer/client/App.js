import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Web3TestButton from "./components/Web3TestButton";

class App extends Component {
  componentDidMount = async () => {};

  killKaboom() {
    console.log(`Location: ${window.location.pathname}`);
    if (window.location.pathname !== "/game") {
      document.getElementsByTagName("CANVAS")[0].remove();
      console.log("Killing Kaboom...");
    }
  }

  render() {
    return (
      <div onClick={this.killKaboom}>
        <Web3TestButton />
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
