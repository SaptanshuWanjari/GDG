"use client";

import { BiBookBookmark } from "react-icons/bi";
import { Sparkles, Gift, Clock, Globe, Users, BookOpen } from "lucide-react";

export default function RegisterContent() {
  return (
    <div className="h-full flex items-center justify-center p-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-secondary/10 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-accent/5 rounded-full animate-pulse delay-500" />
      </div>

      <div className="relative z-10 text-center max-w-md animate-in fade-in-50 duration-1000">
        <div className="mb-8 animate-in zoom-in-95 duration-700 delay-200">
          <BiBookBookmark
            size={120}
            className="mx-auto text-primary animate-bounce"
          />
        </div>

        <h1 className="text-4xl font-bold mb-6 font-serif text-foreground animate-in slide-in-from-bottom-4 duration-700 delay-300">
          Your Reading Journey Starts Here
        </h1>

        <p className="text-lg mb-12 text-muted-foreground max-w-sm mx-auto animate-in slide-in-from-bottom-4 duration-700 delay-400">
          Join thousands of book lovers and discover your next favorite story in
          our vast digital library.
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="flex items-center gap-4 text-left animate-in slide-in-from-left-4 duration-700 delay-500 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <Sparkles className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Instant Access</h3>
              <p className="text-sm text-muted-foreground">
                Browse books immediately after signup
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left animate-in slide-in-from-right-4 duration-700 delay-600 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <Gift className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Free to Join</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees or subscriptions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left animate-in slide-in-from-left-4 duration-700 delay-700 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <Clock className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                24/7 Availability
              </h3>
              <p className="text-sm text-muted-foreground">
                Access your library anytime, anywhere
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-left animate-in slide-in-from-right-4 duration-700 delay-800 p-4 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <Globe className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-lg" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                Global Community
              </h3>
              <p className="text-sm text-muted-foreground">
                Connect with readers worldwide
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center animate-in fade-in-50 duration-700 delay-1000">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-primary font-semibold">10,000+</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Readers already exploring our library
          </p>
        </div>

        {/* Floating book icons */}
        <div className="absolute -top-4 -right-4 animate-float">
          <BookOpen className="h-8 w-8 text-primary/30" />
        </div>
        <div className="absolute -bottom-4 -left-4 animate-float delay-1000">
          <BookOpen className="h-6 w-6 text-secondary/30" />
        </div>
      </div>
    </div>
  );
}
