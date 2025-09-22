import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/app/types/types";
import { BookOpen, User, Star } from "lucide-react";
import Image from "next/image";

interface BookCardProps {
  book: Book;
  onClick?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div className="block group cursor-pointer" onClick={onClick}>
      <Card className="h-full hover:shadow-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/90 overflow-hidden relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <CardHeader className="p-6 relative z-10">
          <div className="flex flex-col space-y-4">
            {/* Book cover */}
            <div className="flex justify-center">
              <div className="relative group-hover:scale-[1.05] transition-transform duration-300">
                <Image
                  src={book.coverUrl ?? "/books.png"}
                  alt={book.title}
                  width={120}
                  height={160}
                  className="w-24 h-32 object-cover rounded-lg border-2 border-border/30 shadow-md group-hover:shadow-lg transition-all duration-300"
                />
              </div>
            </div>

            {/* Book details */}
            <div className="text-center space-y-2">
              <CardTitle className="line-clamp-2 text-lg font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                {book.title}
              </CardTitle>
              <CardDescription className="flex items-center justify-center text-base group-hover:text-primary/80 transition-colors duration-300">
                <User className="h-4 w-4 mr-2" />
                {book.author}
              </CardDescription>
              <Badge
                variant="secondary"
                className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
              >
                {book.category}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-0 relative z-10">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed text-center">
            {book.summary}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/30 pt-4">
            <span className="flex items-center bg-muted/30 px-2 py-1 rounded-full">
              <BookOpen className="h-3 w-3 mr-1" />
              {book.publishedYear}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="font-medium">{book.borrowCount} reads</span>
            </div>
          </div>
        </CardContent>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      </Card>
    </div>
  );
};
