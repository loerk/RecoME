import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUsers } from '../../contexts/UsersContext';

import Navigation from '../navigation/Navigation';

export default function Header() {
  const { logoutUser, currentUser } = useUsers();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { expiresAt } = JSON.parse(localStorage.getItem('expiresAt')) || 0;

    if (expiresAt * 1000 < new Date().getTime()) {
      handleLogout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleLogout = () => {
    logoutUser(currentUser);
    navigate('/login');
  };

  return (
    <div className='top-0 bg-white z-20 pt-2 w-full fixed shadow-xl '>
      <div className=' flex flex-wrap justify-end py-4 px-7'>
        {currentUser && <Navigation />}
        {currentUser && (
          <div>
            <div className='flex'>
              <img
                src={currentUser.avatarUrl}
                alt=''
                className='w-14 h-14 shadow-lg rounded-full '
              />
              <div className='mt-2 text-sm relative pl-2'>
                <p>Hi {currentUser.username} !</p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
