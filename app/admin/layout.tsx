"use client";

import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminNavbar from "@/app/components/navigation/AdminNavbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: MdOutlineDashboard,
      isActive: pathname === "/admin",
    },
    {
      href: "/admin/analytics",
      label: "Analytics",
      icon: GoGraph,
      isActive: pathname === "/admin/analytics",
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: FiUsers,
      isActive: pathname === "/admin/users",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex">
        <aside className="w-60 min-h-screen bg-white border-r border-gray-200 shadow-sm">
          <div className="p-4">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      item.isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        item.isActive ? "text-blue-600" : "text-gray-400"
                      }`}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
