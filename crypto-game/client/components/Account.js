import React from "react";
import { connect } from "react-redux";
import CharacterBoard from "./CharacterBoard";

import { updateCoins } from "../store";

/**
 * COMPONENT
 */
export const Account = (props) => {
  const { auth, updateCoins, web3Props } = props;
  const { bankAccount, contracts, accounts, deployedNetwork } = web3Props;
  

  // trying to get balance to display balance @rfougy
  const getBalance = async() => {
    console.log(contracts)
    const contract = contracts.hodlCoin;
    await contract.methods.balanceOf(accounts[0]).call().then(res=> console.log(res));
    // return balance;
  }
  
  getBalance();
  
  
  const sendTokenToUser = async () => {
    const contract = contracts.hodlCoin;
    await contract.methods
      .transfer(accounts[0], auth.coins)
      .send({ from: bankAccount[0] });
  };

  const convertCoins = () => {
    sendTokenToUser().then(() => {
      auth.coins = 0;
      updateCoins(auth);
    });
  };

  return (
    <div>
      <div>
        <h1>Coin Count: {auth.coins}</h1>
        <button onClick={convertCoins}>Convert coins to tokens!</button>
        <h1>Hodl Count: {"balance"}</h1>
      </div>
      <CharacterBoard />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    web3Props: state.web3Props,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateCoins: (auth) => dispatch(updateCoins(auth)),
  };
};

export default connect(mapState, mapDispatch)(Account);
