import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../contexts/UsersContext";

import Navigation from "../navigation/Navigation";
import Notifications from "../notifications/Notifications";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { logoutUser, currentUser } = useUsers();

  const navigate = useNavigate();

  console.log("headerLevel", currentUser);

  const handleLogout = () => {
    logoutUser(currentUser);
    navigate("/login");
  };

  return (
    <div
      className={
        theme
          ? "text-white bg-black z-20 w-full fixed top-0"
          : " top-0 bg-white z-20 w-full fixed"
      }
    >
      <div className=" flex flex-wrap justify-between py-4 px-4">
        <button onClick={() => setTheme(!theme)}>
          {!theme ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
        {currentUser && (
          <>
            <Navigation />
            <Notifications />
            <div className="absolute right-28 top-7">
              <p>Hi {currentUser.username} !</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
