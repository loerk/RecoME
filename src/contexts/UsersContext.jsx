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

  const sendBubbleNotification = (bubbleId, friendList) => {
    const updatedFriendList = friendList.map((friendId) => {
      const friend = findUserById(friendId);
      return {
        ...friend,
        notifications: [
          ...friend.notifications,
          {
            toBubble: bubbleId,
            invitedAt: Date.now(),
            invitationId: uuidv1(),
            type: "Invitation to Bubble",
            invitedBy: currentUser.id,
            invitedByUser: currentUser.username,
          },
        ],
      };
    });

    updateUsers(updatedFriendList);
  };

  const sendRecoNotification = (id, friendList) => {
    const updatedFriendList = friendList.map((friendId) => {
      const friend = findUserById(friendId);
      return {
        ...friend,
        notifications: [
          ...friend.notifications,
          {
            recoId: id,
            invitedAt: Date.now(),
            invitationId: uuidv1(),
            type: "Reco for you",
            invitedBy: currentUser.id,
            invitedByUser: currentUser.username,
          },
        ],
      };
    });
    updateUsers(updatedFriendList);
  };
  const deleteUser = () => {
    const filteredUser = users.filter((user) => user.id !== currentUser.id);
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

  const getRecosByUser = () => {
    return users.map((user) => {
      return user.recos.filter((reco) => reco.createdBy === currentUser.id);
    });
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
      recos: [],
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
    updateCurrentUser,
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
    findUserByEmail,
    findUserById,
    sendBubbleNotification,
    getRecosByUser,
    sendRecoNotification,
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
