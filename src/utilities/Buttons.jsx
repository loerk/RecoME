import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";

export function AddButton({ action }) {
  return (
    <div className="flex">
      <button onClick={action} className="m-auto mt-8">
        <AiOutlinePlusCircle />
      </button>
    </div>
  );
}

export function HoverButton({ name, action }) {
  <button
    onClick={action}
    className="w-full hover:translate-y-1  text-3xl p-3 bg-black  text-white  font-face-tm my-4"
  >
    {name}
  </button>;
}
