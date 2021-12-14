/////////////// REACT / REDUX ///////////////////////
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

///////////////// COMPONENT ///////////////////////
import ProductCard from "./ProductCard";

/////////////// MATERIAL UI //////////////////////
import { Grid, Typography } from "@mui/material";

const Products = () => {
  const products = useSelector((state) => state.products);
  return (
    <>
      <Typography variant="h3" gutterBottom align="center" sx={{ mt: 5 }}>
        All Products
      </Typography>
      <Grid container sx={{ pb: 10 }}>
        <Grid container item xs={12} sm={8} spacing={4} sx={{ m: 0, mb: 18 }}>
          {products
            .filter((p) => p.count !== 0)
            .map((product) => (
              <Grid xs={11} sm={6} md={6} lg={4} item key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </>
  );
};

export default Products;
