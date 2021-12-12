import React from "react";

const Web3TestButton = (props) => {
  const { state, bankAccount, contracts, accounts } = props;

  const testFunc = async () => {
    const contract = contracts.metaCoin;

    // Sending 500 Meta Coins to specific address
    await contract.methods
      .sendCoin(accounts[0], 500)
      .send({ from: bankAccount[0] });

    // Getting balance of signed in address
    let balance = await contract.methods.getBalance(accounts[0]).call();
    console.log(state);
  };

  return (
    <>
      <button type="button" onClick={testFunc}>
        Test Me!
      </button>
    </>
  );
};

export default Web3TestButton;
