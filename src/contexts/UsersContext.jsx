import React, { createContext, useContext, useState } from "react";
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

  const loginUser = async (loginData) => {
    const resp = await loginFetchData("/auth/signin", loginData);
    if (resp.message === "please confirm your email first") return resp.message;
    if (resp.message !== "successfully logged in")
      return "something went wrong, try again";

    setCurrentUser(() => resp.existingUser);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        _id: resp.existingUser._id,
        avatarUrl: resp.existingUser.avatarUrl,
        friends: resp.existingUser.friends,
        username: resp.existingUser.username,
      })
    );
    localStorage.setItem(
      "expiresAt",
      JSON.stringify({
        expiresAt: resp.expiresAt,
      })
    );
    return currentUser;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.clear();
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
  // const updateUser = async (updatedUser) => {
  //   const updatedUserData = await fetchData(
  //     `/users/${updatedUser.id}`,
  //     "PUT",
  //     updatedUser
  //   );
  //   setCurrentUser(updatedUserData);
  //   return updatedUserData;
  // };

  const deleteUser = async (id) => {
    await fetchData(`/users/${id}`, "DELETE");
    setCurrentUser(null);
  };

  // const addFriend = async (friendId) => {
  //   try {
  //     if (currentUser.friends.includes(friendId)) return;
  //     const updatedCurrentUser = {
  //       ...currentUser,
  //       friends: [...currentUser.friends, friendId],
  //     };
  //     await updateUser(updatedCurrentUser);
  //   } catch (error) {}

  //   const friend = await findUserById(friendId);
  //   const updatedFriend = {
  //     ...friend,
  //     friends: [...friend.friends, currentUser.id],
  //   };
  //   await updateUser(updatedFriend);
  // };

  // const updateUsers = (updatedUserList) => {
  //   const updatedUsers = users.map((user) => {
  //     const foundUser = updatedUserList.find(
  //       (findUser) => findUser.id === user.id
  //     );
  //     return foundUser ? foundUser : user;
  //   });
  //   setUsers(updatedUsers);
  //   localStorage.setItem("users", JSON.stringify(updatedUsers));
  // };

  const contextValue = {
    // updateUsers,

    currentUser,
    loginUser,
    logoutUser,
    createNewUser,
    deleteUser,
    findUserById,
    //addFriend,
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
