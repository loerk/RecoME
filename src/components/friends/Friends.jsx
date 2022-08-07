import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { useUsers } from "../../contexts/UsersContext";
import React, { useState } from "react";

export default function Friends() {
  const navigate = useNavigate();
  const location = useLocation();
  window.scrollTo(0, 0);

  const { currentUser } = useUsers();
  const [searchFor, setSearchFor] = useState("");

  const friends = currentUser.friends;
  const addFriend = () => {
    navigate("/friends/addFriend");
  };

  return (
    <div className="pt-32 pb-12">
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
                {friends
                  .filter((friend) => {
                    return friend.username
                      .toLowerCase()
                      .includes(searchFor.toLowerCase());
                  })
                  .map((friend) => {
                    return (
                      <li key={friend._id}>
                        <div className="text-center">
                          <img
                            onClick={() => navigate(`/friends/${friend._id}`)}
                            className="w-28 h-28 object-cover object-center opacity-50  hover:opacity-100 rounded-full cursor-pointer"
                            src={friend.avatarUrl}
                            alt=""
                          />
                          <p className="relative">{friend.username}</p>
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
