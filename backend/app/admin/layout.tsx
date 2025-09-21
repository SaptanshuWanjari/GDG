import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GoGraph } from "react-icons/go";
import React from "react";
import Link from "next/link";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-60 bg-sidebar border-r border-gray-200 p-4">
        <nav className="flex flex-col gap-3">
          <Link
            href="/admin"
            className="flex gap-2 items-center ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground bg-primary hover:bg-primary/90 p-2 rounded-lg w-full text-white"
          >
            <MdOutlineDashboard />
            Dashboard
          </Link>
          <Link
            href="/admin/analytics"
            className="flex gap-2 items-center ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground bg-primary hover:bg-primary/90 p-2 rounded-lg w-full text-white"
          >
            <GoGraph />
            Analytics
          </Link>
          <Link
            href="/admin/users"
            className="flex gap-2 items-center ring-sidebar-ring active:bg-sidebar-accent active:text-sidebar-accent-foreground bg-primary hover:bg-primary/90 p-2 rounded-lg w-full text-white"
          >
            <FiUsers />
            Users
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-background p-6">{children}</main>
    </div>
  );
};
export default layout;
