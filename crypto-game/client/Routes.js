import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Game from "./components/Game";
import Account from "./components/Account";
import Shop from "./components/Products";

import {
  me,
  setWeb3Props,
  fetchProducts,
  fetchAssets,
  updateHodlCoins,
} from "./store";

import getWeb3 from "./getWeb3";
import HodlCoinContract from "./contracts/HodlCoin.json";
import HDWalletProvider from "@truffle/hdwallet-provider";

/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props) {
    super(props);
    this.web3;
    this.accounts;
    this.networkId;
    this.deployedNetwork;
    this.hodlCoin;
  }

  componentDidMount = async () => {
    this.props.loadInitialData();
    try {
      this.web3 = await getWeb3();
      this.accounts = await this.web3.eth.getAccounts();
      this.networkId = await this.web3.eth.net.getId();
      this.deployedNetwork = HodlCoinContract.networks[this.networkId];
      this.hodlCoin = new this.web3.eth.Contract(
        HodlCoinContract.abi,
        "0xc19f09c8D0ef552E38AE0d7DF40657b6a3c168FF"
      );
      this.props.setProducts();
      this.props.setAssets();
      this.props.setWeb3Props({
        web3: this.web3,
        deployedNetwork: this.deployedNetwork,
        bankAccount: ["0x0033FCAE572e9B67ba940b244e72aB324Cd90EA4"],
        accounts: this.accounts,
        contracts: { hodlCoin: this.hodlCoin },
      });

      // Having user's MetaMask HODL balance update in store if logged in
      if (this.props.isLoggedIn) {
        let hodlCoinBalance = await this.hodlCoin.methods
          .balanceOf(this.accounts[0])
          .call();
        this.props.auth.hodlCoins = parseInt(hodlCoinBalance);
        this.props.updateHodlCoins(this.props.auth);
      }

      // Setting Provider to Bank Account
      const hdwProvider = new HDWalletProvider(
        "6d2976731d8158223340d85c985012ebab7da195463a1bbb3cd6d2617222c35e",
        "HTTP://127.0.0.1:7545"
      );
      this.web3.setProvider(hdwProvider);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  componentDidUpdate = async (prevProps) => {
    // console.log(this.hodlCoin.methods);
    if (this.hodlCoin) {
      if (this.props.isLoggedIn && !prevProps.isLoggedIn) {
        let hodlCoinBalance = await this.hodlCoin.methods
          .balanceOf(this.accounts[0])
          .call();
        this.props.auth.hodlCoins = parseInt(hodlCoinBalance);
        this.props.updateHodlCoins(this.props.auth);
      }
    }
  };

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/game" component={Game} />
            <Route path="/account" component={Account} />
            <Route exact path="/shop" component={Shop} />
            <Redirect to="/game" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
  setWeb3Props: (web3Props) => dispatch(setWeb3Props(web3Props)),
  setProducts: () => dispatch(fetchProducts()),
  setAssets: () => dispatch(fetchAssets()),
  updateHodlCoins: (auth) => dispatch(updateHodlCoins(auth)),
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
