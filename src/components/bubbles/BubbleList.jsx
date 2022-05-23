import React, { useState } from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { nanoid } from "nanoid";
import { useNavigate, useParams } from "react-router-dom";

export default function BubbleList({ searchParams }) {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const bubbles = userData.bubbles;
  const params = useParams();

  return (
    <div className=" m-auto p-10 mt-5">
      {bubbles.length !== 0 ? (
        <ul>
          {bubbles
            .filter((bubble) => {
              let filter = searchParams.get("filter");
              if (!filter) return true;
              let name = bubble.name.toLowerCase();
              return name.includes(filter.toLowerCase());
            })
            .map((bubble) => {
              if (params.bubbleId === undefined) {
                return (
                  <div
                    key={nanoid()}
                    onClick={() => navigate(`/bubbles/${bubble.id}`)}
                    className="m-3 cursor-pointer flex justify-center"
                  >
                    <div className="flex h-60 flex-col hover:shadow-inner md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                      <img
                        className=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={bubble.imageUrl}
                        alt=""
                      />
                      <div className="p-6 flex flex-col justify-start">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                          {bubble.name}
                        </h5>
                        <p className="text-gray-700 text-base mb-4">
                          {bubble.description}
                        </p>
                        <p className="text-gray-600 text-xs">
                          Last updated 3 mins ago
                        </p>
                        <div className="flex space-x-2 justify-center mt-auto">
                          {bubble.categories.split(",").map((category) => {
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
              } else {
                return null;
              }
            })}
        </ul>
      ) : (
        <p className="text-center pt-5">:/ you dont have any bubbles</p>
      )}
    </div>
  );
}
