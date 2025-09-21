"use client"
import { AiOutlineDown } from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import React from "react";
import { BiBookBookmark } from "react-icons/bi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Navbar = () => {
  return (
    <nav className="flex border-b border-b-gray-200 justify-between items-center p-4 bg-[#fff]">
      <div className="flex items-center gap-2">
        <BiBookBookmark size={40} />
        <Link href="/" className="text-2xl font-bold">
          My App
        </Link>
      </div>

      <DropdownMenu>
        <div className="flex items-center gap-4 cursor-pointer rounded-md p-2 hover:bg-gray-100 transition-colors duration-300">
          <DropdownMenuTrigger className=" cursor-pointer flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            User Name <AiOutlineDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account </DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 hover:text-red-600 cursor-pointer hover:bg-red-100"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
            >
              <CiLogout color="red" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </div>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;
