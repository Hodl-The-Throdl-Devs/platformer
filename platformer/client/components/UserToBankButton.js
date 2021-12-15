import React from "react";
import { useSelector } from "react-redux";

const UserToBankButton = () => {
  const web3 = useSelector((state) => state.web3Props.web3);
  const bankAccount = useSelector((state) => state.web3Props.bankAccount);
  const contracts = useSelector((state) => state.web3Props.contracts);
  const accounts = useSelector((state) => state.web3Props.accounts);

  const sendTokenToBank = async () => {
    web3.setProvider("HTTP://127.0.0.1:7545");

    const contract = contracts.hodlCoin;

    await contract.methods
      .transfer(bankAccount[0], 10000)
      .send({ from: accounts[0] });
    let balance = await contract.methods.balanceOf(accounts[0]).call();
    console.log(balance);
  };

  return (
    <>
      <button type="button" onClick={sendTokenToBank}>
        Send Tokens to Bank
      </button>
    </>
  );
};

export default UserToBankButton;
