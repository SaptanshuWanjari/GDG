"use client";

import React from "react";
import OwnerNavbar from "../components/OwnerNavbar";

const OwnerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <OwnerNavbar />
      <div className="pt-4">{children}</div>
    </div>
  );
};

export default OwnerLayout;
