import React from "react";

const Web3TestButton = (props) => {
  const { contracts, accounts } = props;

  const testFunc = async () => {
    const contract = contracts.metaCoin;

    // Sending 500 Meta Coins to specific address
    // await contract.methods
    //   .sendCoin(accounts[0], 500)
    //   .send({ from: "0x0231D9e5E15df70692dBC1D33bEF8AD151d3b952" });

    // Getting balance of signed in address
    let balance = await contract.methods.getBalance(accounts[0]).call()
    console.log(balance);
    ;
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
