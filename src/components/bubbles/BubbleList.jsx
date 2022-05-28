import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { v1 as uuidv1 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export default function BubbleList({ searchParams }) {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const bubbles = userData.bubbles;
  const params = useParams();

  return (
    <div className=" m-auto bg-transparent p-10 mt-5">
      {bubbles.length !== 0 ? (
        <ul className="grid xl:grid-cols-4 md:grid-cols-3 gap-4">
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
                    key={uuidv1()}
                    onClick={() => navigate(`/bubbles/${bubble.id}`)}
                    className="m-3 cursor-pointer flex justify-center"
                  >
                    <div className="flex w-full md:relative flex-col hover:shadow-inner md:flex-row md:max-w-xl rounded-lg bg-transparent shadow-lg ">
                      <img
                        className=" w-full -z-10 h-full md:absolute object-cover md:w-auto  bg-white md:opacity-40 rounded md:rounded-l-lg"
                        src={bubble.imageUrl}
                        alt=""
                      />
                      <div className="p-6 flex flex-col justify-start px-3">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                          {bubble.name}
                        </h5>
                        <p className="text-gray-700  md:w-28 text-base mb-4 md:truncate ">
                          {bubble.description}
                        </p>

                        <div className="flex flex-wrap  gap-2  mt-auto">
                          {bubble.categories.split(",").map((category) => {
                            return (
                              <span className="text-xs tracking-widest mt-2 font-face-tl inline-block py-1 px-2.5 leading-none whitespace-nowrap align-baseline font-bold bg-lime-400 text-black rounded-full">
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
