import React from "react";
import { Paper, Typography, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Copyright = () => {
  return (
    <Typography variant="body1" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/Fashion-Shopper/Fashion-Shopper-JRL"
        target="_blank"
      >
        JRL ARCHIVES
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
};
const Footer = () => {
  return (
    <Paper
      square
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        left: "0",
        bottom: "0",
        width: "100%",
        zIndex: "1",
        py: 3,
        px: 2,
        opacity: "0%",
      }}
    >
      <IconButton color="primary">
        <GitHubIcon sx={{ height: 30, width: 30 }} />
      </IconButton>
    </Paper>
  );
};
export default Footer;
