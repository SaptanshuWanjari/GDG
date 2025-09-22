"use client";
import React, { useState } from "react";
import Modal from "@/app/components/common/Modal";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { BooksTable } from "@/app/components/books/BooksTable";

const Page = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ProtectedLayout>
      <div className="p-8 bg-white min-h-screen w-full rounded-lg shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <span>
            <h1 className="text-2xl font-bold">Book Management</h1>
            <p className="text-muted-foreground">
              Manage your library books with advanced filtering and sorting
            </p>
          </span>
          <button
            onClick={() => setIsAdding(true)}
            className="font-semibold mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            + Add Book
          </button>
        </div>

        {/* TanStack Table */}
        <BooksTable key={refreshKey} onRefresh={handleRefresh} />

        <Modal
          open={isAdding}
          onOpenChange={(open) => {
            setIsAdding(open);
            if (!open) {
              // Refresh table when modal closes (book was added)
              handleRefresh();
            }
          }}
        />
      </div>
    </ProtectedLayout>
  );
};

export default Page;
