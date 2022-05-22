import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export function AddButton() {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <button className="m-auto mt-8">
        <AiOutlinePlusCircle></AiOutlinePlusCircle>
      </button>
    </div>
  );
}
