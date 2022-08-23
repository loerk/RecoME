import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchData, loginFetchData } from "../api/fetchers";

const UsersContext = createContext([]);

export const useUsers = () => {
  return useContext(UsersContext);
};
const initialValueCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

export function UsersContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    initialValueCurrentUser || null
  );
  const [friends, setFriends] = useState([]);
  const [shouldFetchCurrentUser, setShouldFetchCurrentUser] = useState(false);
  const [shouldUpdateFriends, setShouldUpdateFriends] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const result = await fetchData(`/users/${currentUser._id}`, "GET");
      if (!result) throw new Error("no valid response while getting User");
      setCurrentUser(() => result.currentUser);
      if (friends.length !== result.currentUser.friends.length) {
        setFriends(result.currentUser.friends);
        setShouldUpdateFriends(false);
      }

      setShouldFetchCurrentUser(false);
    };

    if (shouldFetchCurrentUser && currentUser) {
      fetchCurrentUser();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFetchCurrentUser, currentUser]);

  useEffect(() => {
    const fetchFriends = async () => {
      const result = await fetchData(`/users/${currentUser._id}`, "GET");
      if (result?.foundUser) setFriends(() => result.foundUser.friends);
      setShouldUpdateFriends(false);
      return result.foundUser.friends;
    };
    if (shouldUpdateFriends && currentUser) {
      fetchFriends();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, friends]);

  const loginUser = async (loginData) => {
    try {
      const result = await loginFetchData("/auth/signin", loginData);
      if (result.message === "please confirm your email first")
        return result.message;
      if (result.message !== "successfully logged in")
        return "something went wrong, try again";

      setCurrentUser(() => result.existingUser);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          _id: result.existingUser._id,
          avatarUrl: result.existingUser.avatarUrl,
          username: result.existingUser.username,
        })
      );
      localStorage.setItem(
        "expiresAt",
        JSON.stringify({
          expiresAt: result.expiresAt,
        })
      );
      return currentUser;
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.clear();
  };

  const unfriendUser = async (id) => {
    const result = await fetchData(`/users/${id}`, "PUT");
    if (result.updatedCurrentUser) setCurrentUser(result.updatedCurrentUser);
  };

  const findUserById = async (id) => {
    const resp = await fetchData(`/users/${id}`, "GET");
    if (!resp) return null;
    return resp;
  };

  const createNewUser = async (registeredUser) => {
    const newUser = await fetchData("/auth/signup", "POST", registeredUser);
    if (!newUser) return null;
    return newUser;
  };

  const deleteUser = async (id) => {
    await fetchData(`/users/${id}`, "DELETE");
    setCurrentUser(null);
  };

  const contextValue = {
    setShouldUpdateFriends,
    friends,
    setFriends,
    setShouldFetchCurrentUser,
    unfriendUser,
    setCurrentUser,
    currentUser,
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
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
