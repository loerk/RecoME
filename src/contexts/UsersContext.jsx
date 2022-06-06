import React, { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext([]);

export const useUsers = () => {
  return useContext(UsersContext);
};

export function UsersContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currUser"))
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || []
  );
  const updateUsers = (currUser) => {
    setUsers(users.map((user) => (user.id === currUser.id ? currUser : user)));
  };

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };
  const contextValue = {
    users: users,
    setUsers: setUsers,
    currentUser: currentUser,
    updateUsers: updateUsers,
    addUser: addUser,
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);
  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
}
