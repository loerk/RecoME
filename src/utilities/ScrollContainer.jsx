import React from "react";

export default function ScrollContainer({ children }) {
  window.scrollTo(0, 0);
  return (
    <div
      className="scrollbar-hidden"
      style={{ overflowY: "scroll", height: "600px" }}
    >
      {children}
    </div>
  );
}
