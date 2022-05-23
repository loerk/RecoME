import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useUserData } from "../../contexts/UserDataContext";

import { useNavigate, NavLink } from "react-router-dom";
import { nanoid } from "nanoid";
import { useUsers } from "../../contexts/UsersContext";

export default function Register() {
  const { userData, setUserData } = useUserData();
  const { theme } = useTheme();
  const { users, setUsers } = useUsers();
  const [confirmed, setConfirmed] = useState(true);
  const [hasAccount, setHasAccount] = useState(false);
  const [registerData, setRegisterData] = useState({});
  const navigate = useNavigate();
  const createID = () => {
    return nanoid();
  };

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      id: createID(),
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log("userdata", userData);
    // console.log("hfjdalguals", registerData);

    // setUserData((prevUserData) => ({
    //   ...prevUserData,
    //   id: createID(),
    //   [name]: type === "checkbox" ? checked : value,
    // }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //check if passwords match
    if (
      registerData.password !== registerData.passwordConfirm ||
      registerData.password === "" ||
      registerData.password === ""
    ) {
      setConfirmed(false);
      return;
    }
    //check if user already exists
    if (users.length !== 0) {
      const knownUser = users.find((user) => user.email === registerData.email);
      if (knownUser) {
        if (knownUser.length !== 0) {
          setHasAccount(true);
          return;
        }
      }
    }
    setHasAccount(false);
    setConfirmed(true);
    setUserData({
      ...registerData,
      lastLogin: Date.now(),
      isLoggedIn: true,
      memberSince: Date.now(),
      stayLoggedIn: false,
      friends: [],
      bubbles: [],
      invitedFriends: [],
      notifications: [],
      invitedBy: "",
      avatarUrl: `https://api.multiavatar.com/${registerData.username}.png`,
      recos: [
        {
          private: [],
          public: [],
          specified: [
            {
              to: [],
              reco: {},
            },
          ],
        },
      ],
    });

    setUsers([
      ...users,
      {
        ...userData,
        ...registerData,
        isLoggedIn: true,
        memberSince: Date.now(),
      },
    ]);
    navigate("/");
  }

  return (
    <div className=" flex justify-center flex-col">
      <h1
        className={
          theme
            ? "mt-8 font-face-tb text-9xl text-center py-5 text-white"
            : "mt-8 font-face-tb text-9xl text-center py-5 text-black"
        }
      >
        {" "}
        WELCOME
      </h1>
      <div className="w-72 m-auto">
        <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="username"
            onChange={handleChange}
            value={registerData.username}
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="email"
            onChange={handleChange}
            value={registerData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="password"
            onChange={handleChange}
            value={registerData.password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="passwordConfirm"
            onChange={handleChange}
            value={registerData.passwordConfirm}
          />

          <div>
            <input
              id="okayToEmail"
              type="checkbox"
              name="stayLoggedIn"
              onChange={handleChange}
              checked={registerData.stayLoggedIn}
            />
            <label
              className={
                theme
                  ? "pl-3 font-face-tm text-2xl text-white"
                  : "pl-3 font-face-tm text-2xl text-black"
              }
              htmlFor="okayToEmail"
            >
              I want to stay logged in
            </label>
          </div>
          {hasAccount ? (
            <p className="text-fuchsia-600">
              This email already has an account. Please sign in
            </p>
          ) : null}
          {!confirmed ? (
            <p className="text-fuchsia-600">passwords do not match</p>
          ) : null}
          <button
            className={
              theme
                ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
                : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
            }
          >
            Register
          </button>
          <NavLink
            to="login"
            className={
              theme
                ? "w-full text-2xl p-1 bg-black  hover:translate-y-1 text-center text-white border-2 border-white-900 font-face-tm"
                : "w-full text-2xl p-1 bg-white  hover:translate-y-1 text-center text-black border-2 border-black-900 font-face-tm"
            }
          >
            Sign in
          </NavLink>
        </form>
      </div>
    </div>
  );
}
