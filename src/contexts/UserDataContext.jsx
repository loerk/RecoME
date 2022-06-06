import React, { createContext, useContext, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";

const UserDataContext = createContext(null);

export const useUserData = () => {
  return useContext(UserDataContext);
};
const initialValue = JSON.parse(localStorage.getItem("currUser"));

export function UserDataContextProvider({ children }) {
  const userLogin = (user) => {
    setUserData({ ...user, isLoggedIn: true, lastLogin: Date.now() });
  };
  const userLogout = (user) => {
    setUserData({ ...user, isLoggedIn: false });
  };

  const createNewUser = (registeredUser) => {
    setUserData({
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

  const [userData, setUserData] = useState(initialValue || {});

  const contextValue = {
    userData: userData,
    setUserData: setUserData,
    createNewUser: createNewUser,
    userLogin: userLogin,
    userLogout: userLogout,
  };
  useEffect(() => {
    localStorage.setItem("currUser", JSON.stringify(userData));
  }, [userData]);

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}
