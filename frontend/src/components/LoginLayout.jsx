// components/LoginLayout.jsx

import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import { Route, Routes } from "react-router-dom";
import Login from "../scenes/login";
import "../index.css";

const LoginLayout = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="login-layout">
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default LoginLayout;
