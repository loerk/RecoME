import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../contexts/UsersContext';

export default function Settings() {
  window.scrollTo(0, 0);
  const { currentUser, deleteUser } = useUsers();
  const navigate = useNavigate();

  const deleteCurrentUser = () => {
    deleteUser(currentUser._id);
    navigate('/login');
  };

  return (
    <div className='text-center pt-32 pb-12'>
      <p>Think about it, but here you can...</p>
      <p>say goodbye forever :/</p>
      <button
        className='bg-black text-white p-2 mt-10'
        onClick={deleteCurrentUser}
      >
        goodbye
      </button>
    </div>
  );
}
