"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BiBookBookmark } from "react-icons/bi";
import { Home, LogIn, Shield, Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const OwnerNavbar = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        setFormData({ name: "", email: "", password: "" });
        // You can add a toast notification here if you have it set up
        alert("Admin created successfully!");
      } else {
        alert(data.error || "Failed to create admin");
      }
    } catch {
      alert("Error creating admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <BiBookBookmark
              size={32}
              className="text-primary group-hover:scale-110 transition-transform"
            />
            <span className="text-xl font-bold text-foreground font-serif">
              LibraryMS
            </span>
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full ml-2">
              Owner
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/") ? "bg-primary text-primary-foreground" : ""
              }
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>

            <Button
              variant={isActive("/admin") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/admin") ? "bg-primary text-primary-foreground" : ""
              }
            >
              <Link href="/admin" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Dashboard
              </Link>
            </Button>

            {/* Create Admin Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <Shield className="h-4 w-4" />
                  Add Admin
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreateAdmin}>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Create New Admin
                    </DialogTitle>
                    <DialogDescription>
                      Add a new administrator to the system. They will have full
                      access to manage the library.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Admin name"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="admin@example.com"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Secure password"
                        className="col-span-3"
                        required
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsModalOpen(false)}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading ? "Creating..." : "Create Admin"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Button
              variant={isActive("/login") ? "default" : "ghost"}
              size="sm"
              asChild
              className={
                isActive("/login") ? "bg-primary text-primary-foreground" : ""
              }
            >
              <Link href="/login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default OwnerNavbar;
