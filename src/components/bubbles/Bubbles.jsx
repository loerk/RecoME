import React, { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";

import BubbleList from "./BubbleList";
import { useUserData } from "../../contexts/UserDataContext";
import { useUsers } from "../../contexts/UsersContext";
import { nanoid } from "nanoid";

export default function Bubbles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userData, setUserData } = useUserData();
  const { users, setUsers } = useUsers();
  const [bubbleUser, setBubbleUser] = useState();
  const navigate = useNavigate();
  let currUser = { ...userData };
  if (userData.length) {
    currUser = { ...userData[0] };
  }
  const dummyData1 = [
    {
      name: "bubble1",
      description: "best friends forever 2022",
      image: "https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg",
      id: nanoid(),
      members: [{ currUser }],
      categories: ["books", "music", "food", "places"],
    },
    {
      name: "bubble2",
      description: "best friends forever 2022",
      image: "https://mdbootstrap.com/img/new/standard/nature/182.jpg",
      id: nanoid(),
      members: [{ currUser }],
      categories: ["travel", "photos", "beauty", "health"],
    },
    {
      name: "bubble3",
      description: "best friends forever 2022",
      image: "https://mdbootstrap.com/img/new/standard/nature/184.jpg",
      id: nanoid(),
      members: [{ currUser }],
      categories: ["vegan", "politics", "news", "coffee"],
    },
  ];

  // const addBubble = () => {
  //   const newBubbles = [{ ...currUser.bubbles, dummyData1 }];
  //   const newData = [{ ...currUser, newBubbles }];
  //   setUserData(newData);

  //   console.log(userData);
  // };

  const createBubble = () => {
    navigate("/bubbles/createBubble");
  };
  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <input
            value={searchParams.get("filter") || ""}
            onChange={(e) => {
              let filter = e.target.value;
              if (filter) {
                setSearchParams({ filter }); // searchParamsObject = {filter:filter}
              } else {
                setSearchParams({ filter: "" });
              }
            }}
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
            placeholder="Search Bubble"
          />
        </div>
      </div>
      <AddButton action={createBubble} />
      <div>
        <Outlet />
        <BubbleList searchParams={searchParams} />
      </div>
    </div>
  );
}
