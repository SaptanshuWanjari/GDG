"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getUserFromToken } from "@/lib/cookies";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      console.log("ProtectedLayout: Authentication check:", authenticated);

      if (authenticated) {
        const user = getUserFromToken();
        console.log("ProtectedLayout: User data from token:", user);
      }

      if (!authenticated) {
        console.log("ProtectedLayout: Not authenticated, redirecting to login");
        router.push("/login");
        return;
      }

      setIsLoggedIn(true);
      setIsLoading(false);
    };

    // Initial check with a small delay to ensure cookies are loaded
    setTimeout(checkAuth, 100);

    // Set up an interval to periodically check auth status (less frequent)
    const interval = setInterval(checkAuth, 10000); // Increased to 10 seconds

    return () => clearInterval(interval);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Router push will handle redirect
  }

  return <div>{children}</div>;
};

export default ProtectedLayout;
