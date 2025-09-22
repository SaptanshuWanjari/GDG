"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { status } = useSession();

  // status: 'loading' | 'authenticated' | 'unauthenticated'
  useEffect(() => {
    if (status === "unauthenticated") {
      if (typeof window !== "undefined") router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }
//! if not authenticated, do nothing
  if (status === "unauthenticated") {
    return null;
  }

  //? If authenticated
  return <div>{children}</div>;
};

export default ProtectedLayout;
