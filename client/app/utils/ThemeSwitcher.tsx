"use client";
import React from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-center mx-4">
      {theme === "light" ? (
        <BiMoon className="cursor-pointer " fill="black" size={25} onClick={() => setTheme("dark")} />
      ) : (
        <BiSun className="cursor-pointer text-white" size={25} onClick={() => setTheme("light")} />
      )}
    </div>
  );
};

export default ThemeSwitcher;
