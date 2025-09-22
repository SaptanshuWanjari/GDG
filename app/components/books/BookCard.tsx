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
import { Book } from "../../types/book";
import { BookOpen, User, Eye } from "lucide-react";
import Image from "next/image";

// simple ImageWithFallback implemented locally to avoid adding new files
const ImageWithFallback: React.FC<{
  src?: string;
  alt: string;
  className?: string;
}> = ({ src, alt, className }) => {
  const fallback = "/books.png";
  return (
    <Image
      src={src || fallback}
      alt={alt}
      width={64}
      height={80}
      className={className}
      unoptimized
    />
  );
};

interface BookCardProps {
  book: Book | (Book & { id?: string });
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  // extract id in a type-safe manner
  const id = (() => {
    if ((book as Book)._id) return (book as Book)._id!;
    if ((book as unknown as { id?: string }).id)
      return (book as unknown as { id?: string }).id!;
    return "";
  })();

  return (
    <Link href={`/books/${id}`} className="block group">
      <Card className="h-full hover:shadow-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/90 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <CardHeader className="p-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <ImageWithFallback
                src={book.coverUrl}
                alt={book.title}
                className="w-16 h-20 object-cover rounded border"
              />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="line-clamp-2 mb-1 hover:text-primary">
                {book.title}
              </CardTitle>
              <CardDescription className="flex items-center text-sm mb-2">
                <User className="h-3 w-3 mr-1" />
                {book.author}
              </CardDescription>
              <Badge variant="secondary" className="text-xs">
                {book.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {book.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center">
              <BookOpen className="h-3 w-3 mr-1" />
              {book.publishedYear}
            </span>
            <span>{book.borrowCount} reads</span>
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

        {/* Hover overlay quick action */}
        <button
          aria-label="Quick view"
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity duration-200"
          onClick={(e) => {
            // allow the Link to handle navigation by not preventing default, but stop propagation to avoid nested triggers
            e.stopPropagation();
          }}
        >
          <div className="bg-white/90 p-2 rounded-full shadow">
            <Eye className="w-5 h-5 text-foreground" />
          </div>
        </button>
      </Card>
    </Link>
  );
};
