import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";

import Navigation from "../navigation/Navigation";
import Notifications from "../notifications/Notifications";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const { userData, setUserData, userLogout } = useUserData();
  const { users, setUsers, updateUsers } = useUsers();
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  console.log("headerLevel", userData);

  const handleLogout = () => {
    // setLogout(true);
    // setUserData({ ...userData, isLoggedIn: false });
    //localStorage.setItem("currUser", JSON.stringify(userData));
    userLogout(userData);
    updateUsers(userData);
    navigate("/login");
  };

  // useEffect(() => {
  //   console.log("logout run");
  //   setUsers(users.map((user) => (user.id === userData.id ? userData : user)));
  //   updateUsers();
  // }, [logout]); // eslint-disable-line

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
            <Notifications />
            <div className="absolute right-28 top-7">
              <p>Hi {userData.username} !</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
