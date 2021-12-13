import React, { Component } from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import getWeb3 from "./getWeb3";
import HodlCoinContract from "./contracts/HodlCoin.json";
import Web3TestButton from "./components/Web3TestButton";
import HDWalletProvider from "@truffle/hdwallet-provider";

class App extends Component {
  state = {
    web3: null,
    bankAccount: ["0x4eA365b192D283C493ddf2bFc4A90011A4828c89"],
    accounts: null,
    contracts: null,
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HodlCoinContract.networks[networkId];
      const hodlCoin = new web3.eth.Contract(
        HodlCoinContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.setState({ web3, accounts, contracts: { hodlCoin } });

      // HD Wallet Provider Set-Up. Make sure to replace private key when making Ganache network
      const hdwProvider = new HDWalletProvider(
        "434d4dd559c4aaec8ce0d3877eb7c8baf5fc93a5d4efa96b9dbef57b71440cc6",
        "HTTP://127.0.0.1:7545"
      );

      // Set provider for Web3 to HD Wallet Provider
      web3.setProvider(hdwProvider);
    } catch (error) {
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
