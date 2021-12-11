import React from "react";

const Web3TestButton = (props) => {
  const testFunc = () => {
    console.log("testFunc success");
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
