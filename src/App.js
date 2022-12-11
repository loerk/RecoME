import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Header from './components/header/Header';
import Register from './components/register/Register.jsx';
import Login from './components/login/Login';
import Landing from './components/landing/Landing';
import Settings from './components/settings/Settings';
import PageNotFound from './components/pageNotFound/PageNotFound';
import Bubbles from './components/bubbles/Bubbles';
import Bubble from './components/bubbles/Bubble';
import AddBubble from './components/bubbles/AddBubble';
import Friends from './components/friends/Friends';
import Friend from './components/friends/Friend';
import AddFriend from './components/friends/AddFriend';
import Recos from './components/recommendations/Recos';
import AddReco from './components/recommendations/AddReco';
import Notifications from './components/notifications/Notifications';

import { useUsers } from './contexts/UsersContext';

export default function App() {
  const { currentUser } = useUsers();

  const ProtectedRoute = ({ currentUser, redirectPath = '/login' }) => {
    if (!currentUser) {
      return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
  };

  return (
    <div className='h-full '>
      <Header />
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route element={<ProtectedRoute currentUser={currentUser} />}>
          <Route path='/' element={<Landing />} />
          <Route path='settings' element={<Settings />} />
          <Route path='bubbles' element={<Bubbles />}>
            <Route path=':bubbleId' element={<Bubble />} />
            <Route path='addBubble' element={<AddBubble />} />
            <Route path=':bubbleId/addReco' element={<AddReco />} />
            <Route path=':bubbleId/addFriend' element={<AddFriend />} />
          </Route>
          <Route path='friends' element={<Friends />}>
            <Route path=':friendId' element={<Friend />} />
            <Route path='addFriend' element={<AddFriend />} />
          </Route>
          <Route path='recos' element={<Recos />}>
            <Route path='addReco' element={<AddReco />} />
          </Route>
          <Route path='notifications' element={<Notifications />} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}
