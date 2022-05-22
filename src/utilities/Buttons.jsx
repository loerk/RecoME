import React from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useTheme } from "../contexts/ThemeContext";

export function AddButton({ action }) {
  const { theme } = useTheme();
  console.log(theme);
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
