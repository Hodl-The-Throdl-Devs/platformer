import React from "react";
import { useSelector } from "react-redux";

const UserToBankButton = () => {
  const bankAccount = useSelector((state) => state.web3Props.bankAccount);
  const contracts = useSelector((state) => state.web3Props.contracts);
  const accounts = useSelector((state) => state.web3Props.accounts);

  const testFunc = async () => {
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
        Test Me!
      </button>
    </>
  );
};

// TODO connect(mapState, mapDispatch)(BankToUserButton)
export default UserToBankButton;
