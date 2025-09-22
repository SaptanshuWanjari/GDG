import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AiOutlineDown } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { MdAdminPanelSettings, MdHome } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { getUserFromToken } from "@/lib/cookies";

interface UserData {
  email?: string;
  name?: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}

export default function AdminNavbar() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Get user data from JWT token
    const getUserData = () => {
      const user = getUserFromToken();
      if (user) {
        setUserData({
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin,
          isOwner: user.isOwner,
        });
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
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      {/* Left side - Logo and title */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <BiBookBookmark size={32} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">Library Admin</span>
            <span className="text-xs text-muted-foreground">
              Management Dashboard
            </span>
          </div>
        </Link>
      </div>

      {/* Right side - User menu */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <MdHome size={16} />
          <span>Back to Library</span>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-3 py-2"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {userData?.email?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {userData?.email || "Admin"}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {userData?.isOwner && <FaCrown className="text-yellow-500" />}
                  {userData?.isAdmin && !userData?.isOwner && (
                    <MdAdminPanelSettings className="text-blue-500" />
                  )}
                  <span className="capitalize">
                    {userData?.isOwner
                      ? "Owner"
                      : userData?.isAdmin
                      ? "Admin"
                      : "User"}
                  </span>
                </div>
              </div>
              <AiOutlineDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <Link href="/profile" className="flex items-center w-full">
                Profile Settings
              </Link>
            </DropdownMenuItem>

            {userData?.isOwner && (
              <DropdownMenuItem className="cursor-pointer">
                <Link href="/owner" className="flex items-center gap-2 w-full">
                  <FaCrown className="text-yellow-500 h-4 w-4" />
                  Owner Dashboard
                </Link>
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-600 hover:text-red-700 cursor-pointer"
              onClick={handleLogout}
            >
              <CiLogout className="h-4 w-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
