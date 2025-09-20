"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="navbar   shadow-md h-20 w-full bg-white flex items-center px-10 border-b-1 border-gray-200 text-gray-500">
      <div className="navbar-start flex items-center gap-5">
        <Image
          src="/gdg.svg"
          alt="logo"
          width={70}
          height={70}
          className="!border-none"
        />
        <h1 className="text-2xl">GDG RCOEM</h1>
      </div>
      <div className="navbar-end text-xl gap-5 ml-auto ">
        <Link href="#" className=" link link-hover">
          Home
        </Link>
        <Link href="#" className="link link-hover">
          Events
        </Link>
        <Link href="#" className="link link-hover">
          Team
        </Link>
        <Link href="#" className="link link-hover">
          Alumni
        </Link>
        {/* theme controller */}
        <label className="toggle text-base-content">
          <input
            type="checkbox"
            value="dark"
            className="theme-controller"
            checked={darkMode}
            onChange={() => setDarkMode((prev) => !prev)}
          />

          {/* theme controls */}
          <svg
            aria-label="sun"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ display: darkMode ? "none" : "inline" }}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2"></path>
              <path d="M12 20v2"></path>
              <path d="m4.93 4.93 1.41 1.41"></path>
              <path d="m17.66 17.66 1.41 1.41"></path>
              <path d="M2 12h2"></path>
              <path d="M20 12h2"></path>
              <path d="m6.34 17.66-1.41 1.41"></path>
              <path d="m19.07 4.93-1.41 1.41"></path>
            </g>
          </svg>

          <svg
            aria-label="moon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style={{ display: darkMode ? "inline" : "none" }}
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
            </g>
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
