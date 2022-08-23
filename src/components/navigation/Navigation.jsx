import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Notifications from "./NotificationButton";
import { HiOutlineMenuAlt1 } from "react-icons/hi";

export default function Navigation() {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="left-5 pt-2 w-full absolute gap-3">
      <div className="">
        {showNav ? (
          <HiOutlineMenuAlt1
            onClick={() => setShowNav(!showNav)}
            className="md:hidden block w-10 h-10 p-2 cursor-pointer"
          />
        ) : (
          <HiOutlineMenuAlt1
            onClick={() => setShowNav(!showNav)}
            className="md:hidden block w-10 h-10 p-2 cursor-pointer"
          />
        )}
      </div>
      <ul
        className={
          (showNav ? "left-0" : "-left-full") +
          " md:static fixed pl-8 pt-4 bottom-0 top-24 md:flex md:space-x-7 items-center md:bg-transparent bg-white bg-opacity-80 md:w-auto w-10/12 md:text-black text-black md:space-y-0 space-y-5 p-2 transition-left duration-200"
        }
      >
        <NavLink className="block" to="/">
          home
        </NavLink>
        <NavLink className="block" to="/bubbles">
          bubbles
        </NavLink>
        <NavLink className="block" to="/friends">
          friends
        </NavLink>
        <NavLink className="block" to="/recos">
          recs
        </NavLink>
        <NavLink className="block" to="/settings">
          settings
        </NavLink>
        <Notifications />
      </ul>
    </nav>
  );
}
