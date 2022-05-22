import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import Navigation from "../navigation/Navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  let currUser = userData;
  if (userData.length) {
    currUser = userData[0];
  }
  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/landing");
    }
  }, []);

  useEffect(() => {
    if (logout) {
      localStorage.removeItem("currUser");
    }
  }, [logout]);
  const handleLogout = () => {
    setLogout(true);
    setUserData(0);
    navigate("/login");
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <div className={theme ? "text-white" : null}>
      <div className=" flex justify-around p-4">
        <button onClick={() => setTheme(!theme)}>
          {!theme ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
        {currUser.username !== "" && currUser !== 0 ? (
          <>
            <Navigation />
            <button onClick={handleLogout} className="mr-4">
              Logout
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
