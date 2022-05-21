import React from "react";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex gap-5">
      <NavLink to="/bubbles">bubbles</NavLink>
      <NavLink to="/friends">friends</NavLink>
      <NavLink to="/recs">recs</NavLink>
      <NavLink to="/settings">settings</NavLink>
    </div>
  );
}
