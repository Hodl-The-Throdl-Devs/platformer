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
        <h2>Convert Coins to Crypto</h2>
        <h3>Coin Count: {auth.coins}</h3>
        <h3>Hodl Count: {auth.hodlCoins}</h3>
        <br />
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
          Convert coins to tokens
        </Button>
      </Box>
      <br />
      <br />
      <br />
      <br />
      <h2>Choose Your Character</h2>
      <br />
      <Box
        sx={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <CharacterBoard />
      </Box>
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
