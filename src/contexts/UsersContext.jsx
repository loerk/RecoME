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

  const updateUsers = (updatedUserList) => {
    const updatedUsers = users.map((user) => {
      const foundUser = updatedUserList.find(
        (findUser) => findUser.id === user.id
      );
      return foundUser ? foundUser : user;
    });
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const updateCurrentUser = (updatedUser) => {
    setCurrentUser({ ...updatedUser });
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const deleteUser = () => {
    const filteredUser = users
      .filter((user) => user.id !== currentUser.id)
      .map((user) => ({
        ...user,
        friends: user.friends.filter((friend) => friend.id !== currentUser.id),
      }));

    setUsers(filteredUser);
    setCurrentUser(null);
    localStorage.setItem("users", JSON.stringify(filteredUser));
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
    };
    setCurrentUser(newUser);
    setUsers([...users, newUser]);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
  };
  const addFriend = (friendId) => {
    if (currentUser.friends.includes(friendId)) return;
    const updatedUser = {
      ...currentUser,
      friends: [...currentUser.friends, friendId],
    };
    updateCurrentUser(updatedUser);

    const friend = findUserById(friendId);
    const updatedFriend = {
      ...friend,
      friends: [...friend.friends, currentUser.id],
    };
    updateUsers([updatedUser, updatedFriend]);
  };
  const contextValue = {
    users,
    setUsers,
    currentUser,
    updateUsers,
    updateCurrentUser,
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
    findUserByEmail,
    findUserById,
    addFriend,
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
