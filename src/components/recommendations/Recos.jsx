import React, { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";

import { AddButton } from "../../utilities/Buttons";
import { LinkPreview } from "../../utilities/LinkPreview";
import { useRecos } from "../../contexts/RecoContext";
import DeleteRecoModal from "../../utilities/DeleteRecoModal";

export default function Recos() {
  const [showModal, setShowModal] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [recoIdToDelete, setRecoIdToDelete] = useState(null);

  const location = useLocation();
  const { recos } = useRecos();

  const handleModal = (id) => {
    setShowModal(true);
    setRecoIdToDelete(id);
  };

  return (
    <div className="pt-32 pb-12">
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

          <div className="p-10">
            {recos.length ? (
              <ul className="pt-6 flex flex-wrap gap-4 justify-around">
                {recos
                  .filter((reco) => {
                    return reco.title
                      .toLowerCase()
                      .includes(searchFor.toLowerCase());
                  })
                  .map((reco) => {
                    const date = new Date(reco.createdAt);
                    return (
                      <div key={reco._id}>
                        <div className="flex bg-white flex-col hover:shadow-inner md:flex-row  rounded-lg shadow-lg  ">
                          <div className="p-4 backdrop-blur-xl relative rounded flex flex-col justify-start">
                            <div className="z-2 flex justify-between">
                              <h5 className=" text-xl font-medium mb-2">
                                {reco.title}
                              </h5>
                              <div className="relative flex pb-3">
                                <img
                                  src={reco.createdBy.avatarUrl}
                                  alt=""
                                  className="w-9 z-3 relative left-3 aspect-square shadow-lg rounded-full"
                                />

                                <img
                                  src={
                                    reco.bubbleId.imageUrl ||
                                    reco.userIds[0].avatarUrl
                                  }
                                  alt=""
                                  className="w-9 aspect-square shadow-lg rounded-full"
                                />
                              </div>
                            </div>
                            <p className=" text-base mb-4">
                              {reco.description}
                            </p>
                            <p className="tracking-widest text-xs">
                              {date.toLocaleString("en-GB")}
                            </p>
                            <LinkPreview url={reco.url} />
                            <div className="flex flex-wrap  gap-2 justify-center mt-auto">
                              {reco.categories.map((category) => {
                                return (
                                  <span
                                    key={reco._id}
                                    className="text-xs tracking-widest font-face-tl inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-lime-400 text-black rounded-full"
                                  >
                                    {category}
                                  </span>
                                );
                              })}
                            </div>
                            <RiDeleteBinLine
                              className="m-auto mt-5 cursor-pointer"
                              onClick={() => handleModal(reco._id)}
                            ></RiDeleteBinLine>
                          </div>
                          {showModal && (
                            <DeleteRecoModal
                              showModal={showModal}
                              setShowModal={setShowModal}
                              recoIdToDelete={recoIdToDelete}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-center">:/ you didnt write any recos...yet</p>
            )}
          </div>
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
