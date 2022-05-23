import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import Navigation from "../navigation/Navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { userData, setUserData } = useUserData();
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  console.log("headerLevel", userData);

  const handleLogout = () => {
    setLogout(true);
    setUserData({ ...userData, isLoggedIn: false });
    navigate("/login");
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);

  // useEffect(() => {
  //   setUsers(users.map((user) => (user.id === userData.id ? userData : user)));
  //   localStorage.setItem("users", JSON.stringify(users));
  // }, [logout]);

  return (
    <div className={theme ? "text-white" : null}>
      <div className=" flex justify-between py-4 px-4">
        <button onClick={() => setTheme(!theme)}>
          {!theme ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
        {userData.isLoggedIn ? (
          <>
            <Navigation />
            <div className="flex-col gap-4 ">
              <img src={userData.avatarUrl} alt="" className="w-10" />
              <button onClick={handleLogout} className="mr-4">
                Logout
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
