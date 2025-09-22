"use client";
import { BiGridAlt } from "react-icons/bi";
import { AiOutlineUnorderedList } from "react-icons/ai";
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
import Image from "next/image";
// import { BookDetailsModal } from "../components/books/BookDetailsModal";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "../types/book";
import { useSession } from "next-auth/react";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const { status } = useSession();
  const router = useRouter();

  const isLoggedIn = status === "authenticated";

  // Handle book card click - navigate to book details page
  const handleBookClick = (bookId: string) => {
    router.push(`/books/${bookId}`);
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
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "most_reads" | "title_az"
  >("newest");
  // view: grid or list
  const [view, setView] = useState<"grid" | "list">("grid");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // show 12 items per page in grid

  const sortedBooks = (() => {
    const copy = [...filteredBooks];
    switch (sortBy) {
      case "newest":
        return copy.sort(
          (a, b) =>
            (b.createdAt ? +new Date(b.createdAt) : 0) -
            (a.createdAt ? +new Date(a.createdAt) : 0)
        );
      case "oldest":
        return copy.sort(
          (a, b) =>
            (a.createdAt ? +new Date(a.createdAt) : 0) -
            (b.createdAt ? +new Date(b.createdAt) : 0)
        );
      case "most_reads":
        return copy.sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0));
      case "title_az":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return copy;
    }
  })();

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
                Discover Your Next Great Read
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-16 leading-relaxed animate-fade-in-up animation-delay-200">
                Explore our extensive collection of books across various genres.
                Find your perfect book with our powerful search and filtering
                tools.
              </p>

              {/* Search Bar */}
              <div className="max-w-6xl mx-auto mt-8 animate-fade-in-up animation-delay-400">
                <div className="bg-card/90 backdrop-blur-sm border border-border/30 rounded-2xl p-4 shadow-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex-1 flex items-center gap-3">
                      <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <Input
                          type="text"
                          placeholder="Search books, authors, or topics..."
                          className="pl-10 h-12 rounded-lg border-input/50 bg-background/90"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>

                      <div className="hidden sm:flex items-center gap-3">
                        <Select
                          value={selectedCategory}
                          onValueChange={setSelectedCategory}
                        >
                          <SelectTrigger className="w-44 h-10 rounded-lg text-sm">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category === "all"
                                  ? "All Categories"
                                  : category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select
                          value={selectedAuthor}
                          onValueChange={setSelectedAuthor}
                        >
                          <SelectTrigger className="w-44 h-10 rounded-lg text-sm">
                            <SelectValue placeholder="Author" />
                          </SelectTrigger>
                          <SelectContent>
                            {authors.map((author) => (
                              <SelectItem key={author} value={author}>
                                {author === "all" ? "All Authors" : author}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-sm text-muted-foreground hidden sm:block">
                        Showing{" "}
                        <span className="font-medium text-foreground">
                          {filteredBooks.length}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setView("grid")}
                          className={`p-2 rounded ${
                            view === "grid"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background/80 text-muted-foreground"
                          }`}
                          aria-label="Grid view"
                        >
                          <BiGridAlt />
                        </button>
                        <button
                          onClick={() => setView("list")}
                          className={`p-2 rounded ${
                            view === "list"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background/80 text-muted-foreground"
                          }`}
                          aria-label="List view"
                        >
                          <AiOutlineUnorderedList />
                        </button>
                      </div>

                      <div className="pl-2">
                        <Select
                          value={sortBy}
                          onValueChange={(v: string) =>
                            setSortBy(
                              v as
                                | "newest"
                                | "oldest"
                                | "most_reads"
                                | "title_az"
                            )
                          }
                        >
                          <SelectTrigger className="w-44 h-10 rounded-lg text-sm">
                            <SelectValue placeholder="Sort" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">Newest</SelectItem>
                            <SelectItem value="oldest">Oldest</SelectItem>
                            <SelectItem value="most_reads">
                              Most Reads
                            </SelectItem>
                            <SelectItem value="title_az">Title A-Z</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book List Section */}
        <section className=" ">
          <div className=" mx-auto px-6 py-20 pt-0">
            {(() => {
              if (loading) {
                return (
                  <div className="flex justify-center items-center py-24">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-primary border-t-transparent shadow-2xl"></div>
                  </div>
                );
              }

              if (filteredBooks.length === 0 && books.length === 0) {
                return (
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
                );
              }

              if (filteredBooks.length === 0) {
                return (
                  <div className="text-center py-24 animate-fade-in-up">
                    <div className="w-32 h-32 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-8">
                      <Search className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h3 className="text-3xl font-bold text-foreground mb-6">
                      No books match your search
                    </h3>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                      Try adjusting your search terms or filters to find more
                      books.
                    </p>
                  </div>
                );
              }

              return (
                <div>
                  {/* Listing */}
                  {view === "grid" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10 auto-rows-fr">
                      {sortedBooks
                        .slice(
                          (currentPage - 1) * pageSize,
                          currentPage * pageSize
                        )
                        .map((book, index) => {
                          const globalIndex =
                            (currentPage - 1) * pageSize + index;
                          const delayMs = Math.min(globalIndex * 100, 1000);
                          const delayClass =
                            globalIndex === 0
                              ? ""
                              : `animation-delay-${
                                  Math.ceil(delayMs / 200) * 200
                                }`;
                          return (
                            <div
                              key={book._id}
                              className={`animate-fade-in-up ${delayClass} transform hover:scale-105 transition-all duration-300 h-full flex flex-col`}
                            >
                              <div
                                onClick={() => handleBookClick(book._id!)}
                                className="flex-1"
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
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {sortedBooks
                        .slice(
                          (currentPage - 1) * pageSize,
                          currentPage * pageSize
                        )
                        .map((book) => (
                          <article
                            key={book._id}
                            className="animate-fade-in-up bg-card/80 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                          >
                            <div className="flex items-start gap-6">
                              {/* Cover */}
                              <div className="w-28 h-36 flex-shrink-0 relative overflow-hidden rounded-md bg-muted/5">
                                <Image
                                  src={book.coverUrl || "/book.jpg"}
                                  alt={book.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              </div>

                              {/* Main info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0">
                                    <h3 className="text-xl font-semibold leading-snug truncate">
                                      {book.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1 truncate">
                                      {book.author} • {book.category}
                                    </p>
                                  </div>

                                  <div className="hidden sm:flex flex-col items-end text-sm text-muted-foreground whitespace-nowrap">
                                    <div>{book.publishedYear || "—"}</div>
                                    <div className="mt-2 font-medium text-foreground">
                                      {book.borrowCount ?? 0} reads
                                    </div>
                                  </div>
                                </div>

                                <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                                  {book.summary}
                                </p>

                                <div className="mt-4 flex items-center gap-3">
                                  <button
                                    onClick={() => handleBookClick(book._id!)}
                                    className="text-sm px-3 py-2 bg-primary text-primary-foreground rounded"
                                  >
                                    View
                                  </button>
                                  <button className="text-sm px-3 py-2 border rounded border-border/40 text-muted-foreground">
                                    Save
                                  </button>
                                  <span className="ml-auto text-xs text-muted-foreground">
                                    {new Date(
                                      book.createdAt || ""
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </article>
                        ))}
                    </div>
                  )}

                  {/* Pagination controls */}
                  <div className="flex items-center justify-center mt-8 space-x-3">
                    {Array.from({
                      length: Math.max(
                        1,
                        Math.ceil(sortedBooks.length / pageSize)
                      ),
                    }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${
                          currentPage === i + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-background/80 text-muted-foreground"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })()}
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
