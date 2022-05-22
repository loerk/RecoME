
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
import PageNotFound from './PageNotFound';
import Bubbles from './components/bubbles/Bubbles';
import Bubble from './components/bubbles/Bubble';
import CreateBubble from './components/bubbles/CreateBubble';



function App() {
  const { theme } = useTheme()

  const { userData } = useUserData()
  const navigate = useNavigate()


  useEffect(() => {

    if (!userData || userData[0].email === "") {

      navigate("/login");
    }
    else {
      navigate("/landing")
    }
  }, []);

  return (
    <UsersContextProvider>
      <UserDataContextProvider>
        <div className={theme ? "bg-black min-h-screen h-full" : "h-screen"}>
          <Header />
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="landing" element={<Landing />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="bubbles" element={<Bubbles />} >
              <Route path="createBubble" element={<CreateBubble />} />
              <Route path=":bubbleId" element={<Bubble />} />
            </Route>

          </Routes>
        </div>
      </UserDataContextProvider>
    </UsersContextProvider>
  );
}

export default App;
