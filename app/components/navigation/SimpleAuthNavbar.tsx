"use client";

import React from "react";
import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const SimpleAuthNavbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 text-primary hover:text-primary/80"
            >
              <BiBookBookmark size={32} className="text-blue-600" />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  LibraryMS
                </span>
                <span className="text-xs text-gray-500 hidden sm:block">
                  Management System
                </span>
              </div>
            </Link>
          </div>

          {/* Auth Links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Link>
            </Button>
            <Button asChild>
              <Link href="/register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleAuthNavbar;
