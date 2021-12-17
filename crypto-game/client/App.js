import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
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

  componentDidUpdate() {}

  componentDidMount() {}

  render() {
    return (
      <div onClick={this.killKaboom}>
        <Navbar />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
