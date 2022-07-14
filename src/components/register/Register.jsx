import React, { useState } from "react";

import { useTheme } from "../../contexts/ThemeContext";
import { useNavigate, NavLink } from "react-router-dom";
import { fetchData } from "../../api/fetchers";

export default function Register() {
  const { theme } = useTheme();

  const [status, setStatus] = useState();
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    stayLoggedIn: false,
  });

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      registerData.password !== registerData.passwordConfirm ||
      !registerData.password
    ) {
      setStatus("The passwords have to match");
      return;
    }
    const result = await fetchData("/signup", "POST", registerData);
    if (result.message !== "success")
      return setStatus("we could not register your account, try again");
    setStatus("please verify your email and login");
    navigate("/");
  };

  return (
    <div className=" flex justify-center mt-10 flex-col">
      <h1
        className={
          theme
            ? "mt-8 font-face-tb text-8xl text-center py-5 text-white"
            : "mt-8 font-face-tb text-8xl text-center py-5 text-black"
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
              htmlFor="okayToStayLoggedIn"
            >
              I want to stay logged in
            </label>
          </div>
          {!!status && <p className="text-fuchsia-600">{status}</p>}
          <button
            className={
              theme
                ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
                : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
            }
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
            to="/login"
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
