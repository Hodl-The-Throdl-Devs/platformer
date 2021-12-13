import React from "react";

const Web3TestButton = (props) => {
  const { bankAccount, contracts, accounts } = props;

  const testFunc = async () => {
    const contract = contracts.hodlCoin;

    await contract.methods
      .sendCoin(accounts[0], 500)
      .send({ from: bankAccount[0] });

    let balance = await contract.methods.getBalance(accounts[0]).call();
    console.log(balance);
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