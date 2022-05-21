import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import Settings from "../settings/Settings";

export default function Landing() {
  const navigate = useNavigate();
  const { users } = useUsers();
  const { userData, setUserData } = useUserData();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);
  return (
    <div>
      {!userData.username ? (
        <Settings />
      ) : (
        <>
          <div>Your bubbles</div>
          <div>Your friends</div>
          <div>Your recs</div>
        </>
      )}
    </div>
  );
}
