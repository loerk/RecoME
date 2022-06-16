import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { useUsers } from "../../contexts/UsersContext";
import React, { useState } from "react";
import { useBubbles } from "../../contexts/BubbleContext";

export default function Recos() {
  const navigate = useNavigate();
  const location = useLocation();

  const { findUserById, currentUser, getRecosByUsers } = useUsers();
  const { getRecosByBubbles } = useBubbles();
  const [searchFor, setSearchFor] = useState("");

  //const recosByUser = getRecosByUsers();
  const recosByUserFromBubbles = getRecosByBubbles(currentUser);
  //console.log(recosByUser);

  const addReco = () => {
    navigate("/recos/addReco");
  };
  return (
    <div className="mt-28">
      {location.pathname === "/recos" ? (
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
                placeholder="Search Recs"
              />
            </div>
          </div>

          <AddButton action={addReco} />

          <div>
            {recosByUserFromBubbles.length !== 0 ? (
              <ul className="pt-6 flex flex-wrap gap-4 justify-around">
                {recosByUserFromBubbles
                  // .filter((friendId) => {
                  //   let currFriend = findUserById(friendId);
                  //   return currFriend.username
                  //     .toLowerCase()
                  //     .includes(searchFor.toLowerCase());
                  // })
                  .map((reco) => {
                    return (
                      <li key={reco.id}>
                        <div className="text-center">
                          <p className="relative">{reco.title}</p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-center pt-5">
                :/ you didnt write any recos...yet
              </p>
            )}
          </div>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
