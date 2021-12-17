/////////////// REACT / REDUX ///////////////////////
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

///////////////// COMPONENT ///////////////////////
import ProductCard from "./ProductCard";

/////////////// MATERIAL UI //////////////////////
import { Grid, Typography, Box } from "@mui/material";

const Products = () => {
  const state = useSelector((state) => state);
  const { auth, products } = state;
  return (
    <>
      <h1>Shop</h1>
      <br />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Grid
          container
          alignItems="center"
          item
          xs={12}
          sm={8}
          spacing={3.5}
          sx={{ m: 0, mb: 18 }}
        >
          {products
            .filter((p) => p.count !== 0)
            .map((product) => (
              <Grid item xs={11} sm={6} md={6} lg={3} key={product.id}>
                <ProductCard product={product} auth={auth} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
};

export default Products;
