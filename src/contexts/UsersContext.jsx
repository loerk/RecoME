import React, { createContext, useContext, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

const UsersContext = createContext([]);

export const useUsers = () => {
  return useContext(UsersContext);
};

export function UsersContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currUser") || {})
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const loginUser = (user) => {
    setCurrentUser({ ...user, isLoggedIn: true, lastLogin: Date.now() });
  };

  const logoutUser = (user) => {
    setCurrentUser({ ...user, isLoggedIn: false });
  };

  const updateUsers = (currUser) => {
    setUsers(users.map((user) => (user.id === currUser.id ? currUser : user)));
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
  };
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  const deleteUser = () => {
    const deletedArr = users.filter((user) => user.id !== currentUser.id);
    setUsers(deletedArr);
    setCurrentUser(0);
  };

  const createNewUser = (registeredUser) => {
    setCurrentUser({
      ...registeredUser,
      id: uuidv1(),
      lastLogin: Date.now(),
      isLoggedIn: true,
      memberSince: Date.now(),
      stayLoggedIn: false,
      friends: [],
      bubbles: [],
      invitedFriends: [],
      notifications: [],
      invitedBy: "",
      avatarUrl: `https://api.multiavatar.com/${registeredUser.username}.png`,
      recos: [
        {
          private: [],
          public: [],
          specified: [
            {
              to: [],
              reco: {},
            },
          ],
        },
      ],
    });
  };

  const contextValue = {
    users: users,
    setUsers: setUsers,
    currentUser: currentUser,
    updateUsers: updateUsers,
    updateUser: updateUser,
    addUser: addUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [users, currentUser]);

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}
