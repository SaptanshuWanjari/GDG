"use client";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { BiBookBookmark } from "react-icons/bi";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AuthLoading from "@/app/components/auth/AuthLoading";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Handle traditional form registration
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          name: values.fullname,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/auth/login");
      } else if (res.status === 409) {
        toast.error(data.message || "Email already in use");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Google OAuth registration/login
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
        toast.success("Account created/signed in successfully!");

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
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-md animate-in slide-in-from-bottom-8 duration-700">
        {/* Mobile header */}
        <div className="text-center mb-8 lg:hidden">
          <BiBookBookmark size={60} className="text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground font-serif">
            LibraryMS
          </h1>
        </div>

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

          <div className="bg-card p-8 rounded-2xl shadow-xl border border-border backdrop-blur-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-card-foreground mb-2 animate-in fade-in-50 duration-500 delay-100">
                Join LibraryMS
              </h2>
              <p className="text-muted-foreground animate-in fade-in-50 duration-500 delay-200">
                Create your account and start your reading adventure today
              </p>
            </div>

            {/* Google OAuth Button */}
            <div className="mb-6 animate-in fade-in-50 duration-500 delay-300">
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-12 text-base font-semibold bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 transition-all duration-300 hover:shadow-lg"
                disabled={isSubmitting || loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner />
                    Creating account...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
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
            <div className="flex items-center my-6 animate-in fade-in-50 duration-500 delay-400">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Traditional Registration Form */}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 animate-in fade-in-50 duration-500 delay-500"
            >
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-card-foreground">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your full name"
                        className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/20"
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
                          placeholder="Create a secure password"
                          className="h-12 text-base pr-12 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold text-card-foreground">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm your password"
                        className="h-12 text-base transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                disabled={isSubmitting || loading || !form.formState.isValid}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <LoadingSpinner />
                    Creating Account...
                  </span>
                ) : (
                  "Create Your Account"
                )}
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </Form>
      </div>
    </div>
  );
}
