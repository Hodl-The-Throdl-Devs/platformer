import React from "react";
import { connect } from "react-redux";
import CharacterBoard from "./CharacterBoard";

import { updateCoins } from "../store";
import { Button, Box } from "@mui/material";

/**
 * COMPONENT
 */
export const Account = (props) => {
  const { auth, updateCoins, web3Props } = props;
  const { bankAccount, contracts, accounts } = web3Props;

  const sendTokenToUser = async () => {
    const contract = contracts.hodlCoin;
    await contract.methods
      .transfer(accounts[0], auth.coins)
      .send({ from: bankAccount[0] });
  };

  const convertCoins = () => {
    sendTokenToUser().then(() => {
      auth.hodlCoins += auth.coins;
      auth.coins = 0;
      updateCoins(auth);
    });
  };

  return (
    <div>
      <Box
        sx={{
          height: "150%",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <h1>Coin Count: {auth.coins}</h1>
        <Button
          onClick={convertCoins}
          variant="contained"
          sx={{
            backgroundColor: "#16BE0D",
            "&:hover": { background: "#4BC744" },
            height: "55px",
            width: "250px",
          }}
        >
          Convert coins to tokens!
        </Button>
        <h1>Hodl Count: {auth.hodlCoins}</h1>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <br />

      <CharacterBoard />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    auth: state.auth,
    web3Props: state.web3Props,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateCoins: (auth) => dispatch(updateCoins(auth)),
  };
};

export default connect(mapState, mapDispatch)(Account);
