"use client";

import { BiSave, BiX } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";

import ProtectedLayout from "../components/layout/ProtectedLayout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getUserFromToken, isAuthenticated } from "@/lib/cookies";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface UserData {
  email?: string;
  name?: string;
  isAdmin?: boolean;
  isOwner?: boolean;
}

const Page = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const getUserData = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);

      if (authenticated) {
        const user = getUserFromToken();
        if (user) {
          setUserData({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isOwner: user.isOwner,
          });
        }
      } else {
        setUserData(null);
      }
    };

    getUserData();
  }, []);
  const formSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().min(5).max(100).email(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: userData?.name || "",
      email: userData?.email || "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  // Update form values when userData changes
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name || "",
        email: userData.email || "",
      });
    }
  }, [userData, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting data:", data);

      const response = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        }),
      });

      const result = await response.json();
      console.log("API Response:", { status: response.status, result });

      if (!response.ok) {
        toast.error(result.error || "Failed to update profile");
        return;
      }

      // Update local state with the new data
      setUserData({
        ...userData,
        name: result.user.name,
        email: result.user.email,
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An error occurred while updating your profile");
    }
  };
  return (
    <ProtectedLayout>
      <div className="p-10 w-[50%] mx-auto flex flex-col justify-center">
        <section className="mb-5">
          <h1 className="text-3xl font-bold text-foreground">Profile</h1>
          <p className="text-muted-foreground">
            Manage your personal information and account settings here.
          </p>
        </section>

        <Card className="">
          <CardHeader>
            <CardTitle className="flex flex-col space-y-1">
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BsFillPersonFill />
                Personal Information
              </h1>
              <p className="text-muted-foreground text-[15px] font-normal">
                Update your personal information and manage your account
                settings.
              </p>
            </CardTitle>
            <CardAction className="space-x-2">
              <Button
                className="bg-gray-100 text-muted-foreground hover:bg-gray-200 hover:text-foreground cursor-pointer"
                onClick={() => setIsEditing(!isEditing)}
              >
                <BiPencil size={30} />
                Edit
              </Button>
              <Button className="bg-red-600 text-white hover:bg-red-700 cursor-pointer">
                Delete
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <FormLabel
                        htmlFor="name"
                        className="mb-1 text-muted-foreground text-[15px]"
                      >
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          {...field}
                          type="text"
                          placeholder="Enter your name"
                          disabled={!isEditing}
                          className={`focus:ring-0 text-[15px] ${
                            !isEditing
                              ? "bg-transparent border-0 text-black placeholder:text-black"
                              : "text-black placeholder:text-primary"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <>
                      <FormLabel
                        htmlFor="email"
                        className="mb-1 text-muted-foreground text-[15px]"
                      >
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          {...field}
                          type="email"
                          disabled={!isEditing}
                          placeholder="Enter your email"
                          className={`focus:ring-0 text-[15px] ${
                            !isEditing
                              ? "bg-transparent border-0 text-black placeholder:text-black"
                              : "text-black placeholder:text-primary"
                          }`}
                        />
                      </FormControl>
                      <FormMessage />
                    </>
                  )}
                />

                <span className="flex flex-col space-y-1">
                  <p className="mb-1 text-muted-foreground text-[15px]">
                    Account Role
                  </p>
                  <span className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {userData?.isOwner
                        ? "Owner"
                        : userData?.isAdmin
                        ? "Admin"
                        : "User"}
                    </p>
                    <Badge
                      variant={
                        userData?.isOwner
                          ? "default"
                          : userData?.isAdmin
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {userData?.isOwner
                        ? "Owner"
                        : userData?.isAdmin
                        ? "Admin"
                        : "User"}
                    </Badge>
                  </span>
                </span>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            {isEditing && (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    form.reset({
                      name: userData?.name || "",
                      email: userData?.email || "",
                    });
                    setIsEditing(false);
                  }}
                  className="border-muted-foreground"
                >
                  <BiX size={20} />
                  Cancel
                </Button>
                <Button type="submit">
                  <BiSave size={20} />
                  Save
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default Page;
