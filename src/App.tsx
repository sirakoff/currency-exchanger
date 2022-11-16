import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Box
      className="App"
      sx={{
        backgroundColor: grey[50],
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: 920,
          width: "100%",
          mx: "auto",
          height: "100vh",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
