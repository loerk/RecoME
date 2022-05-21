import React, { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
const UserDataContext = createContext(false);

export const useUserData = () => {
  return useContext(UserDataContext);
};
const initialValue = JSON.parse(localStorage.getItem("currUser"));

export function UserDataContextProvider({ children }) {
  const [userData, setUserData] = useState(
    initialValue
      ? initialValue
      : {
          id: nanoid(),
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
          memberSince: 0,
          stayLoggedIn: false,
          isLoggedIn: false,
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
