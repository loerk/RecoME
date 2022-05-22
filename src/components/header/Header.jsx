import React, { useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import Navigation from "../navigation/Navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { userData, setUserData } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/login");
    } else {
      navigate("/landing");
    }
  }, []);

  const logout = () => {
    setUserData(null);
    navigate("/login");
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);
  console.log(userData);
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
        {userData && userData[0] ? (
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
