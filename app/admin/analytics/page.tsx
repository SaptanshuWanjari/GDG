"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";
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

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
];

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Book Categories Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Books",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="min-h-0 h-64 sm:h-72 md:h-[300px]"
            >
              {/* ChartContainer already provides a ResponsiveContainer - render the chart directly */}
              <PieChart>
                <Pie
                  data={data.categoryStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius="70%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.categoryStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Monthly Books Added Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Books Added Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                books: {
                  label: "Books Added",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="min-h-0 h-64 sm:h-72 md:h-[300px]"
            >
              {/* ChartContainer already provides a ResponsiveContainer - render the chart directly */}
              <BarChart
                data={data.monthlyStats}
                margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
              >
                <XAxis dataKey="month" tick={{ fontSize: 12 }} interval={0} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="books" fill="#8884d8" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

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
                        <div className="text-gray-500 truncate">by {book.author}</div>
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
