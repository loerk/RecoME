
import './App.css';
import Header from './components/header/Header';
import Register from './components/landing/Register.jsx';
import { useTheme } from './contexts/ThemeContext';
import { UserDataContextProvider } from './contexts/UserDataContext';
import { Routes, Route } from "react-router-dom";
import Login from './components/landing/Login';


function App() {
  const { theme } = useTheme()
  return (
    <UserDataContextProvider>
      <div className={`bg-${theme} h-screen`}>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </div>
    </UserDataContextProvider>
  );
}

export default App;
