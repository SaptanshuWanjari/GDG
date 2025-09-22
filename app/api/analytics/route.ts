import clientPromise from "@/app/db/mongo";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isOwner: boolean;
  iat?: number;
  exp?: number;
}

export async function GET() {
  try {
    // Check authentication and admin role
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    const decoded = jwt.verify(token, secret) as JWTPayload;

    // Check if user is admin or owner
    if (!decoded.isAdmin && !decoded.isOwner) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);

    // Get collections
    const books = db.collection("books");
    const users = db.collection("users");
    const admins = db.collection("admins");

    // Get total counts
    const totalBooks = await books.countDocuments();
    const totalUsers = await users.countDocuments();
    const totalAdmins = await admins.countDocuments();

    // Get category distribution for pie chart
    const categoryStats = await books
      .aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ])
      .toArray();

    // Get monthly book additions for bar chart (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await books
      .aggregate([
        {
          $match: {
            createdAt: { $gte: sixMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ])
      .toArray();

    // Get recent activity (last 10 book additions)
    const recentBooks = await books
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .project({ title: 1, author: 1, category: 1, createdAt: 1 })
      .toArray();

    // Get recent user registrations
    const recentUsers = await users
      .find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .project({ name: 1, email: 1, createdAt: 1 })
      .toArray();

    // Get top categories
    const topCategories = categoryStats.slice(0, 5);

    // Format monthly stats for chart
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedMonthlyStats = monthlyStats.map((stat) => ({
      month: `${monthNames[stat._id.month - 1]} ${stat._id.year}`,
      books: stat.count,
    }));

    // Format category stats for pie chart
    const formattedCategoryStats = categoryStats.map((stat) => ({
      name: stat._id,
      value: stat.count,
    }));

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalBooks,
          totalUsers,
          totalAdmins,
          totalMembers: totalUsers + totalAdmins,
        },
        categoryStats: formattedCategoryStats,
        monthlyStats: formattedMonthlyStats,
        topCategories: topCategories.map((cat) => ({
          name: cat._id,
          count: cat.count,
        })),
        recentActivity: {
          books: recentBooks,
          users: recentUsers,
        },
      },
    });
  } catch (err) {
    console.error("Analytics error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
