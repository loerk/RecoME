import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Blob } from "react-interactive-blob";

import { useBubbles } from "../../contexts/BubbleContext";
import { useNotifications } from "../../contexts/NotificationsContext";
import { useUsers } from "../../contexts/UsersContext";

export default function Login() {
  const { loginUser, setFriends, currentUser } = useUsers();
  const { setShouldFetchBubbles } = useBubbles();
  const { fetchNotifications } = useNotifications();
  const [status, setStatus] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      setShouldFetchBubbles(true);
      fetchNotifications();
      setStatus("");
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      setStatus("All fields are required");
      return;
    }
    const result = await loginUser(loginData);
    if (typeof result === "string") return setStatus(result);

    if (currentUser && result) {
      setFriends(() => result.currentUser.friends);
      setIsLoggedIn(true);
      return;
    }
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="flex justify-center mt-10">
      <Blob color="#8FE3CF" markers={false} />
      <div className="flex-col absolute">
        <h1 className="mt-8 font-face-tb text-8xl text-center py-5 text-black">
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
                className="pl-3 font-face-tm text-2xl text-black"
                htmlFor="okayToEmail"
              >
                I want to stay logged in
              </label>
            </div>
            {!!status && <p className="text-fuchsia-600">{status}</p>}
            <button
              className="w-full active:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
              disabled={!loginData.email || !loginData.password}
            >
              Sign in
            </button>
            <NavLink
              to="/register"
              className="w-full text-2xl p-1 bg-white  hover:translate-y-1 text-center text-black border-2 border-black-900 font-face-tm"
            >
              Register
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
