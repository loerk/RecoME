import React from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useTheme } from "../contexts/ThemeContext";

export function AddButton({ action }) {
  const { theme } = useTheme();
  return (
    <div className="flex">
      <button onClick={action} className="m-auto mt-8">
        {theme ? (
          <AiFillPlusCircle className="text-white" />
        ) : (
          <AiOutlinePlusCircle />
        )}
      </button>
    </div>
  );
}

export function HoverButton({ name, action }) {
  const { theme } = useTheme();
  <button
    onClick={action}
    className={
      theme
        ? "w-full hover:translate-y-1  text-3xl p-3 bg-white  text-black  font-face-tm my-4"
        : "w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
    }
  >
    {name}
  </button>;
}
