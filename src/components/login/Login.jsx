import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useUsers } from "../../contexts/UsersContext";

export default function Login() {
  const { theme } = useTheme();
  const { users, loginUser } = useUsers();

  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({});

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const knownUser = users.find((user) => user.email === loginData.email);

    if (!knownUser) {
      setError("please register first");
      return;
    }
    if (knownUser.password !== loginData.password) {
      setError("wrong password, try again");
      return;
    }
    loginUser(knownUser);
    navigate("/");
  }

  return (
    <div className="flex justify-center flex-col">
      <h1
        className={
          theme
            ? "mt-8 font-face-tb text-9xl text-center py-5 text-white"
            : "mt-8 font-face-tb text-9xl text-center py-5 text-black"
        }
      >
        {" "}
        LOGIN
      </h1>
      <div className="w-72 m-auto">
        <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="email"
            onChange={handleChange}
            value={loginData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="password"
            onChange={handleChange}
            value={loginData.password}
          />

          <div className="form--marketing">
            <input
              id="okayToEmail"
              type="checkbox"
              name="stayLoggedIn"
              onChange={handleChange}
              checked={loginData.stayLoggedIn}
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
          {!!error && <p className="text-fuchsia-600">{error}</p>}
          <button
            className={
              theme
                ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
                : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
            }
          >
            Sign in
          </button>
          <NavLink
            to="/register"
            className={
              theme
                ? "w-full text-2xl p-1 bg-black  hover:translate-y-1 text-center text-white border-2 border-white-900 font-face-tm"
                : "w-full text-2xl p-1 bg-white  hover:translate-y-1 text-center text-black border-2 border-black-900 font-face-tm"
            }
          >
            Register
          </NavLink>
        </form>
      </div>
    </div>
  );
}
