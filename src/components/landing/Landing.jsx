import { nanoid } from "nanoid";

import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";

export default function Landing() {
  const [currUser, setCurrUser] = useState(false);
  const { users } = useUsers();
  const { userData } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setCurrUser(userData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (userData) {
      localStorage.setItem("currUser", JSON.stringify(userData));
    }
  }, [userData]);
  console.log(userData);
  return (
    <>
      {currUser ? (
        <div>
          <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
            <div>
              <h1>Your bubbles</h1>
              <ul>
                {currUser.bubbles ? (
                  currUser.bubbles.map((bubble) => (
                    <li key={nanoid()}>
                      <button onClick={() => navigate("/bubbles")}>
                        {bubble.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="flex">
                    <button className="m-auto mt-8">
                      <AiOutlinePlusCircle></AiOutlinePlusCircle>
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
          <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
            <div>
              <h1>Your friends</h1>
              <ul>
                {currUser.friends ? (
                  currUser.friends.map((friend) => (
                    <li key={nanoid()}>
                      <button onClick={() => navigate("/friends")}>
                        {friend.name}
                      </button>
                    </li>
                  ))
                ) : (
                  <div className="flex">
                    <button className="m-auto mt-8">
                      <AiOutlinePlusCircle></AiOutlinePlusCircle>
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>{" "}
          <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-red-300 w-96 rounded shadow-2xl ">
            <div>
              <h1>Latest Recos</h1>
              <ul>
                {currUser.recos ? (
                  currUser.recos.map((type) =>
                    type.map((reco) => (
                      <li key={nanoid()}>
                        <button onClick={() => navigate("/bubbles")}>
                          {reco.title}
                        </button>
                      </li>
                    ))
                  )
                ) : (
                  <div className="flex">
                    <button className="m-auto mt-8">
                      <AiOutlinePlusCircle></AiOutlinePlusCircle>
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <p>please login first</p>
      )}
    </>
  );
}
