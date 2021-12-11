import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import getWeb3 from "./getWeb3";
import MetaCoinContract from "./contracts/MetaCoin.json";
import Web3TestButton from "./components/Web3TestButton";
import HDWalletProvider from "@truffle/hdwallet-provider"

class App extends Component {
  state = { web3: null, accounts: null, contracts: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // HD Wallet Provider Set-Up. Make sure to replace private key when making Ganache network
      const hdwProvider = new HDWalletProvider(
        "b0e02aec1efe7bc67adf65dd9b3d0254653ab4375d2e68de18fdb6c2c67155a9","HTTP://127.0.0.1:7545"
      );

      // Set provider for Web3 to HD Wallet Provider
      web3.setProvider(hdwProvider)

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MetaCoinContract.networks[networkId];
      const metaCoin = new web3.eth.Contract(
        MetaCoinContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      this.setState({ web3, accounts, contracts: { metaCoin } });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  killKaboom() {
    const canvasTag = document.getElementsByTagName("CANVAS")[0];
    if (window.location.pathname !== "/game") {
      if (canvasTag) {
        canvasTag.remove();
        console.log("Killing Kaboom...");
      }
    }
  }

  render() {
    return (
      <div onClick={this.killKaboom}>
        <Web3TestButton
          contracts={this.state.contracts}
          accounts={this.state.accounts}
        />
        <Navbar />
        <Routes />
      </div>
    );
  }
}

export default App;
