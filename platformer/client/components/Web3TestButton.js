import React from "react";

const Web3TestButton = (props) => {
  const { contracts, accounts } = props;

  const testFunc = async () => {
    const contract = contracts.metaCoin;
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
