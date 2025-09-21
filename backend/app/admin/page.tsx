"use client";
import React, { useState } from "react";
import Modal from "@/app/components/Modal";

const Page = () => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div className="p-8 bg-white  min-h-screen w-full rounded-lg shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <span>
          <h1 className="text-2xl font-bold">Book Management</h1>
          <p className="text-muted-foreground">Manage your books effectively</p>
        </span>
        <button
          onClick={() => setIsAdding(true)}
          className="font-semibold mt-4  bg-blue-500 text-white py-2 px-4 rounded"
        >
          + Add Book
        </button>
      </div>

      {/* table */}
      <div></div>

      <Modal open={isAdding} onOpenChange={(open) => setIsAdding(open)} />
    </div>
  );
};

export default Page;
