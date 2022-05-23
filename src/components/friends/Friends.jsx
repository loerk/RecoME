import React from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { AddButton } from "../../utilities/Buttons";
import FriendsList from "./FriendsList";

export default function Friends() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const addFriend = () => {
    navigate("/friends/addFriend");
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
                setSearchParams({ filter });
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
            placeholder="Search Friend"
          />
        </div>
      </div>
      <AddButton action={addFriend} />
      <div>
        <Outlet />
        <FriendsList searchParams={searchParams} />
      </div>
    </div>
  );
}
