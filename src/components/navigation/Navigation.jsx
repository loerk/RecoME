import React from "react";
import { NavLink } from "react-router-dom";
import Notifications from "./NotificationButton";

export default function Navigation() {
  return (
    <div className="flex justify-center pt-2 w-full absolute gap-3">
      <NavLink to="/">home</NavLink>
      <NavLink to="/bubbles">bubbles</NavLink>
      <NavLink to="/friends">friends</NavLink>
      <NavLink to="/recos">recs</NavLink>
      <NavLink to="/settings">settings</NavLink>
      <Notifications />
    </div>
  );
}
