"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
  authform: ReactNode;
  content: ReactNode;
}

export default function AuthLayout({
  children,
  authform,
  content,
}: AuthLayoutProps) {
  const pathname = usePathname();
  const isLogin = pathname.includes("/login");
  const isRegister = pathname.includes("/register");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      <div className="flex min-h-screen relative">
        {/* Form section - animated positioning */}
        <div
          className={`w-full lg:w-1/2 sticky top-0 h-screen transition-all duration-700 ease-in-out ${
            isLogin ? "lg:order-1" : "lg:order-2"
          } ${isLogin ? "lg:translate-x-0" : "lg:translate-x-0"}`}
        >
          <div className="h-full bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm">
            {authform}
          </div>
        </div>

        {/* Content section - animated positioning */}
        <div
          className={`hidden lg:flex lg:w-1/2 sticky top-0 h-screen transition-all duration-700 ease-in-out ${
            isLogin ? "lg:order-2" : "lg:order-1"
          } ${isLogin ? "lg:translate-x-0" : "lg:translate-x-0"}`}
        >
          <div className="w-full h-full bg-gradient-to-br from-secondary/10 to-secondary/20 backdrop-blur-sm relative">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className={`absolute inset-0 transition-transform duration-1000 ${
                  isLogin ? "rotate-0" : "rotate-12"
                }`}
              >
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary rounded-full opacity-20 animate-pulse delay-500"></div>
              </div>
            </div>
            {content}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
