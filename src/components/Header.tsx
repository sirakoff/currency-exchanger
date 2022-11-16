import React from "react";
import { Paper, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { ButtonLink } from "./ButtonLink";

const Header = () => {
  return (
    <Paper
      sx={{
        px: 5,
        py: 5,
        mb: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to="/">
        <Box>Logo</Box>
      </Link>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <ButtonLink text="EUR-USD Details" link={`/details/EUR/USD`} />
        <ButtonLink text="EUR-GBP Details" link={`/details/EUR/GBP`} />
      </Box>
    </Paper>
  );
};

export { Header };
