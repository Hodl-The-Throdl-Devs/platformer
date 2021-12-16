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

  return (
    <Card
      raised
      sx={{
        maxWidth: 350,
        boxShadow: "none",
        "&:hover": {
          boxShadow:
            "0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="400"
        image={`/spritesPixelAdventure/characters/previews/${spritePreview}`}
        sx={{ p: 0 }}
      />
      <CardContent sx={{ textAlign: "center", p: 0 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: {price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Available quantity: {count}
        </Typography>
        <Button onClick={buyProduct}>Purchase!</Button>
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
