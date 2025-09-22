import clientPromise from "@/app/db/mongo";
import { NextResponse } from "next/server";
import { getServerAuth } from "@/lib/auth";

export async function GET() {
  try {
    // Check authentication and admin role via NextAuth
    const auth = await getServerAuth();
    if (!auth.isAuthenticated || !auth.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    if (!auth.user.isAdmin && !auth.user.isOwner) {
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
    type _UserRecord = { createdAt?: string | Date } & Record<string, unknown>;
    (allUsers as _UserRecord[]).sort((a, b) => {
      const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bt - at;
    });

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
    // Check authentication via NextAuth
    const auth = await getServerAuth();
    if (!auth.isAuthenticated || !auth.user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
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
    const collection =
      auth.user.isAdmin || auth.user.isOwner ? "admins" : "users";
    const users = db.collection(collection);

    // Update the user
    const result = await users.updateOne(
      { email: auth.user.email },
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

    const response = NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        name,
        email,
        isAdmin: auth.user.isAdmin,
        isOwner: auth.user.isOwner,
      },
    });

    // Note: We don't set tokens here; sessions are handled by NextAuth.
    return response;
  } catch (err) {
    console.error("Update user API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
