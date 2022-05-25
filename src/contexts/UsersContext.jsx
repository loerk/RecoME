import React, { createContext, useContext, useState } from "react";

const UsersContext = createContext([]);

export const useUsers = () => {
  return useContext(UsersContext);
};

export function UsersContextProvider({ children }) {
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );

  const contextValue = { users: users, setUsers: setUsers };
  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}
