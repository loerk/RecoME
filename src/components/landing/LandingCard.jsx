import { v1 as uuidv1 } from "uuid";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";

export default function LandingCard({ currUser }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
      <div>
        <h1>Your bubbles</h1>
        <ul>
          {currUser.bubbles ? (
            currUser.bubbles.map((bubble) => (
              <li key={uuidv1()}>
                <button onClick={() => navigate("/bubbles")}>
                  {bubble.name}
                </button>
              </li>
            ))
          ) : (
            <AddButton />
          )}
        </ul>
      </div>
    </div>
  );
}
