import { v1 as uuidv1 } from "uuid";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../contexts/UsersContext";
import { useBubbles } from "../../contexts/BubbleContext";

export default function Landing() {
  const { currentUser, findUserById } = useUsers();
  const { getBubbles } = useBubbles();
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  if (!currentUser) {
    return null;
  }

  const bubbles = getBubbles();

  const findFriend = (id) => {
    return findUserById(id);
  };

  return (
    <div>
      <div className="flex items-center m-auto gap-7 my-16 p-20 flex-col bg-gradient-to-r from-purple-500 to-pink-500 rounded shadow-2xl ">
        <div className="text-center">
          <h1 className="pb-6">Your bubbles</h1>
          <ul className="flex gap-6 flex-wrap justify-center">
            {!!bubbles.length ? (
              bubbles.map((bubble) => (
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
        <div className="text-center">
          <h1 className="pb-6">Your friends</h1>
          <ul className="flex gap-6 flex-wrap justify-center">
            {currentUser.friends.length !== 0 ? (
              currentUser.friends.map((friendId) => {
                let currFriend = findFriend(friendId);
                return (
                  <li key={friendId}>
                    <div className="text-center">
                      <img
                        onClick={() => navigate(`/friends/${currFriend.id}`)}
                        className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                        src={currFriend.avatarUrl}
                        alt=""
                      />
                      <button className="relative">
                        {currFriend.username}
                      </button>
                    </div>
                  </li>
                );
              })
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
                    <button onClick={() => navigate(`/recos/${reco.id}`)}>
                      {reco.title}
                    </button>
                  </li>
                ))
              )
            ) : (
              <div className="flex">
                <button
                  onClick={() => navigate("/recos")}
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
