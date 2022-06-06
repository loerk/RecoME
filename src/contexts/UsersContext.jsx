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
    setCurrentUser({ ...user, lastLogin: Date.now() });
  };

  const logoutUser = (user) => {
    setCurrentUser(null);
  };

  const updateUsers = (currUser) => {
    setUsers(users.map((user) => (user.id === currUser.id ? currUser : user)));
  };

  const updateUser = (updatedUser) => {
    setCurrentUser({ ...updatedUser });
  };

  const deleteUser = () => {
    setUsers(users.filter((user) => user.id !== currentUser.id));
    setCurrentUser(null);
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
    setUsers: setUsers,
    currentUser: currentUser,
    updateUsers: updateUsers,
    updateUser: updateUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
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
