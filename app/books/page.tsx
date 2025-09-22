"use client";
import { Input } from "@/components/ui/input";
import { Search, BookOpen } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCard } from "../components/books/BookCard";
// import { BookDetailsModal } from "../components/books/BookDetailsModal";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import { useEffect, useState } from "react";
import { Book } from "../types/book";
import { useSession } from "next-auth/react";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { status } = useSession();

  const isLoggedIn = status === "authenticated" || checkTraditionalAuth();

  // Helper function to check traditional JWT auth
  function checkTraditionalAuth() {
    if (typeof window === "undefined") return false;
    const authToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth-token="));
    return !!authToken;
  }

  // Handle book card click
  const handleBookClick = (bookId: string) => {
    setSelectedBookId(bookId);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedBookId(null);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      if (!isLoggedIn) return;

      try {
        const res = await fetch("/api/books", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.books) {
          setBooks(data.books);
        } else {
          console.error("Failed to fetch books:", data.error);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [isLoggedIn]);

  // Filter books based on search term, category, and author
  useEffect(() => {
    if (!isLoggedIn) return;

    let filtered = books;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (book.summary &&
            book.summary.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (book) => book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by author
    if (selectedAuthor !== "all") {
      filtered = filtered.filter((book) =>
        book.author.toLowerCase().includes(selectedAuthor.toLowerCase())
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchTerm, selectedCategory, selectedAuthor, isLoggedIn]);

  // Get unique categories and authors for filters
  const categories = [
    "all",
    ...Array.from(new Set(books.map((book) => book.category))),
  ];
  const authors = [
    "all",
    ...Array.from(new Set(books.map((book) => book.author))),
  ];

  return (
    <ProtectedLayout>
      <div>
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/5 py-24 pb-12 px-4 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>

          <div className="relative container mx-auto text-center">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-primary mb-10 animate-fade-in-up leading-tight">
                Discover Your Next{" "}
                <span className="text-gradient bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Great Read
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up animation-delay-200">
                Explore our extensive collection of books across various genres.
                Find your perfect book with our powerful search and filtering
                tools.
              </p>

              {/* Enhanced Search Bar */}
              <div className="relative max-w-3xl mx-auto mb-16 animate-fade-in-up animation-delay-400">
                <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none z-10">
                  <Search className="h-7 w-7 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search books, authors, or topics..."
                  className="pl-20 h-20 text-xl rounded-3xl border-2 border-border/50 bg-background/90 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-300 focus:border-primary focus:shadow-primary/30 focus:scale-[1.02]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 -z-10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <section className="bg-gradient-to-r from-card/50 via-background to-card/50 border-y border-border/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row gap-10 justify-center items-center">
              {/* Category Filter */}
              <div className="animate-fade-in-up animation-delay-600 group">
                <div className="flex items-center space-x-6 bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <label
                    htmlFor="category"
                    className="text-base font-bold text-muted-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-300"
                  >
                    Category:
                  </label>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-56 h-12 border-input/50 bg-background/90 hover:border-primary transition-colors duration-300 rounded-xl text-base">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-base"
                        >
                          {category === "all" ? "All Categories" : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Author Filter */}
              <div className="animate-fade-in-up animation-delay-800 group">
                <div className="flex items-center space-x-6 bg-card/90 backdrop-blur-sm p-6 rounded-2xl border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <label
                    htmlFor="author"
                    className="text-base font-bold text-muted-foreground whitespace-nowrap group-hover:text-primary transition-colors duration-300"
                  >
                    Author:
                  </label>
                  <Select
                    value={selectedAuthor}
                    onValueChange={setSelectedAuthor}
                  >
                    <SelectTrigger className="w-56 h-12 border-input/50 bg-background/90 hover:border-primary transition-colors duration-300 rounded-xl text-base">
                      <SelectValue placeholder="All Authors" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem
                          key={author}
                          value={author}
                          className="text-base"
                        >
                          {author === "all" ? "All Authors" : author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Book List Section */}
        <section className="bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-6 py-20">
            {loading ? (
              <div className="flex justify-center items-center py-24">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent shadow-2xl"></div>
              </div>
            ) : filteredBooks.length === 0 && books.length === 0 ? (
              <div className="text-center py-24 animate-fade-in-up">
                <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <BookOpen className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  No books found
                </h3>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                  There are no books in the library yet. Admin users can add
                  books from the admin dashboard.
                </p>
              </div>
            ) : filteredBooks.length === 0 ? (
              <div className="text-center py-24 animate-fade-in-up">
                <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-bold text-foreground mb-6">
                  No books match your search
                </h3>
                <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                  Try adjusting your search terms or filters to find more books.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                {filteredBooks.map((book, index) => (
                  <div
                    key={book._id}
                    className={`animate-fade-in-up animation-delay-${Math.min(
                      index * 100,
                      1000
                    )} transform hover:scale-105 transition-all duration-300`}
                  >
                    <BookCard
                      book={{
                        id: book._id!,
                        title: book.title,
                        author: book.author,
                        category: book.category,
                        coverUrl: book.coverUrl || "/book.jpg",
                        summary: book.summary || "",
                        publishedYear: book.publishedYear || 0,
                        isbn: book.isbn || "",
                        borrowCount: book.borrowCount,
                      }}
                      onClick={() => handleBookClick(book._id!)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Book Details Modal */}
        {/* <BookDetailsModal
          bookId={selectedBookId}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        /> */}
      </div>
    </ProtectedLayout>
  );
}
