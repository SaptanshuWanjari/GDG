"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/app/components/common/Modal";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import DataTable from "@/app/components/common/DataTable";
import { Activity, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Book } from "@/app/types/book";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import EditBookModal from "@/app/components/books/EditBookModal";
const Page = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/books", { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setBooks(data.books || []);
      } else {
        toast.error(data.error || "Failed to fetch books");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      toast.error("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshKey]);

  const handleDelete = async (bookId: string) => {
    const ok = window.confirm("Delete this book permanently?");
    if (!ok) return;
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        toast.success("Book deleted successfully");
        handleRefresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete book");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      toast.error("Error deleting book");
    }
  };

  const handleEdit = (book: Book) => {
    setBookToEdit(book);
    setEditModalOpen(true);
  };

  const columns: ColumnDef<Book, any>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: (info: any) => (
        <div className="font-medium">{info.getValue() as string}</div>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: (info: any) => (
        <Badge variant="secondary">{info.getValue() as string}</Badge>
      ),
    },
    {
      accessorKey: "publishedYear",
      header: "Year",
      cell: (info: any) => <div>{info.getValue() ?? "N/A"}</div>,
    },
    {
      accessorKey: "isbn",
      header: "ISBN",
      cell: (info: any) => (
        <div className="font-mono text-sm">{info.getValue() ?? "N/A"}</div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(row.original)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(row.original._id!)}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

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

        {/* DataTable */}
        <div className="mb-6">
          <DataTable columns={columns} data={books} />
        </div>

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

        {bookToEdit && (
          <EditBookModal
            book={bookToEdit}
            open={editModalOpen}
            onOpenChange={(open) => {
              setEditModalOpen(open);
              if (!open) {
                setBookToEdit(null);
                handleRefresh();
              }
            }}
            onSuccess={() => {
              setEditModalOpen(false);
              setBookToEdit(null);
              handleRefresh();
            }}
          />
        )}
      </div>
    </ProtectedLayout>
  );
};

export default Page;
