
import './App.css';
import Header from './components/header/Header';
import Register from './components/register/Register.jsx';
import { useTheme } from './contexts/ThemeContext';
import { useUserData } from './contexts/UserDataContext';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/login/Login';
import { UsersContextProvider } from './contexts/UsersContext';
import Landing from './components/landing/Landing';
import { useEffect, useState } from 'react';
import Settings from './components/settings/Settings';
import PageNotFound from './PageNotFound';
import Bubbles from './components/bubbles/Bubbles';
import Bubble from './components/bubbles/Bubble';
import AddBubble from './components/bubbles/AddBubble';
import Friends from './components/friends/Friends';
import Friend from './components/friends/Friend';
import AddFriend from './components/friends/AddFriend';
import Details from './components/friends/Details';



function App() {
  const { theme } = useTheme()
  const { userData } = useUserData()
  const navigate = useNavigate()
  console.log("applevel", userData)
  useEffect(() => {
    if (!userData.isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <UsersContextProvider>

      <div className={theme ? "bg-black min-h-screen h-full" : "h-screen"}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Landing />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="bubbles" element={<Bubbles />} >
            <Route path=":bubbleId" element={<Bubble />} />
            <Route path="addBubble" element={<AddBubble />} />
          </Route>
          <Route path="friends" element={<Friends />} >
            <Route path=":friendId" element={<Friend />} />
            <Route path="addFriend" element={<AddFriend />} />
            <Route path="details" element={<Details />} />
          </Route>


        </Routes>
      </div>

    </UsersContextProvider>
  );
}

export default App;
