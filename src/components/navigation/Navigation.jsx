import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex items-center gap-3">
      <NavLink to="/">home</NavLink>
      <NavLink to="/bubbles">bubbles</NavLink>
      <NavLink to="/friends">friends</NavLink>
      <NavLink to="/recos">recs</NavLink>
      <NavLink to="/settings">settings</NavLink>
    </div>
  );
}
