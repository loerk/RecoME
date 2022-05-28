import React from "react";

export default function ScrollContainer({ children }) {
  return (
    <div
      className="scrollbar-hidden"
      style={{ overflowY: "scroll", height: "600px" }}
    >
      {children}
    </div>
  );
}
