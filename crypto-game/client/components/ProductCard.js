import React, { useCallback } from "react"; //Used to have import * as ...
import { useDispatch, connect } from "react-redux";
import { updateProduct, updateHodlCoins } from "../store";

import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

import { Box } from "@mui/system";

function ProductCard(props) {
  const { auth, web3Props, product } = props;
  const { bankAccount, contracts, accounts } = web3Props;

  const dispatch = useDispatch();

  const sendTokenToBank = async () => {
    web3Props.web3.setProvider("HTTP://127.0.0.1:7545");

    const contract = contracts.hodlCoin;
    await contract.methods
      .transfer(bankAccount[0], product.price)
      .send({ from: accounts[0] });
  };

  const buyProduct = () => {
    product.count = product.count - 1;
    product.userId = auth.id;
    dispatch(updateProduct(product));

    sendTokenToBank().then(() => {
      auth.hodlCoins -= product.price;
      dispatch(updateHodlCoins(auth));
    });
  };

  const { name, spritePreview, price, count } = props.product;

  const styles = (theme) => ({
    card: {
      width: 300,
      margin: "auto",
    },
    media: {
      height: 0,
      width: 100,
    },
  });

  return (
    <Card
      raised
      className={styles.card}
      sx={{
        maxWidth: 500,
        backgroundColor: "transparent",
        outline: "3px solid white",
        margin: "auto",
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
        },
      }}
    >
      <CardMedia
        className={styles.media}
        component="img"
        // height="400"
        image={`/spritesPixelAdventure/characters/previews/${spritePreview}`}
        sx={{ p: 0 }}
      />
      <CardContent sx={{ color: "white", textAlign: "center", p: 0 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="white">
          Price: {price} HODL
        </Typography>
        <br />
        <Button
          onClick={buyProduct}
          sx={{ color: "white", outline: "1px solid white", fill: "green" }}
        >
          SELECT
        </Button>
        <br />
      </CardContent>
      <CardActions
        sx={{ display: "flex", flexDirection: "column" }}
      ></CardActions>
    </Card>
  );
}

const mapState = (state) => {
  return {
    auth: state.auth,
    products: state.products,
    character: state.character,
    web3Props: state.web3Props,
  };
};

export default connect(mapState)(ProductCard);
