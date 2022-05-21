
import './App.css';
import Header from './components/header/Header';
import Register from './components/register/Register.jsx';
import { useTheme } from './contexts/ThemeContext';
import { UserDataContextProvider } from './contexts/UserDataContext';
import { Routes, Route } from "react-router-dom";
import Login from './components/login/Login';
import { UsersContextProvider } from './contexts/UsersContext';
import Landing from './components/landing/Landing';
import { useState } from 'react';


function App() {
  const { theme } = useTheme()
  const [currUser, setCurrUser] = useState()
  console.log("appCurrUser", currUser)
  return (
    <UsersContextProvider>
      <UserDataContextProvider>
        <div className={theme ? "bg-black h-screen" : "h-screen"}>
          <Header currUser={currUser} setCurrUser={setCurrUser} />
          <Routes>
            <Route path="/" element={<Register setCurrUser={setCurrUser} />} />
            <Route path="login" element={<Login setCurrUser={setCurrUser} />} />
            <Route path="landing" element={<Landing currUser={currUser} />} />
          </Routes>
        </div>
      </UserDataContextProvider>
    </UsersContextProvider>
  );
}

export default App;
