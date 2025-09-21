import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/types/types";
import { BookOpen, User } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Link href={`/books/${book.id}`} className="block">
      <Card className="h-full hover:shadow-md border-border/50 hover:border-primary/30">
        <CardHeader className="p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={book.coverUrl ?? "/books.png"}
                alt={book.title}
                width={100}
                height={100}
                className="w-16 h-20 object-cover rounded border"
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="line-clamp-2 text-2xl mb-1 hover:text-primary">
                {book.title}
              </CardTitle>
              <CardDescription className="flex items-center text-lg mb-2">
                <User className="h-3 w-3 mr-1" />
                {book.author}
              </CardDescription>
              <Badge variant="default" className="text-sm">
                {book.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-lg text-muted-foreground line-clamp-3 mb-3">
            {book.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex  items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {book.publishedYear}
            </span>
            <span className="text-sm">{book.borrowCount} reads</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
