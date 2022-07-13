import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { UsersContextProvider } from "./contexts/UsersContext";
import { BubbleContextProvider } from "./contexts/BubbleContext";
import { RecoContextProvider } from "./contexts/RecoContext";
import { NotifivationsContextProvider } from "./contexts/NotificationsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersContextProvider>
    <BubbleContextProvider>
      <RecoContextProvider>
        <NotifivationsContextProvider>
          <ThemeContextProvider>
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </ThemeContextProvider>
        </NotifivationsContextProvider>
      </RecoContextProvider>
    </BubbleContextProvider>
  </UsersContextProvider>
);
