import React, { createContext, useContext, useState } from "react";
import { v1 as uuidv1 } from "uuid";
const UserDataContext = createContext({
  id: uuidv1(),
  username: "",
  email: "",
  password: "",
  passwordConfirm: "",
  notifications: [],
  memberSince: 0,
  stayLoggedIn: false,
  isLoggedIn: false,
  avatarUrl: "",
  friends: [],
  bubbles: [],
  invitedFriends: [],
  invitedBy: "",
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

export const useUserData = () => {
  return useContext(UserDataContext);
};
const initialValue = JSON.parse(localStorage.getItem("currUser"));

export function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState(
    initialValue || {
      id: uuidv1(),
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      memberSince: 0,
      stayLoggedIn: false,
      avatarUrl: "",
      isLoggedIn: false,
      notifications: [],
      friends: [],
      bubbles: [],
      invitedFriends: [],
      invitedBy: "",
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
    }
  );

  const contextValue = { userData: userData, setUserData: setUserData };
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}
