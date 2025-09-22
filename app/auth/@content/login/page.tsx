"use client";
import { BiBookBookmark } from "react-icons/bi";
import { BookOpen, Users, Star, Shield } from "lucide-react";

export default function LoginContent() {
  return (
    <div className="w-full animate-fade-in-up animation-delay-200">
      <div className="bg-gradient-to-br from-primary/95 to-primary/80 text-primary-foreground p-8 rounded-2xl shadow-2xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-20 h-20 bg-primary-foreground/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-primary-foreground/10 rounded-full blur-xl animate-float-delayed"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center text-center min-h-[500px]">
          <BiBookBookmark
            size={120}
            className="mb-8 text-primary-foreground/90 animate-pulse-gentle"
          />

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 font-serif">
            Welcome Back to LibraryMS
          </h1>

          <p className="text-xl mb-12 text-primary-foreground/90 max-w-md leading-relaxed">
            Continue your reading journey and discover new worlds through books.
          </p>

          {/* Features */}
          <div className="grid grid-cols-1 gap-8 max-w-sm w-full">
            <div className="flex items-center gap-4 text-primary-foreground/90 group">
              <div className="bg-primary-foreground/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Vast Collection</h3>
                <p className="text-sm text-primary-foreground/80">
                  Access thousands of books
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-primary-foreground/90 group">
              <div className="bg-primary-foreground/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Community</h3>
                <p className="text-sm text-primary-foreground/80">
                  Connect with book lovers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-primary-foreground/90 group">
              <div className="bg-primary-foreground/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Personalized</h3>
                <p className="text-sm text-primary-foreground/80">
                  Curated recommendations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-primary-foreground/90 group">
              <div className="bg-primary-foreground/20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-lg">Secure Access</h3>
                <p className="text-sm text-primary-foreground/80">
                  Your data is protected
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
