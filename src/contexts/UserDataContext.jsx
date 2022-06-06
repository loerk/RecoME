import React, { createContext, useContext, useState } from "react";
const UserDataContext = createContext(null);

export const useUserData = () => {
  return useContext(UserDataContext);
};
const initialValue = JSON.parse(localStorage.getItem("currUser"));

export function UserDataContextProvider({ children }) {
  function userLogin(user){
    setUserData({...user, isLoggedIn:true, lastLogin: Date.now()});
    localStorage.setItem("currUser", JSON.stringify(userData));
  }
  function userLogout(user){
    setUserData({...user, isLoggedIn:false});
    localStorage.setItem("currUser", JSON.stringify(userData))
  }

  const [userData, setUserData] = useState(
    initialValue || {
      id: null,
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

  const contextValue = { userData: userData, setUserData: setUserData, userLogin: userLogin, userLogout: userLogout };
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );


}


