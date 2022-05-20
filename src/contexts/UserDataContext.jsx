import React, { createContext, useContext, useState } from "react";

const UserDataContext = createContext(false);

export const useUserData = () => {
  return useContext(UserDataContext);
};

export function UserDataContextProvider({ children }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    stayLoggedIn: false,
  });

  const contextValue = { formData, setFormData };
  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
}
