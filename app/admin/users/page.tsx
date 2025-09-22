"use client";

import React, { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Crown } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/app/components/common/DataTable";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin?: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users", {
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        setUsers(data.users || []);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditUser = (userId: string) => {
    // TODO: Implement edit user functionality
    console.log("Edit user:", userId);
    toast.info("Edit user functionality coming soon");
  };

  const handleDeleteUser = async (userId: string) => {
    // TODO: Implement delete user functionality
    console.log("Delete user:", userId);
    toast.info("Delete user functionality coming soon");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and their permissions.</p>
        </div>
        <div className="w-full sm:w-auto">
          <Button onClick={fetchUsers} className="w-full sm:w-auto">
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              Active registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "admin").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Administrative users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owners</CardTitle>
            <Crown className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter((u) => u.role === "owner").length}
            </div>
            <p className="text-xs text-muted-foreground">System owners</p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="mb-4 text-sm text-muted-foreground">
              Loading users...
            </div>
          )}
          <div className="overflow-x-auto">
            <DataTable
              columns={(() => {
                const cols: ColumnDef<User, unknown>[] = [
                  {
                    accessorKey: "name",
                    header: "Name",
                    cell: (info) => (
                      <div className="font-medium">
                        {info.getValue<string>()}
                      </div>
                    ),
                  },
                  {
                    accessorKey: "email",
                    header: "Email",
                    cell: (info) => (
                      <div className="text-sm text-muted-foreground">
                        {info.getValue<string>()}
                      </div>
                    ),
                  },
                  {
                    accessorKey: "role",
                    header: "Role",
                    cell: (info) => (
                      <div className="text-sm">{info.getValue<string>()}</div>
                    ),
                  },
                  {
                    accessorKey: "createdAt",
                    header: "Created",
                    cell: (info) => (
                      <div className="text-sm text-muted-foreground">
                        {new Date(info.getValue<string>()).toLocaleString()}
                      </div>
                    ),
                  },
                  {
                    id: "actions",
                    header: "Actions",
                    cell: (info) => (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditUser(info.row.original._id)}
                          className="text-sm px-2 py-1 bg-primary text-primary-foreground rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteUser(info.row.original._id)
                          }
                          className="text-sm px-2 py-1 border rounded border-border/40 text-muted-foreground"
                        >
                          Delete
                        </button>
                      </div>
                    ),
                  } as ColumnDef<User, unknown>,
                ];
                return cols;
              })()}
              data={users}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersPage;
