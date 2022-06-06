import { v1 as uuidv1 } from "uuid";
import React, { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";

export default function Landing() {
  const { currentUser } = useUsers();
  const navigate = useNavigate();
  window.scrollTo(0, 0);
  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users));
  // }, [users]);

  // useEffect(() => {
  //   if (currentUser) {
  //     localStorage.setItem("currUser", JSON.stringify(currentUser));
  //   }
  // }, [currentUser]);

  console.log("landing", currentUser);
  return (
    <div>
      <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow-2xl ">
        <div className="text-center">
          <h1 className="pb-6">Your bubbles</h1>
          <ul className="flex gap-6 flex-wrap justify-center">
            {currentUser.bubbles.length !== 0 ? (
              currentUser.bubbles.map((bubble) => (
                <li key={uuidv1()}>
                  <div className="text-center">
                    <img
                      onClick={() => navigate(`/bubbles/${bubble.id}`)}
                      className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                      src={bubble.imageUrl}
                      alt=""
                    />
                    <button className="relative">{bubble.name}</button>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex">
                <button
                  onClick={() => navigate("/bubbles")}
                  className="m-auto mt-8"
                >
                  <AiOutlinePlusCircle></AiOutlinePlusCircle>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col bg-gradient-to-r from-violet-500 to-fuchsia-500  rounded shadow-2xl ">
        <div>
          <h1>Your friends</h1>
          <ul>
            {currentUser.friends.length !== 0 ? (
              currentUser.friends.map((friend) => (
                <li key={uuidv1()}>
                  <button onClick={() => navigate("/friends")}>
                    {friend.name}
                  </button>
                </li>
              ))
            ) : (
              <div className="flex">
                <button
                  onClick={() => navigate("/friends")}
                  className="m-auto mt-8"
                >
                  <AiOutlinePlusCircle></AiOutlinePlusCircle>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>{" "}
      <div className="flex items-center m-auto gap-7 my-7 p-10 flex-col  bg-gradient-to-r from-cyan-500 to-blue-500  rounded shadow-2xl ">
        <div>
          <h1>Latest Recos</h1>
          <ul>
            {!currentUser.recos ? (
              currentUser.recos.map((type) =>
                type.map((reco) => (
                  <li key={uuidv1()}>
                    <button onClick={() => navigate("/bubbles")}>
                      {reco.title}
                    </button>
                  </li>
                ))
              )
            ) : (
              <div className="flex">
                <button
                  onClick={() => navigate("/friends")}
                  className="m-auto mt-8"
                >
                  <AiOutlinePlusCircle></AiOutlinePlusCircle>
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
