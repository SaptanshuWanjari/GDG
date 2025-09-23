import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalNav from "./components/navigation/NavController";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "./components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Library Management System",
  description: "A comprehensive library management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen min-w-screen`}
      >
        <AuthProvider>
          <div className="min-h-screen w-full">
            <ConditionalNav />
            {children}
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
