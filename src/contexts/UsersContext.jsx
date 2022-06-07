import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";

const UsersContext = createContext([]);

export const useUsers = () => {
  return useContext(UsersContext);
};
const initialValueCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
const initialValueUsers = JSON.parse(localStorage.getItem("users"));

export function UsersContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    initialValueCurrentUser || null
  );
  const [users, setUsers] = useState(initialValueUsers || []);

  const loginUser = (user) => {
    const userWithLastLogin = { ...user, lastLogin: Date.now() };
    setCurrentUser(userWithLastLogin);
    localStorage.setItem("currentUser", JSON.stringify(userWithLastLogin));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.setItem("currentUser", JSON.stringify(null));
  };

  const updateUsers = (currUser) => {
    const updatedUsers = users.map((user) =>
      user.id === currUser.id ? currUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateUser = (updatedUser) => {
    setCurrentUser({ ...updatedUser });
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const deleteUser = () => {
    setUsers(users.filter((user) => user.id !== currentUser.id));
    setCurrentUser(null);
    localStorage.setItem(
      "users",
      JSON.stringify(users.filter((user) => user.id !== currentUser.id))
    );
    localStorage.setItem("currentUser", JSON.stringify(null));
  };

  const findUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  const findUserById = (id) => {
    return users.find((user) => user.id === id);
  };
  const createNewUser = (registeredUser) => {
    const newUser = {
      ...registeredUser,
      id: uuidv1(),
      lastLogin: Date.now(),
      memberSince: Date.now(),
      stayLoggedIn: false,
      friends: [],
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
    };
    setCurrentUser(newUser);
    setUsers([...users, newUser]);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
  };

  const contextValue = {
    users,
    setUsers,
    currentUser,
    updateUsers,
    updateUser,
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
    findUserByEmail,
    findUserById,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}

export const useGetCurrentUser = () => {
  const context = useUsers();
  return () => {
    return context.currentUser;
  };
};
