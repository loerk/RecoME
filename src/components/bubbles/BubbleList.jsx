import React from "react";
import { useUserData } from "../../contexts/UserDataContext";
import { useNavigate, useParams } from "react-router-dom";

export default function BubbleList({ searchParams }) {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const bubbles = userData.bubbles;
  const params = useParams();

  return (
    <div className=" m-auto bg-transparent mt-5">
      {bubbles.length !== 0 ? (
        <div className="grid xl:grid-cols-4 md:m-10 md:grid-cols-3 md:gap-4">
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
                    key={bubble.id}
                    onClick={() => navigate(`/bubbles/${bubble.id}`)}
                    className="mb-10 md:m-auto cursor-pointer md:w-72 w-full flex justify-center"
                  >
                    <div className="flex flex-col w-full relative md:flex-row md:rounded-lg shadow-lg max-w-xl">
                      {/* flex w-full md:relative flex-col hover:shadow-inner md:flex-row md:max-w-xl rounded-lg bg-transparent shadow-lg  */}
                      <img
                        className=" -z-10 absolute w-full shadow-lg h-full object-cover  bg-white opacity-40  md:rounded md:rounded-l-lg"
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

                        <div className="flex flex-wrap  gap-2 md:w-56 mt-auto">
                          {bubble.categories.split(",").map((category) => {
                            return (
                              <span className="text-xs tracking-widest mt-2 font-face-tl inline-block py-1 px-2.5 leading-none whitespace-nowrap  font-bold  text-black border border-black bg-white opacity-70 hover:opacity-100  rounded-md">
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
        </div>
      ) : (
        <p className="text-center pt-5">:/ you dont have any bubbles</p>
      )}
    </div>
  );
}
