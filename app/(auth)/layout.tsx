"use client";
import React from "react";
import AuthNavbar from "@/app/components/navigation/AuthNavbar";
import { useSession } from "next-auth/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();

  // status: 'loading' | 'authenticated' | 'unauthenticated'
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div>
      {/* {!isLoggedIn && <AuthNavbar />} */}
      <AuthNavbar />
      {children}
    </div>
  );
};

export default Layout;
