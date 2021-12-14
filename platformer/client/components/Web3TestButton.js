import React from "react";
import store from "../store";

const Web3TestButton = (props) => {
  const { bankAccount, contracts, accounts } = props;

  const testFunc = async () => {
    console.log(store.getState().contracts);
    // const contract = contracts.hodlCoin;

    // await contract.methods
    //   .sendCoin(accounts[0], 500)
    //   .send({ from: bankAccount[0] });

    // let balance = await contract.methods.getBalance(accounts[0]).call();
    // console.log(balance);
  };

  return (
    <>
      <button type="button" onClick={testFunc}>
        Test Me!
      </button>
    </>
  );
};

// TODO connect(mapState, mapDispatch)(Web3TestButton)
export default Web3TestButton;
