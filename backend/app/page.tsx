import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCard } from "./components/BookCard";

export default function Home() {
  const book = {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    coverUrl: "/public/book.jpg",
    summary: "A novel about the American dream and the roaring twenties.",
    publishedYear: 1925,
    isbn: "9780743273565",
    borrowCount: 0,
  };
  return (
    <div>
      {/* Hero Section */}
      <div className="dark:from-slate-900 dark:to-slate-800 py-16 pb-5 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              Discover Your Next Great Read
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Explore our extensive collection of books across various genres.
              Find your perfect book with our powerful search and filtering
              tools.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8 bg-white rounded-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Search books, authors, or topics..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-8 flex gap-5  justify-center  items-center">
          {/* category */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-3 bg-card p-3 rounded-lg border">
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Category:
                </label>
                <Select>
                  <SelectTrigger className="w-40 border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))} */}
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="fiction">Fiction</SelectItem>
                    <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* author */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-3 bg-card p-3 rounded-lg border">
                <label
                  htmlFor="author"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Authors:
                </label>
                <Select>
                  <SelectTrigger className="w-50 border-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {/* {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))} */}
                    <SelectItem value="all">All authors</SelectItem>
                    <SelectItem value="george">George Orwell</SelectItem>
                    <SelectItem value="scott">F. Scott Fitzgerald</SelectItem>
                    <SelectItem value="malcolm">Malcolm Gladwell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Book List Section */}
        <div className="container mx-auto px-10 py-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
          <BookCard book={book} />
        </div>
      </section>
    </div>
  );
}
