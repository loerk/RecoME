import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";

export default function Header() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <div className="text-center">
        <button onClick={() => setTheme(theme === "white" ? "black" : "white")}>
          {theme === "white" ? (
            <MdLightMode />
          ) : (
            <MdOutlineLightMode style={{ color: "white" }} />
          )}
        </button>
      </div>
    </div>
  );
}
