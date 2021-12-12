import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import getWeb3 from "./getWeb3";
import MetaCoinContract from "./contracts/MetaCoin.json";
import Web3TestButton from "./components/Web3TestButton";
import HDWalletProvider from "@truffle/hdwallet-provider";

class App extends Component {
  state = {
    web3: null,
    bankAccount: ["0x0231D9e5E15df70692dBC1D33bEF8AD151d3b952"],
    accounts: null,
    contracts: null,
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

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

      // HD Wallet Provider Set-Up. Make sure to replace private key when making Ganache network
      const hdwProvider = new HDWalletProvider(
        "cba57b5f41c515a49af7c8e304c879c06d84ef04c26d3c789f0f766235de262f",
        "HTTP://127.0.0.1:7545"
      );

      // Set provider for Web3 to HD Wallet Provider
      web3.setProvider(hdwProvider);
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
          state={this.state}
          bankAccount={this.state.bankAccount}
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
