"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BiBookBookmark } from "react-icons/bi";
import { Home, LogIn, UserPlus } from "lucide-react";

const AuthNavbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BiBookBookmark
              size={32}
              className="text-primary group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-foreground font-serif">
              LibraryMS
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/") ? "bg-primary text-primary-foreground" : ""
              }
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button
              variant={isActive("/login") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/login")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>

            <Button
              variant={isActive("/register") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/register")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              <Link href="/register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AuthNavbar;
