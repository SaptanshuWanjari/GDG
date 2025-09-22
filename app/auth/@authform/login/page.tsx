"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { BiBookBookmark } from "react-icons/bi";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { signIn, getSession } from "next-auth/react";
import AuthLoading from "@/app/components/auth/AuthLoading";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

// Form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle traditional form login
  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Login failed");
        return;
      }

      toast.success("Login successful!");

      // Redirect based on user role
      if (result.user.isOwner) {
        router.push("/owner");
      } else if (result.user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google OAuth login
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
      });

      if (result?.error) {
        toast.error("Google sign in failed");
        setLoading(false);
        return;
      }

      // Get session to check user role and redirect accordingly
      const session = await getSession();
      if (session?.user) {
        toast.success("Signed in successfully!");

        // Redirect based on user role
        if (session.user.isOwner) {
          router.push("/owner");
        } else if (session.user.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Google sign in error:", error);
      toast.error("An error occurred during Google sign in");
      setLoading(false);
    }
  };

  return (
    <div className="w-full animate-fade-in-up">
      <Form {...form}>
        {(isSubmitting || loading) && (
          <AuthLoading
            open={isSubmitting || loading}
            onOpenChange={() => {
              setIsSubmitting(false);
              setLoading(false);
            }}
          />
        )}

        <div className="bg-card p-8 rounded-2xl shadow-2xl border border-border/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <BiBookBookmark size={60} className="text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-card-foreground mb-2">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground">
              Sign in to your account to continue your reading journey
            </p>
          </div>

          {/* Google OAuth Button */}
          <div className="mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 text-base font-semibold bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 transition-all duration-300 hover:scale-[1.02]"
              disabled={isSubmitting || loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  {/* Google icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </span>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Traditional Login Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-card-foreground">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your email address"
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-card-foreground">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-12 text-base pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <AiFillEyeInvisible size={20} />
                        ) : (
                          <AiFillEye size={20} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold hover:scale-[1.02] transition-all duration-300"
              disabled={isSubmitting || loading || !form.formState.isValid}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
