"use client";
import { useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/components/common/DataTable";
import { BorrowedBook } from "@/app/types/borrowed-book";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  BookOpen,
  Users,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

export default function BorrowedBooksPage() {
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {
      const response = await fetch("/api/books/borrow", {
        credentials: "include",
      });
      const data = await response.json();

      if (response.ok) {
        setBorrowedBooks(data.borrowedBooks || []);
      } else {
        toast.error("Failed to fetch borrowed books");
      }
    } catch (error) {
      console.error("Error fetching borrowed books:", error);
      toast.error("Error fetching borrowed books");
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBook = async (borrowId: string) => {
    try {
      const response = await fetch(`/api/books/return/${borrowId}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Book marked as returned");
        fetchBorrowedBooks(); // Refresh the data
      } else {
        toast.error("Failed to return book");
      }
    } catch (error) {
      console.error("Error returning book:", error);
      toast.error("Error returning book");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "borrowed":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Borrowed
          </Badge>
        );
      case "returned":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Returned
          </Badge>
        );
      case "overdue":
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const columns: ColumnDef<BorrowedBook, unknown>[] = [
    {
      accessorKey: "bookTitle",
      header: "Book",
      cell: (info) => (
        <div>
          <div className="font-medium">{info.getValue<string>()}</div>
          <div className="text-sm text-muted-foreground">
            {info.row.original.bookAuthor}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "userName",
      header: "Borrower",
      cell: (info) => (
        <div>
          <div className="font-medium">{info.getValue<string>()}</div>
          <div className="text-sm text-muted-foreground">
            {info.row.original.userEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "borrowDate",
      header: "Borrow Date",
      cell: (info) => formatDate(info.getValue() as string),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: (info) => {
        const dueDate = new Date(info.getValue() as string);
        const isOverdue =
          dueDate < new Date() && info.row.original.status === "borrowed";
        return (
          <div className={isOverdue ? "text-red-600 font-medium" : ""}>
            {formatDate(info.getValue() as string)}
          </div>
        );
      },
    },
    {
      accessorKey: "returnDate",
      header: "Return Date",
      cell: (info) => {
        const returnDate = info.getValue() as string | undefined;
        return returnDate ? formatDate(returnDate) : "—";
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => getStatusBadge(info.getValue() as string),
    },
    {
      id: "actions",
      header: "Actions",
      cell: (info) => {
        const status = info.row.original.status;
        const borrowId = info.row.original._id;

        if (status === "borrowed" || status === "overdue") {
          return (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleReturnBook(borrowId!)}
            >
              Mark Returned
            </Button>
          );
        }
        return <span className="text-muted-foreground">—</span>;
      },
    },
  ];

  // Calculate statistics
  const stats = {
    total: borrowedBooks.length,
    borrowed: borrowedBooks.filter((book) => book.status === "borrowed").length,
    overdue: borrowedBooks.filter((book) => book.status === "overdue").length,
    returned: borrowedBooks.filter((book) => book.status === "returned").length,
  };

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span>
            <h1 className="text-3xl font-bold">Borrowed Books Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage all book borrowing activities
            </p>
          </span>
          <div className="w-full sm:w-auto">
            <Button onClick={fetchBorrowedBooks} className="w-full sm:w-auto">
              <Activity className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrows
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Currently Borrowed
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.borrowed}</div>
              <p className="text-xs text-muted-foreground">Active borrows</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">
                {stats.overdue}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Returned</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.returned}</div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Borrowed Books Table */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Books</CardTitle>
            <CardDescription>
              Complete list of all book borrowing records
            </CardDescription>
          </CardHeader>
          <CardContent>
            {borrowedBooks.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No borrowed books found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <DataTable columns={columns} data={borrowedBooks} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
}
