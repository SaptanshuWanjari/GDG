"use client";
import { BiChevronDown } from "react-icons/bi";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiBookBookmark } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogIn, UserPlus, BookOpen, Home } from "lucide-react";
import { getUserFromToken, isAuthenticated } from "@/lib/cookies";

interface UserData {
  email?: string;
  name?: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}

const PublicNavbar = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const getUserData = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const user = getUserFromToken();
        if (user) {
          setUserData({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isOwner: user.isOwner,
          });
        }
      } else {
        setUserData(null);
      }
    };

    getUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setIsLoggedIn(false);
        setUserData(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggedIn(false);
      setUserData(null);
      window.location.href = "/";
    }
  };

  const navLinks = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      href: "/books",
      label: "Books",
      icon: BookOpen,
      isActive: pathname.startsWith("/books"),
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
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

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    link.isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Register</span>
                  </Link>
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3 py-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        {userData?.name?.charAt(0).toUpperCase() ||
                          userData?.email?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-medium">
                        {userData?.name || userData?.email || "User"}
                      </span>
                      <span className="text-xs text-gray-500 capitalize">
                        {userData?.isOwner
                          ? "Owner"
                          : userData?.isAdmin
                          ? "Admin"
                          : "Member"}
                      </span>
                    </div>
                    <BiChevronDown/>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  {(userData?.isAdmin || userData?.isOwner) && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <BiBookBookmark className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {userData?.isOwner && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/owner"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <User className="h-4 w-4" />
                        Owner Panel
                      </Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
