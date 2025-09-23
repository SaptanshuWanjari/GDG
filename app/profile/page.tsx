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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setUserData({
        email: session.user.email,
        name: session.user.name,
        isAdmin: session.user.isAdmin,
        isOwner: session.user.isOwner,
      });
    } else {
      setUserData(null);
    }
  }, [status, session]);
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
  const router = useRouter();

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
      <div className="px-4 py-6 sm:px-6 md:py-10 w-full max-w-3xl mx-auto flex flex-col justify-center">
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
            <CardAction className="space-x-2 flex flex-col sm:flex-row sm:items-center gap-2">
              <Button
                className="bg-gray-100 text-muted-foreground hover:bg-gray-200 hover:text-foreground cursor-pointer w-full sm:w-auto"
                onClick={() => setIsEditing(!isEditing)}
              >
                <BiPencil size={20} />
                <span className="ml-2">Edit</span>
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700 cursor-pointer w-full sm:w-auto"
                onClick={async () => {
                  if (
                    !confirm(
                      "Are you sure you want to delete your account? This cannot be undone."
                    )
                  )
                    return;
                  try {
                    const res = await fetch("/api/users", { method: "DELETE" });
                    const body = await res.json();
                    if (!res.ok) {
                      toast.error(body.error || "Failed to delete account");
                      return;
                    }
                    toast.success("Account deleted. Signing out...");
                    await signOut({ redirect: false });
                    router.push("/");
                  } catch (err) {
                    console.error("Delete account error:", err);
                    toast.error(
                      "An error occurred while deleting your account"
                    );
                  }
                }}
              >
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
                          className={`focus:ring-0 text-sm md:text-[15px] w-full ${
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
                          className={`focus:ring-0 text-sm md:text-[15px] w-full ${
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
          <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
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
                  className="border-muted-foreground w-full sm:w-auto"
                >
                  <BiX size={18} />
                  <span className="ml-2">Cancel</span>
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  <BiSave size={18} />
                  <span className="ml-2">Save</span>
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
