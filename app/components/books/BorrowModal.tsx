"use client";
import { useState, useEffect } from "react";
import { Book } from "@/app/types/book";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, User, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

interface BorrowModalProps {
  book: Book;
  trigger?: React.ReactNode;
}

export const BorrowModal: React.FC<BorrowModalProps> = ({ book, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    borrowDuration: "14", // days
  });

  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isSessionLoading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      setFormData((prev) => ({ ...prev, userName: session?.user?.name || "" }));
    }
  }, [isAuthenticated, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!isAuthenticated) {
      toast.error("Please sign in to borrow this book.");
      setLoading(false);
      return;
    }
    try {
      const borrowDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(borrowDate.getDate() + parseInt(formData.borrowDuration));

      const response = await fetch("/api/books/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          bookId: book._id,
          bookTitle: book.title,
          bookAuthor: book.author,
          userName: formData.userName || session?.user?.name,
          userEmail: session?.user?.email,
          borrowDate,
          dueDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Book borrowed successfully!");
        setIsOpen(false);
        setFormData({
          userName: session?.user?.name || "",
          borrowDuration: "14",
        });
        // Refresh server-side props / fetches
        router.refresh();
      } else {
        toast.error(data.error || "Failed to borrow book");
      }
    } catch (error) {
      console.error("Error borrowing book:", error);
      toast.error("An error occurred while borrowing the book");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenChange = (open: boolean) => {
    // If session is still loading, don't allow open/redirects yet
    if (isSessionLoading) return;

    // If user is unauthenticated and tries to open, trigger signIn instead of opening the dialog
    if (!isAuthenticated && open) {
      signIn();
      return;
    }

    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="w-full" disabled={isSessionLoading}>
            <BookOpen className="h-4 w-4 mr-2" />
            {isAuthenticated ? "Borrow Book" : "Sign in to borrow"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Fill in your details to borrow &quot;{book.title}&quot; by{" "}
            {book.author}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userName">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="userName"
                name="userName"
                type="text"
                placeholder="Enter your full name"
                className="pl-10"
                value={formData.userName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="borrowDuration">Borrow Duration</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <select
                id="borrowDuration"
                name="borrowDuration"
                title="Select borrow duration"
                className="w-full pl-10 pr-3 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                value={formData.borrowDuration}
                onChange={handleInputChange}
                required
              >
                <option value="7">1 Week</option>
                <option value="14">2 Weeks</option>
                <option value="21">3 Weeks</option>
                <option value="30">1 Month</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Borrowing..." : "Borrow Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
