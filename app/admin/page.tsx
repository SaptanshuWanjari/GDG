"use client";
import React, { useState } from "react";
import Modal from "@/app/components/common/Modal";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { BooksTable } from "@/app/components/books/BooksTable";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
const Page = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <ProtectedLayout>
      <div className="px-4 py-6 sm:px-6 md:py-8 bg-white min-h-screen w-full rounded-lg shadow-md">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span>
            <h1 className="text-2xl font-bold">Book Management</h1>
            <p className="text-muted-foreground">
              Manage your library books with advanced filtering and sorting
            </p>
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full sm:w-auto font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
            >
              + Add Book
            </Button>

            <Button onClick={handleRefresh} className="w-full sm:w-auto">
              <Activity className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
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
