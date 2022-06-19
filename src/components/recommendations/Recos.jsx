import { Outlet, useLocation, Link } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import { useUsers } from "../../contexts/UsersContext";
import React, { useState } from "react";
import { useBubbles } from "../../contexts/BubbleContext";
import { LinkPreview } from "../../utilities/LinkPreview";

export default function Recos() {
  const location = useLocation();

  const { currentUser } = useUsers();
  const { getRecosByBubbles } = useBubbles();
  const [searchFor, setSearchFor] = useState("");

  const recosByUserFromBubbles = getRecosByBubbles(currentUser);

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

          <Link to="/recos/addReco">
            <AddButton />
          </Link>

          <div className="bg-slate-600 p-10 my-10">
            {recosByUserFromBubbles.length !== 0 ? (
              <ul className="pt-6 flex flex-wrap gap-4 justify-around">
                {recosByUserFromBubbles
                  .filter((reco) => {
                    return reco.title
                      .toLowerCase()
                      .includes(searchFor.toLowerCase());
                  })
                  .map((reco) => {
                    const date = new Date(reco.createdAt);

                    return (
                      <div>
                        <div className="flex flex-col hover:shadow-inner md:flex-row  rounded-lg bg-white shadow-lg">
                          <div className="p-6 flex flex-col justify-start">
                            <div className="flex justify-between">
                              <h5 className="text-gray-900 text-xl font-medium mb-2">
                                {reco.title}
                              </h5>
                              <img
                                src={currentUser.avatarUrl}
                                alt=""
                                className="w-7 h-7 shadow-lg rounded-full"
                              />
                            </div>
                            <p className="text-gray-700 text-base mb-4">
                              {reco.comment}
                            </p>
                            <p className="text-gray-600 tracking-widest text-xs">
                              {date.toLocaleString("en-GB")}
                            </p>
                            <LinkPreview url={reco.url} />
                            <div className="flex flex-wrap  gap-2 justify-center mt-auto">
                              {reco.categories.split(",").map((category) => {
                                return (
                                  <span className="text-xs tracking-widest font-face-tl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-lime-400 text-black rounded-full">
                                    {category}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
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
