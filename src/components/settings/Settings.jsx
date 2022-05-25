import React, { useEffect } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Settings() {
  const { userData, setUserData } = useUserData();
  const { users, setUsers } = useUsers();
  const navigate = useNavigate();

  const deleteUser = () => {
    const deletedArr = users.filter((user) => user.id !== userData.id);
    setUsers(deletedArr);
    setUserData(0);
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  return (
    <div className="text-center mt-28">
      <p>Think about it, but here you can...</p>
      <p>say goodbye forever :/</p>
      <button className="bg-black text-white p-2 mt-10" onClick={deleteUser}>
        goodbye
      </button>
    </div>
  );
}
