import React from "react";
import Link from "next/link";

const DevNav = () => {
  return (
    <nav>
      <div className="p-4 border-b border-gray-200">
        <Link href="/login" className="mr-4 text-blue-500 hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
        <Link href="/admin" className="text-blue-500 hover:underline">
          Admin
        </Link>
      </div>
    </nav>
  );
};

export default DevNav;
