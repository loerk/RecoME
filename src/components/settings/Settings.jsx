import React, { useEffect, useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Settings() {
  const { userData, setUserData } = useUserData();
  const { theme } = useTheme();
  const [choiceUsername, setChoiceUsername] = useState();
  const navigate = useNavigate();
  const { users, setUsers } = useUsers();
  const updateUserData = () => {
    setUserData([{ ...userData, username: choiceUsername }]);
  };
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

  // const updateUserArray = () => {
  //   if (users === undefined || !userData[0].username) {
  //     return;
  //   } else {
  //     setUsers(
  //       users.map((user) => {
  //         if (user.id === userData[0].id) {
  //           return [{ ...user, username: choiceUsername }];
  //         } else {
  //           return user;
  //         }
  //       })
  //     );
  //   }
  // };
  // console.log(users);
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   updateUserData();
  //   updateUserArray();
  //   navigate("/landing");
  // };

  // return (
  //   <div>
  //     <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="Enter Username"
  //         className="w-full font-face-tm text-2xl p-2 border-2"
  //         name="username"
  //         onChange={(e) => {
  //           setChoiceUsername(e.target.value);
  //         }}
  //         value={userData.name}
  //       />

  //       <button
  //         className={
  //           theme
  //             ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
  //             : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
  //         }
  //       >
  //         set {choiceUsername} as username
  //       </button>
  //     </form>
  //   </div>
  // );
}
