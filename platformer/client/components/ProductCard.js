import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

// import { destroyProduct } from "../../store";

function ProductCard(props) {
  const { isAdmin } = useSelector((state) => state.auth);
  const { id, name, imageURL, price, count } = props.product;

  const dispatch = useDispatch();

  const handleDelete = (productId) => {
    dispatch(destroyProduct(productId));
  };

  return (
    <Box component={Link} to={`/products/${id}`}>
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
        </CardContent>
        <CardActions
          sx={{ display: "flex", flexDirection: "column" }}
        ></CardActions>
      </Card>
    </Box>
  );
}

export default ProductCard;
