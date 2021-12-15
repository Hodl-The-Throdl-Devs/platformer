import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import Home from "./components/Home";
import Game from "./components/Game";
import Account from "./components/Account";
import Shop from "./components/Products";

import { me, setWeb3Props, fetchProducts, updateHodlCoins } from "./store";

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
        "0x6a2445d60E0D465Dd3d0Bb8886cb33c6E40D662F"
      );
      this.props.setProducts();
      this.props.setWeb3Props({
        web3,
        deployedNetwork,
        bankAccount: ["0xCded6Ba33f50CA5a123E6Ed136788A442Bbe35d8"],
        accounts,
        contracts: { hodlCoin },
      });

      if (this.props.isLoggedIn) {
        // Having user's MetaMask HODL balance update in store
        let hodlCoinBalance = await hodlCoin.methods
          .balanceOf(accounts[0])
          .call();
        console.log(this.props);
        this.props.auth.hodlCoins = hodlCoinBalance;
        this.props.updateHodlCoins(this.props.auth);
      }

      // Setting Provider to Bank Account
      const hdwProvider = new HDWalletProvider(
        "766f652118231b9eeb8ca75ded6bd98217118fde8419774e24057a85676da99f",
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
            <Route exact path="/shop" component={Shop} />
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
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => ({
  loadInitialData: () => dispatch(me()),
  setWeb3Props: (web3Props) => dispatch(setWeb3Props(web3Props)),
  setProducts: () => dispatch(fetchProducts()),
  updateHodlCoins: (auth) => dispatch(updateHodlCoins(auth)),
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
