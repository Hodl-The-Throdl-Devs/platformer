import React from "react";
import { useSelector } from "react-redux";

const UserToBankButton = () => {
  const web3 = useSelector((state) => state.web3Props.web3);
  const bankAccount = useSelector((state) => state.web3Props.bankAccount);
  const contracts = useSelector((state) => state.web3Props.contracts);
  const accounts = useSelector((state) => state.web3Props.accounts);

  const testFunc = async () => {
    web3.setProvider("HTTP://127.0.0.1:7545");
    const contract = contracts.hodlCoin;

    await contract.methods
      .sendCoin(bankAccount[0], 500)
      .send({ from: accounts[0] });

    let balance = await contract.methods.getBalance(accounts[0]).call();
    console.log(balance);
  };

  return (
    <>
      <button type="button" onClick={testFunc}>
        Send Tokens to Bank
      </button>
    </>
  );
};

export default UserToBankButton;
