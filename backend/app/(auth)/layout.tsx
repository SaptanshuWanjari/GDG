"use client";
import { BiBookBookmark } from "react-icons/bi";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Example: check for a token in localStorage
    if (typeof window !== "undefined") {
      setIsLoggedIn(!!localStorage.getItem("token"));
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <nav className="flex justify-between items-center p-4 bg-[#fff]">
          <div className="flex items-center gap-2">
            <BiBookBookmark size={40} />
            <Link href="/" className="text-2xl font-bold">
              My App
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-blue-500 shadow-sm py-2 px-4 rounded-md hover:bg-gray-100 transition-colors duration-300"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </nav>
      )}
      {children}
    </div>
  );
};
export default Layout;
