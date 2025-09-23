"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Star,
  Search,
  Library,
  Clock,
  Award,
  UserPlus,
  LogIn,
} from "lucide-react";
import { BiBookBookmark } from "react-icons/bi";

interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  summary?: string;
  publishedYear?: number;
  isbn?: string;
}

const PublicHomePage = () => {
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch some sample books for the public view
    const fetchFeaturedBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();

        if (res.ok && data.books) {
          // Show only first 6 books for featured section
          setFeaturedBooks(data.books.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: "Extensive Collection",
      description:
        "Access thousands of books across multiple genres and categories.",
    },
    {
      icon: Search,
      title: "Smart Search",
      description:
        "Find books quickly with our advanced search and filtering system.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Join a community of book lovers and share your reading experience.",
    },
    {
      icon: Clock,
      title: "24/7 Access",
      description: "Browse and manage your reading list anytime, anywhere.",
    },
    {
      icon: Award,
      title: "Curated Content",
      description:
        "Discover handpicked recommendations and featured collections.",
    },
    {
      icon: Library,
      title: "Digital Library",
      description: "Modern library management with traditional book discovery.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-foreground/5 to-transparent"></div>
        </div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-primary-foreground/10 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-primary-foreground/10 rounded-full blur-xl animate-float-slow"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-8 animate-fade-in-up">
              <div className="relative">
                <BiBookBookmark
                  size={100}
                  className="text-primary-foreground/80 drop-shadow-2xl animate-pulse-gentle"
                />
                <div className="absolute inset-0 bg-primary-foreground/20 rounded-full blur-2xl -z-10 animate-ping-slow"></div>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent animate-fade-in-up animation-delay-200">
              Welcome to{" "}
              <span className="text-accent-foreground bg-gradient-to-r from-accent via-accent-foreground to-accent bg-clip-text">
                LibraryMS
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-400">
              Discover, explore, and manage your reading journey with our
              comprehensive digital library management system. Join thousands of
              readers in their literary adventures.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-600">
              <Button
                size="lg"
                asChild
                className="bg-background text-foreground hover:bg-secondary hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-primary-foreground/25 px-8 py-4 text-lg font-semibold"
              >
                <Link href="/register" className="flex items-center gap-3">
                  <UserPlus className="h-6 w-6" />
                  Get Started Free
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm px-8 py-4 text-lg font-semibold"
              >
                <Link href="/login" className="flex items-center gap-3">
                  <LogIn className="h-6 w-6" />
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-16 fill-card"
          >
            <path d="M0,0V60c0,0,200,40,600,40s600-40,600-40V0H0z"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-card to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6 animate-fade-in-up">
              Why Choose <span className="text-primary">LibraryMS?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Experience the future of library management with our feature-rich
              platform designed for modern readers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/80 animate-fade-in-up"
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground leading-relaxed group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-fade-in-up">
              Featured <span className="text-primary">Books</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
              Explore our curated collection of popular and trending books from
              various genres
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent shadow-lg"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBooks.map((book, index) => (
                <Card
                  key={book._id}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card to-card/90 border-border/50 animate-fade-in-up"
                  style={{ animationDelay: `${300 + index * 150}ms` }}
                >
                  <CardHeader className="relative">
                    {/* Book cover placeholder with gradient */}
                    <div className="w-full h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center group-hover:from-primary/30 group-hover:via-secondary/30 group-hover:to-accent/30 transition-all duration-300">
                      <BookOpen className="h-16 w-16 text-primary/60 group-hover:text-primary/80 transition-colors duration-300" />
                    </div>

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-snug">
                          {book.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mb-3 font-medium">
                          by{" "}
                          <span className="text-foreground group-hover:text-primary/80 transition-colors duration-300">
                            {book.author}
                          </span>
                        </p>
                        <Badge
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                        >
                          {book.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {book.summary && (
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
                        {book.summary}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      {book.publishedYear && (
                        <p className="text-xs text-muted-foreground/70 bg-muted/50 px-2 py-1 rounded-full">
                          Published {book.publishedYear}
                        </p>
                      )}
                      <Star className="h-4 w-4 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to explore our full collection? Join thousands of readers
              today.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-primary/95 to-primary/90 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-primary-foreground/10 rounded-full blur-3xl animate-float-delayed"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-primary-foreground">
            <div className="group animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-primary-foreground group-hover:text-primary-foreground/80 transition-colors duration-300" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                10,000+
              </h3>
              <p className="text-primary-foreground/90 text-lg font-medium">
                Books Available
              </p>
            </div>
            <div className="group animate-fade-in-up animation-delay-200">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-primary-foreground group-hover:text-primary-foreground/80 transition-colors duration-300" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                5,000+
              </h3>
              <p className="text-primary-foreground/90 text-lg font-medium">
                Active Members
              </p>
            </div>
            <div className="group animate-fade-in-up animation-delay-400">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-foreground/20 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-10 w-10 text-primary-foreground group-hover:text-primary-foreground/80 transition-colors duration-300" />
              </div>
              <h3 className="text-4xl md:text-5xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300">
                4.9/5
              </h3>
              <p className="text-primary-foreground/90 text-lg font-medium">
                User Rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-card via-background to-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-card-foreground mb-8 animate-fade-in-up">
            Ready to Start Your{" "}
            <span className="text-primary">Reading Journey?</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
            Join thousands of book lovers and discover your next favorite read
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
            <Button
              size="lg"
              asChild
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-2xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300 px-10 py-5 text-lg font-semibold"
            >
              <Link href="/register" className="flex items-center gap-3">
                <UserPlus className="h-6 w-6" />
                Create Free Account
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary hover:scale-105 transition-all duration-300 backdrop-blur-sm px-10 py-5 text-lg font-semibold"
            >
              <Link href="/login" className="flex items-center gap-3">
                <LogIn className="h-6 w-6" />
                Already have an account?
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <BiBookBookmark size={32} className="text-primary" />
                <span className="text-2xl font-bold">LibraryMS</span>
              </div>
              <p className="text-muted-foreground mb-4">
                A modern digital library management system designed to enhance
                your reading experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/register"
                    className="hover:text-secondary-foreground transition-colors"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-secondary-foreground transition-colors"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="hover:text-secondary-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>Email: info@libraryms.com</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 LibraryMS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHomePage;
