import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Navigation from "../navigation/Navigation";

export default function Header({ currUser, setCurrUser }) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  if (currUser) {
    const sessionUser = currUser[0];
    console.log("header", sessionUser.email);
  }

  const logout = () => {
    setCurrUser(null);
    navigate("/login");
  };
  return (
    <div className={theme ? "text-white" : null}>
      <div className=" flex justify-between p-4">
        <button onClick={() => setTheme(!theme)}>
          {!theme ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
        {currUser ? (
          <>
            <Navigation />
            <button onClick={() => logout()} className="mr-4">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
