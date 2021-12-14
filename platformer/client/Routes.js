import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Game from "./components/Game";
import Account from "./components/Account";
import Product from "./components/Products";
import SingleProduct from "./components/SingleProduct";

import { me, setWeb3Props } from "./store";

import getWeb3 from "./getWeb3";
import HodlCoinContract from "./contracts/HodlCoin.json";
import HDWalletProvider from "@truffle/hdwallet-provider";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount = async () => {
    this.props.loadInitialData();
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HodlCoinContract.networks[networkId];
      const hodlCoin = new web3.eth.Contract(
        HodlCoinContract.abi,
        deployedNetwork && deployedNetwork.address
      );

      this.props.setWeb3Props({
        web3,
        bankAccount: ["0x4eA365b192D283C493ddf2bFc4A90011A4828c89"],
        accounts,
        contracts: { hodlCoin },
      });

      const hdwProvider = new HDWalletProvider(
        "434d4dd559c4aaec8ce0d3877eb7c8baf5fc93a5d4efa96b9dbef57b71440cc6",
        "HTTP://127.0.0.1:7545"
      );
      web3.setProvider(hdwProvider);
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
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
            <Route exact path="/product" component={Product} />
            <Route path="/product/:id" component={SingleProduct} />
            <Redirect to="/home" />
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
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
  setWeb3Props: (web3Props) => dispatch(setWeb3Props(web3Props)),
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
