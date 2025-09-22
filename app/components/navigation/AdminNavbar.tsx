import React, { useState } from "react";
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
import {
  MdAdminPanelSettings,
  MdHome,
  MdOutlineDashboard,
} from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { BsBook } from "react-icons/bs";
import Link from "next/link";
import { BiBookBookmark } from "react-icons/bi";
import { HiOutlineMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function AdminNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between w-full max-w-screen">
      {/* Left side - Logo and title */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <BiBookBookmark size={32} />
          <div className="hidden sm:flex flex-col">
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
          className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
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
                {user?.image ? (
                  <AvatarImage src={user.image} />
                ) : (
                  <AvatarFallback>
                    {user?.email?.charAt(0).toUpperCase() || "A"}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user?.email || "Admin"}
                </span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {user?.isOwner && <FaCrown className="text-yellow-500" />}
                  {user?.isAdmin && !user?.isOwner && (
                    <MdAdminPanelSettings className="text-blue-500" />
                  )}
                  <span className="capitalize">
                    {user?.isOwner ? "Owner" : user?.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              </div>
              <AiOutlineDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
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

            {user?.isOwner && (
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

      {/* Mobile slide-over menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative bg-white w-64 max-w-full h-full shadow-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BiBookBookmark size={24} />
                <div className="flex flex-col">
                  <span className="text-lg font-bold">Library Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Management
                  </span>
                </div>
              </div>
              <button
                className="p-2 rounded-md hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
              >
                <AiOutlineClose className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {[
                {
                  href: "/admin",
                  label: "Dashboard",
                  icon: MdOutlineDashboard,
                },
                { href: "/admin/analytics", label: "Analytics", icon: GoGraph },
                { href: "/admin/users", label: "Users", icon: FiUsers },
                {
                  href: "/admin/borrowed-books",
                  label: "Borrowed Books",
                  icon: BsBook,
                },
              ].map((item) => {
                const Icon = item.icon as React.ComponentType<{
                  className?: string;
                }>;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      active
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        active ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
