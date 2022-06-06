import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { UsersContextProvider } from "./contexts/UsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersContextProvider>
    <ThemeContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeContextProvider>
  </UsersContextProvider>
);
