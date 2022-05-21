import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(false);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(false);
  const contextValue = { theme, setTheme };
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
