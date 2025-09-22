"use client";
import { GoGraph } from "react-icons/go";
import { HiOutlineHashtag } from "react-icons/hi";
import { BiCalendarAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Book } from "@/app/types/book";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import ProtectedLayout from "@/app/components/ProtectedLayout";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page = ({ params }: PageProps) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookId, setBookId] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setBookId(resolvedParams.id);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        const res = await fetch("/api/books", {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok && data.books) {
          // Find the book by ID
          const foundBook = data.books.find((b: Book) => b._id === bookId);
          setBook(foundBook || null);
        } else {
          console.error("Failed to fetch books:", data.error);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedLayout>
    );
  }

  // Handle case where book is not found
  if (!book) {
    return (
      <ProtectedLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Book Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find that book.
          </p>
          <Link
            href="/"
            className="text-blue-500 hover:underline mt-4 inline-block"
          >
            &larr; Back to Books
          </Link>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="flex justify-between relative gap-10 p-10 bg-white">
        {/* Back button */}
        <Link
          href="/"
          className="absolute top-0 rounded-lg bg-gray-50 p-2 text-center self-start text-blue-500 hover:bg-gray-100"
        >
          &larr; Back to Books
        </Link>

        {/* left section - Book image and quick info */}
        <div className="flex-1">
          <Card className="">
            <CardHeader className="mx-5 border-1 rounded-lg">
              <Image
                src={book.coverUrl || "/book.jpg"}
                alt={book.title}
                width={150}
                height={200}
                className="object-cover rounded"
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <ul className="text-muted-foreground flex flex-col gap-3">
                <li className="flex items-center gap-2">
                  <CgProfile />
                  {book.author}
                </li>
                <li className="flex items-center gap-2">
                  <BiCalendarAlt />
                  {book.publishedYear || "Unknown"}
                </li>
                <li className="flex items-center gap-2">
                  <HiOutlineHashtag />
                  {book.category}
                </li>
                <li className="flex items-center gap-2">
                  <GoGraph />
                  {book.borrowCount || 0} borrows
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Badge variant="default">{book.category}</Badge>
            </CardFooter>
          </Card>
        </div>

        {/* right section - Detailed info */}
        <div className="flex-2">
          <Card>
            <CardHeader>
              <h1 className="text-4xl font-bold">{book.title}</h1>
              <p className="text-muted-foreground text-xl">By: {book.author}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              {/* basic details */}
              <span className="space-y-2">
                <h1 className="text-xl font-semibold">Summary</h1>
                <p className="text-muted-foreground">
                  {book.summary || "No summary available for this book."}
                </p>
              </span>

              {/* publication details */}
              <span className="space-y-1">
                <h1 className="text-medium font-semibold">
                  Publication Details
                </h1>
                <ul className="text-muted-foreground">
                  <li className="flex justify-between">
                    <p>Published</p>
                    <p>{book.publishedYear || "Unknown"}</p>
                  </li>
                  <li className="flex justify-between">
                    <p>ISBN</p>
                    <p>{book.isbn || "Not available"}</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Category</p>
                    <p>{book.category}</p>
                  </li>
                </ul>
              </span>

              {/* Library Statistics */}
              <span className="space-y-1">
                <h1 className="text-medium font-semibold">
                  Library Statistics
                </h1>
                <ul>
                  <li className="flex justify-between">
                    <p>Borrow Count</p>
                    <p>{book.borrowCount || 0}</p>
                  </li>
                  <li className="flex justify-between">
                    <p>Availability</p>
                    <p>Available</p>
                  </li>
                </ul>
              </span>

              <div className="self-center rounded-lg bg-gray-50 p-5 text-center">
                <p className="text-muted-foreground">
                  Book borrowing feature coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default Page;
