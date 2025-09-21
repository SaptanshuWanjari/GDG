"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#", label: "Home" },
    { href: "#", label: "Events" },
    { href: "#", label: "Team" },
    { href: "#", label: "Alumni" },
  ];

  return (
    <div className=" shadow-md h-20 w-full bg-background flex items-center px-4 sm:px-6 md:px-10  text-foreground ">
      <div className="navbar-start flex items-center gap-3 sm:gap-5">
        <Image
          src="/gdg.svg"
          alt="logo"
          width={70}
          height={70}
          className="!border-none w-12 h-12 sm:w-[70px] sm:h-[70px]"
        />
        <h1 className="text-xl sm:text-2xl font-semibold">GDG RCOEM</h1>
      </div>

      {/* Desktop links */}
      <div className="items-center justify-center text-base sm:text-lg gap-4 sm:gap-5 ml-auto hidden md:flex">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className="link link-hover px-2 py-1 rounded-md hover:bg-accent/50">
            {l.label}
          </Link>
        ))}
      </div>

      {/* Theme toggle and mobile menu button */}
      <div className="ml-auto md:ml-4 flex items-center gap-2">
        <ThemeToggle />
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-accent/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden absolute top-20 left-0 right-0 px-4  backdrop-blur-[3px] shadow-lg z-50 animate-slide-down-fade">
          <div className=" border border-border rounded-lg shadow-lg overflow-hidden">
            <nav className="flex flex-col p-3 gap-1 text-foreground">
              {links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-2 py-2 rounded-md hover:bg-accent/50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
