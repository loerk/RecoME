import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Blob } from 'react-interactive-blob';

import { useUsers } from '../../contexts/UsersContext';

export default function Register() {
  const [status, setStatus] = useState();
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    stayLoggedIn: false,
  });

  const navigate = useNavigate();

  const { createNewUser } = useUsers();
  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!registerData.email || !registerData.username)
      return setStatus('All fields are required');

    if (
      registerData.password !== registerData.passwordConfirm ||
      !registerData.password
    )
      return setStatus('The passwords have to match');

    const result = await createNewUser(registerData);
    if (result.message === 'there was a problem creating your account') {
      return setStatus(
        'we could not register your account, is this a valid Email?'
      );
    }
    if (result.message !== 'successfully registered account')
      return setStatus('we could not register your account, try again');

    setStatus('Great! Please verify your email before you login');
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  return (
    <div className='flex justify-center mt-10'>
      <Blob color='#8FE3CF' markers={false} />
      <div className='flex-col absolute'>
        <h1 className='mt-8 font-face-tb text-8xl text-center py-5 text-black'>
          REGISTER
        </h1>
        <div className='w-72 m-auto'>
          <form className='flex flex-wrap gap-2' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='username'
              className='w-full font-face-tm text-2xl p-2 border-2'
              name='username'
              onChange={handleChange}
              value={registerData.username}
            />
            <input
              type='email'
              placeholder='Email address'
              className='w-full font-face-tm text-2xl p-2 border-2'
              name='email'
              onChange={handleChange}
              value={registerData.email}
            />
            <input
              type='password'
              placeholder='Password'
              className=' w-full font-face-tm text-2xl p-2 border-2'
              name='password'
              onChange={handleChange}
              value={registerData.password}
            />
            <input
              type='password'
              placeholder='Confirm password'
              className=' w-full font-face-tm text-2xl p-2 border-2'
              name='passwordConfirm'
              onChange={handleChange}
              value={registerData.passwordConfirm}
            />

            <div>
              <input
                id='okayToEmail'
                type='checkbox'
                name='stayLoggedIn'
                onChange={handleChange}
                checked={registerData.stayLoggedIn}
              />
            </div>
            {!!status && <p className='text-fuchsia-600'>{status}</p>}
            <button
              className='w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4'
              disabled={
                !registerData.email ||
                !registerData.password ||
                !registerData.username ||
                !registerData.passwordConfirm
              }
            >
              Register
            </button>
            <NavLink
              to='/login'
              className='w-full text-2xl p-1 bg-white  hover:translate-y-1 text-center text-black border-2 border-black-900 font-face-tm'
            >
              Sign in
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
