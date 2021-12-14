import * as React from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../store";

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
  const dispatch = useDispatch()
  
  const buyProduct = () => {
    const { auth, product } = props;
    product.count = product.count - 1;
    product.userId = auth.id;
    dispatch(updateProduct(product));
  };
  
  const { name, imageURL, price, count } = props.product;
  
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
          image={`/sprites/${imageURL}`}
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

export default ProductCard;
