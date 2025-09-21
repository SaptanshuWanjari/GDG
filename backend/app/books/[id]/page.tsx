import { GoGraph } from "react-icons/go";
import { HiOutlineHashtag } from "react-icons/hi";
import { BiCalendarAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Book } from "@/app/types/types";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

// Mock book data
const books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    summary: "A novel about the American dream and the roaring twenties.",
    coverUrl: "/public/book.jpg",
    publishedYear: 1925,
    isbn: "9780743273565",
    borrowCount: 0,
  },
];

interface PageProps {
  params: { id: string };
}

const Page = ({ params }: PageProps) => {
  const book = books.find((b) => b.id === params.id);

  //   Handle case where book is not found
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Book Not Found</h1>
        <p className="text-gray-600">Sorry, we couldn&apos;t find that book.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-between relative gap-10 p-10 bg-white">
      {/* left section */}
      <Link
        href="/"
        className="absolute top-0 rounded-lg bg-gray-50 p-2 text-center self-start text-blue-500"
      >
        &larr; Back to Books
      </Link>

      {/* left section */}
      <div className="flex-1 ">
        <Card className="">
          <CardHeader className="mx-5  border-1 rounded-lg">
            <Image
              src={book.coverUrl ?? "/books.png"}
              alt={book.title}
              width={150}
              height={200}
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
                {book.publishedYear}
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineHashtag />
                {book.category}
              </li>
              <li className="flex items-center gap-2">
                <GoGraph />
                {book.borrowCount} borrows
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Badge variant="default">{book.category}</Badge>
          </CardFooter>
        </Card>
      </div>

      {/* right section */}
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
              <p className="text-muted-foreground">{book.summary}</p>
            </span>

            {/* publication details */}
            <span className="space-y-1">
              <h1 className="text-medium font-semibold">Publication Details</h1>
              <ul className="text-muted-foreground">
                <li className="flex justify-between">
                  <p>Published</p>
                  <p>{book.publishedYear}</p>
                </li>
                <li className="flex justify-between">
                  <p>ISBN</p>
                  <p>{book.isbn}</p>
                </li>
                <li className="flex justify-between">
                  <p>Category</p>
                  <p>{book.category}</p>
                </li>
              </ul>
            </span>

            {/* Library Statistics */}
            <span className="space-y-1">
              <h1 className="text-medium font-semibold">Library Statistics</h1>
              <ul>
                <li className="flex justify-between">
                  <p>Borrow Count</p>
                  <p>{book.borrowCount}</p>
                </li>
                <li className="flex justify-between">
                  <p>Availability</p>
                  <p>Available</p>
                </li>
              </ul>
            </span>

            <div className="self-center rounded-lg bg-gray-50 p-5 text-center">
              <Link
                href="/login"
                className="text-blue-500 hover:underline mr-2"
              >
                Sign in
              </Link>
              to borrow this book or leave a review.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
