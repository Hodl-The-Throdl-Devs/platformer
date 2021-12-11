import React from "react";

const Web3TestButton = (props) => {
  const { contracts, accounts } = props;

  const testFunc = async () => {
    const contract = contracts.metaCoin;

    // Sending 500 Meta Coins to specific address
    // await contract.methods
    //   .sendCoin("0x5B1375553513625331C90dF0497a4Ae1040Bc529", 500)
    //   .send({ from: accounts[0] });

    // Getting balance of signed in address
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
