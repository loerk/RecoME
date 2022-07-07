import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../contexts/UsersContext";

import Navigation from "../navigation/Navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { logoutUser, currentUser } = useUsers();

  const navigate = useNavigate();

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
      <div className=" flex flex-wrap justify-between py-4 px-7">
        <button onClick={() => setTheme(!theme)}>
          {!theme ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
        {currentUser && <Navigation />}
        {currentUser && (
          <div className="flex ">
            <div className="flex justify-between">
              <img
                src={currentUser.avatarUrl}
                alt=""
                className="w-10 h-10 shadow-lg rounded-full "
              />
              <div className="text-sm relative pl-2">
                <p>Hi {currentUser.username} !</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
