"use client";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

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
// router removed since login is disabled

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  // router removed since login is disabled

  const onSubmit = async () => {
    // Login is disabled — backend auth endpoints were removed.
    alert("Login is currently disabled.");
  };
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card flex flex-col justify-center gap-4 p-10 text-card-foreground rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" />
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
                <FormLabel className="font-semibold">Password</FormLabel>
                <FormControl>
                  <span className="relative flex items-center">
                    <Input
                      {...field}
                      {...(showPassword
                        ? { type: "text" }
                        : { type: "password" })}
                      placeholder="Enter your password"
                    />
                    {showPassword ? (
                      <AiFillEye
                        color="black"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        color="black"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </span>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Don&#39;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Page;
