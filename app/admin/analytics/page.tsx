"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AnalyticsCharts from "@/app/components/charts/AnalyticsCharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  TrendingUp,
  Activity,
  Calendar,
  User,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

interface AnalyticsData {
  overview: {
    totalBooks: number;
    totalUsers: number;
    totalAdmins: number;
    totalMembers: number;
  };
  categoryStats: { name: string; value: number }[];
  monthlyStats: { month: string; books: number }[];
  topCategories: { name: string; count: number }[];
  recentActivity: {
    books: Array<{
      _id: string;
      title: string;
      author: string;
      category: string;
      createdAt: string;
    }>;
    users: Array<{
      _id: string;
      name: string;
      email: string;
      createdAt: string;
    }>;
  };
}

const AnalyticsPage = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/analytics", {
        credentials: "include",
      });
      const response = await res.json();

      if (res.ok) {
        setData(response.data);
      } else {
        toast.error("Failed to fetch analytics data");
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Error fetching analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Failed to load analytics data</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of your library management system.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <Button onClick={fetchAnalytics} className="w-full sm:w-auto">
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalBooks}</div>
            <p className="text-xs text-muted-foreground">Books in library</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalAdmins}
            </div>
            <p className="text-xs text-muted-foreground">Admin users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.overview.totalMembers}
            </div>
            <p className="text-xs text-muted-foreground">All system users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <AnalyticsCharts
        categoryStats={data.categoryStats}
        monthlyStats={data.monthlyStats}
      />

      {/* Top Categories and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.topCategories.map((category, index) => (
                <div
                  key={category.name}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 min-w-0"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="text-sm font-medium text-gray-600 flex-shrink-0">
                      #{index + 1}
                    </div>
                    <div className="min-w-0">
                      <Badge
                        variant="secondary"
                        className="truncate block max-w-xs"
                      >
                        {category.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-blue-600 flex-shrink-0 ml-2">
                    {category.count} books
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Recent Books Added */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Recent Books Added
                </h4>
                <div className="space-y-2">
                  {data.recentActivity.books.slice(0, 3).map((book) => (
                    <div
                      key={book._id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm min-w-0"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{book.title}</div>
                        <div className="text-gray-500 truncate">
                          by {book.author}
                        </div>
                      </div>
                      <div className="sm:ml-4 flex-shrink-0">
                        <Badge variant="outline">{book.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New User Registrations */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  New User Registrations
                </h4>
                <div className="space-y-2">
                  {data.recentActivity.users.slice(0, 3).map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center space-x-2 text-sm min-w-0"
                    >
                      <User className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-medium truncate">
                            {user.name}
                          </span>
                          <span className="text-gray-500 truncate">
                            ({user.email})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
