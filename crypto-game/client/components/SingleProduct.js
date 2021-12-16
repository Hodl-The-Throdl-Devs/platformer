import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import purchase from "../store/products";
import swapAuthProfile from "../store/auth";

import { Button, Grid, Typography, Divider, Container } from "@mui/material";

const SingleProduct = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { id } = props.match.params;
  const singleProduct = products.find((product) => product.id === id * 1);

  //   const [input, setinput] = useState({ quantity: 1 })

  //   const handleChange = (evt) => {
  //     const target = evt.target
  //     setinput({ [target.name]: target.value })
  //   }

  const purchaseSingleProduct = () => {
    dispatch(purchase(singleProduct));
  };

  const swapProfile = () => {
    //not used yet
    dispatch(swapAuthProfile(singleProduct));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ pb: 25 }}>
      <Grid container sx={{ mt: 3 }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            px: 4,
            textAlign: "center",
            "@media screen and (max-width: 600px)": { p: 0 },
          }}
        >
          <img
            loading="lazy"
            src={`/spritesPixelAdventure/characters/previews/${singleProduct.spritePreview}`}
            width="70%"
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ px: 4, textAlign: "right" }}>
          <Typography variant="h5">{singleProduct.name}</Typography>

          <Typography variant="body1" color="text.secondary">
            {singleProduct.price}
          </Typography>

          <Button
            onClick={purchaseSingleProduct}
            variant="contained"
            sx={{ m: 1 }}
          >
            Purchase
          </Button>

          <Divider sx={{ m: 2 }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProduct;
