
import './App.css';
import Header from './components/header/Header';
import Register from './components/register/Register.jsx';
import { useTheme } from './contexts/ThemeContext';
import { UserDataContextProvider, useUserData } from './contexts/UserDataContext';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/login/Login';
import { UsersContextProvider } from './contexts/UsersContext';
import Landing from './components/landing/Landing';
import { useEffect, useState } from 'react';
import Settings from './components/settings/Settings';


function App() {
  const { theme } = useTheme()
  const [currUser, setCurrUser] = useState()
  const { userData } = useUserData()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData === undefined) {
      navigate("/login");
    }
    else {
      navigate("/landing")
    }
  }, []);
  console.log("appCurrUser", currUser, userData)
  return (
    <UsersContextProvider>
      <UserDataContextProvider>
        <div className={theme ? "bg-black h-screen" : "h-screen"}>
          <Header currUser={currUser} setCurrUser={setCurrUser} />
          <Routes>
            <Route path="/" element={<Register setCurrUser={setCurrUser} />} />
            <Route path="login" element={<Login setCurrUser={setCurrUser} />} />
            <Route path="landing" element={<Landing currUser={currUser} />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </div>
      </UserDataContextProvider>
    </UsersContextProvider>
  );
}

export default App;
