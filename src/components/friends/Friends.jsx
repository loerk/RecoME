import { useNavigate, Outlet, useParams, useLocation } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { useUsers } from "../../contexts/UsersContext";
import React, { useState } from "react";
import { v1 as uuidv1 } from "uuid";

export default function Friends() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const { findUserById, currentUser } = useUsers();
  const [searchFor, setSearchFor] = useState("");

  const friends = currentUser.friends;
  const addFriend = () => {
    navigate("/friends/addFriend");
  };

  return (
    <div className="mt-10">
      {location.pathname === "/friends" ? (
        <div>
          <div className="flex justify-center">
            <div className="mb-3 xl:w-96">
              <input
                onChange={(e) => setSearchFor(e.target.value)}
                type="search"
                className="
                    text-center
                    form-control
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-gray-700
                    bg-white bg-clip-padding
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-slate-600 focus:outline-none
                  "
                id="exampleSearch"
                placeholder="Search Friend"
              />
            </div>
          </div>

          <AddButton action={addFriend} />

          <div>
            {friends.length !== 0 ? (
              <ul className="pt-6 flex flex-wrap gap-4 justify-around">
                {friends.map((friendId) => {
                  let currFriend = findUserById(friendId);
                  return (
                    <li key={uuidv1()}>
                      <div className="text-center">
                        <img
                          onClick={() => navigate(`/friends/${currFriend.id}`)}
                          className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                          src={currFriend.avatarUrl}
                          alt=""
                        />
                        <p className="relative">{currFriend.username}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-center pt-5">
                :/ you dont have any friends...yet
              </p>
            )}
          </div>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
