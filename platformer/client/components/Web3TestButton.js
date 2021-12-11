import React from "react";

const Web3TestButton = (props) => {
  const { contracts, accounts } = props;

  const testFunc = () => {
    console.log(accounts);
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
