import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useUserData } from "../../contexts/UserDataContext";
import { NavLink } from "react-router-dom";

export default function Login() {
  const { formData, setFormData } = useUserData();
  const { theme } = useTheme();

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }
  return (
    <div className=" flex justify-center flex-col">
      <h1
        className={`mt-20 font-face-tb text-9xl text-center py-5 text-${
          theme === "white" ? "black" : "white"
        }`}
      >
        {" "}
        WELCOME
      </h1>
      <div className="w-72 m-auto">
        <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="w-full font-face-tm text-2xl p-2 border-2"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            type="password"
            placeholder="Confirm password"
            className=" w-full font-face-tm text-2xl p-2 border-2"
            name="passwordConfirm"
            onChange={handleChange}
            value={formData.passwordConfirm}
          />

          <div className="form--marketing">
            <input
              id="okayToEmail"
              type="checkbox"
              name="stayLoggedIn"
              onChange={handleChange}
              checked={formData.stayLoggedIn}
            />
            <label
              className={`pl-3 font-face-tm text-2xl text-${
                theme === "white" ? "black" : "white"
              }`}
              htmlFor="okayToEmail"
            >
              I want to stay logged in
            </label>
          </div>
          <button
            className={`w-full hover:translate-y-1  text-3xl p-3 bg-${
              theme === "white" ? "black" : "white"
            }  text-${theme}  font-face-tm my-4`}
          >
            Register
          </button>
          <NavLink
            to="login"
            className={`w-full text-2xl p-3 bg-${theme}  hover:translate-y-1 text-center text-${
              theme === "white" ? "black" : "white"
            } border-2 border-${
              theme === "white" ? "black" : "white"
            }-900 font-face-tm`}
          >
            Sign in
          </NavLink>
        </form>
      </div>
    </div>
  );
}
