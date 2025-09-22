"use client";
import React, { useEffect, useState } from "react";
import ProtectedLayout from "@/app/components/layout/ProtectedLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Shield, TrendingUp } from "lucide-react";
import UserManagementTable from "@/app/components/admin/UserManagementTable";

interface User {
  _id: string;
  email: string;
  name?: string;
  role: string;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalAdmins: number;
  totalBooks: number;
  totalBorrows: number;
}

const OwnerDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalAdmins: 0,
    totalBooks: 0,
    totalBorrows: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and stats
        const [usersRes, statsRes] = await Promise.all([
          fetch("/api/owner/users", { credentials: "include" }),
          fetch("/api/owner/stats", { credentials: "include" }),
        ]);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData.users || []);
        }

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(
            statsData.stats || {
              totalUsers: 0,
              totalAdmins: 0,
              totalBooks: 0,
              totalBorrows: 0,
            }
          );
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  



  
  

  if (loading) {
    return (
      <ProtectedLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </ProtectedLayout>
    );
  }

  return (
    <ProtectedLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-muted-foreground">
            Manage admins and view system statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Admins
              </CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Books</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBooks}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Borrows
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBorrows}</div>
            </CardContent>
          </Card>
        </div>

        {/* Users Management */}
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <p className="text-sm text-muted-foreground">
              Promote users to admin or demote them back to regular users
            </p>
          </CardHeader>
          <CardContent>
            <UserManagementTable
              users={users}
            />
          </CardContent>
        </Card>
      </div>
    </ProtectedLayout>
  );
};

export default OwnerDashboard;
