import React from "react";
import { useSelector } from "react-redux";

const BankToUserButton = () => {
  const bankAccount = useSelector((state) => state.web3Props.bankAccount);
  const contracts = useSelector((state) => state.web3Props.contracts);
  const accounts = useSelector((state) => state.web3Props.accounts);

  const deployedNetwork = useSelector(
    (state) => state.web3Props.deployedNetwork
  );

  const sendTokenToUser = async () => {
    const contract = contracts.hodlCoin_OZ;

    // await contract.methods
    //   .sendCoin(bankAccount[0], 500)
    //   .send({ from: accounts[0] });

    await contract.methods
      .transfer(accounts[0], 500)
      .send({ from: bankAccount[0] });
    let balance = await contract.methods.balanceOf(accounts[0]).call();
    console.log(balance);
    console.log(contract.methods);

    // const contract = contracts.hodlCoin;

    // await contract.methods
    //   .sendCoin(accounts[0], 500)
    //   .send({ from: bankAccount[0] });

    // let balance = await contract.methods.getBalance(accounts[0]).call();
    // console.log(balance);
  };

  return (
    <>
      <button type="button" onClick={sendTokenToUser}>
        Receive Tokens from Bank
      </button>
    </>
  );
};

export default BankToUserButton;
