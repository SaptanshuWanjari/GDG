"use client";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "@/app/db/userSchema";
import dbConnect from "@/app/db/mongodb";

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
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

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await dbConnect();
    try {
      const user = new User({
        name: data.fullname,
        email: data.email,
        password: data.password,
      });
      await user.save();
      console.log("User registered:", user);
      // Optionally, show a success message or redirect
    } catch (err) {
      console.error("Registration error:", err);
      // Optionally, show an error message
    }
  };
  const form = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  return (
    <Form {...form}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card flex flex-col justify-center gap-4 p-10 text-card-foreground rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your email below to create an account
          </p>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Full Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your full name"
                    className=""
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
                      placeholder="Create a password"
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Confirm your password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full cursor-pointer">
            Create Account
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default Page;
