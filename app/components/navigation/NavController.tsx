"use client";

import { usePathname } from "next/navigation";
import PublicNavbar from "@/app/components/navigation/PublicNavbar";

export default function ConditionalNav() {
  const pathname = usePathname();

  // Don't show PublicNavbar on admin, owner, or auth layout pages
  const shouldHideNav =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/owner") ||
    pathname === "/login" ||
    pathname === "/register";

  if (shouldHideNav) {
    return null;
  }

  return <PublicNavbar />;
}
