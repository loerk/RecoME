import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useTheme } from "../../contexts/ThemeContext";

export default function Settings() {
  const { userData, setUserData } = useUserData();
  const { theme } = useTheme();

  function handleChange(event) {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Username"
          className="w-full font-face-tm text-2xl p-2 border-2"
          name="username"
          onChange={handleChange}
          value={userData.name}
        />

        <button
          className={
            theme
              ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
              : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
          }
        >
          set {userData.username}
        </button>
      </form>
    </div>
  );
}
