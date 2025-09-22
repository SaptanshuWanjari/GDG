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

    // Get all users from both users and admins collections
    const users = db.collection("users");
    const admins = db.collection("admins");

    // Fetch regular users
    const regularUsers = await users
      .find({})
      .project({
        name: 1,
        email: 1,
        createdAt: 1,
        lastLogin: 1,
      })
      .toArray();

    // Fetch admin users
    const adminUsers = await admins
      .find({})
      .project({
        name: 1,
        email: 1,
        role: 1,
        createdAt: 1,
        lastLogin: 1,
      })
      .toArray();

    // Combine and format users
    const allUsers = [
      ...regularUsers.map((user) => ({
        ...user,
        role: "user",
      })),
      ...adminUsers.map((admin) => ({
        ...admin,
        role: admin.role || "admin",
      })),
    ];

    // Sort by creation date (newest first)
    allUsers.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      success: true,
      users: allUsers,
      stats: {
        total: allUsers.length,
        regularUsers: regularUsers.length,
        admins: adminUsers.filter((admin) => admin.role === "admin").length,
        owners: adminUsers.filter((admin) => admin.role === "owner").length,
      },
    });
  } catch (err) {
    console.error("Users API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    // Check authentication
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
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "LibraryManagement";
    const db = client.db(dbName);

    // Determine which collection to update based on user role
    const collection = decoded.isAdmin || decoded.isOwner ? "admins" : "users";
    const users = db.collection(collection);

    // Update the user
    const result = await users.updateOne(
      { email: decoded.email },
      {
        $set: {
          name: name,
          email: email,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Generate new JWT token with updated email
    const newToken = jwt.sign(
      {
        userId: decoded.userId,
        email: email, // Use the new email
        name: name,   // Use the new name
        isAdmin: decoded.isAdmin,
        isOwner: decoded.isOwner,
      },
      secret,
      { expiresIn: "7d" }
    );

    // Set the new token in cookies
    const response = NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name,
        email,
        isAdmin: decoded.isAdmin,
        isOwner: decoded.isOwner,
      },
    });

    response.cookies.set("auth-token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("Update user API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
